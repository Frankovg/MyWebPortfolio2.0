import type { Metadata } from "next";
import { Readex_Pro as FontSans } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "FRAN Front-end Developer & Designer",
  description: "Hi! This is my Web-Portfolio, I hope you like it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("text-sm min-h-screen text-whiteText relative font-sans antialiased", fontSans.variable)}>
        <div className="absolute inset-0 bg-gradient-to-br to-darkPrimary via-background from-darkGrey animate-gradient bg-[length:400%_400%] z-0" />
        <div className="relative flex flex-col mx-auto min-h-screen w-full max-w-[1320px] z-10">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
