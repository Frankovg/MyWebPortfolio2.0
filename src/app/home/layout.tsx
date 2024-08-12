const Layout = ({ children, techStack }: { children: React.ReactNode, techStack: React.ReactNode; }) => {
  return (
    <div className=''>
      <div>
        {children}
      </div>
      <div>
        {techStack}
      </div>
    </div>
  )
}

export default Layout