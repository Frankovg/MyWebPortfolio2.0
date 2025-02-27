import React from 'react'

import Logo from '@/components/logo'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-col gap-y-5 justify-center items-center min-h-screen'>
      <Logo />
      {children}
    </main>
  )
}

export default Layout
