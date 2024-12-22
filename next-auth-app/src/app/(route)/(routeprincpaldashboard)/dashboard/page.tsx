"use client"

import { MdOutlineModeEditOutline } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import {useSession, signOut} from "next-auth/react"
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

//import "../styles/pages/dashboard.module.css"
import Image from "next/image";
import styles from "@/app/styles/pages/home.module.css"

import useModal from "@/app/hooks/useModal";
import { useState, useEffect } from "react";
import FormVideo from "@/components/FormVideo";
import { useFireBase } from "@/app/context/dataContext"; 
import Video from "@/components/Video";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
    const {openModal, onOpen, onClose} = useModal()
    const router = useRouter()// pour la rediction de la route

    //Liste de video
    const {videos} = useFireBase()

    //recupere la session
    const {data: session} = useSession()

    const [search, SetSearch] = useState('')
    

    // filtrage de video
    const visibleVideos = videos.filter(video =>{
        if(search && !video.titre.includes(search)){
            return false
        }
        return true
    })


    

    return (
        <>  
            {session ? (
                <div id="dashboard" className=" flex h-screen bg-[#FFF]">
                    <div className=" w-full h-full bg-black ">
                        <div className="w-1079 h-[70px] bg-[#FFFFFF]  flex  items-center px-[23px]">
                            <div className=" flex flex-row items-center justify-between w-[68%] gap-[25px] md:[40px]">
                                <div>
                                    <span className="text-[40px] font-bold "> Video</span>
                                </div>
                                
                                <SearchBar search={search} SetSearch={SetSearch} />
                            </div>
                            
                            <div className='absolute right-4 bottom-4'>
                                <IoIosAddCircle onClick={onOpen} className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer  relative z-[2] hover:scale-[1.5]"/>
                            </div>
                        </div>

                        
                        <div className=" overflow-hidden overflow-y-scroll h-[calc(100%-70px)] bg-[#F2F2F2]">{/* overflow-hidden overflow-y-scroll h-[765px] */}
                        { videos.length > 0 ? (
                        
                            <div className={`${styles.card_video} flex pt-[20px] flex-wrap justify-center md:justify-start `}> 
                                
                                {visibleVideos.map((video)=>(
                                            <Video key={video.id} video={video}/>
                                ))}
                                <FormVideo onClose={onClose} openModal={openModal} />
                            </div>

                        ) : (
                            <div className='grid place-items-center h-[calc(100%-70px)] border'>
                                <div className='text-[50px] text-[#a1a1a1]'> Vous n'avez publié aucune video</div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            ):(
                router.push('/login')
            )}
        </>
    );
}