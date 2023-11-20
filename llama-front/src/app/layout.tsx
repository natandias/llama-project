import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InteliMaker",
  description: "Build your websites using the power of AI",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <UserProvider>
        <body
          className={`${inter.className} flex min-h-screen flex-col items-center font-poppins bg-white overflow-x-hidden`}
        >
          {children}
          <footer className="bg-primary w-screen ml-0 py-10 mt-20">
            <div className="flex flex-wrap justify-center max-w-screen-limit m-auto">
              <Image
                alt="Intelimaker Logo"
                src="/android-chrome-192x192.png"
                className="ml-4 rounded-md mb-12 md:mb-0"
                width={200}
                height={200}
              />
              <div className="flex flex-row justify-center max-w-screen-limit m-auto md:mr-0">
                <section className="flex flex-col justify-center items-center flex-wrap gap-5 w-72">
                  <h1 className="text-lg">Produto</h1>
                  <h1 className="text-lg">Quem somos</h1>
                  <p className="text-xl mt-10 ">Intellimaker - 2023</p>
                </section>
              </div>
            </div>
          </footer>
        </body>
      </UserProvider>
    </html>
  );
}
