'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/a1.jpg',
  '/a2.jpg',
  '/a3.jpg',
  '/a4.jpg',
  '/a5.jpg',
  '/a6.jpg',
  '/a7.jpg',
  '/a8.jpg',
  '/a1.jpg',
  '/a2.jpg',
  '/a3.jpg',
  '/a4.jpg',
  '/a5.jpg',
  '/a6.jpg',
  '/a7.jpg',
  '/a8.jpg',
  '/a1.jpg',
  '/a1.jpg',
  '/a1.jpg',
  '/a1.jpg',
  '/a1.jpg',
  '/a1.jpg',
];

// Duplication pour effet de boucle sans saut
const duplicatedImages = [...images, ...images];

export default function InfiniteScrollCarousel() {
  return (
    <div className="overflow-hidden w-full  py-2">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }} // fluide vers la moitié
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear',
        }}
      >
        {duplicatedImages.map((src, idx) => (
          <div
            key={idx}
            className="relative w-[50px] h-[45px] bg-white mx-1 rounded-xl shadow-md flex items-center justify-center"
            style={{ flexShrink: 0 }}
          >
            <Image
              src={src}
              alt={`carousel-img-${idx}`}
              fill
              className="object-contain rounded-md"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}




///////////////////////////////////////////////////////

// 'use client';

// import { useEffect, useRef } from 'react';
// import Image from 'next/image';

// const images = [
//   '/a1.jpg',
//   '/a2.jpg',
//   '/a3.jpg',
//   '/a4.jpg',
//   '/a5.jpg',
//   '/a6.jpg',
//   '/a7.jpg',
  
  
// ]

// export default function InfiniteCarousel() {
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const requestRef = useRef<number>();

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     const scrollSpeed = 0.5;

//     const animate = () => {
//       if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
//         carousel.scrollLeft = 0;
//       } else {
//         carousel.scrollLeft += scrollSpeed;
//       }

//       requestRef.current = requestAnimationFrame(animate);
//     };

//     requestRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);
//     };
//   }, []);

//   return (
//     <div className="overflow-hidden w-full">
//       <div
//         ref={carouselRef}
//         className="flex w-max whitespace-nowrap"
//         style={{ scrollBehavior: 'auto' }}
//       >
//         {/* Double les images pour boucle fluide */}
//         {[...images, ...images].map((src, i) => (
//           <div
//             key={i}
//             className="min-w-[50px] min-h-[45px] mx-1 flex items-center justify-center"
//           >
//             <Image
//               src={src}
//               alt={`img-${i}`}
//               width={50}
//               height={45}
//               className="object-cover rounded"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


////////////////////////////////////////////////////////////////
// 'use client';


// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';



// const baseImages = [
//   '/a1.jpg',
//   '/a2.jpg',
//   '/a3.jpg',
//   '/a4.jpg',
//   '/a5.jpg',
//   '/a6.jpg',
//   '/a7.jpg',
//   '/a8.jpg',
// ];

// export default function InfiniteScrollCarousel() {
//   const [images, setImages] = useState<string[]>([]);

//   // Ajouter une image toutes les secondes
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setImages((prev) => [
//         ...prev,
//         baseImages[index % baseImages.length],
//       ]);
//       index++;
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="overflow-hidden w-full backdrop-blur-lg flex justify-center py-1">
//       <motion.div
//         className="flex w-max"
//         animate={{ x: ['0%', '-0%'] }}
//         transition={{
//           repeat: Infinity,
//           duration: 30,
//           ease: 'linear',
//         }}
//       >
//         <div className="flex">
//           {images.map((src, idx) => (
//             <div
//               key={idx}
//               className="relative w-[50px] h-[45px] mx-1 bg-white rounded shadow flex items-center justify-center"
//             >
//               <Image
//                 src={src}
//                 alt={`carousel-img-${idx}`}
//                 fill
//                 className="object-contain rounded"
//               />
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }




///////////////////////////////////////////////////////

// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const baseImages = [
//   '/a1.jpg',
//   '/a2.jpg',
//   '/a3.jpg',
//   '/a4.jpg',
//   '/a5.jpg',
//   '/a6.jpg',
//   '/a7.jpg',
//   '/a8.jpg',
// ];

// export default function InfiniteScrollCarousel() {
//   const [images, setImages] = useState<string[]>([]);

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setImages((prev) => [...prev, baseImages[index % baseImages.length]]);
//       index++;
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const waveVariants = {
//     initial: { x: 0 },
//     animate: (i: number) => ({
//       x: [0, 5, -5, 0],
//       transition: {
//         delay: i * 0.2, // effet de vague
//         duration: 2,
//         repeat: Infinity,
//         repeatType: 'loop',
//         ease: 'easeInOut',
//       },
//     }),
//   };

//   return (
//     <div className="overflow-hidden w-full backdrop-blur-lg flex justify-center py-2">
//       <div className="flex w-max">
//         {images.map((src, idx) => (
//           <motion.div
//             key={idx}
//             custom={idx}
//             variants={waveVariants}
//             initial="initial"
//             animate="animate"
//             className="relative w-[50px] h-[45px] mx-1 bg-white rounded shadow flex items-center justify-center"
//           >
//             <Image
//               src={src}
//               alt={`carousel-img-${idx}`}
//               fill
//               className="object-contain rounded"
//             />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }





///////////////////////////////////////////////

// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const baseImages = [
//   '/a1.jpg',
//   '/a2.jpg',
//   '/a3.jpg',
//   '/a4.jpg',
//   '/a5.jpg',
//   '/a6.jpg',
//   '/a7.jpg',
//   '/a8.jpg',
// ];

// export default function InfiniteScrollCarousel() {
//   const [images, setImages] = useState<string[]>([]);

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setImages((prev) => [...prev, baseImages[index % baseImages.length]]);
//       index++;
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Animation globale en séquence
//   const sequenceVariants = {
//     initial: { opacity: 0, scale: 0.9 },
//     animate: {
//       opacity: 1,
//       scale: [1, 1.05, 1],
//       rotate: [0, 1, -1, 0],
//       y: [0, -5, 0],
//       transition: {
//         duration: 8,
//         ease: 'easeInOut',
//         times: [0, 0.4, 0.6, 1],
//         repeat: Infinity,
//         repeatType: 'loop',
//       },
//     },
//   };

//   return (
//     <div className="overflow-hidden w-full backdrop-blur-lg flex justify-center py-2">
//       <motion.div
//         className="flex w-max"
//         variants={sequenceVariants}
//         initial="initial"
//         animate="animate"
//       >
//         {images.map((src, idx) => (
//           <div
//             key={idx}
//             className="relative w-[50px] h-[45px] mx-1 bg-white rounded shadow flex items-center justify-center"
//           >
//             <Image
//               src={src}
//               alt={`carousel-img-${idx}`}
//               fill
//               className="object-contain rounded"
//             />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }


/////////////////////////////////////////////////

// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const baseImages = [
//   '/a1.jpg',
//   '/a2.jpg',
//   '/a3.jpg',
//   '/a4.jpg',
//   '/a5.jpg',
//   '/a6.jpg',
//   '/a7.jpg',
//   '/a8.jpg',
// ];

// export default function InfiniteScrollCarousel() {
//   const [images, setImages] = useState<string[]>([]);
//   const [isWaveActive, setIsWaveActive] = useState(false);

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setImages((prev) => [...prev, baseImages[index % baseImages.length]]);
//       index++;
//     }, 1000);
    
//     // Activer l'animation "Wave" après 30 secondes
//     setTimeout(() => {
//       setIsWaveActive(true);
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   // Animation globale (pendant 30 secondes)
//   const globalVariants = {
//     initial: { opacity: 0, scale: 0.9 },
//     animate: {
//       opacity: 1,
//       scale: [1, 1.05, 1],
//       rotate: [0, 10, -10, 0],
//       y: [0, -5, 0],
//       transition: {
//         duration: 30,
//         ease: 'easeInOut',
//         times: [0, 0.4, 0.7, 1],
//       },
//     },

    
//   };

  // Animation Wave / Oscillation Horizontale après 30 secondes
  // const waveVariants = {
  //   initial: { x: 0 },
  //   animate: (i: number) => ({
  //     x: [0, 5, -5, 0],
  //     transition: {
  //       delay: i * 0.2, // effet de vague
  //       duration: 2,
  //       repeat: Infinity,
  //       repeatType: 'loop',
  //       ease: 'easeInOut',
  //     },
  //   }),
  // };

//   const sequenceVariants = {
//         initial: { opacity: 0, scale: 0.9 },
//         animate: {
//           opacity: 1,
//           scale: [1, 1.05, 1],
//           rotate: [0, 1, -1, 0],
//           y: [0, -5, 0],
//           transition: {
//             duration: 8,
//             ease: 'easeInOut',
//             times: [0, 0.4, 0.6, 1],
//             repeat: Infinity,
//             repeatType: 'loop',
//           },
//         },
//     };

//   return (
//     <div className="overflow-hidden w-full backdrop-blur-lg flex justify-center py-2">
//       <motion.div
//         className="flex w-max"
//         variants={globalVariants}
//         initial="initial"
//         animate="animate"
//       >
//         {images.map((src, idx) => (
//           <motion.div
//             key={idx}
//             custom={idx}
//             variants={isWaveActive ? sequenceVariants : {}}
//             initial="initial"
//             animate={isWaveActive ? "animate" : undefined}
//             className="relative w-[50px] h-[45px] mx-1 bg-white rounded shadow flex items-center justify-center"
//           >
//             <Image
//               src={src}
//               alt={`carousel-img-${idx}`}
//               fill
//               className="object-contain rounded"
//             />
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }



////////////////////////////////
// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';

// const images = [
//   '/a1.jpg',
//   '/a2.jpg',
//   '/a3.jpg',
//   '/a4.jpg',
//   '/a5.jpg',
//   '/a6.jpg',
//   '/a7.jpg',
//   '/a8.jpg',
// ];

// Duplication pour boucle parfaite
// const duplicatedImages = [...images, ...images];

// export default function InfiniteScrollCarousel() {
//   return (
//     <div className="overflow-hidden w-full bg-black py-2">
//       <motion.div
//         className="flex w-max"
//         animate={{ x: ['100%', '-50%'] }} // défile la moitié, car doublé
//         transition={{
//           repeat: Infinity,
//           duration: 20,
//           ease: 'linear',
//         }}
//       >
//         {duplicatedImages.map((src, idx) => (
//           <div
//             key={idx}
//             className="relative w-[50px] h-[45px] bg-white rounded-xl shadow-md flex items-center justify-center"
//             style={{ flexShrink: 0 }} // empêche le rétrécissement
//           >
//             <Image
//               src={src}
//               alt={`carousel-img-${idx}`}
//               fill
//               className="object-contain rounded-md"
//             />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }
