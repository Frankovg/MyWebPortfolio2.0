import { Gallery } from "@prisma/client"
import Image from "next/image"

type ProjectImagesContainerProps = {
  images: Gallery[]
}

function MobileProjectImagesContainer({ images }: ProjectImagesContainerProps) {
  return (
    <div className="w-full h-auto flex flex-col gap-12" >
      {images.map((image) => (
        <div className="flex flex-col items-center gap-2">
          <Image
            src={image.imageUrl}
            alt={`Main Image ${'name'}`}
            className="w-full h-full object-contain"
            width={0}
            height={0}
            sizes={'100%'}
            quality={40}
          />
          <p className="text-center">Una description de la foto</p>
        </div>
      ))}
    </div>
  )
}

export default MobileProjectImagesContainer