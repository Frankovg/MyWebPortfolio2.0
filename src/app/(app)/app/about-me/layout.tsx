import Contact from "@/app/(app)/app/home/@contact/page"
import Main from "@/components/main"

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