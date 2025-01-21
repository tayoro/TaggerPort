import { DataPortfolioType, ModalDescribType } from "@/app/Types/useTypes";

import { RxCross2 } from "react-icons/rx";

export default function Describ ({openModalDescrib, isUpdate, onCloseDescrib, describ}: ModalDescribType){

    return (

        <>
            {openModalDescrib && (
                <div  className='absolute top-0 left-0 z-40 grid h-screen w-full place-items-center backdrop-blur text-white p-[50px] lg:hidden'>
                <div className=' relative z-50 w-[100%] sm:m-auto h-full bg-black p-4 shadow-lg rounded-md '>
                    <RxCross2 className=" text-white w-10 absolute right-0 top-2 cursor-pointer"  onClick={onCloseDescrib}/>
                    <h1 className=' text-[30px] font-bold uppercase'>{describ?.[0]?.titre}</h1>
                    <p>{describ?.[0]?.desc}</p> 
                </div> 
                </div>
            )}
            
        </>
        
    )
}