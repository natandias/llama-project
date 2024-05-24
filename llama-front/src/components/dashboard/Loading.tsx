const Loading = () => (
  <section className="h-full flex flex-col items-center my-auto text-center justify-center">
    <h1 className="text-lg">Processando os dados... Aguarde um momento.</h1>
    {/* <h2 className="text-lg">Por favor aguarde um momento</h2> */}
    <div className="flex space-x-2 justify-center items-center bg-black h-10 dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
    </div>
  </section>
);

export default Loading;
