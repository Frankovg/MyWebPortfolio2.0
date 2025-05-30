"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useUserDataContext } from "@/hooks/use-user-data-context";

type TItem = {
  name?: string;
  href?: string;
  title?: string;
};

function DownloadLinksFooter() {
  const { downloads } = useUserDataContext();

  let _downloads = useMemo(() => {
    const links: TItem[] = [
      ...downloads.map((download) => ({
        name: download.name,
        href: download.fileHref,
      })),
    ];
    return links;
  }, [downloads]);

  return (
    <>
      {_downloads.map((download, index) => (
        <li className="max-sm:text-center" key={index}>
          <Link
            href={download.href || "#"}
            className="font-normal hover:text-white max-sm:text-lg"
          >
            {download.name || ""}
          </Link>
        </li>
      ))}
    </>
  );
}

export default DownloadLinksFooter;
