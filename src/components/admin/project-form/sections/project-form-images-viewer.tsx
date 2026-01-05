import ImageWithFallback from "@/components/primitives/image-with-fallback";
import { isValidImageUrl } from "@/lib/constants";

export const ProjectFormImagesViewer = ({
  imageUrl,
  imageAlt,
  index,
}: {
  imageUrl?: string;
  imageAlt?: string;
  index: number;
}) => {
  if (!isValidImageUrl(imageUrl)) {
    return (
      <div
        key={index}
        className="aspect-video max-sm:w-full sm:min-w-42 border border-darkPrimary flex items-center justify-center"
      />
    );
  }

  return (
    <div className="aspect-video w-full sm:w-42">
      <ImageWithFallback
        src={imageUrl as string}
        alt={imageAlt || "This is a meta description of the picture."}
        className="w-full h-full object-cover"
        width={0}
        height={0}
        sizes={"100%"}
        quality={40}
        fallbackSrc="/images/error-placeholder.svg"
      />
    </div>
  );
};
