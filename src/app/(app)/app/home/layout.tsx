import Main from "@/components/main"

type LayoutProps = {
  children: React.ReactNode,
  techStack: React.ReactNode
  projects: React.ReactNode
  contact: React.ReactNode
}

const Layout = ({ children, techStack, projects, contact }: LayoutProps) => {
  return (
    <Main className='pt-[25vh]'>
      {children}
      {techStack}
      {projects}
      {contact}
    </Main>
  )
}

export default Layout
