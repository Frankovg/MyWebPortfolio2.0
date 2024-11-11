import Contact from "@/components/contact/page"
import Main from "@/components/main"

type LayoutProps = {
  children: React.ReactNode,
  techStack: React.ReactNode
  projects: React.ReactNode
}

const Layout = ({ children, techStack, projects }: LayoutProps) => {
  return (
    <Main className='pt-[25vh]'>
      {children}
      {techStack}
      {projects}
      <Contact />
    </Main>
  )
}

export default Layout