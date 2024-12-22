import {FormInfoType, ModalType} from "../app/Types/useTypes"
import { IoIosClose } from "react-icons/io";
// useFrom et SubmitHandler sont des fonction de reactForm
import {useForm, SubmitHandler} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { validationShemaInfo } from "@/app/schema/FormShemaInfo";
import { useState, useEffect } from "react";    
//cela servira a envoyer l'image dans notre storage
import { useFireBaseInfo } from "@/app/context/dataContextInfo";
import { toast } from "react-toastify";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";



export default function FormInfo({openModal, isUpdate, onClose, info}: ModalType) {


    const {infos, addInfo, updateInfo} = useFireBaseInfo()


    //Destituring du hook "userForm" qui doit respecter "FormType"
    //Ceci consiste a lier "useForm" à "validationShema"
    const {handleSubmit, register, reset, formState:{errors}}=useForm<FormInfoType>({
        resolver: yupResolver(validationShemaInfo)
    })

    //ceci pour afficher les informations dans les champs correspondant(Modification)
    useEffect(()=>{
        if(isUpdate && info){
            /*c'est grace les information de la BDD qui vont s'afficher 
            dans les champs correspondant*/
            reset(info)
        }
    }, [isUpdate, info, reset])


    //soumettre le formaire
    const onSubmit: SubmitHandler<FormInfoType> = async(formData) =>{
        try{

            if(isUpdate && info){
                updateInfo({...formData, id: info.id})
            }else{
                
                // verification de seminaire
                const found = infos.some(info => info.theme === formData.theme);
                if (!found) {
                    addInfo({...formData})
                }else{
                    toast.error("Ce seminaire existe deja")
                }
            }
            //on ferme le modal apres validation
            //Vider les champs
            document.getElementById("formInfo").reset();
            onClose();
            

        }catch(error){
            console.error("Erreur lors de l'ajout du formulaire")
        }
    }




    return (
        <>
        {openModal && (

            <div className="absolute top-0 left-0 z-40 grid h-screen w-full place-items-center backdrop-blur">

                    <div className=" relative z-50 m-auto  bg-white p-4 shadow-lg border border-gray-800 rounded-md">
                        <div className="flex justify-end">
                            <IoIosClose className="self-end text-2xl cursor-pointer" onClick={onClose}/>
                        </div>
                        <form id="formInfo" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                                <div className="flex gap-5">
                                    <div className="flex flex-col w-[50%]">
                                            <input {...register("infoType")} id="infoType" placeholder="Type d'information" className=" theme border w-[100%] border-gray-300 p-2 rounded-md"/>
                                            {errors.infoType && <span className="text-red-500 block">{errors.infoType.message}</span>}
                                    </div>

                                    <div className="flex flex-col w-[50%]">
                                        <input {...register("theme")} id="theme" placeholder="theme" className=" theme border w-[100%] border-gray-300 p-2 rounded-md"/>
                                        {errors.theme && <span className="text-red-500 block">{errors.theme.message}</span>}
                                    </div>
                                </div>


                                <div className="flex gap-5">
                                    <div className="flex flex-col w-[50%]">
                                        <input {...register("intervenant")} id="intervenant" placeholder="Your intervenant... " className="  mt-5 md:mt-0  w-full intervenant block border border-gray-300 p-2 rounded-md"/>
                                        {errors.intervenant && <span className="text-red-500">{errors.intervenant.message}</span>}
                                    </div>
    
                                    <div className="flex flex-col w-[50%]">
                                        <input {...register("cible")} id="cible" placeholder="your cible...." className=" cible border w-[100%] border-gray-300 p-2 rounded-md"/>
                                        {errors.cible && <span className="text-red-500 block">{errors.cible.message}</span>}
                                    </div>
                                </div>


                                <div className="flex gap-5 w-full">
                                    <div className="flex w-[50%] flex-col">
                                        <div className=" flex justify-center font-semibold">
                                            Date du jour
                                        </div>
                                        <div className="flex gap-4 ">
                                            <div className="flex flex-col ">
                                                <label htmlFor="dateDebutFirst">Debut</label>
                                                {/* <input {...register("date")} id="date" placeholder="Your date... " className="  mt-5 md:mt-0  w-full date block border border-gray-300 p-2 rounded-md"/> */}
                                                <DatePicker register={register} id="dateDebutFirst" />
                                                {errors.dateDebutFirst && <span className="text-red-500">{errors.dateDebutFirst.message}</span>}
                                            </div>
                                            <span className="flex items-center">à</span>
                                            <div className="flex flex-col">
                                                <label htmlFor="heureFinFirst"> Fin </label>
                                                <TimePicker register={register} id="heureFinFirst" />
                                                {errors.heureFinFirst && <span className="text-red-500">{errors.heureFinFirst.message}</span>}
                                            </div>
                                        </div>
                                    </div>
    

                                    <div className="flex w-[50%] flex-col">
                                        <div className=" flex justify-center font-semibold">
                                            Date du suivant
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex flex-col">
                                                <label htmlFor="dateDebutSecond">Debut</label>
                                                {/* <input {...register("date")} id="date" placeholder="Your date... " className="  mt-5 md:mt-0  w-full date block border border-gray-300 p-2 rounded-md"/> */}
                                                <DatePicker register={register} id="dateDebutSecond" />
                                            </div>
                                            <span className="flex items-center">à</span>
                                            <div className="flex flex-col">
                                                <label htmlFor="heureFinSecond">Fin</label>
                                                <TimePicker register={register} id="heureFinSecond"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex flex-col ">
                                    <input {...register("lieu")} id="lieu" placeholder="Your lieu... " className="  mt-5 md:mt-0  w-full lieu block border border-gray-300 p-2 rounded-md"/>
                                    {errors.lieu && <span className="text-red-500">{errors.lieu.message}</span>}
                                </div>

                                <div className="flex flex-col">
                                    <textarea rows="6" {...register("description")} id="description" placeholder="Your description.... " className="  mt-5 md:mt-0  w-full description block border border-gray-300 p-2 rounded-md"/>
                                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                                </div>
    
                                
                                <div className="w-full grid place-items-center mt-2 mb-2">
                                    <button className=" block button text-white bg-gray-700 hover:bg-gray-900 rounded-md p-3">
                                        {isUpdate ? "Modifier la ": "Ajouter la"} information
                                    </button>
                                </div>
                        </form>
                    </div>
            </div>

        )}
                
        </>
    )
}
