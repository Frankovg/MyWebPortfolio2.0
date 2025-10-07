import { Download } from "@prisma/client";
import { FileDown } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DownloadFiles = ({ downloads }: { downloads: Download[] }) => {
  return (
    <Card className="border-darkPrimary border-2 rounded-md w-full h-full">
      <CardHeader>
        <CardTitle>Files available for download</CardTitle>
        <CardDescription>
          These files are available for download for everyone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center items-start gap-3 1170:pl-4">
          {downloads?.map((file) => (
            <Link
              href={file.fileHref || "#"}
              key={file.id} className="p-2 flex items-center justify-start gap-4 h-fit w-full hover:bg-softGrey rounded-md"
            >
              <div className="flex items-center justify-center py-2 px-1 bg-primary rounded-md">
                <FileDown size={42} className="stroke-background " />
              </div>
              <span className="text-white">{file.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
