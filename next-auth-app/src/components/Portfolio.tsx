import React, { useState } from 'react'

import { DataPortfolioType } from '@/app/Types/useTypes'
import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio'
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { writeBatch, deleteDoc, doc } from "firebase/firestore";
import {db, storage} from "@/app/db/firebaseConfig";
import { toast } from 'react-toastify';
import styles from "@/app/styles/pages/portfolio.module.css"

import { useEffect } from 'react';

export default function Portfolio({portfolio, imageSelectionner, setImageSelectionner} : {portfolio: DataPortfolioType, imageSelectionner: string[], setImageSelectionner:any}) {

    const {data: session} = useSession()
    const {portfolios, deletePortfolioMultiple} = useFireBasePortfolio()
    const router = useRouter()
    

    //console.log(portfolios)
    
    
    const handleCheckboxChange = (e : any)=>{
        const value = e.target.value

        if (e.target.checked){
            for(let i=0; i < portfolios.length; i++){
                if(portfolios?.[i]?.titre === value){
                    setImageSelectionner([
                        ...imageSelectionner,
                        value  
                    ])
                }
            }
        }else{
            setImageSelectionner(imageSelectionner.filter(item => item !== value));
        }
    }

    //console.log(imageSelectionner)


    
    const listeElementSelectionner =[]
    for(let i=0; i < portfolios.length; i++){
        if(portfolios?.[i]?.titre === portfolio.titre ){
            listeElementSelectionner.push(portfolios?.[i]?.id)
        }
    }
    
    return (
    <>  

        <div className= {`${styles.portfolio}  relative my-[20px] w-[300px] h-[270px] mx-[5px] rounded-t-lg xl:w-[250px]  transition-timing-function: cubic-bezier(0, 0, 0.2, 1) overflow-hidden  `}>
            <div className='absolute top-3 left-3 z-10 '>
                <span className='bg-white rounded-[50%] p-2 w-10 h-10 flex items-center justify-center border-[2px] border-black'>{listeElementSelectionner.length}</span>
            </div>
            <div className="w-[100%] h-[150px] rounded-lg md:w-[100%] hover:scale-[1.1]">
                <img onClick={()=>{router.push(`portfolio/${portfolio.titre.replaceAll(" ","-")}`)}} src={portfolio.image} alt={portfolio.titre} className='w-[100%] h-[200px] object-cover cursor-pointer rounded-[5%]'/>
            </div>
            <input 
                    type="checkbox" 
                    value={portfolio.titre}
                    className="form-check-input absolute right-2 top-2 z-10 cursor-pointer"
                    onChange={handleCheckboxChange} 
            />
            <div className="w-[100%] h-[calc(100%-150px)]  p-[10px] bg-[#FFF] relative z-[1] ">
                <div onClick={()=>{router.push(`portfolio/${portfolio.titre.replaceAll(" ","-")}`)}} className="mb-5 cursor-pointer">
                    <span className=''>{portfolio.titre}</span>
                </div>
                <div className="flex justify-between">  
                    {/* <span>
                        {new Date(Number(portfolio.date.seconds * 1000)).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",})}    
                    </span> */}
                
                </div>
                { session && (<>
                    <div className='absolute right-0 bottom-[1px]'>
                        <RxCross2 
                        onClick={async() => {
                            var resultat = confirm("voulez-supprimer cette portfolio ?")
                            if(resultat === true ){
                                // const promises = portfolios.map((docId) => deleteDoc(doc(db, "portfolios", docId.id)))
                                // await Promise.all(promises)

                                // const batch = writeBatch(db);
                                // portfolios.forEach((docId) => {
                                // batch.delete(doc(db, "portfolios", docId.id))
                                // }) 
                                // // Commit the batch
                                // await batch.commit();
                                
                                deletePortfolioMultiple(portfolio.titre)
                                toast.success("Portfolio supprimés")
                            }


                        }} 
                        className="text-white text-[25px] bg-red-600  cursor-pointer rounded-md hover:w-9 hover:h-9 "/>
                    </div>
                </>)}
                
            </div>
    </div>
    </>
    )
}
