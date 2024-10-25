import { cn } from "@/lib/utils"

function Main({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <main className={cn('pt-48 flex flex-col items-center w-full h-fit', className)}>
      {children}
    </main>
  )
}

export default Main