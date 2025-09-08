import React from 'react';

import { ProjectCardSkeleton } from '@/components/skeletons/project-card-skeleton';
import { TechCardSkeleton } from '@/components/skeletons/tech-card-skeleton';
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className='w-full h-auto px-5'>
      <section className="h-[50vh] pt-24">
        <div className="w-full flex flex-col items-center space-y-0 550:space-y-3">
          <Skeleton className='rounded-xl w-full max-w-[200px] h-4 mb-5 bg-softGrey' />
          <Skeleton className='rounded-xl w-full max-w-[550px] h-[150px] bg-textAnimation' />
          <div className='py-8 mb-3 w-full flex flex-col space-y-1.5 items-center'>
            <Skeleton className='rounded-xl w-full max-w-[800px] h-5 bg-softGrey' />
            <Skeleton className='rounded-xl w-full max-w-[720px] h-5 bg-softGrey' />
          </div>
          <Skeleton className='rounded-xl w-[200px] h-6 mb-3 bg-textAnimation' />
        </div>
      </section>

      <section className='pt-[15vh] px-4'>
        <Skeleton className='mx-auto rounded-xl w-full max-w-[300px] h-12 mt-8 mb-16 bg-textAnimation' />
        <div className='pb-8 w-full flex flex-col space-y-1.5 items-center'>
          <Skeleton className='rounded-xl w-full max-w-[500px] h-5 bg-softGrey' />
          <Skeleton className='rounded-xl w-full max-w-[450px] h-5 bg-softGrey' />
        </div>
        <div className="w-full max-w-5xl flex max-sm:flex-col mx-auto">
          <div className="max-sm:hidden w-full flex">
            <div
              className="max-sm:w-full w-1/2 930:w-3/5 px-12 grid grid-cols-3 sm:max-799:grid-cols-2 800:max-929:grid-cols-3 930:grid-cols-4 grid-rows-3 gap-8"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <TechCardSkeleton key={index} />
              ))}
            </div>
            <div className="max-sm:w-full w-1/2 930:w-2/5 flex flex-col">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className={`rounded-xl w-full h-14 bg-${index === 0 ? "textAnimation" : "softGrey"} mt-3 ml-1`} />
              ))}
            </div>
          </div>
          <div className="sm:hidden w-full flex justify-center px-5">
            {/* //TODO: Skeleton for mobile > techstack section */}
          </div>
        </div>
      </section>

      <section className='pt-[15vh] px-4'>
        <Skeleton className='mx-auto rounded-xl w-full max-w-[300px] h-12 mt-8 mb-16 bg-textAnimation' />
        <div className='pb-8 w-full flex flex-col space-y-1.5 items-center'>
          <Skeleton className='rounded-xl w-full max-w-[500px] h-5 bg-softGrey' />
          <Skeleton className='rounded-xl w-full max-w-[450px] h-5 bg-softGrey' />
        </div>
        <div className="items-center w-full flex flex-col lg:flex-row justify-around h-auto p-2 mb-8 lg:space-x-2 max-lg:space-y-1.5">
          <Skeleton className='rounded-xl w-full h-12 bg-textAnimation' />
          <Skeleton className='rounded-xl w-full h-12 bg-softGrey' />
          <Skeleton className='rounded-xl w-full h-12 bg-softGrey' />
        </div>
        <div className='m-0 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4'>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </section>

      <section className='pt-24 px-4'>
        <Skeleton className='mx-auto rounded-xl w-full max-w-[300px] h-12 mt-8 mb-16 bg-textAnimation' />
        <div className="w-full pb-24">
          <div className="max-w-contact mx-auto">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="space-y-1 w-full">
                  <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                  <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
                </div>
                <div className="space-y-1 w-full">
                  <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                  <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="space-y-1 w-full">
                  <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                  <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
                </div>
                <div className="space-y-1 w-full">
                  <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                  <Skeleton className='rounded-xl w-full h-10 bg-softGrey' />
                </div>
              </div>
              <div className="space-y-1">
                <Skeleton className='rounded-xl w-full max-w-[100px] h-2 bg-softGrey' />
                <Skeleton className='rounded-xl w-full h-36 bg-softGrey' />
                <Skeleton className='rounded-xl w-full max-w-[300px] h-2 bg-softGrey' />
              </div>
              <Skeleton className='rounded-xl w-full max-w-[150px] h-12 bg-textAnimation' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

