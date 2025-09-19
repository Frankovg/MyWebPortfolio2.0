import Main from "@/components/main"

type LayoutProps = {
  children: React.ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Main>
      {children}
    </Main>
  )
}

export default Layout
