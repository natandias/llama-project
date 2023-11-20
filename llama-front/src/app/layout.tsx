import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ['latin'] })

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
          className={`${inter.className} flex min-h-screen flex-col items-center`}
        >
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
