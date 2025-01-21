"use client"

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { TiThMenu } from "react-icons/ti";
import Drawer from 'react-modern-drawer';
import { CiLogout } from "react-icons/ci";
import {useSession, signOut} from "next-auth/react"
import { BsEnvelope } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdLaptop } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import { usePathname } from 'next/navigation';
import Link from "next/link";

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { useFireBaseContact } from '@/app/context/dataContextContact';
import { useFireBase } from '@/app/context/dataContext';
import { useFireBaseInfo } from '@/app/context/dataContextInfo';
import Portfolio from './Portfolio';
import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false)
    const {contacts} = useFireBaseContact()
    const {infos} = useFireBaseInfo()
    const {videos} = useFireBase()
    const {portfolios} = useFireBasePortfolio()
    
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const pathname = usePathname()
    const sidebarNav = [
        {name: "Message", icon:BsEnvelope, path:'/message', id: 1},
        {name: "Information", icon:BsFillInfoCircleFill, path:'/nouvelle', id: 2},
        {name: "Video", icon:MdOndemandVideo, path:'/dashboard', id: 3},
        {name: "Portfolio", icon:IoMdLaptop, path:'/portfolio', id: 4},
    ]



    return (

    <>
            <div onClick={toggleDrawer} className='absolute top-2 right-4 h-16 w-16 grid place-items-center rounded-[50%] hover:scale-[1.5] '><TiThMenu className='text-[30px]' /></div>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                    className='flex flex-col justify-between'
                >
                <div className='flex flex-col'>
                    <div className='font-bold'>
                        LOGO
                    </div>
                    <ul>  
                        {sidebarNav.map((item: any) => {
                            const isActive = pathname.startsWith(item.path)

                            return(
                                <li key={item.name}  className="h-[50px] border bg-[#c5c3c3] flex items-center pl-2 hover:bg-[#515050] hover:text-orange-500 hover:pl-4">
                                    <Link href={item.path} className="flex items-center gap-2 w-full h-full">
                                        <item.icon className={`${isActive && "text-orange-500"}`}/>
                                        <div className={` cursor-pointer ${isActive && "text-orange-500"} flex justify-between w-full pr-2`}>
                                            {item.name} 
                                            {item.name === "Message" &&( <>{contacts.length > 0 && (<div className=' w-[25px] h-[25px] rounded-[50%] flex justify-center items-center bg-blue-600 text-white'> {contacts.length} </div>) }</>)}
                                            {item.name === "Information" &&( <>{infos.length > 0 && (<div className=' w-[25px] h-[25px] rounded-[50%] flex justify-center items-center bg-blue-600 text-white'> {infos.length} </div>) }</>)}
                                            {item.name === "Video" &&( <>{videos.length > 0 && (<div className=' w-[25px] h-[25px] rounded-[50%] flex justify-center items-center bg-blue-600 text-white'> {videos.length} </div>) }</>)}
                                            {/* {item.name === "Portfolio" &&( <>{portfolios.length > 0 && (<div className=' w-[25px] h-[25px] rounded-[50%] flex justify-center items-center bg-blue-600 text-white'> {portfolios.length} </div>) }</>)} */}
                                        </div>
                                    </Link>
                                </li>
                            )

                            
                            })}
                    </ul>
                </div>
                
                    <div onClick={()=>{signOut()}} className=" mb-8 flex justify-center  h-5 w-30 items-center font-bold cursor-pointer hover:text-red-950">
                                <CiLogout className="mx-2 font-bold"/>
                                <span >Logout</span>
                    </div>
            </Drawer>
        </>

    )
}
