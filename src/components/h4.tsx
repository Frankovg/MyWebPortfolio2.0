import { cn } from '@/lib/utils'
import React from 'react'

function H4({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h4 className={cn('max-w-[920px] mx-auto pt-8 pb-16 text-2xl sm:text-5xl font-bold text-white', className)}>
      {children}
    </h4>
  )
}

export default H4