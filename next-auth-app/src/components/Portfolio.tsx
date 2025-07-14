// import React, { useState } from 'react'

// import { DataPortfolioType } from '@/app/Types/useTypes'
// import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio'
// import { useSession } from 'next-auth/react';
// import { useRouter } from "next/navigation";
// import { RxCross2 } from "react-icons/rx";
// import { writeBatch, deleteDoc, doc } from "firebase/firestore";
// import {db, storage} from "@/app/db/firebaseConfig";
// import { toast } from 'react-toastify';
// import styles from "@/app/styles/pages/portfolio.module.css"

// import { useEffect } from 'react';

// export default function Portfolio({portfolio, imageSelectionner, setImageSelectionner} : {portfolio: DataPortfolioType, imageSelectionner: string[], setImageSelectionner:any}) {

//     const {data: session} = useSession()
//     const {portfolios, deletePortfolioMultiple} = useFireBasePortfolio()
//     const router = useRouter()
    

//     //console.log(portfolios)
    
    
//     const handleCheckboxChange = (e : any)=>{
//         const value = e.target.value

//         if (e.target.checked){
//             for(let i=0; i < portfolios.length; i++){
//                 if(portfolios?.[i]?.titre === value){
//                     setImageSelectionner([
//                         ...imageSelectionner,
//                         value  
//                     ])
//                 }
//             }
//         }else{
//             setImageSelectionner(imageSelectionner.filter(item => item !== value));
//         }
//     }

//     //console.log(imageSelectionner)


//     // selectionner les portfolios qui ont les meme titre 
//     const listeElementSelectionner =[]
//     for(let i=0; i < portfolios.length; i++){
//         if(portfolios?.[i]?.titre === portfolio.titre ){
//             listeElementSelectionner.push(portfolios?.[i]?.id)
//         }
//     }
    
//     return (
//     <>  

//         <div className= {`${styles.portfolio}  relative my-[20px] w-[300px] h-[270px] mx-[5px] rounded-t-lg xl:w-[250px]  transition-timing-function: cubic-bezier(0, 0, 0.2, 1) overflow-hidden  `}>
//             <div className='absolute top-3 left-3 z-10 '>
//                 <span className='bg-white rounded-[50%] p-2 w-10 h-10 flex items-center justify-center border-[2px] border-black'>{listeElementSelectionner.length}</span>
//             </div>
//             <div className="w-[100%] h-[150px] rounded-lg md:w-[100%] hover:scale-[1.1]">
//                 <img onClick={()=>{router.push(`portfolio/${portfolio.titre.replaceAll(" ","-")}`)}} src={portfolio.image} alt={portfolio.titre} className='w-[100%] h-[200px] object-cover cursor-pointer rounded-[5%]'/>
//             </div>
//             <input 
//                     type="checkbox" 
//                     value={portfolio.titre}
//                     className="form-check-input absolute right-2 top-2 z-10 cursor-pointer"
//                     onChange={handleCheckboxChange} 
//             />
//             <div className="w-[100%] h-[calc(100%-150px)]  p-[10px] bg-[#FFF] relative z-[1] ">
//                 <div onClick={()=>{router.push(`portfolio/${portfolio.titre.replaceAll(" ","-")}`)}} className="mb-5 cursor-pointer">
//                     <span className=''>{portfolio.titre?.charAt(0).toUpperCase()}{portfolio?.titre?.slice(1)}</span>
//                 </div>
//                 <div className="flex justify-between">  
//                     {/* <span>
//                         {new Date(Number(portfolio.date.seconds * 1000)).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",})}    
//                     </span> */}
                
//                 </div>
//                 { session && (<>
//                     <div className='absolute right-0 bottom-[1px]'>
//                         <RxCross2 
//                         onClick={async() => {
//                             var resultat = confirm("voulez-supprimer cette portfolio ?")
//                             if(resultat === true ){
//                                 // const promises = portfolios.map((docId) => deleteDoc(doc(db, "portfolios", docId.id)))
//                                 // await Promise.all(promises)

//                                 // const batch = writeBatch(db);
//                                 // portfolios.forEach((docId) => {
//                                 // batch.delete(doc(db, "portfolios", docId.id))
//                                 // }) 
//                                 // // Commit the batch
//                                 // await batch.commit();
                                
//                                 deletePortfolioMultiple(portfolio.titre)
//                                 toast.success("Portfolio supprimés")
//                             }


//                         }} 
//                         className="text-white text-[25px] bg-red-600  cursor-pointer rounded-md hover:w-9 hover:h-9 "/>
//                     </div>
//                 </>)}
                
//             </div>
//     </div>
//     </>
//     )
// }




// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { RxCross2 } from 'react-icons/rx';
// import { toast } from 'react-toastify';
// import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
// import { DataPortfolioType } from '@/app/Types/useTypes';

// export default function Portfolio({ portfolio, imageSelectionner, setImageSelectionner }: { portfolio: DataPortfolioType, imageSelectionner: string[], setImageSelectionner: any }) {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [imageCount, setImageCount] = useState(1); // Compteur d'images
//     const { portfolios, deletePortfolioMultiple } = useFireBasePortfolio();

//     // Vérification du nombre d'images dans le portfolio
//     useEffect(() => {
//         if (portfolio.image && Array.isArray(portfolio.image) && portfolio.image.length > 0) {
//             setImageCount(portfolio.image.length);
//         }
//     }, [portfolio]);

//     // Gestion de la sélection des portfolios
//     const handleCheckboxChange = (e) => {
//         const value = e.target.value;
//         if (e.target.checked) {
//             setImageSelectionner([...imageSelectionner, value]);
//         } else {
//             setImageSelectionner(imageSelectionner.filter(item => item !== value));
//         }
//     };

//     // regroupe tous elements de portfolios qui ont le même titre
//     const listeElementTitrePareil: string[] = [];
//     for (let i = 0; i < portfolios.length; i++) {
//         if (portfolios?.[i]?.titre === portfolio.titre) {
//             listeElementTitrePareil.push(portfolios?.[i]?.id);
//         }
//     }


    
//     // Retourner un loader si la session est en cours de chargement
//     if (status === 'loading') {
//         return <div>Chargement...</div>;
//     }

//     return (
//         <div className="relative my-5 w-[300px] h-[270px] mx-2 rounded-t-lg xl:w-[250px] transition-all duration-300 overflow-hidden group border-red-400 border-[3px]">
//             {/* Affichage du nombre d'éléments sélectionnés */}
//             <div className="absolute top-3 left-3 z-10">
//                 <span className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center border-2 border-black">
//                     {listeElementTitrePareil.length}
//                 </span>
//             </div>

//             {/* Partie qui contient les effets visuels */}
//             <div className="relative w-full h-full group-hover:scale-110 transition-all duration-300">
//                 <div className="relative w-full h-full">
//                     <img
//                         onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }}
//                         src={Array.isArray(portfolio.image) ? portfolio.image[0] : portfolio.image}
//                         alt={portfolio.titre}
//                         className="w-full h-full object-cover cursor-pointer rounded-[5%] group-hover:opacity-30"
//                     />

//                     {/* Si le portfolio contient 2 images */}
//                     {listeElementTitrePareil.length === 2 && (
//                         <img
//                             src={Array.isArray(portfolio.image) ? portfolio.image[1] : portfolio.image} // Deuxième image
//                             alt="image 2"
//                             className="absolute top-0 left-[50%] transform -translate-x-[50%] w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[40%]" // Déplacement hors du div à droite
//                         />
//                     )}

//                     {/* Si le portfolio contient plus de 2 images */}
//                     {listeElementTitrePareil.length > 2 && (
//                         <>
//                             <img
//                                 src={Array.isArray(portfolio.image) ? portfolio.image[1] : portfolio.image} // Deuxième image
//                                 alt="image 2"
//                                 className="absolute top-0 left-[50%] transform -translate-x-[50%] w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[40%]" // Déplacement hors du div à droite
//                             />
//                             <img
//                                 src={Array.isArray(portfolio.image) ? portfolio.image[2] : portfolio.image} // Troisième image
//                                 alt="image 3"
//                                 className="absolute top-0 left-[50%] transform -translate-x-[50%] w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[-40%]" // Déplacement hors du div à gauche
//                             />
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Checkbox pour sélectionner un portfolio */}
//             <input
//                 type="checkbox"
//                 value={portfolio.titre}
//                 className="form-check-input absolute right-2 top-2 z-10 cursor-pointer"
//                 onChange={handleCheckboxChange}
//             />

//             {/* Section pour le titre et les actions */}
//             <div className="w-full h-[calc(100%-150px)] p-2 bg-white relative z-10">
//                 <div onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }} className="mb-5 cursor-pointer">
//                     <span>{portfolio.titre?.charAt(0).toUpperCase()}{portfolio?.titre?.slice(1)}</span>
//                 </div>

//                 {/* Afficher le bouton de suppression si l'utilisateur est connecté */}
//                 {session && (
//                     <div className="absolute right-0 bottom-1">
//                         <RxCross2
//                             onClick={async () => {
//                                 const result = confirm("Voulez-vous supprimer ce portfolio ?");
//                                 if (result) {
//                                     // Logique de suppression du portfolio
//                                     deletePortfolioMultiple(portfolio.titre);
//                                     toast.success("Portfolio supprimé");
//                                 }
//                             }}
//                             className="text-white text-[25px] bg-red-600 cursor-pointer rounded-md hover:w-9 hover:h-9"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }







// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { RxCross2 } from 'react-icons/rx';
// import { toast } from 'react-toastify';
// import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
// import { DataPortfolioType } from '@/app/Types/useTypes';

// export default function Portfolio({ portfolio, imageSelectionner, setImageSelectionner }: { portfolio: DataPortfolioType, imageSelectionner: string[], setImageSelectionner: any }) {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [imageCount, setImageCount] = useState(1); // Compteur d'images
//     const { portfolios, deletePortfolioMultiple } = useFireBasePortfolio();

//     // Vérification du nombre d'images dans le portfolio
//     useEffect(() => {
//         if (portfolio.image && Array.isArray(portfolio.image) && portfolio.image.length > 0) {
//             setImageCount(portfolio.image.length);
//         }
//     }, [portfolio]);

//     // Gestion de la sélection des portfolios
//     const handleCheckboxChange = (e) => {
//         const value = e.target.value;
//         if (e.target.checked) {
//             setImageSelectionner([...imageSelectionner, value]);
//         } else {
//             setImageSelectionner(imageSelectionner.filter(item => item !== value));
//         }
//     };

//     // Regroupe tous les éléments de portfolios ayant le même titre
//     const listeElementTitrePareil: string[] = [];
//     for (let i = 0; i < portfolios.length; i++) {
//         if (portfolios?.[i]?.titre === portfolio.titre) {
//             listeElementTitrePareil.push(portfolios?.[i]?.id);
//         }
//     }

//     // Retourner un loader si la session est en cours de chargement
//     if (status === 'loading') {
//         return <div>Chargement...</div>;
//     }

//     return (
//         <div className="relative my-5 w-[300px] h-[270px] mx-2 rounded-t-lg xl:w-[250px] transition-all duration-300 overflow-visible group border-red-400 border-[3px]">
//             {/* Affichage du nombre d'éléments sélectionnés */}
//             <div className="absolute top-3 left-3 z-10">
//                 <span className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center border-2 border-black">
//                     {listeElementTitrePareil.length}
//                 </span>
//             </div>

//             {/* Partie qui contient les effets visuels */}
//             <div className="relative w-full h-full group-hover:scale-110 transition-all duration-300">
//                 <div className="relative w-full h-full">
//                     <img
//                         onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }}
//                         src={Array.isArray(portfolio.image) ? portfolio.image[0] : portfolio.image}
//                         alt={portfolio.titre}
//                         className="w-full h-full object-cover cursor-pointer rounded-[5%] group-hover:opacity-30"
//                     />

//                     {/* Si le portfolio contient 2 images, forme d'escalier */}
//                     {listeElementTitrePareil.length === 2 && (
//                         <img
//                             src={Array.isArray(portfolio.image) ? portfolio.image[1] : portfolio.image} // Deuxième image
//                             alt="image 2"
//                             className="absolute top-0 left-[50%] transform -translate-x-[50%] translate-y-[20%] w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[50%] z-20" // Sortie à droite
//                         />
//                     )}

//                     {/* Si le portfolio contient plus de 2 images, forme d'escalier */}
//                     {listeElementTitrePareil.length > 2 && (
//                         <>
//                             <img
//                                 src={Array.isArray(portfolio.image) ? portfolio.image[1] : portfolio.image} // Deuxième image
//                                 alt="image 2"
//                                 className="absolute top-0 left-[50%] transform -translate-x-[50%] translate-y-[20%] w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[50%] z-20" // Sortie à droite
//                             />
//                             <img
//                                 src={Array.isArray(portfolio.image) ? portfolio.image[2] : portfolio.image} // Troisième image
//                                 alt="image 3"
//                                 className="absolute top-0 left-[50%] transform -translate-x-[50%] translate-y-[40%] w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[-50%] z-20" // Sortie à gauche
//                             />
//                         </>
//                     )}
//                 </div>
//             </div>

//             {session && (<>
//                  {/* Checkbox pour sélectionner un portfolio */}
//                 <input
//                     type="checkbox"
//                     value={portfolio.titre}
//                     className="form-check-input absolute right-2 top-2 z-10 cursor-pointer"
//                     onChange={handleCheckboxChange}
//                 />
//             </>)}
           
            

//             {/* Section pour le titre et les actions */}
//             <div className="w-[100%] h-[calc(100%-150px)]  p-[10px] bg-[#FFF] relative z-[1]">
//                 <div onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }} className="mb-5 cursor-pointer">
//                     <span>{portfolio.titre?.charAt(0).toUpperCase()}{portfolio?.titre?.slice(1)}</span>
//                 </div>

//                 {/* Afficher le bouton de suppression si l'utilisateur est connecté */}
//                 {session && (
//                     <div className="absolute right-0 bottom-1">
//                         <RxCross2
//                             onClick={async () => {
//                                 const result = confirm("Voulez-vous supprimer ce portfolio ?");
//                                 if (result) {
//                                     // Logique de suppression du portfolio
//                                     deletePortfolioMultiple(portfolio.titre);
//                                     toast.success("Portfolio supprimé");
//                                 }
//                             }}
//                             className="text-white text-[25px] bg-red-600 cursor-pointer rounded-md hover:w-9 hover:h-9"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



// export default function Portfolio({ portfolio, imageSelectionner, setImageSelectionner }: { portfolio: DataPortfolioType, imageSelectionner: string[], setImageSelectionner: any }) {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [imageCount, setImageCount] = useState(1); // Compteur d'images
//     const { portfolios, deletePortfolioMultiple } = useFireBasePortfolio();

//     // Vérification du nombre d'images dans le portfolio
//     useEffect(() => {
//         if (portfolio.image && Array.isArray(portfolio.image) && portfolio.image.length > 0) {
//             setImageCount(portfolio.image.length);
//         }
//     }, [portfolio]);

//     // Gestion de la sélection des portfolios
//     const handleCheckboxChange = (e) => {
//         const value = e.target.value;
//         if (e.target.checked) {
//             setImageSelectionner([...imageSelectionner, value]);
//         } else {
//             setImageSelectionner(imageSelectionner.filter(item => item !== value));
//         }
//     };

//     // Regroupe tous les éléments de portfolios ayant le même titre
//     const listeElementTitrePareil: string[] = [];
//     for (let i = 0; i < portfolios.length; i++) {
//         if (portfolios?.[i]?.titre === portfolio.titre) {
//             listeElementTitrePareil.push(portfolios?.[i]?.id);
//         }
//     }

//     // Retourner un loader si la session est en cours de chargement
//     if (status === 'loading') {
//         return <div>Chargement...</div>;
//     }

//     return (
//         <div className="relative my-5 w-[300px] h-[270px] mx-2 rounded-t-lg xl:w-[250px] transition-all duration-300 overflow-visible group border-red-400 border-[3px]">
//             {/* Affichage du nombre d'éléments sélectionnés */}
//             <div className="absolute top-3 left-3 z-10">
//                 <span className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center border-2 border-black">
//                     {listeElementTitrePareil.length}
//                 </span>
//             </div>

//             {/* Partie qui contient les effets visuels */}
//             <div className="relative w-full h-full group-hover:scale-110 transition-all duration-300">
//                 <div className="relative w-full h-full">
//                     {/* Première image (centrée) */}
//                     <img
//                         onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }}
//                         src={Array.isArray(portfolio.image) ? portfolio.image[0] : portfolio.image}
//                         alt={portfolio.titre}
//                         className="w-full h-full object-cover cursor-pointer rounded-[5%] group-hover:opacity-30"
//                     />

//                     {/* Deuxième image (décalée légèrement à droite et légèrement vers le haut, au-dessus de la première) */}
//                     {listeElementTitrePareil.length >= 2 && (
//                         <img
//                             src={Array.isArray(portfolio.image) ? portfolio.image[1] : portfolio.image} // Deuxième image
//                             alt="image 2"
//                             className="absolute w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[30%] translate-y-[-30%] z-20" // Décalage horizontal et vertical au-dessus de la première
//                         />
//                     )}

//                     {/* Troisième image (décalée encore plus à droite et vers le haut, au-dessus de la deuxième) */}
//                     {listeElementTitrePareil.length >= 3 && (
//                         <img
//                             src={Array.isArray(portfolio.image) ? portfolio.image[2] : portfolio.image} // Troisième image
//                             alt="image 3"
//                             className="absolute w-1/2 h-1/2 object-cover rounded-[5%] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[60%] translate-y-[-60%] z-20" // Décalage horizontal et vertical encore plus
//                         />
//                     )}
//                 </div>
//             </div>

//             {/* Checkbox pour sélectionner un portfolio */}
//             <input
//                 type="checkbox"
//                 value={portfolio.titre}
//                 className="form-check-input absolute right-2 top-2 z-10 cursor-pointer"
//                 onChange={handleCheckboxChange}
//             />

//             {/* Section pour le titre et les actions */}
//             <div className="w-[100%] h-[calc(100%-150px)]  p-[10px] bg-[#FFF] relative z-[1]">
//                 <div onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }} className="mb-5 cursor-pointer">
//                     <span>{portfolio.titre?.charAt(0).toUpperCase()}{portfolio?.titre?.slice(1)}</span>
//                 </div>

//                 {/* Afficher le bouton de suppression si l'utilisateur est connecté */}
//                 {session && (
//                     <div className="absolute right-0 bottom-1">
//                         <RxCross2
//                             onClick={async () => {
//                                 const result = confirm("Voulez-vous supprimer ce portfolio ?");
//                                 if (result) {
//                                     // Logique de suppression du portfolio
//                                     deletePortfolioMultiple(portfolio.titre);
//                                     toast.success("Portfolio supprimé");
//                                 }
//                             }}
//                             className="text-white text-[25px] bg-red-600 cursor-pointer rounded-md hover:w-9 hover:h-9"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }






import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
import { DataPortfolioType } from '@/app/Types/useTypes';

export default function Portfolio({ portfolio, imageSelectionner, setImageSelectionner }: { portfolio: DataPortfolioType, imageSelectionner: string[], setImageSelectionner: any }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [imageCount, setImageCount] = useState(1); // Compteur d'images
    const { portfolios, deletePortfolioMultiple } = useFireBasePortfolio();

    // Vérification du nombre d'images dans le portfolio
    useEffect(() => {
        if (portfolio.image && Array.isArray(portfolio.image) && portfolio.image.length > 0) {
            setImageCount(portfolio.image.length);
        }
    }, [portfolio]);

    // Gestion de la sélection des portfolios
    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setImageSelectionner([...imageSelectionner, value]);
        } else {
            setImageSelectionner(imageSelectionner.filter(item => item !== value));
        }
    };

    // Regroupe tous les éléments de portfolios ayant le même titre
    const listeElementTitrePareil: string[] = [];
    for (let i = 0; i < portfolios.length; i++) {
        if (portfolios?.[i]?.titre === portfolio.titre) {
            listeElementTitrePareil.push(portfolios?.[i]?.id);
        }
    }
   

    const listeElementTitrePareilImage: string[] = [];
    for (let i = 0; i < portfolios.length; i++) {
        if (portfolios?.[i]?.titre === portfolio.titre) {
            listeElementTitrePareilImage.push(portfolios?.[i]?.image);
        }
    }
    
    // Retourner un loader si la session est en cours de chargement
    if (status === 'loading') {
        return <div>Chargement...</div>;
    }

    return (
        <div className="relative my-5 w-[300px] h-[270px] mx-2 rounded-t-lg xl:w-[250px] transition-all duration-300 overflow-visible group">
            {/* Affichage du nombre d'éléments sélectionnés */}
            <div className="absolute top-3 left-3 z-10">
                <span className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center border-2 border-black">
                    {listeElementTitrePareil.length}
                </span>
            </div>

            {/* Partie qui contient les effets visuels */}
            <div className="relative w-full h-full group-hover:scale-110 transition-all duration-300 ">
                <div className="relative w-full h-full">
                    <img
                        onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }}
                        src={portfolio.image}
                        alt={portfolio.titre}
                        className="w-full h-full object-cover cursor-pointer rounded-[5%] group-hover:opacity-30 group"
                    />

                    {/* Affichage des images en escalier au hover */}
                    {listeElementTitrePareilImage.length > 1 && (
                        <>
                            <img
                                onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }}   
                                src={listeElementTitrePareilImage ? listeElementTitrePareilImage[1] : portfolio.image} // Deuxième image
                                className="cursor-pointer absolute top-[0] left-[10px] w-[90%] h-[90%] object-cover rounded-[5%] opacity-0 group-hover:opacity-100 group-hover:top-[20px] group-hover:left-[30px] transition-all duration-300"
                            />
                            {listeElementTitrePareilImage.length > 2 && (
                                <img
                                    onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }}
                                    src={listeElementTitrePareilImage ? listeElementTitrePareilImage[2] : portfolio.image} // Troisième image
                                    className="cursor-pointer absolute top-[0] left-[20px] w-[80%] h-[80%] object-cover rounded-[5%] opacity-0 group-hover:opacity-100 group-hover:top-[60px] group-hover:left-[60px] transition-all duration-300"
                                />
                            )}
                            {listeElementTitrePareilImage.length > 3 && (
                                <img
                                    onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }}
                                    src={listeElementTitrePareilImage ? listeElementTitrePareilImage[3] : portfolio.image} // Quatrième image
                                    className="cursor-pointer absolute top-[0] left-[30px] w-[70%] h-[70%] object-cover rounded-[5%] opacity-0 group-hover:opacity-100 group-hover:top-[90px] group-hover:left-[90px] transition-all duration-300"
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            {session && (
                <>
                    {/* Checkbox pour sélectionner un portfolio */}
                    <input
                        type="checkbox"
                        value={portfolio.titre}
                        className="form-check-input absolute right-2 top-2 z-10 cursor-pointer"
                        onChange={handleCheckboxChange}
                    />
                </>
            )}

            {/* Section pour le titre et les actions */}
            <div className="w-[100%] h-[calc(100%-150px)]  p-[10px] bg-[#FFF] absolute bottom-0 z-[1]  rounded-2xl">
                <div onClick={() => { router.push(`portfolio/${portfolio.titre.replaceAll(" ", "-")}`); }} className="mb-5 cursor-pointer">
                    <span>{portfolio.titre?.charAt(0).toUpperCase()}{portfolio?.titre?.slice(1)}</span>
                </div>

                {/* Afficher le bouton de suppression si l'utilisateur est connecté */}
                {session && (
                    <div className="absolute right-0 bottom-1">
                        <RxCross2
                            onClick={async () => {
                                const result = confirm("Voulez-vous supprimer ce portfolio ?");
                                if (result) {
                                    // Logique de suppression du portfolio
                                    deletePortfolioMultiple(portfolio.titre);
                                    toast.success("Portfolio supprimé");
                                }
                            }}
                            className="text-white text-[25px] bg-red-600 cursor-pointer rounded-md hover:w-9 hover:h-9"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}



