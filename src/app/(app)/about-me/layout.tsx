import Main from "@/components/main"

import Contact from "../home/@contact/page"

type LayoutProps = {
  children: React.ReactNode,
  faqs: React.ReactNode
}

const Layout = ({ children, faqs }: LayoutProps) => {
  return (
    <Main>
      {children}
      {faqs}
      <Contact />
    </Main>
  )
}

export default Layout
