"use server"
// Pour envoie de mail automatique 
import React from "react"
import { KoalaWelcomeEmail } from "@/emails/MagicLinks"

import { FormContactType } from "@/app/Types/useTypes"
import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const SendEmail = async (values: FormContactType)=>{
    try{
        const {error } = await resend.emails.send({
            from: 'tagpixi@resend.dev',
            to: ['romarictayorog@gmail.com'],
            subject: values.sujet,
            replyTo: values.email,
            react: React.createElement(KoalaWelcomeEmail), // creer un element react pour implementer un composante Ts dans composante react
            //html:`<h1>bonjour romaric</h1>`,
        });
        
        if (error) {
            console.error(error);
            throw new Error('Error sending Email')
        }

    }catch(error){
        console.log(error)
        throw new Error('Error sending email')
    }
}