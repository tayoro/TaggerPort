import { DataPortfolioType, FormPortfolioType, ModalType } from "../app/Types/useTypes"
import { IoIosClose } from "react-icons/io";
// useFrom et SubmitHandler sont des fonction de reactForm
import {useForm, SubmitHandler} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

import { useState, useEffect } from "react";
//cela servira a envoyer l'image dans notre storage
import {ref, uploadBytes, getDownloadURL, uploadBytesResumable, getStorage} from "firebase/storage"
import { storage } from "../app/db/firebaseConfig";
import { useFireBasePortfolio } from "@/app/context/dataContextPortfolio";
import { validationShemaPortfolio } from "@/app/schema/FormShemaPortfolio";
import { toast } from "react-toastify";
import { update } from "firebase/database";



export default function FormPortfolio({openModal, isUpdate, onClose, image}: ModalType) {


    const [fileImages, setFileImages] = useState<any[] | null>()

    const [progress, setProgress] = useState([])
    

    const {portfolios, addPortfolio, updatePortfolio} = useFireBasePortfolio()

    const [active, setActive] = useState(true)



    //Destituring du hook "userForm" qui doit respecter "FormType"
    //Ceci consiste a lier "useForm" à "validationShema"
    const {handleSubmit, register, reset, formState:{errors}}=useForm<FormPortfolioType>({
        resolver: yupResolver(validationShemaPortfolio)
    })


    // Capter le changement de la video
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectFile = e.target.files;

        const newImages = []
        for (let i = 0; i < selectFile?.length; i++) {
            newImages.push(selectFile[i])
        }
        setFileImages(newImages)
        setActive(!active)
    }


    //ceci pour afficher les informations dans les champs correspondant(Modification)
    useEffect(()=>{
        if(isUpdate && image){
            /*c'est grace les information de la BDD qui vont s'afficher 
            dans les champs correspondant*/
            reset(image)
        }
    }, [isUpdate, image, reset])


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
    const onSubmit: SubmitHandler<FormPortfolioType> = async(formData) =>{
        try{   
            let imageUrl = '';
            
            if(fileImages){

                for (let i = 0; i < fileImages.length; i++) {
                    const fileImage = fileImages[i]
                     //recupere la reference de l'image
                    const imageRef = ref(storage, `portfolios/${fileImage.name}`)
                    //Pour envoyer l'image
                    const uploadTask = uploadBytesResumable(imageRef, fileImage)
                    //Telecharger l'image
                    //imageUrl = await getDownloadURL(imageRef)

                    uploadTask.on(
                        "state_changed",
                        (snapshot : any) => {
                            const prog = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100  
                            );
                            setProgress((prevProgress) => {
                                const newProgress: any = [...prevProgress]
                                newProgress[i] = prog.toFixed(2)
                                return newProgress
                            })
                            
                        },
                        (error: any) =>{ console.log(error)},
                        async() => {
                            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
                            
                                // verifie si portfolio existe deja
                                const found = portfolios.some(portfolio => portfolio.titre === formData.titre);
                                if (!found) {
                                    addPortfolio({...formData, image: imageUrl , numero: i+1})
                                }else{
                                    toast.error("portfolio existe deja")
                                }

                            
                        }
                        );  
                    } 
            }else{
                imageUrl = image?.image || "";
            }

            if(isUpdate && image ){
                updatePortfolio({...formData, id: image.id , image: imageUrl})
                console.log({...formData})
            }
            // else{
                
            //     // verifie si portfolio existe deja 
            //     const found = portfolios.some(portfolio => portfolio.titre === formData.titre);
            //     if (!found) {
            //         addPortfolio({...formData, image: imageUrl})
                
            //     }else{
            //         toast.error("portfolio existe deja")
                    
            //     }
            //}
            //on ferme le modal apres validation
            // if(progress === 100){
            onClose();
            // }
        }catch(error){
            console.error("Erreur lors de l'ajout du formulaire")
        }
    }




    return (
        <div>
            {openModal && (
                <div className="absolute top-0 left-0 z-40 grid h-screen w-full place-items-center backdrop-blur">
                    <div className="max-x-[700px] relative z-50 m-auto min-h-[200px] bg-white p-4 shadow-lg border border-gray-800 rounded-md w-[450px]">
                        <div className="flex justify-end">
                            <IoIosClose className="self-end text-2xl cursor-pointer" onClick={onClose}/>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">

                                <label htmlFor="titre">Titre</label>
                                <input {...register("titre")} id="titre" className="border border-gray-300 p-2 rounded-md"/>
                                {errors.titre && <span className="text-red-500">{errors.titre.message}</span>}

                                <label htmlFor="image">image</label>
                                <input onChange={handleChangeImage} multiple accept="video/mp4 video/x-m4v video/*" type="file" id="image" className={`border border-gray-300 p-2 rounded-md ${isUpdate && "hidden" }`}/>

                                <label htmlFor="desc">Description</label>
                                <textarea  {...register("desc")} id="desc" rows="5" placeholder="Petite description de la video...." className="border border-gray-300 p-2 rounded-md"> </textarea>
                                {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}

                                <button className={`text-white bg-gray-700 hover:bg-gray-900 rounded-md p-3   ${active ? "opacity-5" : "opacity-[1]"}`} disabled={active}>
                                    {isUpdate ? "Modifier  ": "Ajouter un portfolio "} 
                                </button>

                                
                            </form>
                            {/* <progress value={progress} max="100" className={`${progress < 100 ? "hidden" : "block"} w-full`}/> {progress}% */}

                            {progress.map((progress, i) => (
                                            <div key={i}>{fileImages?.[i]?.name}  {progress}%</div>
                            ))}
                    </div>
                </div>
            )}
        
        </div>
    )
}
