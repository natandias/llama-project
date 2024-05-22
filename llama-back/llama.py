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
from resources.sites.sites_service import find_site, update_site

import asyncio
import setup

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


async def extract_requirements(conversations):
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
        """[INST] Based on the following conversation between a person and a bot, extract all the requirements for the requested website. The response should be in Portuguese: {conversation} [/INST]"""
    )
    prompt_formatted = prompt_template.format(
        conversation=prompt
    )
    result = llm(prompt_formatted, max_tokens=2048)
    formatted_software_requirements = result["choices"][0]["text"]
    return formatted_software_requirements


async def extract_content(conversations):
    print('extracting content')
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
        """[INST] From the following conversation between a person and a bot, extract only the content that should be added on the requested website. The response should be in portuguese: {conversation} [/INST]"""
    )
    prompt_formatted = prompt_template.format(
        conversation=prompt
    )
    result = llm(prompt_formatted, max_tokens=2048)
    formatted_content = result["choices"][0]["text"]
    return formatted_content


async def generate_summary(site_id):
    conversation_data = find_conversation(site_id)
    all_conversations = conversation_data.get("conversations")
    formatted_software_requirements, formatted_software_content = await asyncio.gather(
        extract_requirements(all_conversations),
        extract_content(all_conversations)
    )

    update_site(
        id=site_id,
        data=dict(requirements=formatted_software_requirements,
                  content=formatted_software_content),
    )

    return True


async def create_site_code(site_id):
    site_data = find_site(site_id)
    code_prompt_template = PromptTemplate.from_template(
        """[INST] {prompt} [/INST]"""
    )

    print('site_data', site_data)

    arch_html_template = """<!DOCTYPE html> <html> <head> <title>W3.CSS Template</title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> </head> <body> <!-- Navbar (sit on top) --> <div class="w3-top"> <div class="w3-bar w3-white w3-wide w3-padding w3-card"> <a href="#home" class="w3-bar-item w3-button"><b>BR</b> Architects</a> <!-- Float links to the right. Hide them on small screens --> <div class="w3-right w3-hide-small"> <a href="#projects" class="w3-bar-item w3-button">Projects</a> <a href="#about" class="w3-bar-item w3-button">About</a> <a href="#contact" class="w3-bar-item w3-button">Contact</a> </div> </div> </div> <!-- Header --> <header class="w3-display-container w3-content w3-wide" style="max-width:1500px;" id="home"> <img class="w3-image" src="/w3images/architect.jpg" alt="Architecture" width="1500" height="800"> <div class="w3-display-middle w3-margin-top w3-center"> <h1 class="w3-xxlarge w3-text-white"><span class="w3-padding w3-black w3-opacity-min"><b>BR</b></span> <span class="w3-hide-small w3-text-light-grey">Architects</span></h1> </div> </header> <!-- Page content --> <div class="w3-content w3-padding" style="max-width:1564px"> <!-- Project Section --> <div class="w3-container w3-padding-32" id="projects"> <h3 class="w3-border-bottom w3-border-light-grey w3-padding-16">Projects</h3> </div> <div class="w3-row-padding"> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Summer House</div> <img src="/w3images/house5.jpg" alt="House" style="width:100%"> </div> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Brick House</div> <img src="/w3images/house2.jpg" alt="House" style="width:100%"> </div> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Renovated</div> <img src="/w3images/house3.jpg" alt="House" style="width:100%"> </div> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Barn House</div> <img src="/w3images/house4.jpg" alt="House" style="width:100%"> </div> </div> </div> <div class="w3-row-padding"> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Summer House</div> <img src="/w3images/house2.jpg" alt="House" style="width:99%"> </div> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Brick House</div> <img src="/w3images/house5.jpg" alt="House" style="width:99%"> </div> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Renovated</div> <img src="/w3images/house4.jpg" alt="House" style="width:99%"> </div> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <div class="w3-display-container"> <div class="w3-display-topleft w3-black w3-padding">Barn House</div> <img src="/w3images/house3.jpg" alt="House" style="width:99%"> </div> </div> </div> <!-- About Section --> <div class="w3-container w3-padding-32" id="about"> <h3 class="w3-border-bottom w3-border-light-grey w3-padding-16">About</h3> <p></p> </div> <div class="w3-row-padding w3-grayscale"> <div class="w3-col l3 m6 w3-margin-bottom"> <img src="/w3images/team2.jpg" alt="John" style="width:100%"> <h3>John Doe</h3> <p class="w3-opacity">CEO & Founder</p> <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p> <p><button class="w3-button w3-light-grey w3-block">Contact</button></p> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <img src="/w3images/team1.jpg" alt="Jane" style="width:100%"> <h3>Jane Doe</h3> <p class="w3-opacity">Architect</p> <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p> <p><button class="w3-button w3-light-grey w3-block">Contact</button></p> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <img src="/w3images/team3.jpg" alt="Mike" style="width:100%"> <h3>Mike Ross</h3> <p class="w3-opacity">Architect</p> <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p> <p><button class="w3-button w3-light-grey w3-block">Contact</button></p> </div> <div class="w3-col l3 m6 w3-margin-bottom"> <img src="/w3images/team4.jpg" alt="Dan" style="width:100%"> <h3>Dan Star</h3> <p class="w3-opacity">Architect</p> <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p> <p><button class="w3-button w3-light-grey w3-block">Contact</button></p> </div> </div> <!-- Contact Section --> <div class="w3-container w3-padding-32" id="contact"> <h3 class="w3-border-bottom w3-border-light-grey w3-padding-16">Contact</h3> <p>Lets get in touch and talk about your next project.</p> <form action="/action_page.php" target="_blank"> <input class="w3-input w3-border" type="text" placeholder="Name" required name="Name"> <input class="w3-input w3-section w3-border" type="text" placeholder="Email" required name="Email"> <input class="w3-input w3-section w3-border" type="text" placeholder="Subject" required name="Subject"> <input class="w3-input w3-section w3-border" type="text" placeholder="Comment" required name="Comment"> <button class="w3-button w3-black w3-section" type="submit"> <i class="fa fa-paper-plane"></i> SEND MESSAGE </button> </form> </div> <!-- Image of location/map --> <div class="w3-container"> <img src="/w3images/map.jpg" class="w3-image" style="width:100%"> </div> <!-- End page content --> </div><!-- Footer --> <footer class="w3-center w3-black w3-padding-16"> <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" class="w3-hover-text-green">w3.css</a></p> </footer> </body> </html>"""

    code_prompt = f"""Write a complete code using HTML, CSS and Javascript to meet the following requirements: {site_data["requirements"]}. Do not write anything besides the code. You're free to use libs as long as they can be used directly from a CDN. The content of the website should be written in Portuguese from Brazil.
    Use the following template: {arch_html_template}
    """

    code_prompt_formatted = code_prompt_template.format(prompt=code_prompt)

    print('\ncode_prompt_formatted', code_prompt_formatted)
    llm = get_llm_instance()

    generated_html_result = llm(code_prompt_formatted, max_tokens=16000)
    formatted_html = generated_html_result["choices"][0]["text"]

    print('\nformatted_html', formatted_html)

    content_prompt = f"""We generated a hmtl file based on the requirements for a website. Fill the following html: {formatted_html} with the content: {site_data["content"]}"""
    content_prompt_formatted = code_prompt_template.format(
        prompt=content_prompt)

    generated_html_with_content_result = llm(
        content_prompt_formatted, max_tokens=16000)

    final_result = generated_html_with_content_result["choices"][0]["text"]

    print('writing html...')
    file = open(f"generatedSites/{site_id}.html", "w")
    file.write(final_result)
    file.close()
    print('html written!')

    return final_result


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
