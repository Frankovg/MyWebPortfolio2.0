'use client'

import { useUserDataContext } from "@/hooks/useUserDataContext"
import { Li, TItem } from "./footer"
import { useMemo } from "react"

function DownloadLinksFooter() {
  const { downloads } = useUserDataContext()

  let _downloads = useMemo(() => {
    const links: TItem[] = [
      {
        title: 'Downloads'
      },
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
        <Li index={index} item={download} key={index} />
      ))}
    </>
  )
}

export default DownloadLinksFooter