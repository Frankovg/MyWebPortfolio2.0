import { cn } from "@/lib/utils"

function BannerContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn('w-full h-[35vh] md:h-auto pb-14', className)}>{children}</div>
}

export default BannerContainer