import { FileText } from "lucide-react";

export default function PdfCard({ fileName }: { fileName: string }) {
  return (
    <div className="flex flex-col items-center justify-center size-full bg-muted gap-1">
      <FileText className="size-8 text-muted-foreground" />
      <span className="text-xs text-muted-foreground truncate max-w-full px-2">
        {fileName}
      </span>
    </div>
  )
}
