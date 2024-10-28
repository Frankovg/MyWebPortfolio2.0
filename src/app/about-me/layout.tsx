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
    </Main>
  )
}

export default Layout