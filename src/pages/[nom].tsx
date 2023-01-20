import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "../components/Avatar";
import { Container } from "../components/container";
import { Github } from "../components/icons/github";
import { LinkedIn } from "../components/icons/linkedin";
import { Logo } from "../components/icons/logo";
import Loader from "../components/Loader";
import { api } from "../utils/api";

const Nom = () => {
  const router = useRouter();

  const { nom } = router.query;

  const { data: machose, isLoading: machoseloading } =
    api.page.getPage.useQuery(
      {
        page: nom as string,
      },
      { enabled: nom !== undefined }
    );

  if (machoseloading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!machose) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      {!machose && <Error statusCode={404} />}
      <Container classname="flex items-center  flex-col lg:items-start lg:flex-row h-full w-full">
        <div className="flex min-h-screen  w-96 flex-col items-center lg:rounded bg-[#242424] ">
          <Avatar nom={nom as string} email={machose.email || undefined} lien={machose.image || undefined}/>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-white">Développeur web </p>
          </div>
          <div className="flex items-center justify-center  [&_a]:m-2 [&_a]:transition-transform [&_a]:duration-150 [&_a:hover]:scale-105">
            <a href="">
              <Github classname="w-8 h-8" />
            </a>
            <a href="">
              <LinkedIn classname="w-8 h-8" />
            </a>
          </div>
          <div>
            <p className="text-center text-xl font-bold text-white ">
              A propos de moi
            </p>
            <p className="truncate whitespace-pre-wrap p-2 indent-4 text-sm text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              ullam, possimus maiores at saepe repellat ab fuga asperiores
              debitis placeat tenetur error eveniet rerum quae quasi illum
              incidunt maxime id!
            </p>
          </div>

          <div>
            <p className="text-center text-xl font-bold text-white ">
              Mes compétences
            </p>
            <div className="flex flex-wrap justify-center">
              <div className="m-2  rounded bg-blue-300 p-2 hover:bg-orange-300">
                <p className="select-none text-sm font-bold uppercase text-gray-800">
                  HTML
                </p>
              </div>
              <div className=" m-2  rounded bg-blue-300 p-2 hover:bg-orange-300">
                <p className=" select-none text-sm font-bold uppercase text-gray-800">
                  CSS
                </p>
              </div>
              
              <div className=" m-2  rounded bg-blue-300 p-2 hover:bg-orange-300">
                <p className=" select-none text-sm font-bold uppercase text-gray-800">
                  Javascript 
                </p>
              </div>
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


          <p className="text-xs font-bold">Cette page a été visitée N fois</p>
          <Link
          className="md:text-md mr-2 flex items-center justify-center mt-auto"
          href={"/"}
        >
          <Logo classname="w-8 h-8 mr-2 stroke-white" />
          <p className="text-md font-extrabold">
            <span className="">DAB</span>
            <span className="text-blue-300">ARA</span>
          </p>
        </Link>
        </div>
        <div className=" w-96 lg:w-full bg-[#242424] overflow-y-auto lg:ml-4 ">
            <div className="w-full">
                <p className="text-center text-xl p-4 font-bold h-12 text-white ">
                    Mes projets
                </p>
                <div className="flex flex-col items-center lg:h-[calc(100vh_-_3rem)] overflow-y-auto  p-4">
                    
                    <div className="m-2 relative group cursor-pointer rounded  ">
                        <Image className="group-hover:opacity-50 rounded  transition-opacity duration-200" src="/jeunecadredynamique.jpg" alt="test" width={500} height={500} />
                        <p className="hidden transition duration-200 top-32 text-lg left-14 text-white absolute group-hover:flex flex-col items-center ">
                            Chapchap - application de livraison <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

                            </span>
                        </p>
                    </div>

                    <div className="m-2 relative group cursor-pointer rounded  ">
                        <Image className="group-hover:opacity-50 rounded  transition-opacity duration-200" src="/jeunecadredynamique.jpg" alt="test" width={500} height={500} />
                        <p className="hidden transition duration-200 top-32 text-lg left-14 text-white absolute group-hover:flex flex-col items-center ">
                            Chapchap - application de livraison <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

                            </span>
                        </p>
                    </div>
                    
                    <div className="m-2 relative group cursor-pointer rounded  ">
                        <Image className="group-hover:opacity-50 rounded  transition-opacity duration-200" src="/jeunecadredynamique.jpg" alt="test" width={500} height={500} />
                        <p className="hidden transition duration-200 top-32 text-lg left-14 text-white absolute group-hover:flex flex-col items-center ">
                            Chapchap - application de livraison <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

                            </span>
                        </p>
                    </div>

                    </div>
            </div>
        </div>
      </Container>
    </div>
  );
};
export default Nom;
