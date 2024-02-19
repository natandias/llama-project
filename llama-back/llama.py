from dotenv import dotenv_values

# from langchain_community.llms import LlamaCpp
from llama_cpp import Llama as LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from resources.conversation.conversation_db import save_conversation

config = dotenv_values(".env")

callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

# template = """Question: {question}
# Answer: Let's work this out in a step by step way to be sure we have the right answer."""
# prompt = PromptTemplate(template=template, input_variables=["question"])


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


def code_completion(prompt):
    code_llm = LlamaCpp(
        model_path=config["LLM_CODE_MODEL_PATH"],
        temperature=0.1,
        n_ctx=3048,
        top_p=0.95,
        callback_manager=callback_manager,
        verbose=True,
        n_gpu_layers=14,
        # n_batch=256,
        f16_kv=True,
        model_kwargs={"repetition_penalty": 1.1},
        stop=["###"],
    )
    formatted_prompt = get_prompt("deepseek", prompt)
    print(formatted_prompt)
    # llm_chain = LLMChain(prompt=PromptTemplate.from_template(formatted_prompt), llm=llm)
    # result = llm_chain.run({"question": prompt})
    result = code_llm(formatted_prompt, max_tokens=3048)
    return result["choices"][0]["text"]


def chat(prompt, **kwargs):
    chat_llm = LlamaCpp(
        model_path=config["LLM_CHAT_MODEL_PATH"],
        temperature=0.1,
        n_ctx=3048,
        top_p=0.95,
        callback_manager=callback_manager,
        verbose=True,
        n_gpu_layers=14,
        # n_batch=256,
        f16_kv=True,
        model_kwargs={"repetition_penalty": 1.1},
        stop=["###"],
    )
    prompt_template = get_prompt("llama", prompt)
    print(prompt_template)
    result = chat_llm(prompt_template, max_tokens=3048)
    id = kwargs.get("id", None)
    save_conversation(id=id, data=dict(prompt=prompt, response=result))
    return result["choices"][0]["text"]
