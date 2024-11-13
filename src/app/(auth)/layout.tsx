import Logo from '@/components/logo'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-col gap-y-5 justify-center items-center min-h-screen'>
      <Logo />
      {children}
    </main>
  )
}

export default Layout
