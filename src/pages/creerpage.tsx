import { useSession, signIn } from 'next-auth/react';
import { api } from '../utils/api';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';
import { Logo } from '../components/icons/logo';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { Container } from '../components/container';
import { PageLoader } from '../components/PageLoader';
import { Html } from '../components/icons/skills/html';
import { Css } from '../components/icons/skills/css';
import { Javascript } from '../components/icons/skills/javascript';
import { Reactjs } from '../components/icons/skills/react';
import { Nodejs } from '../components/icons/skills/nodejs';
import { Angularjs } from '../components/icons/skills/angular';
import Head from 'next/head';

type FormData = {
  name: string;
  page: string;
  email: string;
  competencesTechniques: string[];
  poste: string;
  competencesMetier: string;
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
  const { mutateAsync: creerprofile } = api.profile.addprofiletouser.useMutation({
    onSuccess: async () => {
      setIsSubmitting(false);
      await router.push('/' + page).then(() => window.scrollTo(0, 0));
    },
  });
  const router = useRouter();
  const verifypage = api.page.verifypage.useMutation({
    onSuccess: () => {
      setIsSubmitting(false);
    },
  });
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taken, setTaken] = useState(false);
  const [page, setPage] = useState('');
  const { data: getpage, isLoading: loadinggetpage } = api.page.getPagebyId.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const Navigation = () => {
    return (
      <div>
        <div className="flex flex-col justify-center gap-2 ">
          {formStep === 4 ? null : (
            <button
              type="submit"
              className="rounded bg-[#575bc7] p-2 text-sm transition-colors duration-300 hover:bg-[#575bc7]/60 disabled:bg-purple-100 disabled:text-gray-800"
            >
              <span>Suivant</span>
            </button>
          )}
          {formStep === 0 ? null : (
            <button
              onClick={() => setFormStep(formStep - 1)}
              className="inline-flex items-center justify-center rounded-md border bg-secondary p-2 transition-colors duration-300 hover:bg-modalbutton disabled:bg-neutral-600"
            >
              <span>Précédent</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  if (status === 'unauthenticated') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Link href={'/'} passHref>
          <Logo classname="hover:scale-105 duration-300 transition w-16 h-16 mr-2 stroke-white" />
        </Link>
        <h1 className="p-4 text-center text-sm md:text-xl lg:text-2xl">
          Connectez vous pour créer une page
        </h1>
        <Button onClick={() => void signIn()}>Se connecter</Button>
      </div>
    );
  }

  if (loadinggetpage) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <PageLoader />
      </div>
    );
  }

  if (getpage?.page) {
    router
      .push('/' + getpage.page)
      .then(() => window.scrollTo(0, 0))
      .catch((err) => console.log(err));
  }

  const OnSubmit = handleSubmit((data) => {
    console.log(data);
    setFormStep(formStep + 1);
  });

  const handleverification = handleSubmit(async (data) => {
    setIsSubmitting(true);
    const test = verifypage.mutateAsync({
      page: data.page,
    });
    await test.then((res) => {
      if (res === true) {
        setTaken(true);
      } else {
        setPage(data.page);
        setFormStep(formStep + 1);
      }
    });
  });

  const submitfini = handleSubmit(async (data) => {
    console.log(data);
    setIsSubmitting(true);
    await creerprofile({
      name: data.name,
      email: data.email,
      about: data.description,
      competence: data.competencesTechniques,
      page: page,
      fonction: data.poste,
      residence: data.residence,
      website: data.website,
      facebook: data.facebook,
      instagram: data.instagram,
      twitter: data.twitter,
      youtube: data.youtube,
      linkedin: data.linkedin,
      github: data.github,
    });
  });
  return (
    <>
      <Head>
        <title>Dabara - Créer une page</title>
        <meta name="description" content="Créer une page" />
      </Head>
      {getpage?.page === null && (
        <div>
          <Container>
            {formStep === 0 && (
              <form
                onSubmit={handleverification}
                className="flex min-h-screen flex-col items-center justify-center "
              >
                <div className="flex justify-center">
                  <Link href={'/'}>
                    <Logo classname=" hover:scale-105  duration-300 transition w-16 h-16 mr-2 stroke-white" />
                  </Link>
                </div>

                <div className="flex-col text-center text-lg text-gray-300 md:text-xl lg:text-2xl  ">
                  <h1 className="font-extrabold uppercase">Création du profile</h1>
                </div>
                <div className=" flex flex-col justify-center rounded p-8 ">
                  <h1 className=" text-center text-3xl font-extrabold lg:text-4xl ">
                    Vérifier la validité de <br className="hidden md:block" /> la page
                  </h1>
                  <label className="py-2 ">🌐 Mon identifiant:</label>
                  <input
                    className=" rounded    p-2  caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                    type="text"
                    placeholder="@username"
                    {...register('page', {
                      required: true,
                      minLength: 4,
                      maxLength: 20,
                      //regex pour que le nom de la page ne contienne que des lettres et des chiffres
                      pattern: /^[a-zA-Z0-9]+$/,
                    })}
                  />
                  {errors.page?.type === 'required' && (
                    <span className="text-red-800 ">L&apos;identifiant est obligatoire</span>
                  )}
                  {errors.page?.type === 'minLength' && (
                    <span className="text-red-800 ">
                      L&apos;identifiant doit contenir au moins 4 caractères
                    </span>
                  )}
                  {errors.page?.type === 'maxLength' && (
                    <span className="text-red-800 ">
                      L&apos;identifiant doit contenir au plus 20 caractères
                    </span>
                  )}
                  {errors.page?.type === 'pattern' && (
                    <span className="text-red-800 ">
                      L&apos;identifiant ne doit contenir que
                      <br className="hidden md:block" /> des lettres et des chiffres
                    </span>
                  )}
                  {taken && <span className="text-red-800 ">Cet identifiant est déjà pris</span>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className=" rounded bg-[#575bc7] p-2 text-sm transition-colors duration-300 hover:bg-[#575bc7]/60  disabled:text-gray-800"
                >
                  Vérifier la page
                </button>
              </form>
            )}
            {formStep === 1 && (
              <form onSubmit={OnSubmit} className="flex flex-col items-center justify-center py-8">
                <div className="flex justify-center">
                  <Link href={'/'}>
                    <Logo classname=" hover:scale-105  duration-300 transition w-16 h-16 mr-2 stroke-white" />
                  </Link>
                </div>
                <div>
                  <div className="flex-col text-center text-lg text-gray-300 md:text-xl lg:text-2xl  ">
                    <h1 className="font-extrabold uppercase">Introduction</h1>
                    <h2>
                      Présentez vous aux visiteurs de votre page, <br className="hidden md:block" />{' '}
                      expliquez-leur ce que vous faites
                    </h2>
                  </div>
                  <div className=" flex flex-col justify-center rounded p-8 ">
                    <h1 className=" text-center text-3xl font-extrabold lg:text-4xl ">
                      Créer votre page
                    </h1>
                    <div className="flex items-center ">
                      <label className="md:text-md py-2 text-sm text-white">
                        🌐 Mon identifiant:{' '}
                      </label>
                      <div className=" rounded p-2    text-sm font-extrabold  text-white md:text-lg">
                        @{page}
                      </div>
                    </div>

                    <label className="py-2 text-white">👋 Je m&apos;appelle :</label>
                    <input
                      className=" rounded       p-2 text-white caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                      type="text"
                      placeholder="Nom"
                      {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-800">Ce champ est requis</span>}

                    <label htmlFor="" className="py-2">
                      💡 Fonction :
                    </label>
                    <input
                      className="  rounded       p-2 text-white caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                      type="text"
                      placeholder="Fonction..."
                      {...register('poste', { required: true })}
                    />
                    {errors.poste && <span className="text-red-800">Ce champ est requis</span>}
                    <label htmlFor="" className="py-2">
                      ✏️ Description:
                    </label>
                    <textarea
                      className="   rounded       p-2 text-white caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                      placeholder="Description"
                      {...register('description')}
                    />
                  </div>

                  <div className=" flex flex-col justify-center rounded p-8 ">
                    <h1 className="text-center text-3xl font-extrabold lg:text-4xl">
                      A propos de moi
                    </h1>
                    <label className="py-2 text-white">🌍 Je réside à :</label>
                    <input
                      className=" rounded       p-2 text-white caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                      type="text"
                      placeholder="Abidjan CI"
                      {...register('residence')}
                    />

                    <label className="py-2 text-white">✉️ Contactez-moi :</label>
                    <input
                      className=" rounded       p-2 text-white caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                      type="text"
                      placeholder="monmail@gmail.com"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    {errors?.email?.type === 'pattern' && (
                      <span className="text-red-800">Veuillez entrer une adresse mail valide</span>
                    )}

                    <label className="py-2 text-white">🚀 Mon travail en cours : </label>
                    <input
                      className=" rounded       p-2 text-white caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                      type="text"
                      placeholder="Mon application"
                    />

                    <input
                      className=" mt-2 rounded    p-2 text-white  placeholder:text-gray-600 focus:border-blue-300"
                      type="text"
                      placeholder="http://monapplication.com"
                      {...register('website', { required: true })}
                    />
                    {errors.website && <span className="text-red-800">Ce champ est requis</span>}

                    <label className="py-2 text-white">🤝 Je suis disponible pour : </label>
                    <input
                      className=" rounded       p-2 text-white caret-blue-600  placeholder:text-gray-600 focus:border-blue-300"
                      type="text"
                      placeholder="des missions, travail à distance, etc..."
                      {...register('disponibilite', { required: true })}
                    />
                    {errors.disponibilite && (
                      <span className="text-red-800">Ce champ est requis</span>
                    )}
                  </div>
                </div>
                <Navigation />
              </form>
            )}
            {formStep === 2 && (
              <form onSubmit={OnSubmit} className="flex flex-col items-center py-8">
                <div className="flex flex-col justify-center rounded p-8 ">
                  <h1 className="text-center text-3xl font-extrabold lg:text-4xl">
                    Mes compétences
                  </h1>
                  <label className="py-2 text-white">📚 Mes compétences techniques :</label>
                  {/** checkbox */}
                  <div className="flex flex-wrap items-center justify-center gap-3 lg:w-72 ">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <input
                        className="rounded"
                        type="checkbox"
                        value="HTML"
                        {...register('competencesTechniques', {
                          required: true,
                        })}
                      />
                      <label className="py-2 text-white">
                        <Html className="h-8 w-8" />
                      </label>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <input
                        className="rounded "
                        type="checkbox"
                        value="CSS"
                        {...register('competencesTechniques', {
                          required: true,
                        })}
                      />
                      <label className="py-2 text-white">
                        <Css className="h-8 w-8" />
                      </label>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <input
                        className="rounded "
                        type="checkbox"
                        value="Javascript"
                        {...register('competencesTechniques', {
                          required: true,
                        })}
                      />
                      <label className="py-2 text-white">
                        <Javascript className="h-8 w-8" />
                      </label>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <input
                        className="rounded "
                        type="checkbox"
                        value="React"
                        {...register('competencesTechniques', {
                          required: true,
                        })}
                      />
                      <label className="py-2 text-white">
                        <Reactjs className="h-8 w-8" />
                      </label>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <input
                        className="rounded "
                        type="checkbox"
                        value="NodeJS"
                        {...register('competencesTechniques', {
                          required: true,
                        })}
                      />
                      <label className="py-2 text-white">
                        <Nodejs className="h-8 w-8" />
                      </label>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <input
                        className="rounded "
                        type="checkbox"
                        value="Angular"
                        {...register('competencesTechniques', {
                          required: true,
                        })}
                      />
                      <label className="py-2 text-white">
                        <Angularjs className="h-8 w-8" />
                      </label>
                    </div>
                  </div>

                  <label className="py-2 text-white">📚 Mes compétences métiers :</label>
                  <input
                    className=" rounded "
                    type="text"
                    placeholder="Développeur, Designer, etc..."
                    {...register('competencesMetier', { required: true })}
                  />
                  {errors.competencesMetier && (
                    <span className="text-red-800">Ce champ est requis</span>
                  )}
                </div>
                <Navigation />
              </form>
            )}
            {formStep === 3 && (
              <form onSubmit={submitfini} className="flex flex-col items-center py-8">
                <div className=" rounded p-8 ">
                  <h1 className="text-center text-3xl font-extrabold lg:text-4xl">
                    Réseaux sociaux <br className="hidden md:block" /> (optionnel)
                  </h1>
                  <div className="flex flex-col">
                    <label className="py-2 text-white">▶️ Youtube :</label>
                    <div className="flex flex-row-reverse items-center text-xs  ">
                      <input
                        className=" peer rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white  ring-0 placeholder:text-gray-600 visited:bg-change  autofill:bg-transparent focus:border-blue-300 focus:outline-none  focus:ring-0"
                        type="text"
                        placeholder=""
                        {...register('youtube')}
                      />

                      <span className=" rounded-l-md border border-r-0 border-gray-500 bg-change p-2 px-0 focus:ring-0  peer-focus:border-blue-300">
                        https://www.youtube.com/c/
                      </span>
                    </div>
                  </div>

                  <label className="py-2 text-white">💼 Linkedin :</label>
                  <div className="flex flex-row-reverse items-center justify-center text-xs">
                    <input
                      className=" peer rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
                      type="text"
                      placeholder=""
                      {...register('linkedin')}
                    />

                    <span className=" rounded-l-md border border-r-0 border-gray-500 bg-change p-2 px-0 focus:ring-0  peer-focus:border-blue-300">
                      https://www.linkedin.com/in/
                    </span>
                  </div>
                  <label className="py-2 text-white">🐦 Twitter :</label>
                  <div className="flex flex-col">
                    <div className="flex w-96 flex-row-reverse  items-center justify-center  text-xs">
                      <input
                        className=" peer rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
                        type="text"
                        placeholder=""
                        {...register('twitter')}
                      />

                      <span className=" rounded-l-md border border-r-0 border-gray-500 bg-change p-2 px-0 focus:ring-0  peer-focus:border-blue-300">
                        https://www.twitter.com/
                      </span>
                    </div>
                  </div>
                  <label className="py-2 text-white">📸 Instagram :</label>
                  <div className="flex w-96 flex-row-reverse  items-center justify-center  text-xs ">
                    <input
                      className=" peer rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
                      type="text"
                      placeholder=""
                      {...register('instagram')}
                    />

                    <span className=" rounded-l-md border border-r-0 border-gray-500 bg-change p-2 px-0 focus:ring-0  peer-focus:border-blue-300">
                      https://www.instagram.com/
                    </span>
                  </div>
                  <label className="py-2 text-white">📟 Facebook :</label>
                  <div className="flex w-96 flex-row-reverse items-center justify-center text-xs">
                    <input
                      className=" peer rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
                      type="text"
                      placeholder=""
                      {...register('facebook')}
                    />

                    <span className=" rounded-l-md border border-r-0 border-gray-500 bg-change p-2 px-0 focus:ring-0  peer-focus:border-blue-300">
                      https://www.facebook.com/
                    </span>
                  </div>
                  <label className="py-2 text-white">👨‍💻 Github :</label>
                  <div className="flex flex-row-reverse text-xs">
                    <input
                      className=" peer rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
                      type="text"
                      placeholder=""
                      {...register('github')}
                    />

                    <span className=" rounded-l-md border border-r-0 border-gray-500 bg-change p-2 px-0 focus:ring-0  peer-focus:border-blue-300">
                      https://www.github.com/
                    </span>
                  </div>
                </div>
                <Navigation />
              </form>
            )}

            {formStep === 4 && (
              <div>
                <h1 className="text-center text-3xl font-extrabold lg:text-4xl">
                  Votre page est prête !
                </h1>
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  );
};
export default Creerpage;
