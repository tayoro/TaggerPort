import React from 'react'
//npm i zod react-hook-form @hookform/resolvers react-toastify

//Validation du schema, verifier les données avant de les envoyer
import { z } from 'zod';
// Pour mettre en place notre formulaire
import { useForm } from 'react-hook-form';
//une bibliotech pour la vidation schema
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"
import {auth, db} from "../app/db/firebaseConfig"
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';


//gerer le type de nos données 
interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

//Pour gerer la validation de nos deonnées avec zod
const formShema = z.object({
    //on veut , un caractere string , 1 caractere minimun
    //sinon on envoie un message :"Ce champs est requis"
    email: z.string().min(1, {message: "Ce champs est requis"}).email("Format non valide").max(300, {message: "Votre email doit faire au minimum 300 caractere"}),
    //6 caractere minimum
    password: z.string().min(6, {message: "Le mot de passe doit contenir au minimum 6 caracteres"}),
    confirmPassword: z.string().min(6, {message: "Le mot de passe doit contenir au minimum 6 caracteres"}),
}).refine(({confirmPassword, password}) => {
    return confirmPassword === password;
}, {
    //Si confirmPassword !== password alors:
    message: "Les mots de passe ne correspondent pas ",
    //On lie le message d'erreur a confirm pass
    path: ["confirmPassword"]
})

//fonction pour envoyer l'utilisateur dans Firestore
async function addUserToFirestore(userId: string, email: string) {
    try{
        //on recupere la ref , doc pour connecter notre database avec db, "user", userId
        const userRed = doc(db, "users", userId)

        //modification de reference en ajoutant(push) l'email
        await setDoc(userRed, {
            email: email,
        })


    }catch(error)
    {
        console.log(error);   
    }
}



export default function FormRegister() {

    const router = useRouter()

    // destituring pour la recuperation des varribale . comme par example: useSate
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(formShema),
        //Les values par defaut
        defaultValues: {
            email: '',
            password: '',
        }
    })


    //Submit
    async function onSubmit(values: z.infer<typeof formShema>) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)

            //recupere l'utilisateur
            const user = userCredential.user;

            //ajout dans le firestore
            await addUserToFirestore(user.uid, values.email)

            //Renvois l'utilisateur vers la page dashbord
            router.push("/dashboard")

            // toast d'information
            toast.success("compte creer avec success")

        }catch(error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[800] flex flex-col gap-2 bg-slate-50 p-5 rounded-md shadow-md'>
                <label className='text-slate-900'>Email</label>
                <input {...register('email')} type="email" className="h-10 border border-slate-900 p-4 rounded-md" />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                <label className='text-slate-900'>Password</label>
                <input {...register('password')} type="password" className="h-10 border border-slate-900 p-4 rounded-md" />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                <label className='text-slate-900'>Confirmer le password</label>
                <input {...register('confirmPassword')} type="password" className="h-10 border border-slate-900 p-4 rounded-md" />
                {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}

                <button type="submit" className="bg-gray-600 text-white px-3 py-1.5 my-3 rounded-md hover:bg-gray-700">Inscription</button>

                <Link href="/login" className='text-red-500 hover:text-red-600 flex justify-center'>Deja un compte? Connectez-vous</Link>
            </form>
        </div>
    )
}

