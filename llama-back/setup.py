from llama_cpp import Llama as LlamaCpp
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from dotenv import dotenv_values

global chat_llm

config = dotenv_values(".env")

callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

chat_llm = LlamaCpp(
    model_path=config["LLM_CHAT_MODEL_PATH"],
    temperature=0.5,
    n_ctx=8192,
    top_p=0.95,
    callback_manager=callback_manager,
    verbose=True,
    n_gpu_layers=15,
    n_batch=256,
    f16_kv=True,
    model_kwargs={"repetition_penalty": 1.1},
    stop=["###"],
)
