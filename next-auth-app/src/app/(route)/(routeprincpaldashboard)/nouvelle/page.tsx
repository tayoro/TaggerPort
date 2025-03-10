"use client"

import SearchBar from '@/components/SearchBar'

import React from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import useModal from '@/app/hooks/useModal'
import NoSsr from '@/components/NoSsr'
import FormInfo from '@/components/FormInfo'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useFireBaseInfo } from '@/app/context/dataContextInfo'
import Info from '@/components/Info'
import { useState,useEffect } from 'react';
import { MdDelete } from "react-icons/md";


export default async function NewPage() {
    
 
    const {openModal, onOpen, onClose} = useModal()

    const {infos, deleteAllinfo} = useFireBaseInfo()

    const [active, setActive] = useState(true)

    useEffect(()=>{
        if(infos.length < 1){
            setActive(true)
        }
        else{
            setActive(false)
        }

       
    },[infos])
    
    return (
        <div >
            <div id='nouvelle' className=" flex h-screen bg-[#FFF] w-full">
          
                    <div className=" w-full h-full ">
                        <div className="w-1079 h-[70px] bg-[#FFFFFF]  flex justify-between items-center px-[23px]">
                            <div>
                                <span className="text-[40px] font-bold"> Information</span>
                            </div>
                            
                         
                            <div className='absolute right-4 bottom-4'>
                                <IoIosAddCircle onClick={onOpen} className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer hover:scale-[1.5]"/>
                            </div>
                        </div>
                        
                        <div className=" w-[100%] py-5 px-6">
                            <button type="button" onClick={ async() => {
                                    var resultat = confirm("Voulez vous supprimer toutes les informations ?")
                                    if(resultat === true ){
                                        deleteAllinfo()
                                        toast.success("Informations supprimées")
                                    }
                                }} 
                            className={`bg-red-400 hover:bg-red-800 flex items-center justify-center px-2 rounded-md  ${active ? "opacity-5" : "opacity-[1]"}`} disabled={active}> Tous supprimer <MdDelete className='text-red-600'/></button>
                        </div>

                        <div className=" overflow-hidden overflow-y-scroll h-[calc(100%-135px)] bg-[#F2F2F2]">{/* overflow-hidden overflow-y-scroll h-[765px] */}
                            { infos.length > 0 ? (

                                <div className=" flex pt-[20px] flex-wrap bg-[#F2F2F2] sm:justify-center "> 
                                    {infos.map((info)=>(
                                            <Info key={info.id} info={info}/>
                                        ))}
                                </div>
                                
                            ) : (
                                <div className='grid place-items-center h-[calc(100%-135px)] border'>
                                    <div className='text-[50px] text-[#a1a1a1]'> Vous n'avez publié aucune information</div>
                                </div>
                            )}
                            <FormInfo onClose={onClose} openModal={openModal}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}
