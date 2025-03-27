import { Readex_Pro as FontSans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-toploader";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";

import type { Metadata } from "next";

import "../styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://franamoroso.com/"),
  title: "FRAN Front-end Developer & Designer",
  description: "Hi! This is my Web-Portfolio, I hope you like it!",
  keywords: [
    "software development",
    "software",
    "web development",
    "mobile development",
    "digital transformation",
    "application development",
  ],
  authors: [{ name: "Franco Gabriel Amoroso" }],
  creator: "Franco Gabriel Amoroso",
  publisher: "Franco Gabriel Amoroso",
  applicationName: "My Web Portfolio 2.0",
  generator: "Next.js",
  //TODO: Add openGraph
  // openGraph: {
  //   images: '/og-image.png',
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* //TODO: remove this script */}
      <script
        src="https://unpkg.com/react-scan/dist/auto.global.js"
        async
      ></script>

      <meta property="og:url" content="https://franamoroso.com/" />
      <meta property="og:type" content="website" />
      <body
        className={cn(
          "text-sm min-h-screen text-whiteText relative font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextNProgress
          color="#e453bc"
          initialPosition={0.2}
          crawlSpeed={300}
          showSpinner={false}
          height={4}
        />
        <div className="absolute inset-0 bg-linear-to-br to-darkPrimary via-background from-darkGrey animate-gradient bg-[length:400%_400%] z-0" />
        <div className="relative flex flex-col min-h-screen w-full z-10">
          <SessionProvider>{children}</SessionProvider>
          <Toaster
            toastOptions={{
              classNames: {
                toast: "bg-background",
                title: "text-whiteText",
                success: "text-success",
                error: "text-error",
                warning: "text-warning",
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
