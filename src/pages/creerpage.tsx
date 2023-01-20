import { useSession, signIn } from "next-auth/react"
import { api } from "../utils/api";
import {  useState } from "react"
import type  {FormEvent } from "react"
import Portfolioform from "../components/portfolioform"
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import {Button} from "../components/Button";

const Creerpage = () => {
    const {data : sessionData, status} = useSession()
    const  router = useRouter()
    const updatepage =  api.page.Updatepage.useMutation()
    const {data:getpage, isLoading: loadinggetpage} = api.page.getPagebyId.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    )

    const [nom, setNom] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [url, setUrl] = useState<string>("")


    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center flex-col justify-center">
                <h1 className="text-2xl text-center p-4">Vous devez être connecté pour accéder à cette page</h1>
                <Button variant={"primary"} >
                    <a onClick = {() => void signIn()}>Se connecter</a>
                </Button>
            </div>
        )

    }


    if (loadinggetpage) {
        return (
            <div className="min-h-screen items-center flex justify-center ">
                <Loader/>

            </div>
        )
    }


    if (getpage?.page) {
        router.push("/" + getpage.page).then(() => window.scrollTo(0, 0)).catch((err) => console.log(err))
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updatepage.mutate({
            page : url
        })
    }

    return (
        <div>
            {getpage?.page === null && (
                
        <div>
        <h1>Une page pour créer une page de dev inception </h1>
        <div>
            { sessionData?.user?.email}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col ">
            <label htmlFor="url">Url</label>
            <div className="flex">
            <div className="">https://dabara.fr/</div>
            <input  className= "text-black" type="text" name="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <label htmlFor="nom">Nom</label>
            <input className="text-black" type="text" name="nom" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            <label htmlFor="description">Description</label>
            <input type="text" className="text-black" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="submit" className="p-4 bg-gray-200 text-black" />
        </form>
        <Portfolioform />
    </div>
            )   
    
}
            
        </div>
) }
export default Creerpage