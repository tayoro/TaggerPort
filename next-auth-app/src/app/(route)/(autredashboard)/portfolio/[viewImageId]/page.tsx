

// "use client"

// import useModal from '@/app/hooks/useModal';
// import React from 'react'
// import { useFireBase } from '@/app/context/dataContext';
// import { notFound } from "next/navigation"; 
// import FormVideo from '@/components/FormVideo';
// import { DataType } from '@/app/Types/useTypes';
// import {useSession} from "next-auth/react"
// import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
// import { useRouter } from "next/navigation";
// import { MdDelete } from "react-icons/md";
// import { FaPen } from "react-icons/fa6";
// import FormPortfolio from '@/components/FormPortfolio';
// import { IoIosAddCircle } from 'react-icons/io'
// import FormImagePortfolio from '@/components/FormImagePortfolio';
// import { BsInfoLg } from "react-icons/bs";
// import Describ from '@/components/Describ';

// import useModalDescrib from '@/app/hooks/useModalDescrib';


// export default function ViewImage({params}: { 
//   params : {viewImageId: string;}

// }) {

//   const router = useRouter()
//   const {portfolios, deletePortfolio} = useFireBasePortfolio()
//   const {data: session} = useSession()
//   const {onOpen, openModal, onClose} = useModal()
//   const {openModalDescrib, onOpenDescrib, onCloseDescrib} = useModalDescrib()
  

  
//   //trie des elements
//   const listeElementSelectionner = []
//       for(let i=0; i < portfolios.length; i++){
//           if(portfolios?.[i]?.titre.replaceAll(" ", "-") === params.viewImageId){
//             listeElementSelectionner.push(portfolios?.[i])
//       }
//   }



//   return (
//     <div onContextMenu={(e:any) => e.preventDefault()} className='flex relative'>
//       <div className='absolute top-3 left-3 z-10'>
//         <div className='bg-white rounded-[50%] p-2 w-10 h-10 flex items-center justify-center'>{listeElementSelectionner.length} </div>
//       </div>
      
//       <div onClick={onOpenDescrib} className='lg:hidden z-10 absolute top-4 right-7 cursor-pointer'>
//             <div className='bg-black  border-[2px] text-white border-white rounded-[50%] p-2 w-8 h-8 flex items-center justify-center'><BsInfoLg className='w-4' /></div>
//       </div>

//       <div className='absolute left-2 bottom-3'>
//           { session && (<><IoIosAddCircle onClick={onOpen} className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer  relative z-[2] hover:scale-[1.2] ease-in duration-300"/></>)}
//       </div> 
      
//       <div className=' w-[100%]  lg:w-[70%] px-12 md:px-24 py-10 flex flex-col gap-7 overflow-hidden overflow-y-scroll h-screen ' >
//           <div className='bg-[#4f4f4f]'>
//           {portfolios.map((portfolio: any)=>(
//                   <div className='mt-0 '>
//                     {portfolio.titre.replaceAll(" ", "-") === params.viewImageId && (<>
//                       <div key={portfolio.id} className=' bg-[#4f4f4f]  relative  rounded-md w-[100%] h-[450px] mb-8  flex justify-center '>
//                           <img onContextMenu={(e) => e.preventDefault()} src={portfolio.image} className=' max-h-full hover:scale-[1.1] ease-in duration-300  cursor-pointer'  onClick={()=>{router.push(`${portfolio.titre.replaceAll(" ","-")}/image/${portfolio.numero}`)}}/>
//                           { session && (<MdDelete 
//                             className=' absolute top-0 right-0 text-red-600 text-[40px] bg-black rounded-md hover:scale-[1.1] cursor-pointer' 
//                             onClick={() => {
//                               var resultat = confirm("voulez-supprimer cette image ?")
//                               if(resultat === true ){
//                                   deletePortfolio(portfolio.id)
//                               }
//                             }} 
//                             />
//                           )}
//                       </div>
//                       <FormImagePortfolio  onClose={onClose} openModal={openModal} image={portfolio}/>
//                     </>
//                     )}
//                   </div>
//                 ))}

//           </div>
            
//       </div>
//       <div className='hidden lg:block lg:w-[30%]  bg-black text-white p-5 relative  '>
//             <h1 className='text-[30px] font-bold uppercase'> {listeElementSelectionner?.[0]?.titre?.charAt(0).toUpperCase()}{listeElementSelectionner?.[0]?.titre?.slice(1)} </h1>
//             <p>{listeElementSelectionner?.[0]?.desc?.charAt(0).toUpperCase()}{listeElementSelectionner?.[0]?.desc?.slice(1)}</p> 
//       </div>

//       <Describ describ={listeElementSelectionner} onCloseDescrib={onCloseDescrib} openModalDescrib={openModalDescrib} />

//     </div>
//   )
// }

// "use client"

// import useModal from '@/app/hooks/useModal';
// import React from 'react'
// import { useFireBase } from '@/app/context/dataContext';
// import { notFound } from "next/navigation"; 
// import FormVideo from '@/components/FormVideo';
// import { DataType } from '@/app/Types/useTypes';
// import {useSession} from "next-auth/react"
// import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
// import { useRouter } from "next/navigation";
// import { MdDelete } from "react-icons/md";
// import { FaPen } from "react-icons/fa6";
// import FormPortfolio from '@/components/FormPortfolio';
// import { IoIosAddCircle } from 'react-icons/io'
// import FormImagePortfolio from '@/components/FormImagePortfolio';
// import { BsInfoLg } from "react-icons/bs";
// import Describ from '@/components/Describ';

// import useModalDescrib from '@/app/hooks/useModalDescrib';


// import { useState } from 'react';

// export default function ViewImage({ params }: { params: { viewImageId: string } }) {
//   const router = useRouter();
//   const { portfolios, deletePortfolio } = useFireBasePortfolio();
//   const { data: session } = useSession();
//   const { onOpen, openModal, onClose } = useModal();
//   const { openModalDescrib, onOpenDescrib, onCloseDescrib } = useModalDescrib();

//   const listeElementSelectionner = portfolios.filter(
//     (item: any) => item?.titre.replaceAll(" ", "-") === params.viewImageId
//   );

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % listeElementSelectionner.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? listeElementSelectionner.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div onContextMenu={(e: any) => e.preventDefault()} className="flex relative h-screen">
//       {/* Info et ajout */}
//       <div className="absolute top-3 left-3 z-10">
//         <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
//           {listeElementSelectionner.length}
//         </div>
//       </div>

//       <div onClick={onOpenDescrib} className="lg:hidden z-10 absolute top-4 right-7 cursor-pointer">
//         <div className="bg-black border-2 text-white border-white rounded-full p-2 w-8 h-8 flex items-center justify-center">
//           <BsInfoLg className="w-4" />
//         </div>
//       </div>

//       <div className="absolute left-2 bottom-3">
//         {session && (
//           <IoIosAddCircle
//             onClick={onOpen}
//             className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer relative z-[2] hover:scale-110 transition-transform"
//           />
//         )}
//       </div>

//       {/* Carrousel */}
//       <div className="w-full lg:w-[70%] px-12 md:px-24 py-10 flex items-center justify-center overflow-hidden">
//         {listeElementSelectionner.length > 0 && (
//           <div className="relative w-full h-[450px] flex justify-center items-center bg-[#4f4f4f] rounded-md">
//             <img
//               src={listeElementSelectionner[currentIndex].image}
//               className="max-h-full max-w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
//               onClick={() =>
//                 router.push(`${listeElementSelectionner[currentIndex].titre.replaceAll(" ", "-")}/image/${listeElementSelectionner[currentIndex].numero}`)
//               }
//             />

//             {/* Navigation Buttons */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-0 text-white text-4xl px-4 py-2 bg-black/50 hover:bg-black/70 transition"
//             >
//               ‹
//             </button>
//             <button
//               onClick={nextSlide}
//               className="absolute right-0 text-white text-4xl px-4 py-2 bg-black/50 hover:bg-black/70 transition"
//             >
//               ›
//             </button>

//             {/* Supprimer */}
//             {session && (
//               <MdDelete
//                 className="absolute top-0 right-0 text-red-600 text-3xl bg-black rounded-md cursor-pointer hover:scale-110 transition"
//                 onClick={() => {
//                   const confirmDelete = confirm("Voulez-vous supprimer cette image ?");
//                   if (confirmDelete) {
//                     deletePortfolio(listeElementSelectionner[currentIndex].id);
//                   }
//                 }}
//               />
//             )}

//             {/* Formulaire modal */}
//             <FormImagePortfolio
//               onClose={onClose}
//               openModal={openModal}
//               image={listeElementSelectionner[currentIndex]}
//             />
//           </div>
//         )}
//       </div>

//       {/* Description bloc */}
//       <div className="hidden lg:block lg:w-[30%] bg-black text-white p-5 relative">
//         <h1 className="text-2xl font-bold uppercase">
//           {listeElementSelectionner?.[0]?.titre?.charAt(0).toUpperCase()}
//           {listeElementSelectionner?.[0]?.titre?.slice(1)}
//         </h1>
//         <p>
//           {listeElementSelectionner?.[0]?.desc?.charAt(0).toUpperCase()}
//           {listeElementSelectionner?.[0]?.desc?.slice(1)}
//         </p>
//       </div>

//       <Describ
//         describ={listeElementSelectionner}
//         onCloseDescrib={onCloseDescrib}
//         openModalDescrib={openModalDescrib}
//       />
//     </div>
//   );
// }


"use client"

import React, { useState } from 'react';
import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from 'react-icons/io';
import { BsInfoLg } from "react-icons/bs";
import { useSession } from "next-auth/react";

import useModal from '@/app/hooks/useModal';
import useModalDescrib from '@/app/hooks/useModalDescrib';

import FormImagePortfolio from '@/components/FormImagePortfolio';
import Describ from '@/components/Describ';

export default function ViewImage({ params }: { params: { viewImageId: string } }) {
  const router = useRouter();
  const { portfolios, deletePortfolio } = useFireBasePortfolio();
  const { data: session } = useSession();
  const { onOpen, openModal, onClose } = useModal();
  const { openModalDescrib, onOpenDescrib, onCloseDescrib } = useModalDescrib();

  const listeElementSelectionner = portfolios.filter(
    (item: any) => item?.titre?.replaceAll(" ", "-") === params.viewImageId
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listeElementSelectionner.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? listeElementSelectionner.length - 1 : prevIndex - 1
    );
  };

  if (listeElementSelectionner.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Aucune image trouvée pour cet identifiant.</p>
      </div>
    );
  }

  const currentImage = listeElementSelectionner[currentIndex];

  return (
    <div onContextMenu={(e: any) => e.preventDefault()} className="flex relative h-screen">
      {/* Badge de compteur */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
          {listeElementSelectionner.length}
        </div>
      </div>

      {/* Bouton info mobile */}
      <div onClick={onOpenDescrib} className="lg:hidden z-10 absolute top-4 right-7 cursor-pointer">
        <div className="bg-black border-2 text-white border-white rounded-full p-2 w-8 h-8 flex items-center justify-center">
          <BsInfoLg className="w-4" />
        </div>
      </div>

      {/* Bouton ajout image */}
      <div className="absolute left-2 bottom-3">
        {session && (
          <IoIosAddCircle
            onClick={onOpen}
            className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer relative z-[2] hover:scale-110 transition-transform"
            title="Ajouter une image"
          />
        )}
      </div>

      {/* Carrousel */}
      <div className="w-full lg:w-[70%] px-12 md:px-24 py-10 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-[450px] flex justify-center items-center bg-[#4f4f4f] rounded-md">
          <img
            src={currentImage.image}
            alt={currentImage.titre}
            className="max-h-full max-w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() =>
              router.push(`${currentImage.titre.replaceAll(" ", "-")}/image/${currentImage.numero}`)
            }
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 text-white text-4xl px-4 py-2 bg-black/50 hover:bg-black/70 transition select-none"
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 text-white text-4xl px-4 py-2 bg-black/50 hover:bg-black/70 transition select-none"
            aria-label="Image suivante"
          >
            ›
          </button>

          {/* Supprimer */}
          {session && (
            <MdDelete
              className="absolute top-0 right-0 text-red-600 text-3xl bg-black rounded-md cursor-pointer hover:scale-110 transition"
              onClick={() => {
                if (confirm("Voulez-vous supprimer cette image ?")) {
                  deletePortfolio(currentImage.id);
                }
              }}
              title="Supprimer cette image"
            />
          )}

          {/* Formulaire modal */}
          <FormImagePortfolio
            onClose={onClose}
            openModal={openModal}
            image={currentImage}
          />
        </div>
      </div>

      {/* Bloc description (desktop) */}
      <div className="hidden lg:block lg:w-[30%] bg-black text-white p-5 relative overflow-y-auto">
        <h1 className="text-2xl font-bold uppercase mb-2">
          {currentImage.titre.charAt(0).toUpperCase() + currentImage.titre.slice(1)}
        </h1>
        <p>
          {currentImage.desc
            ? currentImage.desc.charAt(0).toUpperCase() + currentImage.desc.slice(1)
            : "Pas de description disponible."}
        </p>
      </div>

      {/* Modal Description */}
      <Describ
        describ={listeElementSelectionner}
        onCloseDescrib={onCloseDescrib}
        openModalDescrib={openModalDescrib}
      />
    </div>
  );
}
