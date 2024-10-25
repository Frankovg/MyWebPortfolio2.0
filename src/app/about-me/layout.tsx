import Main from "@/components/main"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Main>
      {children}
    </Main>
  )
}

export default Layout