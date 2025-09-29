import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { LocaleProvider } from "../providers/LocaleProvider";
import QueryProvider from "../providers/QueryProvider";
import ThemeProvider from "../providers/ThemeProvider";
import TabBar from "./components/tab-bar/TabBar";
import "./globals.css";

import Script from "next/script";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"]
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Aumeta",
  description: "Aumeta web app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${robotoSans.variable} ${robotoMono.variable} `}>
        <QueryProvider>
          <LocaleProvider>
            <ThemeProvider />
            <TabBar />
            {/* <TelegramAuth /> */}

            <div className="mt-5 sm:mt-8">{children}</div>
          </LocaleProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
