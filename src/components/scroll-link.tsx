'use client'

import Link from 'next/link'

type ScrollLinkProps = {
  id: string,
  children: React.ReactNode,
  className?: string,
  onClick?: VoidFunction,
}

function ScrollLink({ id, children, className = '', onClick }: ScrollLinkProps) {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (!!element && id !== 'home') {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    !!onClick && onClick()
  }

  return (
    <Link href={id} className={className} passHref>
      <button title='Scroll button' type='button' onClick={handleClick}>{children}</button>
    </Link>
  )
}

export default ScrollLink