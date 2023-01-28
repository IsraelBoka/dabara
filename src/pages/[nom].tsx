import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, Fragment } from 'react';
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
import { ImageForm } from '../components/ImageForm';

const Nom = () => {
  const router = useRouter();

  const { nom } = router.query;
  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);

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

  const { data: images } = api.image.getuserimages.useQuery(
    {
      id: userinfo?.id as string,
    },
    {
      enabled: userinfo !== undefined,
    },
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
        <title>@{userinfo?.page} portfolio </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
      {copied && (
        <div className=" flex w-full animate-fade-in items-center justify-center duration-300 ease-out ">
          <div className=" flex w-full items-center justify-center bg-green-600  text-white duration-300 ease-in">
            Votre lien a été copié , vous pouvez le partager
            <button className="bg-green-600 " onClick={() => setCopied(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
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
                    'border bg-[#242424]  ',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                    Ajouter votre projet
                  </Dialog.Title>
                  <div className="mt-2">
                    <ImageForm />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

      <Container classname="flex items-center  flex-col lg:items-start lg:flex-row h-full w-full">
        <div className="flex min-h-screen  w-96 flex-col items-center bg-[#242424] lg:rounded ">
          <Avatar
            nom={nom as string}
            email={userinfo?.Profil?.email || undefined}
            lien={userinfo.image || undefined}
          />
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-white">Développeur web </p>
          </div>
          <Network
            youtube={userinfo?.Profil?.youtube || undefined}
            facebook={userinfo?.Profil?.facebook || undefined}
            instagram={userinfo?.Profil?.instagram || undefined}
            linkedin={userinfo?.Profil?.linkedin || undefined}
            github={userinfo?.Profil?.github || undefined}
            twitter={userinfo?.Profil?.twitter || undefined}
          />
          <div>
            <p className="text-center text-xl font-bold text-white ">A propos de moi</p>
            <p className="truncate whitespace-pre-wrap p-2 indent-4 text-sm text-white">
              {userinfo.about}
            </p>
          </div>

          <div>
            <p className="text-center text-xl font-bold text-white ">Mes compétences</p>
            <div className="flex flex-wrap justify-center">
              {userinfo?.Competence?.map((competence) => {
                return (
                  <div
                    key={competence.id}
                    className="m-2  rounded bg-blue-300 p-2 transition-colors  duration-200 hover:bg-orange-300"
                  >
                    <p className="select-none text-sm font-bold uppercase text-gray-800">
                      {competence.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-center text-xl font-bold text-white ">Langues</p>
            <div className="flex flex-wrap justify-center">
              <div className="m-2  rounded ">
                <p className="select-none text-sm font-bold uppercase ">Français</p>
                <p>Courant</p>
              </div>
              <div className="m-2  rounded ">
                <p className="select-none text-sm font-bold uppercase ">Anglais</p>
                <p>Courant</p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex-col items-center justify-center gap-2  ">
            <div className="flex items-center justify-center  ">
              <input
                value={`https://dabara.vercel.app/${userinfo?.page || ''}`}
                className="
              w-full  truncate rounded-l-lg border bg-transparent p-1  text-white 
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
              <p className="text-center text-xs font-bold ">Cette page a été visitée 60 fois</p>
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
        <div className=" w-96 overflow-y-auto bg-[#242424] lg:ml-4 lg:w-full ">
          <div className="flex w-full flex-col justify-center lg:max-h-screen">
            {userinfo?.id === session.data?.user?.id && (
              <button
                onClick={openModal}
                className="flex  items-center justify-center bg-blue-500 p-2 text-white"
              >
                Ajouter un projet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            )}
            <p className="h-12 p-4 text-center text-xl font-bold text-white ">Mes projets</p>
            <div className="flex flex-col items-center p-4 lg:h-[calc(100vh_-_3rem)]  lg:overflow-y-auto">
              {images?.map((image) => {
                return (
                  <div className="m-2 px-8" key={image.id}>
                    <ImageCard
                      image={image.url || ' '}
                      description={image.description || 'description'}
                      title={image.title || ' '}
                      link={image.github || ' '}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Nom;
