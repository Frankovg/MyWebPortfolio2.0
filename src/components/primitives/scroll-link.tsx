'use client'

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

  const href = id === 'home' ? '/home' : `/home#${id}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const isOnHomePage = pathname === '/home' || pathname === '/'

    if (isOnHomePage) {
      const element = document.getElementById(id)
      if (element && id !== 'home') {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      const targetUrl = id === 'home' ? '/home' : `/home#${id}`
      router.push(targetUrl)
    }

    onClick?.()
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={`Scroll to ${id}`}
    >
      {children}
    </a>
  )
}

export default ScrollLink
