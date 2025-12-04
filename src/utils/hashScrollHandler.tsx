'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function HashScrollHandler() {
  const pathname = usePathname()
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    if (pathname !== '/home' && pathname !== '/') return

    // Reset the scroll flag when pathname changes
    hasScrolledRef.current = false

    const scrollToHash = (hash: string) => {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return true
      }
      return false
    }

    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      // Try immediately
      if (scrollToHash(hash)) {
        hasScrolledRef.current = true
        return
      }

      // If element not found, wait for DOM to be ready with retries
      let attempts = 0
      const maxAttempts = 10
      const retryInterval = 100

      const attemptScroll = () => {
        attempts++
        if (scrollToHash(hash)) {
          hasScrolledRef.current = true
          return
        }
        if (attempts < maxAttempts) {
          setTimeout(attemptScroll, retryInterval)
        }
      }

      setTimeout(attemptScroll, retryInterval)
    }

    // Initial scroll on mount/pathname change
    handleHashScroll()

    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [pathname])

  return null
}
