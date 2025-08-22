"use client";

import Image from "next/image";
import Link from "next/link";

import { useUserDataContext } from "@/hooks/use-user-data-context";

function DownloadLinks() {
  const { downloads } = useUserDataContext();

  //TODO: Hardcoded filter per language. This should be change when i18n is implemented
  const parsedDownloads = downloads.filter((file) => file.isActive && file.language === "en");

  return (
    <div className="flex flex-col gap-4 items-center w-max h-auto p-4">
      {parsedDownloads.map((download) => (
        <Link
          href={download.fileHref || "#"}
          target="_blank"
          className="group relative overflow-hidden flex max-w-[400px] items-center"
          key={download.name}
        >
          <div className="w-2/5">
            <Image
              src={download.imageUrl}
              alt={download.name}
              width={200}
              height={133}
              className="w-[200px] h-[133px] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms] animate-shiny" />
          </div>
          <div className="w-3/5 px-5">
            <h4 className="text-lg font-semibold group-hover:underline">{download.name}</h4>
            <p className="text-md text-muted-foreground">{download.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DownloadLinks;
