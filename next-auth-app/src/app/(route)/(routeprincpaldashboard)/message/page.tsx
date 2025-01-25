"use client"

import SearchBar from '@/components/SearchBar'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFireBaseContact } from '@/app/context/dataContextContact'
import Contact from '@/components/Contact'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';


export default async function MessagePage() {

    const {contacts, deleteAllcontact, deleteSelecteContact} = useFireBaseContact()
    
    const [contactSelectionner, setContactSelectionner] = useState<string[]>([])

    const [activeSelecte, setActiveSelecte] = useState(true)

    const [active, setActive] = useState(true)

    useEffect(()=>{
        if(contacts.length < 1){
            setActive(true)
        }
        else{
            setActive(false)
        }

    },[contacts])

    useEffect(()=>{
        if(contactSelectionner.length < 1){
            setActiveSelecte(true)
        }
        else{
            setActiveSelecte(false)
        }   
    },[contactSelectionner])

    return (
        <div>
            <div id='message' className=" flex h-screen bg-[#FFF] w-full">
            
                    <div className=" w-full h-full ">
                        <div className="w-1079 h-[70px] bg-[#FFFFFF]  flex justify-between items-center px-[23px]">
                            <div>
                                <span className="text-[40px] font-bold">Message</span>
                            </div>
                        </div>


                        <div className=" w-[100%] py-5 px-6 flex gap-3">
                            <button type="button" onClick={ async() => {
                                    var resultat = confirm("Voulez vous supprimer tous les contacts ?")
                                    if(resultat === true ){
                                        deleteAllcontact()
                                        toast.success("Contacts supprimés")
                                    }
                                }} 
                            className={`bg-red-400 hover:bg-red-800 flex items-center justify-center px-2 rounded-md  ${active ? "opacity-5" : "opacity-[1]"}`} disabled={active}> Tous supprimer <MdDelete className='text-red-600'/></button>


                            <button type="button" onClick={ async() => {
                                    var resultat = confirm("Voulez vous supprimer les portfolios selectionnés ?")
                                    if(resultat === true ){
                                        deleteSelecteContact(contactSelectionner)
                                        toast.success("Portfolios supprimés")
                                    }
                                }} 
                            className={`bg-red-400 hover:bg-red-800 flex items-center justify-center px-2 rounded-md  ${activeSelecte ? "opacity-5" : "opacity-[1]"}`} disabled={activeSelecte}> supprimer {contactSelectionner.length} <MdDelete className='text-red-600'/></button>
                        </div>
                        
                        
                        { contacts.length > 0 ? (
                            <>
                                <div className=" overflow-hidden overflow-y-scroll h-[calc(100%-135px)] bg-[#FFF]">
                                {contacts.map((contact) => (
                                    <Contact key={contact.id} contact={contact} contactSelectionner={contactSelectionner} setContactSelectionner={setContactSelectionner}/>
                                ))}
                                </div>
                            </> 
                        ) : (
                            <div className='grid place-items-center h-[calc(100%-135px)] border'>
                                <div className='text-[50px] text-[#a1a1a1]'> Aucun message reçu</div>
                            </div>
                        )}
                    </div>
            </div>
        
        </div>
    )
}
