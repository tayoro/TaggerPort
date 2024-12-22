"use client"

// une seul image a partir de son numero

import { useFireBasePortfolio } from '@/app/context/dataContextPortfolio';
import { CardContainer } from '@/components/Card3D';

export default function Review({params}: { params : {
    viewImageId: string;
    imageId: string;
}}) {


    const {portfolios} = useFireBasePortfolio()
    //trie des elements
    const listeElementSelectionner =[]
    for(let i=0; i < portfolios.length; i++){
        if(portfolios?.[i]?.titre.replaceAll(" ", "-") === params.viewImageId){
            listeElementSelectionner.push(portfolios?.[i])
    }
}

    return (
            <div>
                {listeElementSelectionner.map((image)=>(
                        <div key={image.id}>
                            {image.numero == params.imageId && (<>
                                
                                    <div className='rounded-md w-[100%] h-screen bg-black px-52 py-6 border'>
                                        
                                            <img src={image.image} width={25} height={25} className='w-full h-full'/>
                                    
                                    </div>
                                </>
                                )
                            }
                        </div>
                        )
                    )
                } 
            </div>
    );
}