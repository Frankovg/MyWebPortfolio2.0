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
  // TODO: Use session to show the logged user
  const session = await checkAuth()
  console.log(session);

  const projectData = await getProjects()

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
        <ProjectContextProvider data={projectData}>
          {children}
        </ProjectContextProvider>
      </div>
      <Footer />
    </UserDataContextProvider>
  )
}
