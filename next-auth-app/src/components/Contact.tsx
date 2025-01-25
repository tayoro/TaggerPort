import { DataContactType } from '@/app/Types/useTypes'
import { useFireBaseContact } from '@/app/context/dataContextContact'
import React from 'react'
import { MdDelete } from "react-icons/md";

export default function Contact({contact, contactSelectionner, setContactSelectionner} : {contact: DataContactType,  contactSelectionner?: string[], setContactSelectionner?:any}) {

    const {contacts,deleteContact} = useFireBaseContact()
    
    const handleCheckboxChange = (e : any)=>{
        
        const value = e.target.value
        if (e.target.checked){
            for(let i=0; i < contacts.length; i++){
                if(contacts?.[i]?.email === value){
                    setContactSelectionner([
                        ...contactSelectionner,
                        value  
                    ])
                }
            }
        }else{
            setContactSelectionner(contactSelectionner.filter(item => item !== value));
        }
    }
    return (
        <>
            <div className='flex gap-5 mb-3'>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium flex gap-[50px] bg-[#aaaaaa]">
                        <div className='relative border-r-[1px] border-[#2e2c2c] w-[30px]'>
                        <input 
                            type="checkbox" 
                            value={contact.email}
                            className="form-check-input absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10 cursor-pointer"
                            onChange={handleCheckboxChange} 
                        />
                        </div>
                        
                        <span>{contact.name}</span>
                    
                        <span>{contact.email}</span>
                    
                        <span>{contact.sujet}</span>
                        
                    </div>
                    <div className="collapse-content  bg-[#c4c3c3]">
                        <p>{contact.message}</p>
                    </div>
                </div>
    
                <div className='h-[60px] rounded-lg w-[50px] p-2  bg-red-400 hover:bg-red-900 '>
                        <MdDelete type="button" onClick={() => {
                                    var resultat = confirm("voulez-supprimer ce message ?")
                                    if(resultat === true ){
                                        deleteContact(contact.id)
                                    }
                                }} className=' h-full w-full rounded-lg' />
                </div>
            </div>
        </>
    )
}
