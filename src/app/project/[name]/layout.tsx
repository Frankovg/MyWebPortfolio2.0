type LayoutProps = {
  children: React.ReactNode,

}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='pt-[25vh] flex flex-col items-center w-full h-fit'>
      {children}
    </main>
  )
}

export default Layout