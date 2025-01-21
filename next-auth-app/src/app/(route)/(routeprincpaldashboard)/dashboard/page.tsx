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

import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

export default function DashboardPage() {
    
    const router = useRouter()// pour la rediction de la route

    const {openModal, onOpen, onClose} = useModal()
    
    //Liste de video
    const {videos, deleteAllvideo, deleteSelecteVideo} = useFireBase()

    //recupere la session
    const {data: session} = useSession()

    const [search, SetSearch] = useState('')

    const [active, setActive] = useState(true)

    const [activeSelecte, setActiveSelecte] = useState(true)

    const [videoSelectionner, setVideoSelectionner] = useState<string[]>([])

    useEffect(()=>{
        if(videos.length < 1){
            setActive(true)
        }
        else{
            setActive(false)
        }
    },[videos])


    useEffect(()=>{
        if(videoSelectionner.length < 1){
            setActiveSelecte(true)
        }
        else{
            setActiveSelecte(false)
        }   
    },[videoSelectionner])
    

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
                    <div className=" w-full h-full ">
                        <div className="w-1079 h-[70px] bg-[#FFFFFF]  flex  items-center px-[23px]">
                            <div className=" flex flex-row items-center justify-between sm:w-[68%] gap-[25px] ">
                                <div>
                                    <span className="text-[40px] font-bold "> Video</span>
                                </div>
                                
                                <SearchBar search={search} SetSearch={SetSearch}/>
                            </div>
                            
                            <div className='absolute right-4 bottom-4'>
                                <IoIosAddCircle onClick={onOpen} className="text-[#172EFB] w-[50px] h-[50px] cursor-pointer  relative z-[2] hover:scale-[1.5]"/>
                            </div>
                        </div>


                        <div className=" w-[100%] py-5 px-6 flex gap-3">
                            <button type="button" onClick={ async() => {
                                    var resultat = confirm("Voulez vous supprimer tous les portfolios ?")
                                    if(resultat === true ){
                                        deleteAllvideo()
                                        toast.success("Portfolios supprimés")
                                    }
                                }} 
                            className={`bg-red-400 hover:bg-red-800 flex items-center justify-center px-2 rounded-md  ${active ? "opacity-5" : "opacity-[1]"}`} disabled={active}> Tous supprimer <MdDelete className='text-red-600'/></button>


                            <button type="button" onClick={ async() => {
                                    var resultat = confirm("Voulez vous supprimer les portfolios selectionnés ?")
                                    if(resultat === true ){
                                        deleteSelecteVideo(videoSelectionner)
                                        toast.success("Portfolios supprimés")
                                    }
                                }} 
                            className={`bg-red-400 hover:bg-red-800 flex items-center justify-center px-2 rounded-md  ${activeSelecte ? "opacity-5" : "opacity-[1]"}`} disabled={activeSelecte}> supprimer {videoSelectionner.length} <MdDelete className='text-red-600'/></button>
                        </div>


                        {/* <div className=" w-[100%] py-5 px-6">
                            <button type="button" onClick={ async() => {
                                    var resultat = confirm("Voulez vous supprimer toutes les videos ?")
                                    if(resultat === true ){
                                        deleteAllvideo()
                                        toast.success("Videos supprimées")
                                    }
                                }} 
                            className={`bg-red-400 hover:bg-red-800 flex items-center justify-center px-2 rounded-md  ${active ? "opacity-5" : "opacity-[1]"}`} disabled={active}> Tous supprimer <MdDelete className='text-red-600'/></button>
                        </div>
                         */}


                        <div className=" overflow-hidden overflow-y-scroll h-[calc(100%-135px)] bg-[#F2F2F2]">{/* overflow-hidden overflow-y-scroll h-[765px] */}
                        
                        { videos.length > 0 ? (
                        
                            <div className={`${styles.card_video} flex pt-[20px] flex-wrap justify-center md:justify-start `}> 
                                
                                {visibleVideos.map((video)=>(
                                            <Video key={video.id} video={video} videoSelectionner={videoSelectionner} setVideoSelectionner={setVideoSelectionner}/>
                                ))}
                                
                            </div>

                        ) : (
                            <div className='grid place-items-center h-[calc(100%-70px)] border'>
                                <div className='text-[50px] text-[#a1a1a1]'> Vous n'avez publié aucune video</div>
                            </div>
                        )}
                        <FormVideo onClose={onClose} openModal={openModal} />
                        </div>
                    </div>
                </div>
            ):(
                router.push('/login')
            )}
        </>
    );
}