import NextAuth from "next-auth";
import {authOptions} from "../../../../../lib/authOptions";

/*Cette ligne utilise la fonction "NextAuth" pour creer un gestionnaire 
d'authentification en utilisant les options defini dans notre Object "authOptions" */
//Le gestion d'authentification handler va etre utiliser pour gerer les requetes d'authentification entrante dans notre application
const handler = NextAuth(authOptions) 

//On export le gestionnaire d'authentification handler sous les nom GET et POST
/*Le gestionnaire d'authentification pourra etre utilisé sous les nom GET et POST 
ce qui signifie que le gestionnaire d'identification pourrais etre utiliser a la fois 
le requete http GET et les requetes http POST*/
export {handler as GET, handler as POST}
