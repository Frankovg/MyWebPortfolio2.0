import Main from "@/components/main"

import Contact from "../home/@contact/page"

type LayoutProps = {
  children: React.ReactNode,
  experience: React.ReactNode
  faqs: React.ReactNode
}

const Layout = ({ children, experience, faqs }: LayoutProps) => {
  return (
    <Main>
      {children}
      {experience}
      {faqs}
      <Contact />
    </Main>
  )
}

export default Layout
