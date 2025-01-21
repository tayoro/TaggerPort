import {useState} from "react";
import { ModalDescribType } from "../Types/useTypes";

const useModalDescrib = (): ModalDescribType =>{
    const [openModalDescrib, setOpenModalDescrib] = useState<boolean>(false)

    const onOpenDescrib = () =>{
        setOpenModalDescrib(true)
    };

    const onCloseDescrib = () =>{
        setOpenModalDescrib(false)
    };
    return {openModalDescrib, onCloseDescrib, onOpenDescrib}
}

export default useModalDescrib;