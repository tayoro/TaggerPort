"use client"

import React from 'react'

import { useFireBasePortfolio } from '../app/context/dataContextPortfolio';

export default function PortfolioImage({numero}:{numero: any}) {

    const { portfolios } = useFireBasePortfolio()
    //trie des elements
    const listeElementSelectionner =[]
    for(let i=0; i < portfolios.length; i++){
        if(portfolios?.[i]?.titre.replaceAll(" ", "-") === numero){
            listeElementSelectionner.push(portfolios?.[i])
    }
    console.log(listeElementSelectionner)


    return (
        <div>
                <div className=' border w-[70%] border-red-500 px-16 flex  flex-wrap gap-6 overflow-hidden overflow-y-scroll h-screen ' >
                {listeElementSelectionner.map((image)=>(
                        image.numero === numero && (<>
                        <div key={image.id} className='border-[5px] border-[#FFF] rounded-md w-[100%] h-[550px] my-4'>
                            <img src={image.image} width={100} height={100} className='w-full h-full'/>
                        </div>
                        </>
                    )
                ))} 
            </div>
        </div>
    )
    }
}
