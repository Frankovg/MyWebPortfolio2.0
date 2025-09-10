'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/app/home' && pathname !== '/') return

    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }

    handleHashScroll()

    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [pathname])

  return null
}
