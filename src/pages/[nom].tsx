import Error from "next/error"
import { useRouter } from "next/router"
import Loader from "../components/Loader"
import { api } from "../utils/api"

const Nom = () => {
    const router = useRouter()

    const {nom} = router.query

    const {data : machose, isLoading:machoseloading} = api.page.getPage.useQuery({
        page : nom as string
    }, {enabled: nom !== undefined})


    if (machoseloading) {
        return (
            <div className="min-h-screen w-full items-center justify-center flex">
                <Loader/>
            </div>
        )
    }

    if (!machose) {
        return <Error statusCode={404} />
    }


    return (
        <div>
            <h1>
             Mon nom : {nom}
            </h1>
        </div>
    )
}
export default Nom