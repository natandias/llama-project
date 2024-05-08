from dotenv import dotenv_values

# from langchain_community.llms import LlamaCpp
from llama_cpp import Llama as LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from resources.conversation.conversation_db import save_conversation
from resources.conversation.conversation_service import find_conversation

config = dotenv_values(".env")

callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])


def get_prompt(model, question):
    if model == "deepseek":
        return f"""You are an AI programming assistant, utilizing the Deepseek Coder model, developed by Deepseek Company, and you only answer questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will refuse to answer.
### Instruction:
{question}
### Response:"""

    if model == "mistral":
        return f"""<s>[INST] {question} [/INST]"""


def summarize_conversation(conversations):
    chat_llm = LlamaCpp(
        model_path=config["LLM_CHAT_MODEL_PATH"],
        temperature=0.1,
        n_ctx=4000,
        top_p=0.95,
        callback_manager=callback_manager,
        verbose=True,
        n_gpu_layers=20,
        # n_batch=256,
        f16_kv=True,
        model_kwargs={"repetition_penalty": 1.1},
        stop=["###"],
    )

    prompt = ""
    for conversation in conversations:
        person_say = conversation.get("prompt")
        bot_say = conversation.get("response")
        prompt += f"""
        Person: {person_say}
        Bot: {bot_say}
        """

        prompt_template = PromptTemplate.from_template(
            """[INST] Based on the following conversation between a person and a bot, extract the requirements specification for the requested software: {conversation} [/INST]"""
        )

        prompt_formatted = prompt_template.format(
            conversation=prompt
        )

        result = chat_llm(prompt_formatted, max_tokens=3048)
        formatted_software_requirements = result["choices"][0]["text"]
        return formatted_software_requirements


def create_site_code(site_id):

    conversation_data = find_conversation(site_id)
    all_conversations = conversation_data.get("conversations")
    formatted_software_requirements = summarize_conversation(all_conversations)
    #     formatted_software_requirements = """Requirements Specification:
    # 1. Site Structure:
    #    - The site will consist of the following pages: Home, About Us, Services, Contact, and Photo Gallery.
    # 2. Home Page:
    #    - A brief description of the site.
    #    - Highlights of the most important features of the site.
    # 3. About Us Page:
    #    - Information about the company.
    #    - Company history.
    #    - Mission and vision statement.
    #    - Company values.
    # 4. Services Page:
    #    - A list of services provided by the company.
    #    - Brief descriptions of each service.
    # 5. Detailed Information for Each Service:
    #    - Pricing information for each service.
    #    - Service duration.
    #    - Client testimonials or reviews.
    # 6. Contact Page:
    #    - A contact form for users to send messages directly through the site.
    #    - Contact information such as phone number, email address, physical address, and social media links.
    # 7. Photo Gallery Page:
    #    - A collection of photos of cars.
    #    - Option to view photos in full screen mode.
    #    - Filtering option to view photos by car category.
    # 8. Additional Features:
    #    - Integration of a contact form for users to send messages directly through the site.
    #    - Integration of a reservation system for services (if applicable).
    #    - Option to share photos from the gallery on social media platforms.
    # 9. Navigation:
    #    - When users click on "About Us" in the menu, they will be taken to the About Us page.
    #    - When users click on "Services" in the menu, they will be taken to the Services page, which displays the list of services with brief descriptions.
    #    - When users click on "Contact" in the menu, they will be taken to the Contact page, which includes a contact form and contact information.
    #    - When users click on "Photo Gallery" in the menu, they will be taken to the Photo Gallery page, which includes a collection of photos and options to view photos in full screen mode and filter by car category."""

    code_llm = LlamaCpp(
        model_path=config["LLM_CODE_MODEL_PATH"],
        temperature=0.1,
        n_ctx=8000,
        top_p=0.95,
        callback_manager=callback_manager,
        verbose=True,
        n_gpu_layers=18,
        # n_batch=256,
        f16_kv=True,
        model_kwargs={"repetition_penalty": 1.1},
        stop=["###"],
    )

    code_prompt_template = PromptTemplate.from_template(
        """You are an AI programming assistant, utilizing the Deepseek Coder model, developed by Deepseek Company, and you only answer questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will refuse to answer.
### Instruction:
         {question}
### Response:
    """
    )

    code_prompt = f"Write a working code using HTML, CSS and Javascript to meet the following requirements: {formatted_software_requirements}. Do not write anything besides the code. The website should have a good design. You're free to use libs as long as they can be used directly from a CDN"

    code_prompt_formatted = code_prompt_template.format(question=code_prompt)

    print(code_prompt_formatted)
    result = code_llm(code_prompt_formatted, max_tokens=16000)
    return result["choices"][0]["text"]


def chat(prompt, **kwargs):
    chat_llm = LlamaCpp(
        model_path=config["LLM_CHAT_MODEL_PATH"],
        temperature=0.1,
        n_ctx=8000,
        top_p=0.95,
        callback_manager=callback_manager,
        verbose=True,
        n_gpu_layers=20,
        # n_batch=256,
        f16_kv=True,
        model_kwargs={"repetition_penalty": 1.1},
        stop=["###"],
    )

    id = kwargs.get("id", None)

    # chat_message_history = MongoDBChatMessageHistory(
    #     session_id=id,
    #     connection_string=config["MONGO_URI"],
    #     database_name=config["DB_NAME"],
    #     collection_name="chat_histories",
    # )

    conversation = find_conversation(id)

    prompt_template = PromptTemplate.from_template(
        """Você é um assistente de IA que sabe português. O seu nome é Intellimaker. Sua única tarefa é ajudar na coleta de requisitos para o desenvolvimento de um site estático.
        Interaja de maneira a obter do cliente informações que serão necessárias para desenvolver um site estático. Você deve deixar bem claro que o site a ser desenvolvido é somente estático e não um sistema completo.
        Consire que cores já foram selecionadas em uma etapa anterior e imagens para o site serão selecionados na próxima etapa.
        Considere o seguinte contexto da conversa para responder a próxima questão: {history},
        [INST] {question} [/INST]
    """
    )

    conversation_history = conversation.get(
        "summary", "") if conversation else ''

    prompt_formatted = prompt_template.format(
        question=prompt, history=conversation_history)

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
