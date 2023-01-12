import { useState } from "react"

const Portfolioform   = () => {
    const [titre, setTitre] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    return (
        <div>
            <form action="" className="[&>input]:text-black flex flex-col " >
                <label htmlFor="">Titre </label>
                <input value={titre} onChange={(e) => setTitre(e.target.value)} type="text" name="titre" id="titre" />
                <label htmlFor="">Description</label>
                <input type="text" name="description" id="description" />
                <label htmlFor="">Github Url</label>
                <input type="text" name="url" id="url" />
                <label htmlFor="">Image</label>
                <input type="file" name="image" id="image" />
            </form>
        </div>

    )
}
export default Portfolioform