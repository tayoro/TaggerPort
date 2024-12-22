
import React from 'react'
import { DataInfoType } from '@/app/Types/useTypes'
import * as moment from 'moment'

export default function Information({info, i}: {info: DataInfoType, i: number}) {


    return (
        <>
            <div className='relative border-[5px] bg-gray-200 border-t-0 rounded-[20px] border-r-0 mb-10'>
                    <div className='flex '>
                        <div className='absolute top-0 left-[-32px] w-16 h-16 bg-[#cee3f4] rounded-[50%] flex items-center justify-center text-[25px]'> 
                            {i + 1}
                        </div>
                        
                        <div className='first-letter:uppercase h-20  w-[100%] flex justify-start pl-10 md:justify-center md:pl-0 items-center text-[25px] font-bold'>
                            {info.infoType}
                        </div>
                        <div className='absolute top-7 right-3 first-letter:uppercase '>
                            { moment(info.createAt?.seconds  * 1000 ).locale('fr').fromNow()}
                        </div>
                    </div>
                    
                    <div className='bg-[#cee3f4] p-5 flex flex-col gap-5 rounded-s-[20px] rounded-b-[20px]'>
                        <div className='flex'>
                            <div className='flex justify-between w-36 text-[18px] font-semibold'><span>Theme</span> <span>:</span></div>
                            <span className='px-4 flex w-[100%] flex-wrap pt-[2px] '>{info.theme}</span>
                        </div>
                        <div className='flex'>
                            <div className='flex  justify-between w-36  text-[18px] font-semibold'><span>Intervenant</span> <span>:</span></div>
                            <span className='px-4 flex w-[100%] flex-wrap pt-[2px] '>{info.intervenant}</span>
                        </div>
                        <div className='flex'>
                            <div className='flex  justify-between w-36  text-[18px] font-semibold'><span>Lieu</span> <span>:</span></div>
                            <span className='px-4 flex w-[100%] flex-wrap pt-[2px] '>{info.lieu}</span>
                        </div>
                        <div className='flex'>
                            <div className='flex  justify-between w-36  text-[18px] font-semibold'><span>Date</span> <span>:</span></div>
                            {info.heureFinSecond ?(
                            <>
                                <div className='px-4 flex w-[100%] flex-wrap pt-[2px] gap-3'> Du <span>{info.dateDebutFirst.replace("T", " De ")} </span> <span> à </span> <span>{info.heureFinFirst} </span> <span>au</span> <span>{info.dateDebutSecond?.replace("T", " De ")} </span> <span> à </span> <span>{info.heureFinSecond} </span> </div>
                            </>
                            ) : (
                                
                                <div className='px-4 flex w-[100%] flex-wrap pt-[2px] gap-3'> <span>{info.dateDebutFirst.replace("T", " De ")} </span> <span> à </span> <span>{info.heureFinFirst} </span> </div>
                            )
                            }
                        </div>
                        <div className='flex'>
                            <div className='flex justify-between w-36  text-[18px] font-semibold'><span>Description</span> <span>:</span></div>
                            <span className='px-4 flex w-[100%] flex-wrap pt-[2px] '>{info.description}</span>
                        </div>
                    </div>
                </div>
        </>
    )
}
