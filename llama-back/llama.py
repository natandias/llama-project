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

    if model == "llama":
        return f"""<s>[INST] <<SYS>>
You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
All questions will be written in Portuguese from Brazil. You answer should also be written in Portuguese from Brazil.
<</SYS>>
{question} [/INST]
"""
    if model == "mistral":
        return f"""<s>[INST] {question} [/INST]"""


def code_completion(prompt):
    code_llm = LlamaCpp(
        model_path=config["LLM_CODE_MODEL_PATH"],
        temperature=0.1,
        n_ctx=4000,
        top_p=0.95,
        callback_manager=callback_manager,
        verbose=True,
        n_gpu_layers=23,
        # n_batch=256,
        f16_kv=True,
        model_kwargs={"repetition_penalty": 1.1},
        stop=["###"],
    )
    formatted_prompt = get_prompt("deepseek", prompt)
    print(formatted_prompt)
    result = code_llm(formatted_prompt, max_tokens=2048)
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
        Cores e imagens para o site serão selecionados em outra etapa.
        Considere o seguinte contexto da conversa para responder a próxima questão: {history},
        [INST] {question} [/INST]
    """
    )

    prompt_formatted = prompt_template.format(
        question=prompt, history=conversation if conversation else '' 
    )

    result = chat_llm(prompt_formatted, max_tokens=3048)
    formatted_result = result["choices"][0]["text"]

    formatted_summary = ''
    if conversation:
        conversation_summary = conversation.get('summary', '')
        summary_prompt = f""" [INST]
        Resuma a seguinte interação:
        Human: {prompt}
        AI: {formatted_result}
        E a adicione a esse contexto: {conversation_summary}
        [/INST] """
        summary_result = chat_llm(summary_prompt, max_tokens=3048)
        formatted_summary = summary_result["choices"][0]["text"]
        print("summary_prompt", summary_prompt)
        print('formatted_summary', formatted_summary)

    # chat_message_history.add_user_message(prompt)
    # chat_message_history.add_ai_message(formatted_result)

    save_conversation(id=id, data=dict(prompt=prompt, response=formatted_result, summary=formatted_summary))
    return formatted_result
