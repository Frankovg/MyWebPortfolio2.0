"use client";

import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ImageWithFallback from "@/components/primitives/image-with-fallback";
import { Spinner } from "@/components/primitives/spinner";
import { ProjectCarouselSkeleton } from "@/components/skeletons/project-carousel-skeleton";
import { type CarouselApi, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FALLBACK_IMG } from "@/lib/client-constants";

import CarouselThumbnail from "./carousel-thumbnail";
import CarouselViewer from "./carousel-viewer";
import ExpanderButton from "./expander-button";

import type { Gallery } from "@/generated/prisma/client";

type ProjectCarouselProps = {
  images: Gallery[];
};

function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>(undefined);
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>(undefined);

  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogImageLoading, setDialogImageLoading] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!mainApi) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      mainApi.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      mainApi.scrollNext();
    }
  }, [mainApi]);

  // Show carousel when main API is ready AND first image has loaded
  useEffect(() => {
    if (!mainApi || !firstImageLoaded) return;

    setIsLoading(false);
    setCurrent(0);
    mainApi.scrollTo(0);
  }, [mainApi, firstImageLoaded]);

  // Sync between main and thumbnail carousels when both are ready
  useEffect(() => {
    if (!mainApi || !thumbnailApi) return;

    thumbnailApi.scrollTo(0);

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApi.scrollTo(selected);
    };
    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap();
      setCurrent(selected);
      mainApi.scrollTo(selected);
    };

    mainApi.on("select", handleTopSelect);
    thumbnailApi.on("select", handleBottomSelect);

    return () => {
      mainApi.off("select", handleTopSelect);
      thumbnailApi.off("select", handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setDialogImageLoading(true);
  }, [current]);

  const handleClick = (index: number) => {
    setCurrent(index);
    mainApi?.scrollTo(index);
    thumbnailApi?.scrollTo(index);
  };

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem key={index}>
          <ImageWithFallback
            className="object-cover md:object-contain bg-softGrey rounded-lg size-full max-h-[80vh]"
            src={image.imageUrl}
            fallbackSrc={FALLBACK_IMG}
            alt={`Carousel Main Image ${index + 1}`}
            width={0}
            height={0}
            sizes={"100%"}
            quality={50}
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={index === 0 ? () => setFirstImageLoaded(true) : undefined}
          />
        </CarouselItem>
      )),
    [images]
  );

  const thumbnailImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="basis-1/4 hover:cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <ImageWithFallback
            className={`${index === current && "border-2"} w-full h-full object-contain rounded-lg transition-none`}
            src={image.imageUrl}
            fallbackSrc={FALLBACK_IMG}
            alt={`Carousel Thumbnail Image ${index + 1}`}
            width={0}
            height={0}
            sizes={"100%"}
            quality={50}
          />
        </CarouselItem>
      )),
    [images, current]
  );

  return (
    <>
      {isLoading && <ProjectCarouselSkeleton />}
      <Dialog>
        <div
          ref={carouselContainerRef}
          tabIndex={0}
          className={`relative w-full focus:outline-none ${isLoading ? 'hidden' : ''}`}
        >
          <DialogTrigger asChild>
            <ExpanderButton onClick={() => console.warn("Open image")} />
          </DialogTrigger>
          <CarouselViewer images={mainImage} setMainApi={setMainApi} />
          <CarouselThumbnail
            images={thumbnailImages}
            setThumbnailApi={setThumbnailApi}
          />
        </div>

        <DialogContent className="max-w-full h-full max-h-screen grid-cols-none grid-rows-none flex flex-col">
          <DialogTitle className="max-w-1000"></DialogTitle>
          <DialogDescription className="max-w-1000">{images[current].description}</DialogDescription>
          <div className="w-full h-full relative">
            {dialogImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-softGrey/50">
                <Spinner size="lg" className="text-white" />
              </div>
            )}
            <Image
              src={images[current].imageUrl}
              alt={images[current].alt}
              className="w-auto h-full object-contain mx-auto"
              width={0}
              height={0}
              sizes={"100%"}
              quality={60}
              onLoadStart={() => setDialogImageLoading(true)}
              onLoad={() => setDialogImageLoading(false)}
              onError={() => setDialogImageLoading(false)}
              preload
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectCarousel;
