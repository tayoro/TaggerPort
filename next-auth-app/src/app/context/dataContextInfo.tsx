"use client"

//npm i react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

//createContext pour creer context
//use Context pour utilser me context
//useEffect pour gerer les effet de bord 
//useState pour gerer le state
import {createContext, useContext, useEffect, useState} from "react"

//collection pour accéder a la collection
//onSnapshot pour les requètes 
//doc pour accéder au donnée 
import {addDoc, doc, collection, onSnapshot, updateDoc, serverTimestamp, deleteDoc, query, orderBy} from "firebase/firestore"

import {db} from "@/app/db/firebaseConfig"
import {DataInfoType, DbContextType} from "@/app/Types/useTypes"


//creation de notre context qui va respecter "DbContextType" qui debute a null 
const DataContextInfo = createContext<DbContextType | null>(null);

// l'utilisation de la base de données 
export const useFireBaseInfo = () => {
    //utilisation de context
    const context = useContext(DataContextInfo)
    if(!context){
        throw new Error('Erreur lors de la creation du context')
    }
    return context;
}

//Ceci nous servira a enveloper notre composant et a donner accès a toute nos fonction et tout ce qu'on qui sera dans notre hook
export const InfoProvider: React.FC<{children: React.ReactDOM}> = ({children}) =>{

    //State
    const [infos, setInfos] = useState<DataInfoType[]>([]);
    
    useEffect(() => {
        /*Fonction pour la requete d'insersion automatiq (mettre tous les utilisateurs dans un tableau) 
        pour les recupere et les transmtre dans toute l 'application*/
        const collectionRef = collection(db, 'infos');
        const q = query(collectionRef, orderBy("createAt", "desc"))

        const unsubcribe = onSnapshot(q, (snapshot)=>{
            //on creer un tableau pour recevvoir nos données 
            const infosData: DataInfoType[] = []
            snapshot.forEach((doc) =>{
                // inserer les données dans le tableau
                infosData.push({id: doc.id, ...doc.data()} as DataInfoType)
            })
            //on change state (de tableau vide a non vide)
            setInfos(infosData)
        })
        return () => unsubcribe();
    }, [])


    //Fonction pour la CREATE(ajouter un membre dans la BDD)
    const addInfo = async (infosData:Omit<DataInfoType, "id">) => {
            try {

                //requete pour acceder a la collection members
                const docRef = await addDoc(collection(db, "infos"), {...infosData, createAt: serverTimestamp()});
                //Nouveau membre
                const newInfo: DataInfoType = {id: docRef.id, ...infosData}
    
                //Modification du state
                setInfos([...infos, newInfo])
                toast.success("Info ajouté")
                
    
            }catch(error){
                console.log("erreur Lors de la creeation", error)
            }
    
        
    }


    //Fonction pour la UPDATE(modifier un membre dans la BDD)
    const updateInfo = async (info:DataInfoType) => {
        try {
            //requete pour acceder a la collection members et on recupere id 
            const memberRef = doc(db, "infos", info.id);
            
            await updateDoc(memberRef, info)
            //dans le tableau des membres , on recupere le membre qui a l'id qui coresspond a l'id utilisateur
            setInfos(infos.map((i)=> (i.id === info.id ? {...i, ...info}: i)))
            toast.success("Info Modifier")

        }catch(error){
            console.log("erreur Lors de la modification", error)
        }
    }


    //Fonction pour la DELETE(supprimer un membre dans la BDD)
    const deleteInfo = async (id: string) => {
        try {
            await deleteDoc(doc(db, "infos", id))
            //on return les membres seulment si member.id est different de id
            setInfos(infos.filter((info)=> info.id !== id))
            toast.success("info supprimé")
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }


    const value = {
        infos,
        addInfo,
        updateInfo,
        deleteInfo,
    }

    return <DataContextInfo.Provider value={value}>{children}</DataContextInfo.Provider>
}