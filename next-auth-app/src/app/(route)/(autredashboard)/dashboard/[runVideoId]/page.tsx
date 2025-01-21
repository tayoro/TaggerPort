"use client"

import useModal from '@/app/hooks/useModal';
import React from 'react'
import { useFireBase } from '@/app/context/dataContext';
import { notFound } from "next/navigation"; 
import FormVideo from '@/components/FormVideo';
import { DataType } from '@/app/Types/useTypes';
import {useSession} from "next-auth/react"
import styles from "@/app/styles/pages/video.module.css"

export default function RunVideo({params}: { 
  params : {runVideoId: string;}

}) {

  const {videos} = useFireBase()
  const {data: session} = useSession()
  const {onOpen, openModal, onClose} = useModal()

  return (
    <div className=' py-[20px] flex justify-center  px-[20px] sm:px-[40px]  lg:px-[220px]'>
      <div>
      {videos.map((video)=>(
            <div  className={` `} >
              {video.titre.replaceAll(" ", "-") === params.runVideoId && (<>
                <div className={`${styles.cadreLecteur} bg-black rounded-[15px] `}>
                    <video autoPlay controls loop muted src={video.video} className='w-[100%] h-full object-cover cursor-pointer rounded-lg '/>
                </div>
                <div className='titre my-3'>
                    <span className='font-bold'>{video.titre}</span>
                </div>
                <div className='my-3'>
                  <span>
                    {new Date(Number(video.date.seconds * 1000)).toLocaleDateString("es-CL", {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",})}    
                  </span>
                </div>
                <div className='bg-[#E4E4E4] h-32 py-4 px-10 rounded-[25px]'>
                  <p className='Commentaitre '>
                    {video.desc}
                  </p>
                </div>
                { session && (<>
                  <div className='flex justify-center'>
                    <button onClick={onOpen} className='bg-red-500 hover:bg-red-900 align-center w-full  my-5 h-10 rounded-md'>
                      Modifier 
                    </button>
                  </div>
                </>)}
                
  
                <FormVideo isUpdate  onClose={onClose} openModal={openModal} video={video}/>
              </>
              )}
        
            </div>
            ))} 
      </div> 
    </div>
  )
}
