import { Fragment } from "react";
import Image from "next/image";

type CardParams = {
  title: string;
  text: string;
};
const Card = ({ title, text }: CardParams) => (
  <div className="flex flex-col gap-6 w-80 h-72 bg-white  rounded-lg p-6">
    <strong className="text-lg">{title}:</strong>
    {text}
  </div>
);

export default function Home() {
  return (
    <Fragment>
      <section className="w-full h-full flex flex-col items-center gap-5 mx-auto p-10 md:pt-20 md:p-0 text-black text-center max-w-screen-limit">
        <h1 className="mx-auto md:mt-16 text-3xl font-semibold ">
          Construa Seu Site em Instantes com{" "}
          <span className="text-primary">INTELLIMAKER</span>
        </h1>
        <h2 className="text-xl">Sua Rota Rápida para o Mundo Online!</h2>
        <a
          className=" bg-primary hover:bg-primary_hover text-black font-semibold text-lg px-10 rounded-md uppercase mt-10 p-4"
          href="/api/auth/login"
        >
          Crie seu site agora!
        </a>
        <section className="bg-primary w-screen p-5 py-14 md:p-32 mt-10 md:mt-20">
          <div className="max-w-screen-limit m-auto">
            <h1 className="text-3xl font-semibold mb-16">
              Por que <span className="bold text-4xl">INTELLIMAKER ?</span>
            </h1>

            <div className="flex flex-wrap gap-5 justify-center">
              <Card
                title="Agilidade no Mercado"
                text="Lance seu site rapidamente e esteja online em tempo recorde. O
        Intellimaker simplifica o processo para você focar no que realmente
        importa - seu conteúdo e sua marca."
              />

              <Card
                title="Economia de Dinheiro"
                text="Esqueça custos elevados de desenvolvimento. Com o Intellimaker, você economiza em desenvolvedores caros, pagando apenas pelo que precisa."
              />

              <Card
                title="Poupe Tempo Valioso"
                text="Não desperdice horas preciosas aprendendo códigos complexos. Nosso assistente alimentado por IA faz o trabalho pesado para você, permitindo que você se concentre em construir, não em codificar."
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-center text-center">
          <h1 className="text-3xl font-semibold mt-4 md:mt-16">
            Tem alguma dúvida?
          </h1>
          <h2 className="text-xl mb-20 mt-4">Estamos aqui para te ajudar!</h2>
          <p className="mb-10 text-lg max-w-5xl">
            Nossa equipe de suporte está sempre pronta para ajudar. Desde o
            início até o lançamento e além, estamos comprometidos em garantir o
            seu sucesso online.
          </p>
          <a
            className="text-lg mb-10 bg-zinc-200 hover:bg-zinc-300 p-4 px-8 max-w-md m-auto rounded-md"
            href="mailto:natanerico@gmail.com"
          >
            Falar conosco
          </a>
          <Image
            src={"images/team_collaboration.svg"}
            alt="Uma cena composta por um quadro branco e um computador em cima de uma mesa, onde um homem e uma mulher analisam um gráfico no quadro e a outra mulher está sentada em cima da mesa ao lado, também observando o quadro"
            width={1000}
            height={1000}
          />
          <a
            className=" bg-primary hover:bg-primary_hover text-black font-semibold text-lg px-10 rounded-md uppercase mt-14 p-4 max-w-md m-auto"
            href="/api/auth/login"
          >
            Crie seu site agora!
          </a>
        </section>
      </section>
    </Fragment>
  );
}
