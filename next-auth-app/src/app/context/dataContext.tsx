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
import {addDoc, doc, collection, onSnapshot, updateDoc, Timestamp, serverTimestamp, deleteDoc, query, orderBy} from "firebase/firestore"

import {db} from "@/app/db/firebaseConfig"
import {DataType, DbContextType} from "@/app/Types/useTypes"

//creation de notre context qui va respecter "DbContextType" qui debute a null 
const MembersContext = createContext<DbContextType | null>(null);

// l'utilisation de la base de données 
export const useFireBase = () => {
    //utilisation de context
    const context = useContext(MembersContext)
    if(!context){
        throw new Error('Erreur lors de la creation du context')
    }
    return context;
}

//Ceci nous servira a enveloper notre composant et a donner accès a toute nos fonction et tout ce qu'on qui sera dans notre hook
export const MembersProvider: React.FC<{children: React.ReactDOM}> = ({children}) =>{

    //State
    const [videos, setVideos] = useState<DataType[]>([]);
    
    useEffect(() => {
        /*Fonction pour la requete d'insersion automatiq (mettre tous les utilisateurs dans un tableau) 
        pour les recupere et les transmtre dans toute l 'application*/
        const collectionRef = collection(db, 'videos');
        const q = query(collectionRef, orderBy("date", "desc"))

        const unsubcribe = onSnapshot(q, (snapshot)=>{
            //on creer un tableau pour recevvoir nos données 
            const videosData: DataType[] = []
            snapshot.forEach((doc) =>{
                // inserer les données dans le tableau
                videosData.push({id: doc.id, ...doc.data()} as DataType)
            })
            //on change state (de tableau vide a non vide)
            setVideos(videosData)
        })
        return () => unsubcribe();
    }, [])


    //Fonction pour la CREATE(ajouter un membre dans la BDD)
    const addVideo = async (videosData:Omit<DataType, "id"> & {video: string}) => {
            try {

                //requete pour acceder a la collection members
                const docRef = await addDoc(collection(db, "videos"),  {...videosData, date: serverTimestamp()});
                //Nouveau membre
                const newContact: DataType = {id: docRef.id, ...videosData}
                //Modification du state
                setVideos([...videos, newContact])
                toast.success("Video ajouté")

            }catch(error){
                console.log("erreur Lors de la création", error)
            }
    
        
    }


    //Fonction pour la UPDATE(modifier un membre dans la BDD)
    const updateVideo = async (video:DataType) => {
        try {
            //requete pour acceder a la collection members et on recupere id 
            const memberRef = doc(db, "videos", video.id);
            
            await updateDoc(memberRef, video)
            //dans le tableau des membres , on recupere le membre qui a l'id qui coresspond a l'id utilisateur
            setVideos(videos.map((m)=> (m.id === video.id ? {...m, ...video}: m)))
            toast.success("Video Modifier")

        }catch(error){
            console.log("erreur Lors de la modification", error)
        }
    }


    //Fonction pour la DELETE(supprimer un membre dans la BDD)
    const deleteVideo = async (id: string) => {
        try {
            await deleteDoc(doc(db, "videos", id))
            //on return les membres seulment si member.id est different de id
            setVideos(videos.filter((video)=> video.id !== id))
            toast.success("Video supprimé")
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }

    const deleteAllvideo = async () =>{
        try {
            const promises = videos.map((docId) => deleteDoc(doc(db, "videos", docId.id)))
            await Promise.all(promises)
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }

    const deleteSelecteVideo = async (listeSelecteDelete: string[]) =>{
        try {   
            const listeADelete: any[] =[]
            listeSelecteDelete.forEach(item => {
                videos.forEach(video => {
                    if(video.titre === item){
                        listeADelete.push(video.id)
                    }
                })
            })
            console.log(listeADelete)
            const promises = listeADelete.map((docId) => deleteDoc(doc(db, "videos", docId)))
            await Promise.all(promises)
            
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }

    const value = {
        videos,
        addVideo,
        updateVideo,
        deleteVideo,
        deleteAllvideo,
        deleteSelecteVideo,
    }

    return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
}