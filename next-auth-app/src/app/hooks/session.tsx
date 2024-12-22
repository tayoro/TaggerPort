import { useSession } from "next-auth/react";



let bool: boolean = false;

console.log(session);

if (session){
    bool = true;
}else{
    bool = false;}
export const sessionStatus = bool;