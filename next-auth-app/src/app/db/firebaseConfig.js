
import { initializeApp } from "firebase/app";

//permetre de lire et enregistrer les medias
import {getStorage} from "firebase/storage"

//permetre de lire et enregistrer des données dans notre DB
import {getFirestore} from "firebase/firestore"

//Pour l'authentifaction 
import {getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//permettre d'acceder au collection de pouvoir de faire de la lecture et de l'ecriture 
export const db = getFirestore(app)

//Pour l'authentifaction
export const auth = getAuth(app)

//Pour stocker les medias 
export const storage = getStorage(app)
