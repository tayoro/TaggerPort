"use client"

import SearchBar from '@/components/SearchBar'

import React, { useEffect } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import useModal from '@/app/hooks/useModal'
import { useState } from 'react'
import { useFireBaseContact } from '@/app/context/dataContextContact'
import Contact from '@/components/Contact'


export default async function MessagePage() {
     
    const {contacts} = useFireBaseContact()


    return (
        <div>
            <div id='message' className=" flex h-screen bg-[#FFF] w-full">
            
                    <div className=" w-full h-full ">
                        <div className="w-1079 h-[70px] bg-[#FFFFFF]  flex justify-between items-center px-[23px]">
                            <div>
                                <span className="text-[40px] font-bold">Message</span>
                            </div>
                        </div>

                        { contacts.length > 0 ? (
                            <>
                                <div className=" overflow-hidden overflow-y-scroll h-[calc(100%-70px)] bg-[#FFF]">
                                {contacts.map((contact) => (
                                    <Contact key={contact.id} contact={contact}/>
                                ))}
                                </div>
                            </> 
                        ) : (
                            <div className='grid place-items-center h-[calc(100%-70px)] border'>
                                <div className='text-[50px] text-[#a1a1a1]'> Aucun message reçu</div>
                            </div>
                        )}
                    </div>
            </div>
        
        </div>
    )
}
