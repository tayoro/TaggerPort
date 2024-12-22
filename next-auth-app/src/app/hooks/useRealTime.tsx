import { useState, useEffect } from "react";
import { database } from "@/app/db/firebaseConfig";
import { onValue, push, ref, remove, update } from "firebase/database";

interface Preference {
    id: string, 
    langage: string;
}



export default function useRealTime() {


    const [preferences, setPreferences] = useState<Preference[]>([])

    // state Editer
    const [editingPreference, setEditingPreference] = useState<Preference | null>(null)

    useEffect(()=>{
        //Lire (READ)
        const preferencesRef = ref(database, 'preferences');

        const onDataChange = (snapshot: any) => {
            //respect notre interface Preference et qui sera un tableau
            const preferenceList: Preference[] = [];
            snapshot.forEach((childSnapshot: any) => {
                const preference = childSnapshot.val();
                console.log(preference);
                
                preference.id = childSnapshot.key;
                preferenceList.push(preference);
                
            });
            setPreferences(preferenceList)
        }
        const preferencesListener = onValue(preferencesRef, onDataChange);

        return ()=> {
            preferencesListener()
        }
    }, [])

    
    const addPreference = async(langage: string | undefined) => {
        try{
            //collection: preference
            const preferencesRef = ref(database, "preferences")
            await push(preferencesRef, {langage: langage})
        }catch(error){
            console.log("Erreur pendant l'ajout")
        }
    }


    const updatePreference = async (id: string, newLangage: string) => {
        try{
            // BDD , id de preference, element de preference a modifier
            await update(ref(database, `preferences/${id}`), {langage: newLangage})
            setEditingPreference(null)
        }catch(error){
            console.log("Erreur lors de la modification")
        }
    }

    //fonction va servir le state 
    const startEditingPreference = (preference: Preference) => {
        setEditingPreference(preference)
    }

    //supression
    const deletePreference = async(id: string)=> {
        remove(ref(database, `preferences/${id}`))
    }

    return{
        preferences,
        addPreference,
        updatePreference,
        startEditingPreference,
        editingPreference,
        deletePreference
    }
}
