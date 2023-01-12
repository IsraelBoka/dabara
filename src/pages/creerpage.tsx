import { useSession } from "next-auth/react"
import {  useState } from "react"
import type  {FormEvent } from "react"
import Portfolioform from "../components/portfolioform"
const Creerpage = () => {
    const {data : sessionData, status} = useSession()
    const [nom, setNom] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [url, setUrl] = useState<string>("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(nom, description, url)


    }

    return (
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

export default Creerpage