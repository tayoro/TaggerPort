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
import {addDoc, doc, collection, onSnapshot, updateDoc, serverTimestamp, deleteDoc ,orderBy , query} from "firebase/firestore"

import {db} from "@/app/db/firebaseConfig"
import {DataPortfolioType, DbContextType} from "@/app/Types/useTypes"

//creation de notre context qui va respecter "DbContextType" qui debute a null 
const PortfoliosContext = createContext<DbContextType | null>(null);

// l'utilisation de la base de données 
export const useFireBasePortfolio = () => {
    //utilisation de context
    const context = useContext(PortfoliosContext)
    if(!context){
        throw new Error('Erreur lors de la creation du context')
    }
    return context;
}

//Ceci nous servira a enveloper notre composant et a donner accès a toute nos fonction et tout ce qu'on qui sera dans notre hook
export const PortfoliosProvider: React.FC<{children: React.ReactDOM}> = ({children}) =>{

    //State
    const [portfolios, setPortfolios] = useState<DataPortfolioType[]>([]);
    
    useEffect(() => {
        /*Fonction pour la requete d'insersion automatiq (mettre tous les utilisateurs dans un tableau) 
        pour les recupere et les transmtre dans toute l 'application*/
        const collectionRef = collection(db, 'portfolios');
        const q = query(collectionRef, orderBy("date", "desc"))

        const unsubcribe = onSnapshot(q, (snapshot)=>{
            //on creer un tableau pour recevvoir nos données 
            const portfoliosData: DataPortfolioType[] = []
            snapshot.forEach((doc) =>{
                // inserer les données dans le tableau
                portfoliosData.push({id: doc.id, ...doc.data()} as DataPortfolioType)
            })
            //on change state (de tableau vide a non vide)
            setPortfolios(portfoliosData)
        })
        return () => unsubcribe();
    }, [])


    //Fonction pour la CREATE(ajouter un membre dans la BDD)
    const addPortfolio = async (portfoliosData:Omit<DataPortfolioType, "id"> & {image: string} & {numero: any}) => {
            try {
                //requete pour acceder a la collection members
                const docRef = await addDoc(collection(db, "portfolios"),  {...portfoliosData, date: serverTimestamp()});
                //Nouveau membre
                const newContact: DataPortfolioType = {id: docRef.id, ...portfoliosData}
                //Modification du state
                setPortfolios([...portfolios, newContact])
                toast.success(`Telechargement de image ${portfoliosData.numero} reussi`)
                
            }catch(error){
                console.log("erreur Lors de la creeation", error)
            }
    }


    //Fonction pour la UPDATE(modifier un membre dans la BDD)
    const updatePortfolio = async (portfolio:DataPortfolioType) => {
        try {

            const updateElementList : DataPortfolioType[]= []
            for(let i=0; i < portfolios.length; i++){
                if(portfolios?.[i]?.titre === portfolio.titre){
                    updateElementList.push(portfolios?.[i])
                }
            }
            for(let j=0; j < updateElementList.length; j++){
                const memberRef = doc(db, "portfolios", updateElementList?.[j].id);
                await updateDoc(memberRef, portfolio)
                setPortfolios(portfolios.map((m)=> (m.id == updateElementList?.[j].id ? {...m, ...updateElementList?.[j]}: m)))
                toast.success("Modifier avec succès")
            }

            // updateElementList.forEach(async(element)=>{

            //     console.log(portfolio)
            //     const memberRef = doc(db, "portfolios", element.id);

            //     await updateDoc(memberRef, portfolio)
            //     //dans le tableau des membres , on recupere le membre qui a l'id qui coresspond a l'id utilisateur
            //     setPortfolios(portfolios.map((m)=> (m.id === portfolio.id ? {...m, ...portfolio}: m)))
            //     toast.success("Portfolio Modifier")
            // })

        
            //requete pour acceder a la collection members et on recupere id 
            
        }catch(error){
            console.log("erreur Lors de la modification", error)
        }
    }


    //Fonction pour la DELETE(supprimer un membre dans la BDD)
    const deletePortfolio = async (id: string) => {
        try {
            await deleteDoc(doc(db, "portfolios", id))
            //on return les membres seulment si member.id est different de id
            setPortfolios(portfolios.filter((portfolio)=> portfolio.id !== id))
            toast.success("Element de portfolio supprimé")
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }


    const deletePortfolioMultiple = async (titre: any) => {
        try {
            const listeDelete =[]
            for(let i=0; i < portfolios.length; i++){
                if(portfolios?.[i]?.titre === titre){
                    listeDelete.push(portfolios?.[i]?.id)
                }
                console.log(listeDelete)
            }
            const promises = listeDelete.map((docId) => deleteDoc(doc(db, "portfolios", docId)))
            await Promise.all(promises)
                
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }
    const deleteAllportfolio = async () =>{
        try {
            const promises = portfolios.map((docId) => deleteDoc(doc(db, "portfolios", docId.id)))
            await Promise.all(promises)
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }


    const deleteSelectePortfolio = async (listeSelecteDelete: string[]) =>{
        try {   
            const listeADelete: any[] =[]
            listeSelecteDelete.forEach(item => {
                portfolios.forEach(portfo => {
                    if(portfo.titre === item){
                        listeADelete.push(portfo.id)
                    }
                })
            })
            console.log(listeADelete)
            const promises = listeADelete.map((docId) => deleteDoc(doc(db, "portfolios", docId)))
            await Promise.all(promises)
            
        }catch(error){
            console.log("erreur Lors de la suppression", error)
        }
    }



    const addImagePortfolio = async (portfoliosData:Omit<DataPortfolioType, "id"> & {image: string} & {numero: any} & {titre: any} & {desc: any})=>{
        
        try{
            const elementList : DataPortfolioType[]= []
            for(let i=0; i < portfolios.length; i++){
                if(portfolios?.[i]?.titre === portfoliosData.titre){
                    elementList.push(portfolios?.[i])
                }
            }
            const nombreElementListe = elementList.length + 1
            console.log(`${nombreElementListe} element trouver`)
            console.log(`${portfoliosData.numero} element trouver`)
    
            const docRef = await addDoc(collection(db, "portfolios"),  {...portfoliosData, numero: portfoliosData.numero + nombreElementListe, date: serverTimestamp()});
            
            const newContact: DataPortfolioType = {id: docRef.id, ...portfoliosData}
            setPortfolios([...portfolios, newContact])
            toast.success(`Telechargement de image ${portfoliosData.image} reussi`)

        }catch(error){
            console.log("erreur Lors de la creeation", error)
        }
        
    }

    const value = {
        portfolios,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        deletePortfolioMultiple,
        deleteAllportfolio,
        deleteSelectePortfolio,
        addImagePortfolio,
    }

    return <PortfoliosContext.Provider value={value}>{children}</PortfoliosContext.Provider>
}