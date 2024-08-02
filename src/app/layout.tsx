import type { Metadata } from "next";
import { Readex_Pro as FontSans } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "FranAmoroso - Front End Developer & Designer",
  description: "Hi! This is my Web-Portfolio, I hope you like it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("text-sm min-h-screen text-white relative font-sans antialiased", fontSans.variable)}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-zinc-950 animate-gradient bg-[length:400%_400%]">
          {children}
        </div>
      </body>
    </html>
  );
}
