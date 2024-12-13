import Link from "next/link"
import Image from "next/image"
import logo from "../../public/logo.svg"

export default function Logo() {
  return (
    <Link href='/' >
      <Image src={logo} alt='Franco Amoroso Web Portfolio logo' className="w-full max-w-logo h-auto" priority />
    </Link>
  )
}