import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, Fragment, useRef, type RefObject } from 'react';
import { Avatar } from '../components/Avatar';
import { Container } from '../components/container';
import { Clipboard } from '../components/icons/clipboard';
import { Logo } from '../components/icons/logo';
import { ImageCard } from '../components/ImageCard';
import { Dialog, Transition, Tab } from '@headlessui/react';
import Loader from '../components/Loader';
import { Network } from '../components/Network';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../utils/api';
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
import { NextSeo } from 'next-seo';
import { TrashIcon } from '../components/icons/trash';

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
  {
    /**
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [page]);

  {
    isLoading && <PageLoader />;
  }
 */
  }
  const { nom } = router.query;
  // Set isLoading to false once data has been fetched

  const session = useSession();
  const [changedesc, setchangedesc] = useState(false);
  const [changefonction, setChangefonction] = useState(false);
  const [newdesc, setnewdesc] = useState('');
  const [newfonction, setNewfonction] = useState('');
  const [newadresse, setNewadresse] = useState('');
  const [changeadresse, setChangeadresse] = useState(false);
  const [changedisponibilite, setChangedisponibilite] = useState(false);
  const [newdisponibilite, setNewdisponibilite] = useState('');

  const [newtafencours, setNewtafencours] = useState('');
  const [changeTafencours, setChangeTafencours] = useState(false);

  const [newwebsite, setNewwebsite] = useState('');
  const [changewebsite, setChangewebsite] = useState(false);

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

  const refadresse = useRef<HTMLInputElement>();
  useOnClickOutside(refadresse as RefObject<HTMLInputElement>, () => {
    {
      if (newadresse === userinfo?.adresse) {
        setChangeadresse(false);
      } else {
        setChangeadresse(false);
        updateuserinfo({ adresse: newadresse });
      }
    }
  });

  const refdisponibilite = useRef<HTMLInputElement>();
  useOnClickOutside(refdisponibilite as RefObject<HTMLInputElement>, () => {
    {
      if (newdisponibilite === userinfo?.disponibilite) {
        setChangedisponibilite(false);
      } else {
        setChangedisponibilite(false);
        updateuserinfo({ disponibilite: newdisponibilite });
      }
    }
  });

  const reftafencours = useRef<HTMLInputElement>();
  useOnClickOutside(reftafencours as RefObject<HTMLInputElement>, () => {
    {
      if (newtafencours === userinfo?.Profil?.travailencours) {
        setChangeTafencours(false);
      } else {
        setChangeTafencours(false);
        updateuserinfo({ tafencours: newtafencours });
      }
    }
  });

  const refwebsite = useRef<HTMLInputElement>();
  useOnClickOutside(refwebsite as RefObject<HTMLInputElement>, () => {
    {
      if (newwebsite === userinfo?.Profil?.website) {
        setChangewebsite(false);
      } else {
        setChangewebsite(false);
        updateuserinfo({ website: newwebsite });
      }
    }
  });

  const deleteprofile = api.profile.deleteprofile.useMutation({
    onSuccess: async () => {
      await router.push('/');
      await utils.page.getPage.invalidate();
    },
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

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  function closeModalDelete() {
    setIsOpenDelete(false);
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

  const onChangeAdresse = () => {
    setChangeadresse(!changeadresse);
    setNewadresse(userinfo?.adresse as string);
  };

  const onChangeDisponibilite = () => {
    setChangedisponibilite(!changedisponibilite);
    setNewdisponibilite(userinfo?.disponibilite as string);
  };

  const onChangeTafencours = () => {
    setChangeTafencours(!changeTafencours);
    setNewtafencours(userinfo?.Profil?.travailencours as string);
  };

  const onChangeWebsite = () => {
    setChangewebsite(!changewebsite);
    setNewwebsite(userinfo?.Profil?.website as string);
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

  if (loadinguserinfo && page) {
    const image = encodeURIComponent(page.image as string);
    const title = encodeURIComponent(nom as string);
    const fonction = encodeURIComponent(page.fonction as string);


    return (
      <>
        <NextSeo
          title={`Dabara - Portfolio de ${nom as string}`}
          description="Dabara est une plateforme de partage de portfolio pour les développeurs"
          canonical="https://dabara.vercel.app"
          twitter={{
            handle: '@dabara',
            site: '@dabara',
            cardType: 'summary_large_image',
          }}
          openGraph={{
            url: 'https://dabara.com',
            title: `Dabara - @${title }`,
            description: 'Dabara est une plateforme de partage de portfolio pour les développeurs',
            images: [
              {
                url: `https://dabara.vercel.app/api/og-image?title=${title}&image=${image}&fonction=${fonction}`,
                width: 1200,
                height: 630,
                alt: 'Dabara',
              },
            ],

            type: 'website',
            site_name: 'Dabara',
            profile: {
              username: `${nom as string}`,
              firstName: `${page.name as string}`,
            },
          }}
        />
        <PageLoader />
      </>
    );
  }

  if (!page || !userinfo) {
    return (
      <>
        <NextSeo
          title={`Dabara - Ce portfolio n'existe pas`}
          description="Dabara est une plateforme de partage de portfolio pour les développeurs"
          canonical="https://dabara.com"
          twitter={{
            handle: '@dabara',

            site: '@dabara',
            cardType: 'summary_large_image',
          }}
          openGraph={{
            url: 'https://dabara.com',
            title: 'Dabara',

            description: 'Dabara est une plateforme de partage de portfolio pour les développeurs',

            images: [
              {
                url: 'https://dabara.vercel.app/og.png',
              },
            ],

            type: 'website',
            site_name: 'Dabara',
          }}
        />
        <UnFound />
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

  const image = encodeURIComponent(page.image as string);
  const title = encodeURIComponent(nom as string);
  const fonction = encodeURIComponent(page.fonction as string);


  return (
    <div>
      <NextSeo
          title={`Dabara - Portfolio de ${nom as string}`}
          description="Dabara est une plateforme de partage de portfolio pour les développeurs"
          canonical="https://dabara.vercel.app"
          twitter={{
            handle: '@dabara',
            site: '@dabara',
            cardType: 'summary_large_image',
          }}
          openGraph={{
            url: 'https://dabara.com',
            title: `Dabara - @${title }`,
            description: 'Dabara est une plateforme de partage de portfolio pour les développeurs',
            images: [
              {
                url: `https://dabara.vercel.app/api/og-image?title=${title}&image=${image}&fonction=${fonction}`,
                width: 1200,
                height: 630,
                alt: 'Dabara',
              },
            ],

            type: 'website',
            site_name: 'Dabara',
            profile: {
              username: `${nom as string}`,
              firstName: `${page.name as string}`,
            },
          }}
        />

      <ToastContainer
        position="bottom-right"
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
        <Dialog as="div" className="relative z-10 overflow-y-auto" onClose={closeModal}>
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

          <div className="fixed inset-0  ">
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
                    'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
                    ' max-h-screen overflow-y-auto bg-secondary ',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                  style={{ maxHeight: '90vh' }}
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

      {/**----------------------------------- Modal for Profile deletion ------------------------------------- */}

      <Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalDelete}>
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
                    'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
                    ' bg-secondary  ',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                    Supprimer le profil ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                      Vous êtes sur le point de supprimer votre profil. Cette action est
                      irréversible.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      className=" inline-flex justify-center rounded-md  border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-red-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
                      onClick={() => {
                        deleteprofile.mutate();
                      }}
                    >
                      OUI
                    </button>

                    <button
                      type="button"
                      className=" inline-flex justify-center rounded-md  border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-modalbutton  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                      onClick={closeModalDelete}
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
                    'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
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
                    'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
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

      <Container classname="flex items-center flex-col justify-center lg:bg-transparent lg:flex lg:items-start lg:flex-row lg:h-screen lg:w-full">
        <div className=" flex  flex-col items-center  lg:my-auto lg:h-[36rem] lg:w-96  lg:rounded lg:border-2 lg:border-yellow-200 lg:bg-profile ">
          <Avatar
            nom={nom as string}
            sessionid={session.data?.user?.id || ''}
            userinfoid={userinfo?.id}
            profileid={userinfo?.Profil?.id}
            email={userinfo?.Profil?.email || undefined}
            lien={userinfo.image || undefined}
          />
          {!changeadresse ? (
            <p
              onClick={userinfo.id === session.data?.user?.id ? onChangeAdresse : undefined}
              className="text-lg "
            >
              <div>
                {newadresse ? (
                  <span>📍 {newadresse}</span>
                ) : (
                  <span>{userinfo?.adresse === '' ? '' : <span>📍 {userinfo?.adresse}</span>}</span>
                )}
              </div>
              {userinfo?.adresse === '' && userinfo.id === session.data?.user?.id && (
                <span className="text-gray-400">Ajouter votre adresse</span>
              )}
            </p>
          ) : (
            <div className="flex ">
              <input
                ref={refadresse as RefObject<HTMLInputElement>}
                type="text"
                autoFocus
                className=" text-md w-48 rounded-md  border  border-gray-300 bg-change font-bold  outline-none"
                value={newadresse}
                onChange={(e) => setNewadresse(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col items-center">
            {!changefonction ? (
              <p
                onClick={userinfo.id === session.data?.user?.id ? onChangeFonction : undefined}
                className="pt-6 text-xl font-bold"
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
            <div className=" flex items-center justify-center py-2 ">
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
            <div className="mt-4 flex items-center justify-center gap-1 text-center text-xl font-bold  lg:mt-8">
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
          {!changedisponibilite ? (
            <p
              onClick={userinfo.id === session.data?.user?.id ? onChangeDisponibilite : undefined}
              className="p-2 text-lg"
            >
              <div>
                {newdisponibilite ? (
                  <span>💼 {newdisponibilite}</span>
                ) : (
                  <span>
                    {userinfo?.disponibilite === '' ? (
                      ''
                    ) : (
                      <span>💼 {userinfo?.disponibilite}</span>
                    )}
                  </span>
                )}
              </div>
              {userinfo?.disponibilite === '' && userinfo.id === session.data?.user?.id && (
                <span className="text-gray-400">Ajouter votre disponibilité</span>
              )}
            </p>
          ) : (
            <div className="flex ">
              <input
                ref={refdisponibilite as RefObject<HTMLInputElement>}
                type="text"
                autoFocus
                className=" text-md w-48 rounded-md  border  border-gray-300 bg-change font-bold  outline-none"
                value={newdisponibilite}
                onChange={(e) => setNewdisponibilite(e.target.value)}
              />
            </div>
          )}

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
              pointer-events-none w-full select-none truncate rounded-l-lg border bg-transparent p-1  
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
        <div className="rounded lg:my-auto lg:ml-4 lg:h-[36rem] lg:max-h-screen  lg:w-full  lg:overflow-y-auto lg:border-2 lg:border-yellow-200 lg:bg-profile">
          <Tab.Group>
            <Tab.List
              className={
                'top-0 z-10 flex items-center justify-center gap-2  p-2 lg:sticky lg:flex-row '
              }
            >
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg p-1   font-medium leading-5 text-gray-100',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'border bg-change'
                      : 'bg-white/[0.12] text-blue-100 hover:text-white',
                  )
                }
              >
                Portfolio
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg p-1   font-medium leading-5 text-gray-100',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'border  bg-change'
                      : 'bg-white/[0.12] text-blue-100 hover:text-white',
                  )
                }
              >
                A propos
              </Tab>
              {userinfo?.id === session.data?.user?.id && (
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg p-1  font-medium leading-5 text-gray-100',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'border   bg-change'
                        : 'bg-white/[0.12] text-blue-100 hover:text-white',
                    )
                  }
                >
                  Paramètres
                </Tab>
              )}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex flex-col items-center lg:max-h-screen ">
                  {images?.length !== undefined &&
                    images?.length < 2 &&
                    userinfo?.id === session.data?.user?.id && (
                      <div className="flex items-center ">
                        <button
                          onClick={openModal}
                          className="my-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 p-2 text-white "
                        >
                          Ajouter un projet <Editicon className="h-4 w-4 " />
                        </button>
                      </div>
                    )}
                  {loadingimages ? (
                    <div className="my-4">
                      <Loader />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-4 ">
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
              </Tab.Panel>
              <Tab.Panel>
                <div className="p-8">
                  <p className=" cursor-default text-center  text-xl font-bold  ">
                    A propos de moi
                  </p>

                  {!changedesc && (
                    <p
                      className="truncate whitespace-pre-wrap p-2 text-center indent-4 text-sm lg:text-base "
                      onClick={
                        userinfo.id === session.data?.user?.id ? onChangeDescription : undefined
                      }
                    >
                      {newdesc ? newdesc : userinfo?.about || 'Aucune description'}
                      {userinfo?.about === '' && userinfo.id === session.data?.user?.id && (
                        <>
                          <br />
                          <span className="text-gray-400">Ajouter une description</span>
                        </>
                      )}
                    </p>
                  )}
                  {changedesc && (
                    <div className="flex flex-col items-center">
                      <textarea
                        ref={refDescription as RefObject<HTMLTextAreaElement>}
                        autoFocus
                        className="h-96 w-full rounded bg-change p-2 text-sm lg:text-base "
                        value={newdesc}
                        onChange={(e) => setnewdesc(e.target.value)}
                      />
                    </div>
                  )}

                  {!changeTafencours ? (
                    <p
                      onClick={
                        userinfo.id === session.data?.user?.id ? onChangeTafencours : undefined
                      }
                      className="p-2 text-center "
                    >
                      <div>
                        {newtafencours ? (
                          <span className="">
                            Je travaille actuellement sur
                            <span className="font-bold"> {newtafencours}</span>
                          </span>
                        ) : (
                          <span>
                            {userinfo.Profil?.travailencours === '' ? (
                              ''
                            ) : (
                              <span className="">
                                Je travaille actuellement sur
                                <span className="font-bold">
                                  {' '}
                                  {userinfo.Profil?.travailencours}
                                </span>
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                      {userinfo.Profil?.travailencours === '' &&
                        userinfo.id === session.data?.user?.id && (
                          <span className="text-gray-400">Ajouter votre projet en cours </span>
                        )}
                    </p>
                  ) : (
                    <div className="flex items-center justify-center p-2 ">
                      <input
                        ref={reftafencours as RefObject<HTMLInputElement>}
                        type="text"
                        autoFocus
                        className=" text-md w-48 rounded-md  border  border-gray-300 bg-change font-bold  outline-none"
                        value={newtafencours}
                        onChange={(e) => setNewtafencours(e.target.value)}
                      />
                    </div>
                  )}
                  {!changewebsite ? (
                    <div
                      onClick={userinfo.id === session.data?.user?.id ? onChangeWebsite : undefined}
                      className="p-2 text-center "
                    >
                      <div>
                        {newwebsite ? (
                          <div className="flex items-center justify-center ">
                            <Link
                              className={classNames(
                                ' text-sm underline hover:text-blue-400 ',
                                userinfo.id === session.data?.user?.id && 'pointer-events-none',
                              )}
                              passHref
                              href={newwebsite}
                            >
                              <span className="">{newwebsite}</span>
                            </Link>
                          </div>
                        ) : (
                          <div>
                            {userinfo.Profil?.website === '' ? (
                              ''
                            ) : (
                              <div className="flex items-center justify-center ">
                                <Link
                                  className={classNames(
                                    ' text-sm underline hover:text-blue-400 ',
                                    userinfo.id === session.data?.user?.id && 'pointer-events-none',
                                  )}
                                  target="_blank"
                                  passHref
                                  href={userinfo?.Profil?.website as string}
                                >
                                  <span className="">{userinfo.Profil?.website}</span>
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {userinfo.Profil?.website === '' &&
                        userinfo.id === session.data?.user?.id && (
                          <span className="text-gray-400">
                            Ajouter le site internet de votre projet
                          </span>
                        )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-2 ">
                      <input
                        ref={refwebsite as RefObject<HTMLInputElement>}
                        type="text"
                        autoFocus
                        className=" text-md w-48 rounded-md  border  border-gray-300 bg-change font-bold  outline-none"
                        value={newwebsite}
                        onChange={(e) => setNewwebsite(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                {userinfo?.id === session.data?.user?.id && (
                  <div className="mt-2 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-lg font-bold lg:text-xl">Salut {userinfo?.name}</h1>
                    <span className="text-center text-sm text-gray-200 hover:text-white lg:text-base lg:text-gray-500">
                      Pour modifier votre profil, cliquer directement sur les informations que vous
                      souhaitez modifier ou sur l&apos;icone de modification.
                    </span>
                    <span className="text-center text-sm text-gray-200 hover:text-white lg:text-base lg:text-gray-500">
                      Il n&apos;est pas possible de modifier votre nom d&apos;utilisateur, vous
                      pouvez en créer un nouveau en supprimant votre profil.
                    </span>
                    <button
                      onClick={() => setIsOpenDelete(true)}
                      className="mb-4 inline-flex items-center justify-center rounded-xl bg-red-500 p-2"
                    >
                      Supprimer votre profil
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
