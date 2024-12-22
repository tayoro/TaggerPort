import { any } from "zod";


export type ModalType = {
    openModal: boolean;
    onClose: ()=> void;
    onOpen?: ()=> void;
    isUpdate?: boolean;
    video?: any;
    info?: any;
    image?: any;
}



// va nous servire a recuperer les données dans firebase
export type DataType = {
    id: string;
    titre: string;
    video?: string;
    date : any;
    desc: string;
}

export type DataInfoType = {
    id: string;
    infoType: string;
    theme: string;
    cible: string;
    description : string;
    createAt: any;
    dateDebutFirst: string;
    heureFinFirst: string;
    dateDebutSecond?: string;
    heureFinSecond?: string;
    intervenant: string;
    lieu: string;
}

export type DataContactType = {
    id: string;
    name: string;
    email: string;
    sujet : string;
    message: string;
}

export type DataPortfolioType = {
    id: string;
    titre: string;
    image : string;
    date : any;
    desc?: string;
    numero? : any;
}

export type DbContextType = {
    videos: DataType[]
    addVideo: (membersData: Omit<DataType, "id"> & {video: string}) => Promise<void>
    updateVideo: (member: DataType) => Promise<void>
    deleteVideo: (id: string) => Promise<void>

    infos: DataInfoType[]
    addInfo: (infosData: Omit<DataInfoType, "id">) => Promise<void>
    updateInfo: (member: DataInfoType) => Promise<void>
    deleteInfo: (id: string) => Promise<void>

    contacts: DataContactType[]
    addContact: (contactsData: Omit<DataContactType, "id">) => Promise<void>
    deleteContact: (id: string) => Promise<void>

    portfolios: DataPortfolioType[]
    addPortfolio: (portfoliosData: Omit<DataPortfolioType, "id"> & {image: string} & {numero: any}) => Promise<void>
    updatePortfolio: (member: DataPortfolioType) => Promise<void>
    deletePortfolio: (id: string) => Promise<void>
    deletePortfolioMultiple : (titre: string) => Promise<void>
    addImagePortfolio: (portfoliosData: Omit<DataPortfolioType, "id"> & {image: string} & {numero: any} &{titre: any} & {desc:any}) => Promise<void>
}

// type pour les formulaires video
export type FormType = {
    titre: string;
    video?: string;
    desc: string;
}

// type pour les formulaires info
export type FormInfoType = {
    infoType: string;
    theme: string;
    cible: string;
    description: string;
    dateDebutFirst: string;
    heureFinFirst: string;
    dateDebutSecond?: string;
    heureFinSecond?: string;
    intervenant: string;
    lieu: string;
}

// type pour les formulaires contact
export type FormContactType = {
    name: string;
    email: string;
    sujet: string;
    message: string;
}

export type FormPortfolioType = {
    titre: string;
    image?: string;
    desc: string;
}
