// collection vient de firebase
// addDoc pour rajouter dans notre BDD
import {collection, addDoc} from "firebase/firestore"

//On veut repondre avec le serveur
import { NextResponse } from "next/server"

import { db } from "../../../db/firebaseConfig"

//pour entrer l'utilisation dans la bd
export async function POST(request: Request) {
    try{
        //destructuration
        const {email, password} = await request.json()

        //npm i bcrypt , pour hash pour plus de securité
        const bcrypt = require('bcrypt')
        const hashedPassword = await bcrypt.hash(password, 10)

        //Pour push dans notre BDD
        // on accède a connexion db pour la connecter, dans une collection qu'on va apppler "users" 
        const userCollection = collection(db, "users")

        // rajouter dans notre BDD , userCollection avec addDoc 
        const userRef = await addDoc(userCollection, {
            email: email,
            password: hashedPassword
        });
        
        // return 
        return NextResponse.json({success: "Compte ajouté", userId: userRef.id})

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}