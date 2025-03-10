import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import UserDataContextProvider from "@/context/user-data-provider"
import { checkAuth } from "@/lib/check-auth"
import downloadCv from '@/public/download-cv.webp'
import downloadPortfolio from '@/public/download-portfolio.webp'


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth()

  //TODO: Downloads should come from the DB
  const userData = {
    downloads: [
      {
        name: "Curriculum Vitae",
        href: process.env.DOWNLOAD_CV,
        img: downloadCv
      },
      {
        name: "Portfolio",
        href: process.env.DOWNLOAD_PORTFOLIO,
        img: downloadPortfolio
      },
    ]
  }

  return (
    <UserDataContextProvider data={userData}>
      <div className="max-w-fa mx-auto w-full">
        <Navbar session={session} />
        {children}
      </div>
      <Footer />
    </UserDataContextProvider>
  )
}
