import { DataInfoType } from '@/app/Types/useTypes'
import { useFireBaseInfo } from '@/app/context/dataContextInfo'
import React from 'react'
import FormInfo from './FormInfo'
import useModal from '@/app/hooks/useModal'
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import * as moment from 'moment'

export default function Info({info}: {info: DataInfoType}) {

    const {deleteInfo} = useFireBaseInfo()
    const {onOpen, openModal, onClose} = useModal()

    return (
        <>
            <div className='flex w-full gap-5 mb-2'>
                <div className="collapse bg-[#cac8c8] hover:bg-[#bababa] ">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium pl-4 flex justify-between items-center"><span className='mr-[20px] font-bold underline'>{info.theme}</span> <span>{ moment(info.createAt?.seconds  * 1000 ).locale('fr').fromNow()}</span> </div>
                    <div className="collapse-content bg-[#e6e5e5]">
                        <div className=''>
                            <div className='flex gap-3'> <span>Intervenant(s):</span> <span>{info.intervenant} </span> </div>
                            <div className='flex gap-3'> <span>Lieu:</span> <span>{info.lieu} </span> </div>
                            {info.heureFinSecond ?(
                            <>
                                <div className='flex gap-3'> <span>Date:</span> Du <span>{info.dateDebutFirst.replace("T", " De ")} </span> <span> à </span> <span>{info.heureFinFirst} </span> <span>au</span> <span>{info.dateDebutSecond?.replace("T", " De ")} </span> <span> à </span> <span>{info.heureFinSecond} </span> </div>
                            </>
                            ) : (
                                
                                <div className='flex gap-3'> <span>Date:</span> <span>{info.dateDebutFirst.replace("T", " De ")} </span> <span> à </span> <span>{info.heureFinFirst} </span> </div>
                            )
                            }
                            <div> <span>Description:</span> <p>{info.description}</p></div>
                        </div>
                        
                    </div>
                </div>
                <div className='h-[60px] rounded-lg w-[50px] p-2  bg-red-400 hover:bg-red-900 '>
                        <MdDelete type="button" onClick={() => {
                                    var resultat = confirm("voulez-supprimer cette video ?")
                                    if(resultat === true ){
                                        deleteInfo(info.id)
                                    }
                                }} className=' h-full w-full rounded-lg' />
                </div>
    
                <div className='h-[60px] rounded-lg w-[50px] p-2 bg-blue-400 hover:bg-blue-700'>
                    <FaPen onClick={onOpen} className='  w-full  h-full rounded-lg' />
                </div>
    
                <FormInfo isUpdate  onClose={onClose} openModal={openModal} info={info}/>
    
            </div>
        </>
    )
}
