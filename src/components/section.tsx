import { cn } from "@/lib/utils"

type SectionProps = {
  className?: string,
  id: string,
  children: React.ReactNode,
}

function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("flex flex-col items-center w-full px-4", className)}>
      {children}
    </section>
  )
}

export default Section