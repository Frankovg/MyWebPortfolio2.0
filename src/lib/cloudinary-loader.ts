type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function cloudinaryLoader({ src, width, quality }: LoaderProps): string {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    const [base, rest] = src.split("/upload/");
    const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality ?? "auto"}`].join(",");
    return `${base}/upload/${params}/${rest}`;
  }

  // Local assets (/_next/static/media/*, /public/*): keep URL but encode width
  // so Next's loader contract is satisfied. The query is ignored by the file
  // server but lets the browser cache per variant naturally.
  if (src.startsWith("/")) {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${width}&q=${quality ?? 75}`;
  }

  return src;
}
