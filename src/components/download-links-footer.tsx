"use client";

import { useMemo } from "react";

import { LANGUAGE_DICTIONARY } from "@/lib/constants";
import { useDownloadsStore } from "@/stores/use-downloads-store";

type TItem = {
  name?: string;
  href?: string;
  title?: string;
  language?: string;
};

function DownloadLinksFooter() {
  const downloads = useDownloadsStore((state) => state.downloads);

  let _downloads = useMemo(() => {
    const parsedDownloads = downloads.filter((file) => file.isActive).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    const links: TItem[] = [
      ...parsedDownloads.map((download) => ({
        name: download.name,
        href: download.fileHref,
        language: download.language
      })),
    ];
    return links;
  }, [downloads]);

  return (
    <>
      {_downloads.map((download, index) => (
        <li className="max-sm:text-center" key={index}>
          <a
            href={download.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal hover:text-white max-sm:text-lg"
          >
            {`${download.name} - ${LANGUAGE_DICTIONARY[download.language as keyof typeof LANGUAGE_DICTIONARY]}`}
          </a>
        </li>
      ))}
    </>
  );
}

export default DownloadLinksFooter;
