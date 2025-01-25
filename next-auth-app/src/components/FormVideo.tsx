import { FormType, ModalType } from "../app/Types/useTypes"
import { IoIosClose } from "react-icons/io";
// useFrom et SubmitHandler sont des fonction de reactForm
import {useForm, SubmitHandler} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { validationShema } from "../app/schema/FormShema";
import { useState, useEffect } from "react";
import { useFireBase } from "../app/context/dataContext";
//cela servira a envoyer l'image dans notre storage
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage"
import { storage } from "../app/db/firebaseConfig";
import { toast } from "react-toastify";



export default function FormVideo({openModal, isUpdate, onClose, video}: ModalType) {


    const [fileVideo, setFileVido] = useState<File | undefined>()

    const {videos,addVideo, updateVideo} = useFireBase()

    const [progress, setProgress] = useState<number>(0)

    
    //activer le bouton d'envoie
    const [active, setActive] = useState(true)


    //Destituring du hook "userForm" qui doit respecter "FormType"
    //Ceci consiste a lier "useForm" à "validationShema"
    const {handleSubmit, register, reset, formState:{errors}}=useForm<FormType>({
        resolver: yupResolver(validationShema)
    })


    // Capter le changement de la video
    const handleChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectFile = e.target.files?.[0];
        setFileVido(selectFile)
        setActive(!active)
        
    }

    //ceci pour afficher les informations dans les champs correspondant(Modification)
    useEffect(()=>{
        if(isUpdate && video){
            /*c'est grace les information de la BDD qui vont s'afficher 
            dans les champs correspondant*/
            reset(video)
        }
    }, [isUpdate, video, reset])


    // surveiller la openModal pour desactiver le bouton
    useEffect(()=>{
        if(openModal){
            setActive(true)
        }

        if(openModal && isUpdate){
            setActive(false)
        }
    },[openModal])


    
    
    //soumettre le formaire
    const onSubmit: SubmitHandler<FormType> = async(formData) =>{
        try{   
            let videoUrl = '';
            
            if(fileVideo){
                //recupere la reference de la video
                const videoRef = ref(storage, `videos/${fileVideo.name}`)
                
                //Pour envoyer la video
                const uploadTask = uploadBytesResumable(videoRef, fileVideo)
                
                uploadTask.on(
                    "state_changed",
                    (snapshot : any) => {
                        const prog = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
                        );
                        setProgress(prog);
                    },
                    (error: any) => console.log(error),
                    async() => {
                        const videoUrl= await getDownloadURL(uploadTask.snapshot.ref)
                        // verification de video, si la video exite ou pas 
                        const found = videos.some(tuto => tuto.titre === formData.titre);
                        if (!found) {
                            addVideo({...formData, video: videoUrl})
                            document.getElementById("formVideo").reset();
                            //apres enregisterement on ferme le formulaire
                            onClose();
                        }else{
                            toast.error("Ce tuto existe deja")
                        }
                    }
                );
                
            }else{
                videoUrl = video?.video || "";
                setActive(true)
            }

            if(isUpdate && video){
                updateVideo({...formData, id: video.id , video: videoUrl})
            }
            
            //on ferme le modal apres validation
            

        }catch(error){
            console.error("Erreur lors de l'ajout du formulaire")
        }
    }




    return (
        <div>
            {openModal && (
                <div className="absolute top-0 left-0 z-40 grid h-screen w-full place-items-center backdrop-blur">
                    <div className={`${isUpdate && "sm:w-[600px]"} max-w-[300px] sm:max-w-[700px] relative z-50 m-auto min-h-[200px] bg-white p-4 shadow-lg border border-gray-800 rounded-md`}>
                        <div className="flex justify-end">
                            <IoIosClose className="self-end text-2xl cursor-pointer" onClick={onClose}/>
                        </div>
                        <form id="formVideo" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">

                                <label htmlFor="titre">Titre</label>
                                <input {...register("titre")} id="titre" className=" border border-gray-300 p-2 rounded-md"/>
                                {errors.titre && <span className="text-red-500">{errors.titre.message}</span>}

                                <label htmlFor="video">Video</label>
                                <input onChange={handleChangeVideo} accept="video/mp4 video/x-m4v video/*" type="file" id="image" className={`border border-gray-300 p-2 rounded-md ${isUpdate && "hidden"} `}/>

                                <label htmlFor="desc">Description</label>
                                <textarea {...register("desc")} id="desc" rows="5" placeholder="Petite description de la video...." className="border border-gray-300 p-2 rounded-md"> </textarea>
                                {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}

                                <button className={`text-white bg-gray-700 hover:bg-gray-900 rounded-md p-3 ${active ? "opacity-5" : "opacity-[1]"} `} disabled={active}>
                                    {isUpdate ? "Modifier la ": "Ajouter la"} video
                                </button>
                            </form>

                        
                            <div className={`w-[100%] mt-[2px] flex items-center relative ${isUpdate && "hidden"} }` }>
                                <progress value={progress} max="100" className="w-[100%] h-[20px] "/> 
                                <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-10 ">{progress}% </div>
                            </div>
                    </div>
                </div>
            )}
        
        </div>
    )
}
