

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


export default function ViewImage({params}: { 
  params : {viewImageId: string;}

}) {

  const router = useRouter()
  const {portfolios, deletePortfolio} = useFireBasePortfolio()
  const {data: session} = useSession()
  const {onOpen, openModal, onClose} = useModal()

  //trie des elements
  const listeElementSelectionner =[]
      for(let i=0; i < portfolios.length; i++){
          if(portfolios?.[i]?.titre.replaceAll(" ", "-") === params.viewImageId){
            listeElementSelectionner.push(portfolios?.[i])
      }
  }


  return (
    <div className='flex relative'>
      <div className='absolute top-3 left-3'>
        <div className='bg-white rounded-[50%] p-2 w-10 h-10 flex items-center justify-center'>{listeElementSelectionner.length} </div>
      </div>
      <div className='absolute left-2 bottom-3'>
          { session && (<><IoIosAddCircle onClick={onOpen} className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer  relative z-[2] hover:scale-[1.2] ease-in duration-300"/></>)}
      </div> 
      <div className='w-[70%]  px-24 py-10 flex  flex-wrap gap-6 overflow-hidden overflow-y-scroll h-screen ' >
          {portfolios.map((portfolio: any)=>(
                <div key={portfolio.id}>
                  {portfolio.titre.replaceAll(" ", "-") === params.viewImageId && (<>
                    <div className='relative border-[5px] border-[#FFF] rounded-md w-[100%] h-[450px] my-4 hover:border-[#464cf5] hover:scale-[1.1] ease-in duration-300 cursor-pointer '>
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
      <div className='w-[30%]  bg-black text-white p-5 relative '>
            <h1 className='text-[30px] font-bold uppercase'>{listeElementSelectionner?.[0]?.titre}</h1>
            <p>{listeElementSelectionner?.[0]?.desc}</p> 
      </div>
    </div>
  )
}
