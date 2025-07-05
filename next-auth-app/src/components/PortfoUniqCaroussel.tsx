// components/Carousel.tsx
'use client';

import { useState } from 'react';
//import { ChevronLeft, ChevronRight } from 'lucide-react'; // icônes jolies
import Image from 'next/image';

interface CarouselProps {
  images: any;
}

export default function Carousel({ images }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <div className="flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
         
        </button>

        {images.length > 0 && (
        <Image
            src={images}
            alt={`Image ${current + 1}`}
            width={600}
            height={400}
            className="rounded-xl"
        />
        )}

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
         
        </button>
      </div>
    </div>
  );
}
