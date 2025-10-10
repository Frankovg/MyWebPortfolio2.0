"use client";

import { Gallery } from "@prisma/client";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ImageWithFallback from "@/components/primitives/image-with-fallback";
import { ProjectCarouselSkeleton } from "@/components/skeletons/project-carousel-skeleton";
import { CarouselApi, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FALLBACK_IMG } from "@/lib/client-constants";

import CarouselThumbnail from "./carousel-thumbnail";
import CarouselViewer from "./carousel-viewer";
import ExpanderButton from "./expander-button";

type ProjectCarouselProps = {
  images: Gallery[];
};

function ProjectCarousel({ images }: ProjectCarouselProps) {
  const mainApiRef = useRef<CarouselApi>(null);
  const thumbnailApiRef = useRef<CarouselApi>(null);

  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const setMainApi = useCallback((api: CarouselApi) => {
    mainApiRef.current = api;
    if (api && thumbnailApiRef.current) {
      setIsLoading(false);
    }
  }, []);

  const setThumbnailApi = useCallback((api: CarouselApi) => {
    thumbnailApiRef.current = api;
    if (api && mainApiRef.current) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!mainApiRef.current || !thumbnailApiRef.current) {
      return;
    }

    setCurrent(0);
    mainApiRef.current.scrollTo(0);
    thumbnailApiRef.current.scrollTo(0);

    const handleTopSelect = () => {
      const selected = mainApiRef.current!.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApiRef.current!.scrollTo(selected);
    };
    const handleBottomSelect = () => {
      const selected = thumbnailApiRef.current!.selectedScrollSnap();
      setCurrent(selected);
      mainApiRef.current!.scrollTo(selected);
    };

    mainApiRef.current.on("select", handleTopSelect);
    thumbnailApiRef.current.on("select", handleBottomSelect);

    return () => {
      mainApiRef.current?.off("select", handleTopSelect);
      thumbnailApiRef.current?.off("select", handleBottomSelect);
    };
  }, []);

  const handleClick = (index: number) => {
    setCurrent(index);
    mainApiRef.current?.scrollTo(index);
    thumbnailApiRef.current?.scrollTo(index);
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
            className={`${index === current && "border-2"
              } w-full h-full object-contain rounded-lg`}
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
        <div className={`relative w-full ${isLoading ? 'hidden' : ''}`}>
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
          <DialogTitle className="max-w-[1000px]"></DialogTitle>
          <DialogDescription className="max-w-[1000px]">{images[current].description}</DialogDescription>
          <div className="w-full h-full">
            <Image
              src={images[current].imageUrl}
              alt={images[current].alt}
              className="w-auto h-full object-contain mx-auto"
              width={0}
              height={0}
              sizes={"100%"}
              quality={60}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectCarousel;
