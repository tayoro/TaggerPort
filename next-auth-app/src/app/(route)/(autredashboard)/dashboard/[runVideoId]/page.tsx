"use client"

import useModal from '@/app/hooks/useModal';
import React from 'react'
import { useFireBase } from '@/app/context/dataContext';
import { notFound } from "next/navigation"; 
import FormVideo from '@/components/FormVideo';
import { DataType } from '@/app/Types/useTypes';
import {useSession} from "next-auth/react"

export default function RunVideo({params}: { 
  params : {runVideoId: string;}

}) {

  const {videos} = useFireBase()
  const {data: session} = useSession()
  const {onOpen, openModal, onClose} = useModal()

  return (
    <div className='px-[300px] py-[20px] '>
      {videos.map((video)=>(
            <div key={video.id}>
              {video.titre.replaceAll(" ", "-") === params.runVideoId && (<>
                <div className='bg-blue-700 h-[450px] rounded-lg '>
                    <video autoPlay controls loop muted src={video.video} className='w-[100%] h-[100%] object-cover cursor-pointer rounded-lg'/>
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
  )
}
