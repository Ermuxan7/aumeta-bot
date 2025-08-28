import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import TabBar from "./components/tab-bar/TabBar";
import ThemeProvider from "./providers/ThemeProvider";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aumeta",
  description: "Aumeta web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${robotoSans.variable} ${robotoMono.variable} `}>
        <ThemeProvider />
        <TabBar />
        <div className="mt-6">{children}</div>
      </body>
    </html>
  );
}
