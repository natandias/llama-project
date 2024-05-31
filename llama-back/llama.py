from dotenv import dotenv_values

from langchain.prompts import PromptTemplate
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from resources.conversation.conversation_db import save_conversation
from resources.conversation.conversation_service import find_conversation
from resources.sites.sites_service import find_site, update_site

import setup
from templates import templates

config = dotenv_values(".env")

callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])


def get_llm_instance():
    return setup.chat_llm


def get_prompt(model, question):
    if model == "deepseek":
        return f"""You are an AI programming assistant, utilizing the Deepseek Coder model, developed by Deepseek Company, and you only answer questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will refuse to answer.
### Instruction:
{question}
### Response:"""

    if model == "mistral":
        return f"""<s>[INST] {question} [/INST]"""


def extract_requirements(conversations):
    print('extracting requirements')
    llm = get_llm_instance()

    prompt = ""
    for conversation in conversations:
        person_say = conversation.get("prompt")
        bot_say = conversation.get("response")
        prompt += f"""
        Pessoa: {person_say}
        Bot: {bot_say}
        """

    prompt_template = PromptTemplate.from_template(
        """[INST]Da seguinte interação entre uma pessoa e um bot: {conversation}, extraia todos os requisitos do site a ser criado. Não copie a mensagem original. Answer only in portuguese language.[/INST]"""
    )
    prompt_formatted = prompt_template.format(
        conversation=prompt
    )
    result = llm(prompt_formatted, max_tokens=None)
    formatted_software_requirements = result["choices"][0]["text"]
    return formatted_software_requirements


def extract_content(conversations):
    print('extracting content')
    llm = get_llm_instance()

    prompt = ""
    for conversation in conversations:
        person_say = conversation.get("prompt")
        bot_say = conversation.get("response")
        prompt += f"""
        Pessoa: {person_say}
        """

    prompt_template = PromptTemplate.from_template(
        """[INST]Da seguinte sequência de mensagens: {conversation}, extraia todo o conteúdo e os textos definidos pela pessoa, que devem ser adicionado ao site. Answer only in portuguese language.[/INST]"""
    )
    prompt_formatted = prompt_template.format(
        conversation=prompt
    )
    result = llm(prompt_formatted, max_tokens=None)
    formatted_content = result["choices"][0]["text"]
    return formatted_content


def generate_summary(site_id):
    print('site_id', site_id)
    conversation_data = find_conversation(site_id)
    all_conversations = conversation_data.get("conversations")
    # formatted_software_requirements, formatted_software_content = await asyncio.gather(
    #     extract_requirements(all_conversations),
    #     extract_content(all_conversations)
    # )

    formatted_software_requirements = extract_requirements(all_conversations)
    formatted_software_content = extract_content(all_conversations)

    update_site(
        id=site_id,
        data=dict(requirements=formatted_software_requirements,
                  content=formatted_software_content, step='editing-requirements')
    )

    return True


async def create_site_code(site_id):
    site_data = find_site(site_id)
    code_prompt_template = PromptTemplate.from_template(
        """[INST] {prompt} [/INST]"""
    )

    code_prompt = f"""Write a complete code using HTML, CSS and Javascript to meet the following requirements: {site_data["requirements"]} and fill it with this content: {site_data["content"]}. Do not write additional commentaries. Feel free to use libs if they come from a CDN. The content of the website should be written in Portuguese from Brazil. Just generate the HTML without explanations.
    Use this template: {templates.get(site_data["template"])}. Don't forget to replace the template colors. Be creative.
    """

    code_prompt_formatted = code_prompt_template.format(prompt=code_prompt)

    llm = get_llm_instance()

    generated_html_result = llm(
        code_prompt_formatted, max_tokens=None, temperature=1.5)
    print(generated_html_result)
    formatted_html = generated_html_result["choices"][0]["text"]

    print('writing html...')
    file = open(f"static/{site_id}.html", "w")
    file.write(formatted_html)
    file.close()
    print('html written!')

    update_site(site_id, data=dict(step='done'))

    return formatted_html


def chat(prompt, **kwargs):
    chat_llm = get_llm_instance()

    id = kwargs.get("id", None)

    # chat_message_history = MongoDBChatMessageHistory(
    #     session_id=id,
    #     connection_string=config["MONGO_URI"],
    #     database_name=config["DB_NAME"],
    #     collection_name="chat_histories",
    # )

    site = find_site(id)
    conversation = find_conversation(id)

    prompt_template = PromptTemplate.from_template(
        """[INST] Você é um assistente de IA que sabe português. O seu nome é Intellimaker. Sua única tarefa é ajudar na coleta de requisitos para o desenvolvimento de um site estático.
        Interaja de maneira a obter do cliente informações que serão necessárias para desenvolver um site estático. Você deve deixar bem claro que o site a ser desenvolvido é somente estático e não um sistema completo.
        Considere que o cliente não possui noção de tecnologia. Não solicite muitas informações de uma só vez.
        As cores a serem usadas serão {primaryColor} e {secondaryColor}. Fotos poderão ser enviadas em uma próxima etapa.
        Considere o seguinte contexto da conversa para responder a próxima questão: {history},
         {question}[/INST]
    """
    )

    conversation_history = conversation.get(
        "summary", "") if conversation else ''

    prompt_formatted = prompt_template.format(
        question=prompt, history=conversation_history, primaryColor=site['primaryColor'], secondaryColor=site['secondaryColor'])

    result = chat_llm(prompt_formatted, max_tokens=3048)
    formatted_result = result["choices"][0]["text"]

    formatted_summary = ""
    if conversation:
        conversation_summary = conversation.get("summary", "")
        summary_prompt = f"""[INST]
        Resuma a seguinte interação:
        Pessoa: {prompt}
        Resposta da IA: {formatted_result}
        E a adicione a esse contexto: {conversation_summary}
        [/INST] """
        summary_result = chat_llm(summary_prompt, max_tokens=3048)
        formatted_summary = summary_result["choices"][0]["text"]
    else:
        summary_prompt = f"""[INST]
        Resuma a seguinte interação:
        Pessoa: {prompt}
        Resposta da IA: {formatted_result}
        [/INST] """
        summary_result = chat_llm(summary_prompt, max_tokens=3048)
        formatted_summary = summary_result["choices"][0]["text"]

    # chat_message_history.add_user_message(prompt)
    # chat_message_history.add_ai_message(formatted_result)

    save_conversation(
        id=id,
        data=dict(prompt=prompt, response=formatted_result,
                  summary=formatted_summary),
    )
    return formatted_result
