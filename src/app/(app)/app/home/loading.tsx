import React from 'react';

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className='w-screen h-auto px-5'>
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
    </div>
  );
}

