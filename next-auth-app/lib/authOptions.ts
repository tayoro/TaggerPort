/* NextAuthOptions est un objet utiliser pour configurer les options 
et les comportements de Next-auth dans une aplication */
import {NextAuthOptions} from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import {auth} from "../src/app/db/firebaseConfig"
import Email from "next-auth/providers/email";
import { signInWithEmailAndPassword } from "firebase/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        //Github
        GithubProvider ({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        //Google
        GoogleProvider ({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined,   req: any){
                if (!credentials){
                    return null
                }
                try {
                    // signInWithEmailAndPassword : pour enregistrer les utilisateurs 
                    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

                    // recuperer l'utilisateur identifier
                    const user = userCredential.user

                    if(user){
                        return{
                            id: user.uid,
                            email: user.email
                        };  
                    }else{
                        return null;
                    }
                }catch(error: any){
                    console.error(error.message)
                    return null
                }
            } 
            
        })
    ],// definir les callbacks pour gerer les jetons jwt
    callbacks: {
        jwt: async ({user, token, trigger, session}) => {
            // si le declencheur est modifié
            if(trigger === "update"){
                //return les session de mise a jour avec la session de l'utilisation
                return {...token, ...session.user};
            }
            return {...token, ...user}
        }
    }
}