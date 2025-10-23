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
      <div className="max-w-fa mx-auto w-full">
        <Navbar session={session} />
        {children}
      </div>
      <Footer />
    </>
  );
}
