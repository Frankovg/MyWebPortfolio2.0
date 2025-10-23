import { Gallery } from "@prisma/client"
import Image from "next/image"

type ProjectImagesContainerProps = {
  images: Gallery[]
}

//TODO: Full image for mobile > onCLick over the image

function MobileProjectImagesContainer({ images }: ProjectImagesContainerProps) {
  return (
    <div className="w-full h-auto flex flex-col gap-12" >
      {images.map((image) => (
        <div key={image.id} className="flex flex-col items-center gap-2">
          <Image
            src={image.imageUrl}
            alt={image.alt || 'Project image'}
            className="w-full h-full object-contain"
            width={0}
            height={0}
            sizes={'100%'}
            quality={40}
          />
          <p className="text-left">{image.description}</p>
        </div>
      ))}
    </div>
  )
}

export default MobileProjectImagesContainer
