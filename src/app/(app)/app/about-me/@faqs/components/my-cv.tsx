'use client'

import Link from "next/link";

import { useUserDataContext } from "@/hooks/use-user-data-context";

const languageDictionary = {
  en: "English",
  es: "Spanish",
};

function MyCv() {
  const { downloads } = useUserDataContext();
  const parsedDownloads = downloads.filter((file) => file.isActive);

  return (
    <div className="px-2">
      <h4 className="font-semibold mb-2 text-lg">Download form Google Drive</h4>
      <ul className="space-y-1.5">
        {parsedDownloads.map((file) => (
          <li key={file.id}>
            <Link href={file.fileHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {`> ${file.name} - ${languageDictionary[file.language as keyof typeof languageDictionary]}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyCv
