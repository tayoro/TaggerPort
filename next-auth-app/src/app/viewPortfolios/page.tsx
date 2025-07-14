"use client"
import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio'
import React from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import SearchBar from "@/components/SearchBar";
import { useState,useEffect } from 'react';
import FormPortfolio from '@/components/FormPortfolio';
import useModal from '@/app/hooks/useModal';
import Portfolio from '@/components/Portfolio';
import { DataPortfolioType } from '@/app/Types/useTypes';
import styles from "@/app/styles/pages/portfolio.module.css"
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";


export default function ViewPortfoliosPage() {
    const {openModal, onClose} = useModal()
    
    const {portfolios} = useFireBasePortfolio()

    const [search, SetSearch] = useState('')

    const [active, setActive] = useState(true)

    const [imageSelectionner, setImageSelectionner] = useState<string[]>([])

    useEffect(()=>{
        if(portfolios.length < 1){
            setActive(true)
        }
        else{
            setActive(false)
        }
        
    },[portfolios])


    // tri de d'un tableau d'object 
    const map = {};
    portfolios.forEach(({titre, ...original}: {titre: any}) => {
        if(!Object.hasOwnProperty.call(map, titre)) map[titre] = {titre, ...original};
        else {
            ({titre, ...original});
        }
    }); 
    //console.log(Object.values(map));

    
    // filtrage de portfolio
    const visiblePortfolios = Object.values(map).filter((portfolio: any) =>{
        if(search && !portfolio.titre.includes(search)){
            return false
        }
        return true
    })
    //console.log(visiblePortfolios)


    return (
    <>
            <div id="portfolio" className=" flex h-screen bg-[#FFF]">
                    <div className=" w-full h-full  ">
                        <div className="w-1079 h-[70px] bg-[#FFFFFF]  flex  items-center px-[23px]">
                            <div className=" flex flex-row items-center justify-between w-[68%] gap-[25px] md:[40px]">
                                <div>
                                    <span className="text-[40px] font-bold "> Portfolio</span>
                                </div>
                                
                                <SearchBar search={search} SetSearch={SetSearch} />
                            </div>                           
                        </div>

                        <div className=" overflow-hidden overflow-y-scroll h-[calc(100%-70px)] bg-[#F2F2F2]">{/* overflow-hidden overflow-y-scroll h-[765px] */}
                            
                            { portfolios.length > 0 ? (
                                    
                                    <div className=''>
                                        <div className= {`${styles.card_portfolio}  flex pt-[20px] flex-wrap bg-[#F2F2F2] justify-center sm:justify-start`}> 
                                            
                                            {visiblePortfolios.map((portfolio: any)=>( 
                                                        <Portfolio key={portfolio.id} portfolio={portfolio} imageSelectionner={imageSelectionner} setImageSelectionner={setImageSelectionner}/>
                                            ))}
                                        </div>
                                    </div>
                            ) : (
                                <div className='grid place-items-center h-[calc(100%-70px)]'>
                                    <div className='text-[50px] text-[#a1a1a1]'> Vous n'avez publié aucun portfolio</div>
                                </div>
                            )}
                            <FormPortfolio onClose={onClose} openModal={openModal}/>
                        </div> 
                    </div>
                </div>
        </>
    )
}
