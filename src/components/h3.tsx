import React from 'react'

import { cn } from '@/lib/utils'

function H3({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h3 className={cn("max-w-[920px] mx-auto py-8 text-base text-center", className)}>
      {children}
    </h3>
  )
}

export default H3