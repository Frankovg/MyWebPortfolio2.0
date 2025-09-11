import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

import H3 from "./primitives/h3";

export function CustomGlobalError({ description, href, label }: { description: string, href: string, label: string }) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <TriangleAlertIcon size={170} />
        <H3 className="text-3xl font-semibold text-warning">{description}</H3>
        <p className="text-3xl font-bold">
          The link might be corrupted.
        </p>
        <p className="text-lg">or the page may have been removed</p>
        <div className="my-10">
          <Link
            href={href}
            className="uppercase p-3 border border-white rounded-sm"
          >
            {label}
          </Link>
        </div>
      </div>
    </div>
  )
}
