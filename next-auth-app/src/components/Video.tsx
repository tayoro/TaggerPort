import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { DataType } from '../app/Types/useTypes';
import { useFireBase } from '../app/context/dataContext';
import { useRouter } from "next/navigation";
import NoSsr from './NoSsr';
import {useSession} from "next-auth/react"
import styles from "@/app/styles/pages/home.module.css"
import * as moment from 'moment'


export default function Video({video, videoSelectionner, setVideoSelectionner} : {video: DataType, videoSelectionner?: string[], setVideoSelectionner?:any}) {

    const {data: session} = useSession()
    const {videos, deleteVideo} = useFireBase()
    const router = useRouter()

    const handleCheckboxChange = (e : any)=>{
        const value = e.target.value

        if (e.target.checked){
            for(let i=0; i < videos.length; i++){
                if(videos?.[i]?.titre === value){
                    setVideoSelectionner([
                        ...videoSelectionner,
                        value  
                    ])
                }
            }
        }else{
            setVideoSelectionner(videoSelectionner.filter(item => item !== value));
        }
    }

    const seconds = Math.floor((new Date() - video.date) / 1000);
    const interval = Math.floor(seconds / 86400);

    // console.log(interval)

    var timeSince = function(date: any) {
        if (typeof date !== 'object') {
            date = new Date(date);
        }

        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;

        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            intervalType = 'an';
        } else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
            intervalType = 'mois';
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                intervalType = 'jour';
            
                } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "heure";
                    
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                    intervalType = "minute";
                    
                    } else {
                    interval = seconds;
                    intervalType = "";
                    }
                }
                }
            }
            }
        
            if (interval > 1 || interval === 0) {
            intervalType += '';
            }
            
            
            return "il y'a" + ' '+ interval + ' ' + intervalType;
        };
    
    //   console.log(timeSince(video.date?.seconds * 1000 ))



    return (
    <>
        <div className={`${styles.video} relative my-[0px] w-[300px] md:h-[290px] mx-[5px] rounded-t-lg xl:w-[250px]  transition-timing-function: cubic-bezier(0, 0, 0.2, 1) overflow-hidden  `}>
        { session && (<>
                        <div className='absolute right-0 z-10'>
                            <RxCross2 
                            onClick={() => {
                                var resultat = confirm("voulez-supprimer cette video ?")
                                if(resultat === true ){
                                    deleteVideo(video.id)
                                }
                            }} 
                            className="text-white text-[25px] bg-red-600  cursor-pointer rounded-md hover:w-9 hover:h-9 "/>
                        </div>

                        <input 
                            type="checkbox" 
                            value={video.titre}
                            className="form-check-input absolute left-1 top-1 z-10"
                            onChange={handleCheckboxChange} 
                        />
                    </>)}

                    


                <div className="w-[100%] h-[150px] rounded-[15px] md:w-[100%] overflow-hidden  ">
                    <video onContextMenu={(e:any) => e.preventDefault()} onClick={()=>{router.push(`dashboard/${video.titre.replaceAll(" ","-")}`)}}  autoPlay loop muted src={video.video} className='w-[100%] h-full object-cover cursor-pointer rounded-[5%] hover:scale-[1.1]'/>
                </div>

                <div className="w-[100%] h-[calc(100%-150px)]  p-[10px] bg-[#F2F2F2] relative z-[1] flex flex-col ">
                    <div onClick={()=>{router.push(`dashboard/${video.titre.replaceAll(" ","-")}`)}} className="mb-2 cursor-pointer">
                        <span className=''>{video.titre?.charAt(0).toUpperCase()}{video.titre?.slice(1)} </span>
                    </div>
                    
                    <div className="flex justify-between pb-2">  
                        <span className=''>
                            {/* {new Date(Number(video.date?.seconds * 1000)).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",})}  */}

                            {/* { moment(video.date?.seconds  * 1000 ).locale('fr').fromNow()}  */}

                            { interval !== 1 ? timeSince(video.date?.seconds * 1000 ) : timeSince(video.date?.seconds * 1000 ) + "s"} 

                            {/* {timeSince(video.date?.seconds * 1000 ) === "il y\a 2 mois" ? timeSince(video.date?.seconds * 1000 ) : timeSince(video.date?.seconds * 1000 )} */}

                        </span>
                    </div>
                    
                    
                </div>
        </div>
        
    </>
    )
}
