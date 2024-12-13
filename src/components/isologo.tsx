import Link from "next/link"
import Image from "next/image"
import isologo from "../../public/isologo.svg"

export default function Isologo() {
  return (
    <Link href='/' >
      <Image src={isologo} alt='Franco Amoroso Web Portfolio isologo' className="w-full max-w-max h-auto" priority />
    </Link>
  )
}