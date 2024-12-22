import {FormContactType} from "../app/Types/useTypes"
import { IoIosClose } from "react-icons/io";
// useFrom et SubmitHandler sont des fonction de reactForm
import {useForm, SubmitHandler} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { validationShemaContact } from "@/app/schema/FromShemaContact";
import { useState, useEffect } from "react";
import { useFireBase } from "../app/context/dataContext";
//cela servira a envoyer l'image dans notre storage
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { storage } from "../app/db/firebaseConfig";
import { useFireBaseContact } from "@/app/context/dataContextContact";
import styles from "@/app/styles/pages/formContact.module.css"
import { SendEmail } from "../../actions";



export default function FormConatct() {


    const {addContact} = useFireBaseContact()


    //Destituring du hook "userForm" qui doit respecter "FormType"
    //Ceci consiste a lier "useForm" à "validationShema"
    const {handleSubmit, register, formState:{errors}}=useForm<FormContactType>({
        resolver: yupResolver(validationShemaContact)
    })


    //soumettre le formaire
    const onSubmit: SubmitHandler<FormContactType> = async(formData) =>{
        try{
            //ajouter les données champs de formData
            addContact({...formData})

            //Vider les champs 
            document.getElementById("formContact").reset();
            
            //Envoie un message a l' email
            //await SendEmail(formData);
        }catch(error){
            console.error("Erreur lors de l'ajout du formulaire")
        }
    }




    return (
        <>
                <div className="grid place-items-center mx-[40px] pb-5 ">

                        <form id="formContact" onSubmit={handleSubmit(onSubmit)} className={`${styles.formCont} flex flex-col md:block bg-gray-200 px-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] w-full flex-wrap py-5`}>

                                
                                <div className="inline-block mb-5 md:w-[50%] md:pr-2 ">
                                    <input {...register("name")} id="name" placeholder="Your name " className=" name border w-[100%] border-gray-300 p-2 rounded-md"/>
                                    {errors.name && <span className="text-red-500 block">{errors.name.message}</span>}
    
                                </div>
                                <div className="inline-block md:w-[50%] md:pl-2">
                                    <input {...register("email")} id="email" placeholder="your email...." className=" email border w-[100%] border-gray-300 p-2 rounded-md"/>
                                    {errors.email && <span className="text-red-500 block">{errors.email.message}</span>}
    
                                </div>

                                <input {...register("sujet")} id="sujet" placeholder="Your subject.... " className="  mt-5 md:mt-0  w-full sujet block border border-gray-300 p-2 rounded-md"/>
                                {errors.sujet && <span className="text-red-500">{errors.sujet.message}</span>}

                            
                                <textarea {...register("message")} id="message" rows="5" placeholder="Message.... " className="mt-5 p-2 w-full block message border border-gray-300   rounded-md"></textarea>
                                {errors.message && <span className="text-red-500">{errors.message.message}</span>}

                                <div className="w-full grid place-items-center mt-5 mb-3">
                                    <button className=" block button text-white bg-orange-700 hover:bg-orange-900 rounded-md p-3">
                                        Envoyer message
                                    </button>
                                </div>
                        </form>
                </div>
        </>
    )
}
