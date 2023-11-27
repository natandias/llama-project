from langchain.llms import LlamaCpp
from langchain import PromptTemplate, LLMChain
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from langchain.llms import LlamaCpp
from resources.conversation.conversation_db import save_conversation


callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

# template = """Question: {question}
# Answer: Let's work this out in a step by step way to be sure we have the right answer."""
# prompt = PromptTemplate(template=template, input_variables=["question"])

# code -> CodeLlama-13b-Instruct
# chat -> llama-2-13b-chat

llm = LlamaCpp(
    model_path="/run/media/natandrake/SN770/IA/llama.cpp/models/llama-2-13b-chat/ggml-model-q4_0.gguf",
    temperature=0.75,
    max_tokens=7000,
    top_p=1,
    callback_manager=callback_manager,
    verbose=True,
    n_gpu_layers=12,
    n_batch=256,
)


def code_completion(prompt):
    prompt_template = f"""<s>[INST] <<SYS>>
        You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

        If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
        <</SYS>>

        {prompt} [/INST]
        """

    print(prompt_template)

    result = llm(prompt_template)
    return result


def chat(prompt, **kwargs):
    prompt_template = f"""<s>[INST] <<SYS>>
       A You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

        If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
        <</SYS>>

        {prompt} [/INST]
        """
    print(prompt_template)
    result = llm(prompt_template)
    id = kwargs.get("id", None)
    save_conversation(id=id, data=dict(prompt=prompt, response=result))
    return result
