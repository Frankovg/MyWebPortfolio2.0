import Main from "@/components/main"

import Contact from "../home/@contact/page"

type LayoutProps = {
  children: React.ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Main>
      {children}
      <Contact />
    </Main>
  )
}

export default Layout
