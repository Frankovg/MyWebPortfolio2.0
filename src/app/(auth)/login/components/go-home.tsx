import { HomeIcon } from "lucide-react"
import Link from "next/link";

export const GoHome = () => {
  return (
    <Link
      href="/"
      className="absolute bottom-10 border w-auto h-fit rounded-full p-3 transition-all duration-200 ease-in hover:scale-[1.05] hover:border-white hover:text-white"
    >
      <HomeIcon />
    </Link>
  )
}
