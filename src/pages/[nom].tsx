import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { Container } from "../components/container";
import { Clipboard } from "../components/icons/clipboard";
import { Github } from "../components/icons/github";
import { LinkedIn } from "../components/icons/linkedin";
import { Logo } from "../components/icons/logo";
import { ImageCard } from "../components/ImageCard";
import Loader from "../components/Loader";
import { Network } from "../components/Network";
import { api } from "../utils/api";


const Nom = () => {
  const router = useRouter();

  const { nom } = router.query;


  const { data: userinfo, isLoading: loadinguserinfo } =
    api.page.getPage.useQuery(
      {
        page: nom as string,
      },
      { enabled: nom !== undefined }
    );

    const [copied, setCopied] = useState(false);
  if (loadinguserinfo) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!userinfo) {
    return <Error statusCode={404} />;
  }

  const Copylink = async () => {
   await navigator.clipboard.writeText(window.location.href);
    setCopied(true);

  };

  return (
    <div>

      {!userinfo && <Error statusCode={404} />}
      {copied && (
        <div className=" animate-fade-in ease-out duration-300 items-center justify-center flex w-full ">
          <div className=" ease-in duration-300 w-full flex items-center  justify-center text-white bg-green-600">Votre lien a été copié , vous pouvez le partager
          <button className="bg-green-600 " onClick={() => setCopied(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

          </button></div>
        </div>
      )}
      <Container classname="flex items-center  flex-col lg:items-start lg:flex-row h-full w-full">
        <div className="flex min-h-screen  w-96 flex-col items-center lg:rounded bg-[#242424] ">
          <Avatar nom={nom as string} email={userinfo?.Profil?.email || undefined} lien={userinfo.image || undefined}/>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-white">Développeur web  </p>
          </div>
          <Network 
          youtube={userinfo?.Profil?.facebook || undefined} 
          instagram={userinfo?.Profil?.instagram  || undefined}
          linkedin={userinfo?.Profil?.linkedin || undefined}
          github={userinfo?.Profil?.github || undefined}
          twitter = {userinfo?.Profil?.twitter || undefined}
           />
          <div>
            <p className="text-center text-xl font-bold text-white ">
              A propos de moi
            </p>
            <p className="truncate whitespace-pre-wrap p-2 indent-4 text-sm text-white">
              {
                userinfo.about
              }
            </p>
          </div>


          <div>
            <p className="text-center text-xl font-bold text-white ">
              Mes compétences
            </p>
            <div className="flex flex-wrap justify-center">
              
          {userinfo?.Competence?.map((competence) => {
            return (
              <div key={competence.id} className="m-2  rounded bg-blue-300 p-2 transition-colors  duration-200 hover:bg-orange-300">
                <p className="select-none text-sm font-bold uppercase text-gray-800">
                  {competence.name}
                </p>
              </div>
            );
          })
          }
            </div>
          </div>
          <div>
            <p className="text-center text-xl font-bold text-white ">
                Langues
            </p>
            <div className="flex flex-wrap justify-center">
                <div className="m-2  rounded ">
                    <p className="select-none text-sm font-bold uppercase ">
                        Français
                    </p>
                    <p>
                        Courant
                    </p>
                    </div>
                    <div className="m-2  rounded ">
                    <p className="select-none text-sm font-bold uppercase ">
                        Anglais
                    </p>
                    <p>
                        Courant
                    </p>
                    </div>
          </div>
            </div>


          <div className="mt-auto flex-col items-center justify-center gap-2  ">
            

          <div className="flex items-center justify-center  ">
              
              <input value={`https://dabara.vercel.app/${userinfo?.page || ""}`} className="
              w-full  bg-transparent border rounded-l-lg text-white p-1  truncate 
              "  />
              <button  onClick = {() => Copylink()} className=" bg-transparent border border-l-0 p-1 rounded-r-lg">
                <Clipboard className="h-6 w-6" />
              </button>
            </div>
            <div className="gap-2 mt-2">
              
          <p className="text-xs font-bold text-center ">Cette page a été visitée 60 fois</p>
          <Link
          className="md:text-md mr-2 flex items-center justify-center "
          href={"/"}
        >
          <Logo classname="w-8 h-8 mr-2 stroke-white" />
          <p className="text-md font-extrabold">
            <span className="">DAB</span>
            <span className="text-blue-300">ARA</span>
          </p>
        </Link> 
            </div>
          </div>
        </div>
        <div className=" w-96 lg:w-full bg-[#242424] overflow-y-auto lg:ml-4 ">
            <div className="w-full">
                <p className="text-center text-xl p-4 font-bold h-12 text-white ">
                    Mes projets
                </p>
                <div className="flex flex-col items-center lg:h-[calc(100vh_-_3rem)] overflow-y-auto  p-4">
                  <ImageCard image="/portfolio.jpg" link="test" description="testdesc" title="voila" />

                    </div>
            </div>
        </div>
      </Container>
    </div>
  );
};
export default Nom;
