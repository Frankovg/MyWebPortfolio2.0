import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import UserDataContextProvider from "@/context/user-data-provider";
import { checkAuth } from "@/lib/check-auth";
import { getDownloadsContent } from "@/lib/server-utils-admin";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth();

  const downloads = await getDownloadsContent();

  return (
    <UserDataContextProvider data={{ userData: { downloads } }}>
      <div className="max-w-fa mx-auto w-full">
        <Navbar session={session} />
        {children}
      </div>
      <Footer />
    </UserDataContextProvider>
  );
}
