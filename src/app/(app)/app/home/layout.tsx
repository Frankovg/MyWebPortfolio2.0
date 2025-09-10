import Main from "@/components/main"
import HashScrollHandler from "@/components/hash-scroll-handler"

type LayoutProps = {
  children: React.ReactNode,
  techStack: React.ReactNode
  projects: React.ReactNode
  contact: React.ReactNode
}

const Layout = ({ children, techStack, projects, contact }: LayoutProps) => {
  return (
    <Main className='pt-[25vh]'>
      <HashScrollHandler />
      {children}
      {techStack}
      {projects}
      {contact}
    </Main>
  )
}

export default Layout
