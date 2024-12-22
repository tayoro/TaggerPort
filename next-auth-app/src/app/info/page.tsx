"use client"

import Information from '@/components/Information'
import React from 'react'
import { useFireBaseInfo } from '../context/dataContextInfo'
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.jpg";
import styles from "@/app/styles/pages/home.module.css"

export default function infoPage() {

    const {infos} = useFireBaseInfo()
    return (
        <div className='relative'>
            <div className=' flex justify-center items-center h-[60px] '>
                <div className='absolute top-0 left-0 grid place-items-center md:h-[60px] w-[100px] mx-[20px] xl:mx-[40px] '>
                    <Link href="/"> <Image priority={true}  src={logo} width={73} height={83} alt="image" className={`${styles.img} h-full w-full object-cover`}/></Link>
                </div>
                <div className='text-[30px]'>Information</div>
            </div>
            <div className='px-[34px] lg:px-40 py-5'>
            {infos.length > 0 ? (
                <>
                    {infos.map((info, i)=>(
                        <Information key={info.id} info={info} i={i}/>
                    ))}
                </>
            ): (
                <>
                    <div className=' flex justify-center items-center h-[100%] text-[50px] text-[#a1a1a1]'>
                        Aucune publication
                    </div>
                </>
            )}

            </div>
        </div>
    )
}
