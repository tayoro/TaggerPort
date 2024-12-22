import React from 'react'
import { useRouter } from "next/navigation";
import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio'

export default function PortfolioDefilant({portfolio}:{portfolio: any}) {

    const {portfolios} = useFireBasePortfolio()
    const router = useRouter()
    const listeElementSelectionner =[]
            for(let i=0; i < portfolios.length; i++){
                if(portfolios?.[i]?.titre === portfolio.titre ){
                    listeElementSelectionner.push(portfolios?.[i]?.id)
                }
            }

    return (
        <>
            <div className="embla__slide border w-[100px]" key={portfolio.id}>
                <div className="embla__slide__number ">
                    <img src={portfolio.image} alt="dp" className='w-[100%] h-[100%]'/>
                    <div className="content">
                        <h1 className='card-title'>{portfolio.titre}</h1>
                        { listeElementSelectionner.length >1 ? (
                            <div>
                                <span>{listeElementSelectionner.length}</span> <span>elements</span>
                            </div>
                        ):(
                            <div>
                                <span>{listeElementSelectionner.length}</span> <span>element</span>
                            </div>
                        )}

                        <button onClick={()=>{router.push(`portfolio/${portfolio.titre.replaceAll(" ","-")}`)}} className='card-btn'>voir plus </button>
                    </div>
                </div>
            </div>
        </>
    )
}
