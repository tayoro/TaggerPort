
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import monImg from "@/app/assets/monImg.jpg";
import deuxiemeImg from '@/app/assets/deuxiemeImg.jpeg';
import troisiemeImg from '@/app/assets/troisiemeImg.jpeg';

const images = [monImg, deuxiemeImg, troisiemeImg];

export default function SmoothInfiniteCarousel() {
  const [current, setCurrent] = useState(1); // Initial image index (1 to start from second image)
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false); // Added state for load animation
  const delay = 7000;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Images array with cloned first and last images to create the infinite loop effect
  const fullImages = [images[images.length - 1], ...images, images[0]];

  // Function to go to the next image
  const goNext = () => {
    setCurrent((prev) => prev + 1);
  };

  // Function to go to the previous image
  const goPrev = () => {
    setCurrent((prev) => prev - 1);
  };

  // Handle the transition and jump when reaching the clone images
  const handleTransitionEnd = () => {
    if (current === fullImages.length - 1) {
      setTransitionEnabled(false);
      setCurrent(1); // Jump to real first image
    } else if (current === 0) {
      setTransitionEnabled(false);
      setCurrent(images.length); // Jump to real last image
    }
  };

  // Re-enable transition after clone jump
  useEffect(() => {
    if (!transitionEnabled) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(true);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  // Auto slide functionality
  useEffect(() => {
    if (!transitionEnabled) return;

    timeoutRef.current = setTimeout(goNext, delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, transitionEnabled]);

  // Effect to control the load animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true); // Trigger load animation after a short delay
    }, 500); // Add some delay before the carrousel starts to grow

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div 
      className={`relative w-[350px] h-[350px] overflow-hidden rounded-full group 
        ${isLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} 
        transition-all duration-1000 ease-in-out`}>
      
      <div
        className={`flex ${transitionEnabled ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{
          transform: `translateX(-${current * 100}%)`, // Adjust for the image index position
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {fullImages.map((img, index) => (
          <div key={index} className="w-[350px] h-[350px] flex-shrink-0">
            <Image
              onContextMenu={(e) => e.preventDefault()} // Disable right-click
              src={img}
              width={350}
              height={350}
              alt={`image-${index}`}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Invisible clickable areas to navigate */}
      <div
        onClick={goPrev}
        className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
        aria-label="Previous"
      />
      <div
        onClick={goNext}
        className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
        aria-label="Next"
      />
    </div>
  );
}




// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import monImg from "@/app/assets/monImg.jpg";
// import deuxiemeImg from '@/app/assets/deuxiemeImg.jpeg';
// import troisiemeImg from '@/app/assets/troisiemeImg.jpeg';

// const images = [monImg, deuxiemeImg, troisiemeImg];

// export default function SmoothInfiniteCarousel() {
//   const [current, setCurrent] = useState(1);
//   const [transitionEnabled, setTransitionEnabled] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const delay = 7000;
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Le tableau fullImages contient les images avant et après pour créer l'effet infini
//   const fullImages = [images[images.length - 1], ...images, images[0]];

//   const goNext = () => {
//     // Transition vers l'image suivante
//     if (current === images.length) {
//       // Réinitialisation à la première image réelle
//       setCurrent(1);
//     } else {
//       setCurrent(prev => prev + 1);
//     }
//   };

//   const goPrev = () => {
//     // Transition vers l'image précédente
//     if (current === 0) {
//       // Réinitialisation à la dernière image réelle
//       setCurrent(images.length - 1);
//     } else {
//       setCurrent(prev => prev - 1);
//     }
//   };

//   const handleTransitionEnd = () => {
//     // Lorsqu'on atteint la dernière image ou la première, réinitialisation de l'index
//     if (current === fullImages.length - 1) {
//       setTransitionEnabled(false);
//       setCurrent(1);  // Aller à la deuxième image réelle
//     } else if (current === 0) {
//       setTransitionEnabled(false);
//       setCurrent(images.length);  // Aller à la dernière image réelle
//     }
//   };

//   useEffect(() => {
//     // Attente pour démarrer la transition après un court délai
//     const timeout = setTimeout(() => {
//       setTransitionEnabled(true);
//       setImageLoaded(true);
//     }, 100);  // Délai pour lancer la transition

//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     // Si la transition est activée, démarre la fonction goNext après un délai
//     if (!transitionEnabled) return;

//     timeoutRef.current = setTimeout(goNext, delay);
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [current, transitionEnabled]);

//   return (
//     <div className="relative w-[350px] h-[350px] overflow-hidden rounded-full group animate-[scaleIn_0.5s_ease-out_forwards]">
//       <style jsx>{`
//         @keyframes scaleIn {
//           0% {
//             transform: scale(0);
//             opacity: 0;
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         .image-enter {
//           animation: scaleIn 0.7s ease-out forwards;
//         }
//       `}</style>

//       <div
//         className={`flex ${transitionEnabled ? 'transition-transform duration-700 ease-in-out' : ''}`}
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         {fullImages.map((img, index) => (
//           <div key={index} className="w-[350px] h-[350px] flex-shrink-0">
//             <Image
//               onContextMenu={(e) => e.preventDefault()}
//               src={img}
//               width={350}
//               height={350}
//               alt={`image-${index}`}
//               className={`rounded-full object-cover w-full h-full ${imageLoaded ? 'image-enter' : 'opacity-0'}`} // Transition d'entrée pour l'image
//               placeholder="blur" // Le flou au chargement
//               blurDataURL={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='350' viewBox='0 0 350 350'%3E%3Crect width='350' height='350' fill='%23f0f0f0' /%3E%3C/svg%3E`}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Bouton Précédent */}
//       <div
//         onClick={goPrev}
//         className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Previous"
//       />

//       {/* Bouton Suivant */}
//       <div
//         onClick={goNext}
//         className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Next"
//       />
//     </div>
//   );
// }







// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import monImg from "@/app/assets/monImg.jpg";
// import deuxiemeImg from '@/app/assets/deuxiemeImg.jpeg';
// import troisiemeImg from '@/app/assets/troisiemeImg.jpeg';

// const images = [monImg, deuxiemeImg, troisiemeImg];

// export default function SmoothInfiniteCarousel() {
//   const [current, setCurrent] = useState(1);
//   const [transitionEnabled, setTransitionEnabled] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const delay = 7000;
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fullImages = [images[images.length - 1], ...images, images[0]];

//   const goNext = () => {
//     setCurrent((prev) => prev + 1);
//   };

//   const goPrev = () => {
//     setCurrent((prev) => prev - 1);
//   };

//   const handleTransitionEnd = () => {
//     if (current === fullImages.length - 1) {
//       setTransitionEnabled(false);
//       setCurrent(1);
//     } else if (current === 0) {
//       setTransitionEnabled(false);
//       setCurrent(images.length);
//     }
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setTransitionEnabled(true);
//       setImageLoaded(true);
//     }, 100);
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     if (!transitionEnabled) return;

//     timeoutRef.current = setTimeout(goNext, delay);
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [current, transitionEnabled]);

//   return (
//     <div className="relative w-[350px] h-[350px] overflow-hidden rounded-full group animate-[scaleIn_0.5s_ease-out_forwards]">
//       <style jsx>{`
//         @keyframes scaleIn {
//           0% {
//             transform: scale(0);
//             opacity: 0;
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         .image-enter {
//           animation: scaleIn 0.7s ease-out forwards;
//         }
//       `}</style>

//       <div
//         className={`flex ${transitionEnabled ? 'transition-transform duration-700 ease-in-out' : ''}`}
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         {fullImages.map((img, index) => (
//           <div key={index} className="w-[350px] h-[350px] flex-shrink-0">
//             <Image
//               onContextMenu={(e) => e.preventDefault()}
//               src={img}
//               width={350}
//               height={350}
//               alt={`image-${index}`}
//               className={`rounded-full object-cover w-full h-full ${imageLoaded ? 'image-enter' : 'opacity-0'}`} // Image de transition
//               placeholder="blur" // Active le flou
//               blurDataURL={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='350' viewBox='0 0 350 350'%3E%3Crect width='350' height='350' fill='%23f0f0f0' /%3E%3C/svg%3E`} // SVG de remplissage flou
//             />
//           </div>
//         ))}
//       </div>

//       <div
//         onClick={goPrev}
//         className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Previous"
//       />
//       <div
//         onClick={goNext}
//         className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Next"
//       />
//     </div>
//   );
// }




// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import monImg from "@/app/assets/monImg.jpg";
// import deuxiemeImg from '@/app/assets/deuxiemeImg.jpeg';
// import troisiemeImg from '@/app/assets/troisiemeImg.jpeg';

// const images = [monImg, deuxiemeImg, troisiemeImg];

// export default function SmoothInfiniteCarousel() {
//   const [current, setCurrent] = useState(1);
//   const [transitionEnabled, setTransitionEnabled] = useState(false); // Initialement false
//   const [imageLoaded, setImageLoaded] = useState(false); // État pour gérer le chargement de l'image
//   const delay = 7000;
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fullImages = [images[images.length - 1], ...images, images[0]];

//   const goNext = () => {
//     setCurrent((prev) => prev + 1);
//   };

//   const goPrev = () => {
//     setCurrent((prev) => prev - 1);
//   };

//   const handleTransitionEnd = () => {
//     if (current === fullImages.length - 1) {
//       setTransitionEnabled(false);
//       setCurrent(1);
//     } else if (current === 0) {
//       setTransitionEnabled(false);
//       setCurrent(images.length);
//     }
//   };

//   useEffect(() => {
//     // Attendre quelques millisecondes avant de commencer la transition après le montage
//     const timeout = setTimeout(() => {
//       setTransitionEnabled(true); // Démarre la transition après le délai
//       setImageLoaded(true); // Afficher l'image après le délai
//     }, 100); // Délai pour démarrer la transition après le montage de la page
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     if (!transitionEnabled) return;

//     timeoutRef.current = setTimeout(goNext, delay);
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [current, transitionEnabled]);

//   return (
//     <div className="relative w-[350px] h-[350px] overflow-hidden rounded-full group animate-[scaleIn_0.5s_ease-out_forwards]">
//       <style jsx>{`
//         @keyframes scaleIn {
//           0% {
//             transform: scale(0);
//             opacity: 0;
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         .image-enter {
//           animation: scaleIn 0.7s ease-out forwards;
//         }
//       `}</style>

//       <div
//         className={`flex ${transitionEnabled ? 'transition-transform duration-700 ease-in-out' : ''}`}
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         {fullImages.map((img, index) => (
//           <div key={index} className="w-[350px] h-[350px] flex-shrink-0">
//             <Image
//               onContextMenu={(e) => e.preventDefault()}
//               src={img}
//               width={350}
//               height={350}
//               alt={`image-${index}`}
//               className={`rounded-full object-cover w-full h-full ${imageLoaded ? 'image-enter' : 'opacity-0'}`} // Masquer jusqu'à ce que l'image soit prête
//             />
//           </div>
//         ))}
//       </div>

//       <div
//         onClick={goPrev}
//         className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Previous"
//       />
//       <div
//         onClick={goNext}
//         className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Next"
//       />
//     </div>
//   );
// }













// l'original caroussel

// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import monImg from "@/app/assets/monImg.jpg";
// import deuxiemeImg from '@/app/assets/deuxiemeImg.jpeg';
// import troisiemeImg from '@/app/assets/troisiemeImg.jpeg';

// const images = [monImg, deuxiemeImg, troisiemeImg];

// export default function SmoothInfiniteCarousel() {
//   const [current, setCurrent] = useState(1);
//   const [transitionEnabled, setTransitionEnabled] = useState(true);
//   const delay = 7000;
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fullImages = [images[images.length - 1], ...images, images[0]];

//   const goNext = () => {
//     setCurrent((prev) => prev + 1);
//   };

//   const goPrev = () => {
//     setCurrent((prev) => prev - 1);
//   };

//   // Transition control after clone jump
//   const handleTransitionEnd = () => {
//     if (current === fullImages.length - 1) {
//       setTransitionEnabled(false);
//       setCurrent(1); // jump to real first image
//     } else if (current === 0) {
//       setTransitionEnabled(false);
//       setCurrent(images.length); // jump to real last image
//     }
//   };

//   // Re-enable transition right after "jump"
//   useEffect(() => {
//     if (!transitionEnabled) {
//       const timeout = setTimeout(() => {
//         setTransitionEnabled(true);
//       }, 20);
//       return () => clearTimeout(timeout);
//     }
//   }, [transitionEnabled]);

//   // Auto slide
//   useEffect(() => {
//     if (!transitionEnabled) return;

//     timeoutRef.current = setTimeout(goNext, delay);
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [current, transitionEnabled]);

//   return (
//     <div className="relative w-[350px] h-[350px] overflow-hidden rounded-full group">
//       <div
//         className={`flex ${transitionEnabled ? 'transition-transform duration-700 ease-in-out' : ''}`}
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         {fullImages.map((img, index) => (
//           <div key={index} className="w-[350px] h-[350px] flex-shrink-0">
//             <Image
//               onContextMenu={(e) => e.preventDefault()}
//               src={img}
//               width={350}
//               height={350}
//               alt={`image-${index}`}
//               className="rounded-full object-cover w-full h-full"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Zones invisibles de clic */}
//       <div
//         onClick={goPrev}
//         className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Previous"
//       />
//       <div
//         onClick={goNext}
//         className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
//         aria-label="Next"
//       />
//     </div>
//   );
// }




// voici mon code // carousselle pour la photo de profile 

// on va l’améliorer pour qu’il soit invisible à l’œil.

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import monImg from "@/app/assets/monImg.jpg";
// import deuxiemeImg from '@/app/assets/deuxiemeImg.jpeg';
// import troisiemeImg from '@/app/assets/troisiemeImg.jpeg';


// const images = [monImg, deuxiemeImg, troisiemeImg];

// export default function MouseCarousel() {
//   const [current, setCurrent] = useState(0);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const containerRef = useRef(null);
//   const delay = 3000;

//   // Automatic sliding
//   const resetTimeout = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   useEffect(() => {
//     resetTimeout();
//     timeoutRef.current = setTimeout(() => {
//       goNext();
//     }, delay);

//     return () => {
//       resetTimeout();
//     };
//   }, [current]);

//   const goNext = () => {
//     setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const goPrev = () => {
//     setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   // Mouse movement logic
//   const handleMouseMove = (e: React.MouseEvent) => {
//     const boundingBox = (containerRef.current as any).getBoundingClientRect();
//     const mouseX = e.clientX - boundingBox.left;
//     const width = boundingBox.width;

//     if (mouseX < width / 2) {
//       goPrev();
//     } else {
//       goNext();
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="w-[350px] h-[350px] overflow-hidden relative cursor-pointer rounded-full "
//     >
//       <div
//         className="flex transition-transform duration-1000 "
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {images.map((img, index) => (
//           <div key={index} className="w-[350px] h-[350px] flex-shrink-0">
//             <Image
//               onContextMenu={(e) => e.preventDefault()}
//               src={img}
//               width={350}
//               height={350}
//               alt={`image-${index}`}
//               className="rounded-full object-cover w-full h-full "
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }