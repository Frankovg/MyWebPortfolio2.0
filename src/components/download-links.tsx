"use client";

import Image from "next/image";
import Link from "next/link";

import { useUserDataContext } from "@/hooks/use-user-data-context";

function DownloadLinks() {
  const { downloads } = useUserDataContext();

  const parsedDownloads = downloads.filter((file) => file.isActive);

  return (
    <>
      {parsedDownloads.map((download) => (
        <Link
          href={download.fileHref || "#"}
          target="_blank"
          className="group relative overflow-hidden"
          key={download.name}
        >
          <Image
            src={download.imageUrl}
            alt={download.name}
            width={200}
            height={133}
            className="w-[200px] h-[133px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms] animate-shiny"></div>
        </Link>
      ))}
    </>
  );
}

export default DownloadLinks;
