import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, Fragment, useRef, type RefObject } from 'react';
import { Avatar } from '../components/Avatar';
import { Container } from '../components/container';
import { Clipboard } from '../components/icons/clipboard';
import { Logo } from '../components/icons/logo';
import { ImageCard } from '../components/ImageCard';
import { Dialog, Transition } from '@headlessui/react';
import Loader from '../components/Loader';
import { Network } from '../components/Network';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../utils/api';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { ImageForm } from '../components/ImageForm';
import { Editicon } from '../components/icons/editicon';
import { CompetenceForm } from '../components/CompetenceForm';
import { PrismaClient } from '@prisma/client';
import { PageLoader } from '../components/PageLoader';
import { Skills } from '../components/Skills';
import { NetworkForm } from '../components/NetworkForm';
import { UnFound } from './404';
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const prisma = new PrismaClient();
  const page = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      image: true,
      fonction: true,
    },
    where: {
      page: context.query.nom as string,
    },
  });

  if (!page) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      page,
    },
  };
}

const Nom: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ page }) => {
  const router = useRouter();

  const { nom } = router.query;
  const session = useSession();
  const [changedesc, setchangedesc] = useState(false);
  const [changefonction, setChangefonction] = useState(false);
  const [newdesc, setnewdesc] = useState('');
  const [newfonction, setNewfonction] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const reffonction = useRef<HTMLInputElement>();
  useOnClickOutside(reffonction as RefObject<HTMLInputElement>, () => {
    {
      if (newfonction === userinfo?.fonction) {
        setChangefonction(false);
      } else {
        setChangefonction(false);
        updateuserinfo({ fonction: newfonction });
      }
    }
  });

  const refDescription = useRef<HTMLTextAreaElement>();
  useOnClickOutside(refDescription as RefObject<HTMLTextAreaElement>, () => {
    {
      if (newdesc === userinfo?.about) {
        setchangedesc(false);
      } else {
        setchangedesc(false);

        updateuserinfo({ about: newdesc });
      }
    }
  });

  const [isOpenNetwork, setIsOpenNetwork] = useState(false);

  function closeModalNetwork() {
    setIsOpenNetwork(false);
  }

  function openModalNetwork() {
    setIsOpenNetwork(true);
  }

  const [isOpenCompetence, setIsOpenCompetence] = useState(false);

  function closeModalCompetence() {
    setIsOpenCompetence(false);
  }

  function openModalCompetence() {
    setIsOpenCompetence(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { data: userinfo, isLoading: loadinguserinfo } = api.page.getPage.useQuery(
    {
      page: nom as string,
    },
    { enabled: nom !== undefined },
  );

  api.profile.incrementview.useQuery(
    {
      id: userinfo?.id as string,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: userinfo !== undefined,
    },
  );

  const { data: images, isLoading: loadingimages } = api.image.getuserimages.useQuery(
    {
      id: userinfo?.id as string,
    },
    {
      enabled: userinfo !== undefined,
    },
  );

  const onChangeDescription = () => {
    setchangedesc(!changedesc);
    setnewdesc(userinfo?.about as string);
  };

  const onChangeFonction = () => {
    setChangefonction(!changefonction);
    setNewfonction(userinfo?.fonction as string);
  };

  const utils = api.useContext();

  const { mutate: updateuserinfo } = api.page.updateuser.useMutation({
    onSuccess: async () => {
      toast.success('Informations mises à jour');
      await utils.page.getPage.invalidate();
    },
  });

  const { mutate: deleteportfolio, isLoading: loadingdelete } =
    api.image.deleteportfolio.useMutation({
      onSuccess: async () => {
        toast.success('Portfolio supprimé', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        await utils.image.getuserimages.invalidate();
      },
    });

  if (loadinguserinfo) {
    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content={'portfolio'} />
          <meta
            name="description"
            content={`Suivez ${nom as string} sur Dabara et découvrez son portfolio.`}
            key="desc"
          />
          <meta
            property="og:image"
            content={`https://dabara.vercel.app/api/og-image?title=${nom as string}&image=${
              page?.image as string
            }&fonction=${page?.fonction as string}`}
          />
        </Head>
        <PageLoader />;
      </>
    );
  }

  if (!page || !userinfo) {
    return (
      <>
        <Head>
          <title>Dabara</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <UnFound />;
      </>
    );
  }

  const Copylink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Lien copié avec succès', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Portfolio de {userinfo?.Profil?.name}</title>
        <meta name="title" content={'portfolio'} />
        <meta
          name="description"
          content={`Suivez ${nom as string} sur Dabara et découvrez son portfolio.`}
          key="desc"
        />
        <meta
          property="og:image"
          content={`https://dabara.vercel.app/api/og-image?title=${nom as string}&image=${
            page?.image as string
          }&fonction=${page?.fonction as string}`}
        />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        transition={Flip}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      {!userinfo && <Error statusCode={404} />}

      {/** ------------------------------------ Modal for image form ------------------------------------ */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    'fixed z-50',
                    'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                    'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                    ' bg-secondary  ',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                    Ajouter votre projet
                  </Dialog.Title>
                  <div className="mt-2">
                    <ImageForm closeModal={closeModal} />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className=" inline-flex justify-center rounded-md  border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-modalbutton  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Quitter
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/**----------------------------------- Modal for competences form ------------------------------------- */}

      <Transition appear show={isOpenCompetence} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalCompetence}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    'fixed z-50',
                    'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                    'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                    ' bg-secondary  ',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                    📚 Mes compétences
                  </Dialog.Title>
                  <div className="mt-2">
                    <CompetenceForm
                      closeModalCompetence={closeModalCompetence}
                      competence={userinfo?.Competence.map((competence) => {
                        return competence.name;
                      })}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className=" inline-flex justify-center rounded-md  border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-modalbutton  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                      onClick={closeModalCompetence}
                    >
                      Quitter
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/**----------------------------------- Modal for Network form ------------------------------------- */}
      <Transition appear show={isOpenNetwork} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalNetwork}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    'fixed z-50',
                    'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                    'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                    ' bg-secondary  ',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                    Mes réseaux
                  </Dialog.Title>
                  <div className="mt-2">
                    <NetworkForm
                      closeModal={closeModalNetwork}
                      youtube={userinfo?.Profil?.youtube || undefined}
                      facebook={userinfo?.Profil?.facebook || undefined}
                      instagram={userinfo?.Profil?.instagram || undefined}
                      linkedin={userinfo?.Profil?.linkedin || undefined}
                      github={userinfo?.Profil?.github || undefined}
                      twitter={userinfo?.Profil?.twitter || undefined}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className=" inline-flex justify-center rounded-md  border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-modalbutton  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                      onClick={closeModalNetwork}
                    >
                      Quitter
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Container classname="flex items-center flex-col justify-center lg:bg-transparent lg:flex lg:items-start lg:flex-row lg:h-full lg:w-full">
        <div className="flex flex-col items-center lg:my-0 lg:h-screen    lg:w-96  lg:rounded lg:border-2 lg:border-yellow-200 lg:bg-profile ">
          <Avatar
            nom={nom as string}
            sessionid={session.data?.user?.id || ''}
            userinfoid={userinfo?.id}
            email={userinfo?.Profil?.email || undefined}
            lien={userinfo.image || undefined}
          />
          <div className="flex flex-col items-center">
            {!changefonction ? (
              <p
                onClick={userinfo.id === session.data?.user?.id ? onChangeFonction : undefined}
                className="text-xl font-bold"
              >
                {newfonction ? newfonction : userinfo?.fonction || 'Ajouter votre fonction'}
              </p>
            ) : (
              <div className="flex ">
                <input
                  ref={reffonction as RefObject<HTMLInputElement>}
                  type="text"
                  autoFocus
                  className=" text-md w-48 rounded-md  border  border-gray-300 bg-change font-bold  outline-none"
                  value={newfonction}
                  onChange={(e) => setNewfonction(e.target.value)}
                />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center justify-center py-2">
              <p className=" text-center text-xl font-bold">Mes réseaux </p>
              {userinfo.id === session.data?.user?.id && (
                <button onClick={openModalNetwork} className="ml-2 rounded bg-blue-700 p-1">
                  <Editicon className="h-4 w-4" />
                </button>
              )}
            </div>
            <Network
              youtube={userinfo?.Profil?.youtube || undefined}
              facebook={userinfo?.Profil?.facebook || undefined}
              instagram={userinfo?.Profil?.instagram || undefined}
              linkedin={userinfo?.Profil?.linkedin || undefined}
              github={userinfo?.Profil?.github || undefined}
              twitter={userinfo?.Profil?.twitter || undefined}
            />
          </div>
          <div>
            <p className=" cursor-default text-center  text-xl font-bold  ">A propos de moi</p>

            {!changedesc && (
              <p
                className="truncate whitespace-pre-wrap p-2 text-center indent-4 text-sm "
                onClick={userinfo.id === session.data?.user?.id ? onChangeDescription : undefined}
              >
                {newdesc ? newdesc : userinfo?.about || 'Ajouter une description'}
              </p>
            )}
            {changedesc && (
              <div className="flex flex-col items-center">
                <textarea
                  ref={refDescription as RefObject<HTMLTextAreaElement>}
                  autoFocus
                  className="h-32 rounded bg-change p-2 lg:w-64"
                  value={newdesc}
                  onChange={(e) => setnewdesc(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="mb-5 flex gap-2 font-bold">
            Contactez moi:{' '}
            <a
              href={`mailto:${userinfo?.Profil?.email || ''}`}
              className="text-purple-500 transition-colors duration-300 hover:text-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </a>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-center text-xl font-bold  ">
              <p>Mes compétences</p>
              {userinfo.id === session.data?.user?.id && (
                <button onClick={openModalCompetence} className="ml-2 rounded bg-blue-700 p-1">
                  <Editicon className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap justify-center">
              <Skills competence={userinfo?.Competence} />
            </div>
          </div>
          {/**
          <div>
            <p className="cursor-default text-center text-xl font-bold  ">Langues</p>
            <div className="flex flex-wrap justify-center">
              <div className="m-2  rounded ">
                <p className=" select-none text-sm font-bold uppercase">Français</p>
                <p>Courant</p>
              </div>
              <div className="m-2  rounded ">
                <p className="select-none text-sm font-bold uppercase ">Anglais</p>
                <p>Courant</p>
              </div>
            </div>
          </div> */}

          <div className="mt-2 hidden  flex-col items-center justify-center gap-2 px-8 lg:flex  ">
            <div className="flex items-center justify-center  ">
              <input
                value={`https://dabara.vercel.app/${userinfo?.page || ''}`}
                className="
              w-full  truncate rounded-l-lg border bg-transparent p-1  
              "
              />
              <button
                onClick={() => Copylink()}
                className=" rounded-r-lg border border-l-0 bg-transparent p-1"
              >
                <Clipboard className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-2 gap-2 py-2">
              <p className="text-center text-xs font-bold ">
                Cette page a été visitée {userinfo?.Profil?.views} fois
              </p>
              <Link className="md:text-md group mr-2 flex items-center justify-center  " href={'/'}>
                <Logo classname="w-8 h-8 mr-2 stroke-white group-hover:rotate-45 ease-in-out transition duration-500 " />
                <p className="text-md font-extrabold">
                  <span className="">DAB</span>
                  <span className="text-blue-300">ARA</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className=" lg:ml-4 lg:w-full lg:overflow-y-auto  lg:bg-profile">
          <div className="flex h-full w-full flex-col items-center justify-center rounded lg:max-h-screen lg:border-2 lg:border-yellow-200">
            {images?.length !== undefined &&
              images?.length < 2 &&
              userinfo?.id === session.data?.user?.id && (
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center  gap-2 rounded-sm bg-blue-300 p-2 text-gray-800 "
                >
                  Ajouter un projet <Editicon className="h-4 w-4 " />
                </button>
              )}
            {loadingimages ? (
              <div className="my-4">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-col items-center p-4 lg:h-[calc(100vh_-_3rem)]  lg:overflow-y-auto">
                {images?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-center text-xl font-bold ">Aucun projet</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-center text-xl font-bold ">Mes projets</p>
                  </div>
                )}
                {images?.map((image) => {
                  return (
                    <div className="m-2 flex flex-col px-8" key={image.id}>
                      <ImageCard
                        sessionid={session.data?.user?.id || ''}
                        userinfoid={userinfo?.id}
                        id={image.id}
                        image={image.url || ''}
                        description={image.description || 'description'}
                        title={image.title || ''}
                        link={image.github || ''}
                      />
                      {userinfo?.id === session.data?.user?.id && (
                        <div className="flex items-center justify-center ">
                          <button
                            onClick={() => {
                              deleteportfolio({
                                id: image.id,
                              });
                            }}
                            disabled={loadingdelete}
                            className="mt-2 inline-flex w-24 items-center justify-center rounded bg-red-400 p-2 font-bold text-gray-800 transition-colors duration-300 hover:bg-red-500"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-col items-center justify-center gap-2 lg:hidden  ">
            <div className="flex items-center justify-center  px-8 ">
              <input
                value={`https://dabara.vercel.app/${userinfo?.page || ''}`}
                className="
              w-full  truncate rounded-l-lg border bg-transparent p-1  
              "
              />
              <button
                onClick={() => Copylink()}
                className=" rounded-r-lg border border-l-0 bg-transparent p-1"
              >
                <Clipboard className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-2 gap-2">
              <p className="text-center text-xs font-bold ">
                Cette page a été visitée {userinfo?.Profil?.views} fois
              </p>
              <Link className="md:text-md mr-2 flex items-center justify-center " href={'/'}>
                <Logo classname="w-8 h-8  mr-2 stroke-white" />
                <p className="text-md font-extrabold">
                  <span className="">DAB</span>
                  <span className="text-blue-300">ARA</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Nom;
