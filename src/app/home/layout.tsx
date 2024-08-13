type LayoutProps = {
  children: React.ReactNode,
  techStack: React.ReactNode
  projects: React.ReactNode
  contact: React.ReactNode
}

const Layout = ({ children, techStack, projects, contact }: LayoutProps) => {
  return (
    <main className='pt-[25vh] flex flex-col items-center w-full h-fit'>
      {children}
      {techStack}
      {projects}
      {contact}
    </main>
  )
}

export default Layout