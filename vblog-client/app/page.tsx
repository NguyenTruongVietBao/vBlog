import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function HomePage() {
  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-6 grid-rows-9 gap-4'>
        <div className='col-span-4 row-span-4 col-start-1 row-start-2 bg-amber-50'>
          <Carousel className='w-full max-w-2xl mx-auto'>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Card>
                      <CardContent className='flex aspect-video items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className='col-span-2 row-span-4 col-start-5 row-start-2 bg-amber-100'>
          3
        </div>
        <div className='col-span-6 col-start-1 row-start-6 bg-amber-200'>4</div>
        <div className='col-span-2 row-span-3 col-start-1 row-start-7 bg-amber-300'>
          5
        </div>
        <div className='col-span-2 row-span-3 col-start-3 row-start-7 bg-amber-400'>
          6
        </div>
        <div className='col-span-2 row-span-3 col-start-5 row-start-7 bg-amber-500'>
          7
        </div>
        <div className='col-span-6 col-start-1 row-start-1 bg-amber-600'>8</div>
      </div>
    </div>
  );
}
