'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Only handle hash scrolling on the home page
    if (pathname !== '/app/home' && pathname !== '/') return

    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        // Small delay to ensure the page content is rendered
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }

    // Handle initial load with hash
    handleHashScroll()

    // Handle hash changes (back/forward navigation)
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [pathname])

  return null
}
