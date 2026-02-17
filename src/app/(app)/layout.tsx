import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { checkAuth } from "@/lib/check-auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth();

  return (
    <>
      <a
        href="#main-content"
        className="absolute -left-full top-auto h-px w-px overflow-hidden z-100 focus:fixed focus:top-4 focus:left-4 focus:h-auto focus:w-auto focus:px-6 focus:py-3 focus:bg-primary focus:text-background focus:font-semibold focus:rounded"
      >
        Skip to main content
      </a>
      <div className="max-w-fa mx-auto w-full">
        <Navbar session={session} />
        <div id="main-content">{children}</div>
      </div>
      <Footer />
    </>
  );
}
