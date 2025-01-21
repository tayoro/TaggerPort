

"use client"

import useModal from '@/app/hooks/useModal';
import React from 'react'
import { useFireBase } from '@/app/context/dataContext';
import { notFound } from "next/navigation"; 
import FormVideo from '@/components/FormVideo';
import { DataType } from '@/app/Types/useTypes';
import {useSession} from "next-auth/react"
import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import FormPortfolio from '@/components/FormPortfolio';
import { IoIosAddCircle } from 'react-icons/io'
import FormImagePortfolio from '@/components/FormImagePortfolio';
import { BsInfoLg } from "react-icons/bs";
import Describ from '@/components/Describ';

import useModalDescrib from '@/app/hooks/useModalDescrib';


export default function ViewImage({params}: { 
  params : {viewImageId: string;}

}) {

  const router = useRouter()
  const {portfolios, deletePortfolio} = useFireBasePortfolio()
  const {data: session} = useSession()
  const {onOpen, openModal, onClose} = useModal()
  const {openModalDescrib, onOpenDescrib, onCloseDescrib} = useModalDescrib()
  

  
  //trie des elements
  const listeElementSelectionner = []
      for(let i=0; i < portfolios.length; i++){
          if(portfolios?.[i]?.titre.replaceAll(" ", "-") === params.viewImageId){
            listeElementSelectionner.push(portfolios?.[i])
      }
  }



  return (
    <div className='flex relative'>
      <div className='absolute top-3 left-3 z-10'>
        <div className='bg-white rounded-[50%] p-2 w-10 h-10 flex items-center justify-center'>{listeElementSelectionner.length} </div>
      </div>
      
      <div onClick={onOpenDescrib} className='lg:hidden z-10 absolute top-4 right-7 cursor-pointer'>
            <div className='bg-black  border-[2px] text-white border-white rounded-[50%] p-2 w-8 h-8 flex items-center justify-center'><BsInfoLg className='w-4' /></div>
      </div>

      <div className='absolute left-2 bottom-3'>
          { session && (<><IoIosAddCircle onClick={onOpen} className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer  relative z-[2] hover:scale-[1.2] ease-in duration-300"/></>)}
      </div> 
      
      <div className=' w-[100%]  lg:w-[70%] px-12 md:px-24 py-10 flex flex-col gap-7 overflow-hidden overflow-y-scroll h-screen ' >
          <div className=''>
          {portfolios.map((portfolio: any)=>(
                  <div className='mt-0'>
                    {portfolio.titre.replaceAll(" ", "-") === params.viewImageId && (<>
                      <div key={portfolio.id} className='  relative  rounded-md w-[100%] h-[450px] mb-8 hover:scale-[1.1] ease-in duration-300 cursor-pointer '>
                          <img src={portfolio.image} width={100} height={100} className='w-full h-full'  onClick={()=>{router.push(`${portfolio.titre.replaceAll(" ","-")}/image/${portfolio.numero}`)}}/>
                          { session && (<MdDelete 
                            className=' absolute top-3 right-3 text-red-600 text-[40px] bg-black rounded-md hover:scale-[1.2] cursor-pointer' 
                            onClick={() => {
                              var resultat = confirm("voulez-supprimer cette image ?")
                              if(resultat === true ){
                                  deletePortfolio(portfolio.id)
                              }
                            }} 
                            />
                          )}
                      </div>
                      <FormImagePortfolio  onClose={onClose} openModal={openModal} image={portfolio}/>
                    </>
                    )}

                  </div>
                ))}

          </div>
            
      </div>
      <div className='hidden lg:block lg:w-[30%]  bg-black text-white p-5 relative  '>
            <h1 className='text-[30px] font-bold uppercase'>{listeElementSelectionner?.[0]?.titre}</h1>
            <p>{listeElementSelectionner?.[0]?.desc}</p> 
      </div>

      <Describ describ={listeElementSelectionner} onCloseDescrib={onCloseDescrib} openModalDescrib={openModalDescrib} />

    </div>
  )
}
