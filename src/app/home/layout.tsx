const Layout = ({ children, techStack }: { children: React.ReactNode, techStack: React.ReactNode; }) => {
  return (
    <main className='pt-[25vh] flex flex-col items-center w-full h-fit'>
      {children}
      {techStack}
    </main>
  )
}

export default Layout