"use client"

// une seul image a partir de son numero

import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
import { CardContainer } from '@/components/Card3D';

export default function Review({params}: { params : {
    viewImageId: string;
    imageId: string;
}}) {


    const {portfolios} = useFireBasePortfolio()
    //trie des elements
    const listeElementSelectionner =[]
    for(let i=0; i < portfolios.length; i++){
        if(portfolios?.[i]?.titre.replaceAll(" ", "-") === params.viewImageId){
            listeElementSelectionner.push(portfolios?.[i])
    }
}

    return (
            <div onContextMenu={(e:any) => e.preventDefault()} className=' bg-[#484747] flex items-center justify-center h-screen'>
                {listeElementSelectionner.map((image)=>(
                        <div key={image.id}>
                            {image.numero == params.imageId && (<>
                                    <div className='rounded-md w-[100%] flex justify-center h-screen  bg-[#484747]  py-6 '>
                                        <img onContextMenu={(e) => e.preventDefault()} src={image.image}  className=''/>
                                    </div>
                                </>
                                )
                            }
                        </div>
                        )
                    )
                } 
            </div>
    );
}




//////////////////////////////////////////////////////////////////////////////////////////////////////

// une seul image a partir de son numero

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
// import Carousel from '@/components/PortfoUniqCaroussel';


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

      
      
//       <div className=' w-[100%]  px-12 md:px-24 py-10 flex flex-col gap-7 overflow-hidden overflow-y-scroll h-screen ' >
//           <div className='bg-[#4f4f4f]'>
//           {portfolios.map((portfolio: any)=>(
//                   <div className='mt-0 '>
//                     {portfolio.titre.replaceAll(" ", "-") === params.viewImageId && (<>
//                       {/* <div key={portfolio.id} className='rounded-md w-[100%] flex justify-center h-screen  bg-[#484747]  py-6 '>
//                           <img onContextMenu={(e) => e.preventDefault()} src={portfolio.image} />
//                       </div>  */}

//                                <Carousel images={portfolio.image}/>

//                       <FormImagePortfolio  onClose={onClose} openModal={openModal} image={portfolio}/>
//                     </>
//                     )}
//                   </div>
//                 ))}

//           </div>
            
//       </div>

//     </div>
//   )
// }




