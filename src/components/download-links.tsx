"use client";

import Image from "next/image";

import { useDownloadsStore } from "@/stores/use-downloads-store";

function DownloadLinks() {
  const downloads = useDownloadsStore((state) => state.downloads);

  const parsedDownloads = downloads.filter((file) => file.isActive && file.language === "en").reverse().slice(0, 2);

  return (
    <div className="flex max-sm:flex-wrap gap-4 items-center max-sm:justify-end w-full sm:w-max h-auto p-4">
      {parsedDownloads.map((download, index) => (
        <a
          href={download.fileHref || "#"}
          target="_blank"
          className="group relative overflow-hidden flex max-w-[400px] items-center"
          key={index}
        >
          <div className="max-lg:w-full w-2/5">
            <Image
              src={download.imageUrl}
              alt={download.name}
              width={200}
              height={133}
              className="w-34 h-24 sm:w-[200px] sm:h-[133px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-2000 animate-shiny" />
          </div>
          <div className="w-3/5 px-5 max-lg:hidden">
            <h4 className="text-lg font-semibold group-hover:underline">{download.name}</h4>
            <p className="text-md text-muted-foreground">{download.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default DownloadLinks;
