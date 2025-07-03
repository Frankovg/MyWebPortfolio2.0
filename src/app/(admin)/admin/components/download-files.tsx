import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "@prisma/client";
import { FileDown } from "lucide-react";

export const DownloadFiles = ({ downloads }: { downloads: Download[] }) => {
  return (
    <Card className="border-darkPrimary border-2 rounded-md w-full">
      <CardHeader>
        <CardTitle>Files available for download</CardTitle>
        <CardDescription>
          These files are available for download for everyone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center items-center gap-8">
          {downloads?.map((file) => (
            <div key={file.id}>
              <div className="flex items-center justify-center py-2 px-1 bg-primary rounded-md">
                <FileDown size={42} className="stroke-background " />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
