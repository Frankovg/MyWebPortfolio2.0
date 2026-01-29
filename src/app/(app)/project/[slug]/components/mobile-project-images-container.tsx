"use client"

import Image from "next/image"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"

import type { Gallery } from "@/generated/prisma/client"

type ProjectImagesContainerProps = {
  images: Gallery[]
}

function MobileProjectImagesContainer({ images }: ProjectImagesContainerProps) {
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null)

  return (
    <>
      <div className="w-full h-auto flex flex-col gap-12">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedImage(image)}
              className="w-full cursor-zoom-in"
              aria-label={`View ${image.alt || 'image'} fullscreen`}
            >
              <Image
                src={image.imageUrl}
                alt={image.alt || 'Project image'}
                className="w-full h-full object-contain"
                width={0}
                height={0}
                sizes={'100%'}
                quality={40}
              />
            </button>
            <p className="text-left">{image.description}</p>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogPortal>
          <DialogOverlay className="bg-black/95" />
          <DialogContent
            className="fixed inset-0 z-50 flex items-center justify-center border-none bg-transparent p-0 max-w-none w-full h-full translate-x-0 translate-y-0 left-0 top-0"
            aria-describedby={undefined}
          >
            <DialogTitle className="sr-only">
              {selectedImage?.alt || 'Project image'} - Fullscreen view
            </DialogTitle>

            {selectedImage && (
              <div
                className="w-full h-full overflow-auto touch-pinch-zoom"
                style={{ touchAction: 'pinch-zoom pan-x pan-y' }}
              >
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.alt || 'Project image'}
                  className="w-full h-auto object-contain min-h-full"
                  width={0}
                  height={0}
                  sizes="100vw"
                  quality={90}
                  priority
                />
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default MobileProjectImagesContainer
