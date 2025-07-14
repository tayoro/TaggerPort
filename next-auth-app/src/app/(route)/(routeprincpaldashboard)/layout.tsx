
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { redirect } from "next/navigation";
import NoSsr from "@/components/NoSsr";

import { useContext } from 'react';

import Sidebar from "@/components/Sidebar";



export default async function DashboardLayout({children}: {children: React.ReactNode}){
    

    //Verification d'authentification pour avoir access à la page
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    
    return (
        <>  
        
            <NoSsr>
                {/* <SidebarContextProvider> */}
                    
                    
                            <Sidebar />
                                {/* toutes page qui sont dans ce groupe with-auth-layout auront le mot Group AuthLayout */}
                                {children}
                                
                        
                {/* </SidebarContextProvider> */}
            </NoSsr>
        </>
    )
}