import { useSession, signIn } from "next-auth/react";
import { api } from "../utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { Button } from "../components/Button";
import { Logo } from "../components/icons/logo";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { Container } from "../components/container";

type FormData = {
  name: string;
  page: string;
  email: string;
  poste : string;
  disponibilite: string;
  description: string;
  phone: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  github: string;
  residence: string;
  youtube: string;
};

const Creerpage = () => {
  const { data: sessionData, status } = useSession();
  const {mutateAsync: creerprofile } = api.profile.addprofiletouser.useMutation();  
  const router = useRouter();
  const verifypage = api.page.verifypage.useMutation();

  const [formStep, setFormStep] = useState(0);

  const [taken, setTaken] = useState(false);
  const [page, setPage] = useState("");
  const { data: getpage, isLoading: loadinggetpage } =
    api.page.getPagebyId.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined }
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleverification = handleSubmit(async (data) => {
    console.log(data);
    const test = verifypage.mutateAsync({
      page: data.page,
    });
    await test.then((res) => {
      console.log(res);
      if (res === true) {
        setTaken(true);
      } else {
        setPage(data.page);
        setFormStep(formStep + 1);
      }
    });
  });

  const Navigation = () => {
    return (
      <div>
        <div className="flex justify-center ">
          {formStep === 4 ? null : (
            <button
              type="submit"
              className="flex items-center  justify-center rounded-md bg-pink-600 p-2 hover:bg-pink-700 disabled:bg-pink-500"
            >
              <span>Suivant</span>
            </button>
          )}
          {formStep === 0 ? null : (
            <button
              onClick={() => setFormStep(formStep - 1)}
              className="flex items-center justify-center rounded-md bg-neutral-700 p-2 hover:bg-neutral-800 disabled:bg-neutral-600"
            >
              <span>Précedent</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Link href={"/"}>
          <Logo classname="hover:scale-105 duration-150 transition w-16 h-16 mr-2 stroke-white" />
        </Link>
        <h1 className="p-4 text-center text-2xl">
          Vous devez être connecté pour accéder à cette page
        </h1>
        <Button variant={"primary"}>
          <a onClick={() => void signIn()}>Se connecter</a>
        </Button>
      </div>
    );
  }

  if (loadinggetpage) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <Loader />
      </div>
    );
  }

  if (getpage?.page) {
    router
      .push("/" + getpage.page)
      .then(() => window.scrollTo(0, 0))
      .catch((err) => console.log(err));
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
      await  creerprofile({
      name: data.name,
      page: page,
      email: data.email,
      fonction : data.poste,
      about: data.description,
      website: data.website,
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: "",
      youtube: "",
      residence: "",
    });
  });
  return (
    <div>
      {getpage?.page === null && (
        <div>
          <Container>
            <div className="flex justify-center ">
              <Link href={"/"}>
                <Logo classname="hover:scale-105 duration-150 transition w-16 h-16 mr-2 stroke-white" />
              </Link>
            </div>
            {formStep === 0 && (
              <form
                onSubmit={handleverification}
                className="flex flex-col items-center justify-center "
              >
                <div className="flex-col text-center text-lg text-gray-300 md:text-xl lg:text-2xl  ">
                  <h1 className="font-extrabold uppercase">
                    Nom de mon profile
                  </h1>
                  <h2>Vérifier la validité de la page</h2>
                </div>
                <div className=" flex flex-col justify-center rounded p-8 ">
                  <h1 className=" text-center text-3xl font-extrabold lg:text-4xl ">
                    Vérifier la validité de <br className="hidden md:block" />{" "}
                    la page
                  </h1>
                  <label className="py-2 text-white">🌐 Mon identifiant:</label>
                  <input
                    className=" rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                    type="text"
                    placeholder="@username"
                    
                    {...register("page", { required: true ,minLength: 6, maxLength: 20, pattern: /^[a-zA-Z0-9]+$/})}
                  />
                  {errors.page?.type === "required" && (
                    <span className="text-red-800 ">
                      L&apos;identifiant est obligatoire
                    </span>
                  )}
                  {errors.page?.type === "minLength" && (
                    <span className="text-red-800 ">
                      L&apos;identifiant doit contenir au moins 6 caractères
                      </span>
                      )}
                      {errors.page?.type === "maxLength" && (
                        <span className="text-red-800 ">
                          L&apos;identifiant doit contenir au plus 20 caractères
                        </span>
                      )}
                      {errors.page?.type === "pattern" && (
                        <span className="text-red-800 ">
                          L&apos;identifiant ne doit contenir que<br className="hidden md:block"/> des lettres et des
                          chiffres
                        </span>
                      )}
                  {taken && (
                    <span className="text-red-800 ">
                      Cet identifiant est déjà pris
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="rounded bg-blue-300 p-2 text-gray-800 transition-colors duration-150 hover:bg-blue-400"
                >
                  Vérifier
                </button>
              </form>
            )}
            {formStep === 1 && (
              <form
                onSubmit={onSubmit}
                className="flex flex-col items-center justify-center "
              >
                <div>
                  <div className="flex-col text-center text-lg text-gray-300 md:text-xl lg:text-2xl  ">
                    <h1 className="font-extrabold uppercase">Introduction</h1>
                    <h2>
                      Présentez vous aux visiteurs de votre page,{" "}
                      <br className="hidden md:block" /> expliquez leur ce que
                      vous faites
                    </h2>
                  </div>
                  <div className=" flex flex-col justify-center rounded p-8 ">
                    <h1 className=" text-center text-3xl font-extrabold lg:text-4xl ">
                      Créer votre page
                    </h1>
                    
                    <label className="py-2 text-white">
                    🌐 Mon identifiant:                    </label>
                    <div
                      className=" rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                    >
                      {page}
                    </div>
                    
                    <label className="py-2 text-white">
                      👋 Je m&apos;appelle :
                    </label>
                    <input
                      className=" rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      type="text"
                      placeholder="Nom"
                      {...register("name", { required: true })}
                      />
                    {errors.name && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}

                    <label htmlFor="" className="py-2">
                      💡 Fonction :
                    </label>
                    <input
                      className="  rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      type="text"
                      placeholder="Nom"
                      {...register("poste", { required: true })}
                    />
                    {errors.poste && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}
                    <label htmlFor="" className="py-2">
                      ✏️ Description:
                    </label>
                    <textarea
                      className="   rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      placeholder="Description"
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}
                  </div>

                  <div className=" flex flex-col justify-center rounded p-8 ">
                    <h1 className="text-center text-3xl font-extrabold lg:text-4xl">
                      A propos de moi
                    </h1>
                    <label className="py-2 text-white">🌍 Je réside à :</label>
                    <input
                      className=" rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      type="text"
                      placeholder="Abidjan CI"
                      {...register("residence", { required: true })}
                    />
                    {errors.residence && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}

                    <label className="py-2 text-white">
                      ✉️ Contactez-moi :
                    </label>
                    <input
                      className=" rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      type="text"
                      placeholder="monmail@gmail.com"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}

                    <label className="py-2 text-white">
                      🚀 Mon travail en cours :{" "}
                    </label>
                    <input
                      className=" rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      type="text"
                      placeholder="Mon application"
                    />

                    <input
                      className=" mt-2 rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      type="text"
                      placeholder="http://monapplication.com"
                      {...register("website", { required: true })}
                    />
                    {errors.website && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}

                    <label className="py-2 text-white">
                      🤝 Je suis disponible pour :{" "}
                    </label>
                    <input
                      className=" rounded   bg-neutral-800 p-2 text-white  placeholder:text-gray-300 focus:border-blue-300"
                      type="text"
                      placeholder="des missions, travail à distance, etc..."
                      {...register("disponibilite", { required: true })}
                    />
                    {errors.disponibilite && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}
                  </div>
                </div>
                <Navigation />
              </form>
            )}
          </Container>
        </div>
      )}
    </div>
  );
};
export default Creerpage;
