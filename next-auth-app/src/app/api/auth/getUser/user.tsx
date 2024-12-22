import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { NextResponse } from "next/server";

//pour recuperer la session utilisation
export async function GET(){
    //Va recuperer la session utilisateur a partir de notre server
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({error: "Non autoriser"}, {status:400})
    }
    return NextResponse.json({success: session}, {status:200})
}