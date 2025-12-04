'use client'

import { useUserDataContext } from "@/hooks/use-user-data-context";
import { LANGUAGE_DICTIONARY } from "@/lib/constants";

function MyCv() {
  const { downloads } = useUserDataContext();

  if (!downloads) throw new Error("Error fetching downloads")

  const parsedDownloads = downloads.filter((file) => file.isActive);

  return (
    <div className="px-2">
      <h4 className="font-semibold mb-2 text-lg">Download form Google Drive</h4>
      <ul className="space-y-1.5">
        {parsedDownloads.map((file) => (
          <li key={file.id}>
            <a
              href={file.fileHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {`> ${file.name} - ${LANGUAGE_DICTIONARY[file.language as keyof typeof LANGUAGE_DICTIONARY]}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyCv
