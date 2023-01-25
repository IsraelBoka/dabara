import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "../components/container";
import { FilterIcon } from "../components/icons/filter";
import { Logo } from "../components/icons/logo";
import { SearchIcon } from "../components/icons/searchicon";
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
        <Container classname="lg:px-48">
            
        <div>
            <div className="flex items-center justify-center  w-full">
                <Link href="/" className="hover:scale-105 duration-300">
            <Logo classname=" w-16 h-16 animate-fade-in [--animation-delay:200ms] opacity-0 " />
                    </Link>
            </div>
            <div className="flex mb-4  items-center justify-center opacity-0 animate-fade-in [--animation-delay:400ms]   ">
                <div className=" bg-[#2b2d3c] p-1 rounded-l-sm">
                <SearchIcon className="w-6 h-6"/>
                </div>
                <input className="w-full decoration-none bg-[#2b2d3c] focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 rounded-r-sm p-1 " type="text" placeholder="Recherche..." onChange={(e) => setRecherche(e.target.value)} />
            </div>
            <button  className="">
            <FilterIcon className="opacity-0 animate-fade-in [--animation-delay:600ms] w-6 h-6 text-white" />
            </button>
            {profiles.isFetching ? <Loader/> : (
                
                
                    profiles.data?.length === 0 ? <div className="flex items-center justify-center w-full h-full">
                        <p className="text-white">Aucun résultat</p>
                    </div> : (<div className="flex flex-wrap justify-center gap-2">
                        {profiles.data?.map((profile) => {
                            return (
                                <Link href={`/${profile.page || ""}`} key={profile.id} className="hover:bg-[#2b2d3c] rounded flex flex-col w-48 p-2 gap-1  items-start justify-center ">
                                    <div className="flex items-center  ">
                                        <Image alt="image du profile" src={profile.image || ""} width={58} height={58} className="rounded-full" />
                                        
                                    <div className="flex flex-col items-center justify-center  text-xs">
                                        <p className="text-white">{profile.name}</p>
                                        <p className="text-white">{profile.fonction}</p>

                                    </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center justify-center ">
                                        { profile.Competence.map((competence) => {
                                            return (
                                        
                                    <span key={competence.id} className="bg-blue-100 text-blue-800 text-xs font-medium  px-0.5 py-0.5 rounded ">{
                                        competence.name
                                    }</span>

                                            )}
                                        )}
                                    </div>
                                    </Link>)
                            
                        })}
                    </div>))}

        </div>
        </Container>

    )

}

export default Recherche