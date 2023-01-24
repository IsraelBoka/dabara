import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "../components/container";
import { FilterIcon } from "../components/icons/filter";
import { Logo } from "../components/icons/logo";
import Loader from "../components/Loader";
import { api } from "../utils/api";

const Recherche = () => {
    const [recherche, setRecherche] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);

    const profiles = api.profile.searchprofile.useQuery({search : recherche, Tags: tags}, { enabled: recherche !== "" && recherche.length > 3 , keepPreviousData : true ,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        refetchInterval : false,
        refetchIntervalInBackground : false,
})



    return (
        <Container >
            
        <div>
            <div className="flex items-center justify-center  w-full">
                <Link href="/" className="hover:scale-105 duration-300">
            <Logo classname=" w-16 h-16 animate-fade-in [--animation-delay:200ms] opacity-0 " />
                    </Link>
            </div>
            <input className="opacity-0 animate-fade-in [--animation-delay:400ms]  mb-4 w-full decoration-none focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 rounded-sm p-1 bg-[#2b2d3c]" type="text" placeholder="Recherche..." onChange={(e) => setRecherche(e.target.value)} />
            <button  >
            <FilterIcon className="opacity-0 animate-fade-in [--animation-delay:600ms] w-6 h-6 text-white" />
            </button>
            {profiles.isFetching ? <Loader/> : (
                
                
                    profiles.data?.length === 0 ? <div className="flex items-center justify-center w-full h-full">
                        <p className="text-white">Aucun résultat</p>
                    </div> : (<div className="flex flex-wrap justify-center gap-2">
                        {profiles.data?.map((profile) => {
                            return (
                                <div key={profile.id} className="flex flex-col items-center justify-center gap-2  ">
                                    <div className="flex items-center justify-center  ">
                                        <Link href={`/${profile.page || ""}`}>
                                        <Image alt="image du profile" src={profile.image || ""} width={100} height={100} className="rounded-full" />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-2  ">
                                        <p className="text-white">{profile.name}</p>
                                        <p className="text-white">{profile.fonction}</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-2  ">
                                        <p className="text-white">{profile.adresse}</p>
                                        <p className="text-white">{profile.email}</p>
                                    </div>
                                    </div>)
                            
                        })}
                    </div>))}

        </div>
        </Container>

    )

}

export default Recherche