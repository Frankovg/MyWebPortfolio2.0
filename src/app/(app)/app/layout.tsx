//Components
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

//Images
import downloadCv from '/public/download-cv.webp'
import downloadPortfolio from '/public/download-portfolio.webp'

//Utils
import { checkAuth, getProjects } from "@/lib/server-utils"

//Context
import ProjectContextProvider from "@/context/project-provider"
import UserDataContextProvider from "@/context/user-data-provider"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth()
  console.log(session);

  const projectData = await getProjects()

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
      <div className="max-w-[1320px] mx-auto w-full">
        <Navbar />
        <ProjectContextProvider data={projectData}>
          {children}
        </ProjectContextProvider>
      </div>
      <Footer />
    </UserDataContextProvider>
  )
}
