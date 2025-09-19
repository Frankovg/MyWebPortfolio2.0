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

    const isOnHomePage = pathname === '/app/home' || pathname === '/'

    if (isOnHomePage) {
      const element = document.getElementById(id)
      if (!!element && id !== 'home') {
        element.scrollIntoView({ behavior: 'smooth' })
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      const targetUrl = id === 'home' ? '/app/home' : `/app/home#${id}`
      router.push(targetUrl)
    }

    !!onClick && onClick()
  }

  const href = id === 'home' ? '/app/home' : `/app/home#${id}`

  return (
    <Link href={href} className={className} passHref>
      <button title='Scroll button' type='button' onClick={handleClick}>{children}</button>
    </Link>
  )
}

export default ScrollLink
