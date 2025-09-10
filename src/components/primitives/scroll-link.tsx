'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

type ScrollLinkProps = {
  id: string,
  children: React.ReactNode,
  className?: string,
  onClick?: VoidFunction,
}

function ScrollLink({ id, children, className = '', onClick }: ScrollLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Check if we're on the home page
    const isOnHomePage = pathname === '/app/home' || pathname === '/'

    if (isOnHomePage) {
      // If on home page, scroll directly to the element
      const element = document.getElementById(id)
      if (!!element && id !== 'home') {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // If on a different page, navigate to home page with hash
      const targetUrl = id === 'home' ? '/app/home' : `/app/home#${id}`
      router.push(targetUrl)
    }

    !!onClick && onClick()
  }

  return (
    <Link href={id === 'home' ? '/app/home' : `/app/home#${id}`} className={className} passHref>
      <button title='Scroll button' type='button' onClick={handleClick}>{children}</button>
    </Link>
  )
}

export default ScrollLink
