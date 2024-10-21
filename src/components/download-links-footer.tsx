'use client'

import { useUserDataContext } from "@/hooks/useUserDataContext"
import { TItem } from "./footer"
import { useMemo } from "react"
import Link from "next/link"

function DownloadLinksFooter() {
  const { downloads } = useUserDataContext()

  let _downloads = useMemo(() => {
    const links: TItem[] = [
      ...downloads.map((download) => ({
        name: download.name,
        href: download.href,
      }))
    ]
    return links
  }, [downloads])

  return (
    <>
      {_downloads.map((download, index) => (
        <li className="max-sm:text-center" key={index}>
          <Link href={download.href || '#'} className="font-normal hover:text-white max-sm:text-lg" >
            {download.name || ''}
          </Link>
        </li>
      ))}
    </>
  )
}

export default DownloadLinksFooter