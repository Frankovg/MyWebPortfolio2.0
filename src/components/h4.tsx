import React from 'react'

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="max-w-[920px] mx-auto py-8 text-5xl font-bold text-white">
      {children}
    </h4>
  )
}

export default H4