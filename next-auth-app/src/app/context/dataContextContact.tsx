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
import {addDoc, doc, collection, onSnapshot, serverTimestamp, deleteDoc} from "firebase/firestore"

import {db} from "@/app/db/firebaseConfig"
import {DataContactType, DbContextType} from "@/app/Types/useTypes"


//creation de notre context qui va respecter "DbContextType" qui debute a null 
const DataContextContact = createContext<DbContextType | null>(null);

// l'utilisation de la base de données 
export const useFireBaseContact = () => {
    //utilisation de context
    const context = useContext(DataContextContact)
    if(!context){
        throw new Error('Erreur lors de la creation du context')
    }
    return context;
}

//Ceci nous servira a enveloper notre composant et a donner accès a toute nos fonction et tout ce qu'on qui sera dans notre hook
export const ContactProvider: React.FC<{children: React.ReactDOM}> = ({children}) =>{

    //State
    const [contacts, setContacts] = useState<DataContactType[]>([]);
    
    useEffect(() => {
        /*Fonction pour la requete d'insersion automatiq (mettre tous les utilisateurs dans un tableau) 
        pour les recupere et les transmtre dans toute l 'application*/
        const unsubcribe = onSnapshot(collection(db, 'contacts'), (snapshot)=>{
            //on creer un tableau pour recevvoir nos données 
            const contactsData: DataContactType[] = []
            snapshot.forEach((doc) =>{
                // inserer les données dans le tableau
                contactsData.push({id: doc.id, ...doc.data()} as DataContactType)
            })
            //on change state (de tableau vide a non vide)
            setContacts(contactsData)
        })
        return () => unsubcribe();
    }, [])


    //Fonction pour la CREATE(ajouter un membre dans la BDD)
    const addContact = async (contactsData:Omit<DataContactType, "id">) => {
            try {

                //requete pour acceder a la collection members
                const docRef = await addDoc(collection(db, "contacts"), {...contactsData, date: serverTimestamp()});
                //Nouveau membre
                const newConact: DataContactType = {id: docRef.id, ...contactsData}
    
                //Modification du state
                setContacts([...contacts, newConact])
                toast.success("Envoie de message avec succès")
                
    
            }catch(error){
                console.log("erreur Lors de l'envoie du message ", error)
            }
    
        
    }



    //Fonction pour la DELETE(supprimer un membre dans la BDD)
    const deleteContact = async (id: string) => {
        try {
            await deleteDoc(doc(db, "contacts", id))
            //on return les membres seulment si member.id est different de id
            setContacts(contacts.filter((contact)=> contact.id !== id))
            toast.success("Message supprimé")
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }

    const deleteAllcontact = async () =>{
        try {
            const promises = contacts.map((docId) => deleteDoc(doc(db, "contacts", docId.id)))
            await Promise.all(promises)
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }

    const value = {
        contacts,
        addContact,
        deleteContact,
        deleteAllcontact,
    }

    return <DataContextContact.Provider value={value}>{children}</DataContextContact.Provider>
}