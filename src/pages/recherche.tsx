// import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { Container } from '../components/container';
import { FilterIcon } from '../components/icons/filter';
import { Logo } from '../components/icons/logo';
import { SearchIcon } from '../components/icons/searchicon';
import Loader from '../components/Loader';
import { Dialog, Transition } from '@headlessui/react';
import { api } from '../utils/api';
import classNames from 'classnames';
import { Router } from 'next/router';
import { PageLoader } from '../components/PageLoader';
import { Button } from '../components/Button';
import { NextSeo } from 'next-seo';

const Recherche = () => {
  const [recherche, setRecherche] = useState<string>('');
  const [competences, setCompetences] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setLoading(false);
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    data: QuerySearch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = api.profile.searchprofile.useInfiniteQuery(
    { search: recherche, Tags: competences, limit: 9 },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    },
  );

  const profiles = QuerySearch?.pages.flatMap((page) => page?.profile);

  return (
    <>
      <NextSeo
        title="Dabara - Recherche de profils"
        description="Recherchez des profils par compétences ou par nom"
        openGraph={{
          title: 'Recherche',
          description: 'Recherchez des profils par compétences ou par nom',
        }}
      />
      {loading ? (
        <PageLoader />
      ) : (
        <Container classname="py-4 lg:px-48">
          <div>
            <div className="flex w-full items-center  justify-center">
              <Link href="/" className="duration-300 hover:scale-105">
                <p className="sr-only">Retour à l&apos;accueil</p>
                <Logo classname=" h-14 w-14 animate-fade-in opacity-0 [--animation-delay:200ms] lg:h-16 lg:w-16 " />
              </Link>
            </div>
            <div className="mb-1 flex  animate-fade-in items-center justify-center opacity-0 [--animation-delay:400ms]   ">
              <div className=" rounded-l-sm bg-[#2b2d3c] p-1">
                <SearchIcon className="h-6 w-6" />
              </div>
              <input
                className="decoration-none w-full rounded-r-sm border-0 bg-[#2b2d3c] p-1 focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 "
                type="text"
                placeholder="Recherche..."
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>
            <button className="group" onClick={openModal} name="filtering-button">
              <FilterIcon className="h-6 w-6 animate-fade-in text-white opacity-0 transition-colors duration-300 [--animation-delay:600ms] group-hover:stroke-gray-300" />
            </button>
            {isLoading ? (
              <div className="mt-5 animate-fade-in  opacity-0  [--animation-delay:800ms]">
                <Loader />
              </div>
            ) : profiles?.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-white">Aucun résultat</p>
              </div>
            ) : (
              <div className="mt-5 flex flex-wrap justify-center gap-6">
                {profiles?.map((profile) => {
                  return (
                    <Link
                      href={`/${profile?.page || ''}`}
                      key={profile?.id}
                      className=" flex w-48 flex-col items-start justify-center gap-1 rounded-md border border-gray-600  p-2 hover:bg-[#2b2d3c] "
                    >
                      <div className="flex items-center justify-center gap-2">
                        <img
                          alt="image du profile"
                          // src={profile?.image || ''}
                          src={`${
                            profile.page
                              ? `https://api.dicebear.com/5.x/lorelei/svg?seed=${profile?.page.replace(
                                  ' ',
                                  '-',
                                )}`
                              : 'https://api.dicebear.com/5.x/lorelei/svg?seed=testons'
                          }`}
                          width={500}
                          height={500}
                          className="h-16 w-16 rounded-full object-cover "
                        />
                        <div className="flex flex-col items-center justify-center overflow-hidden text-xs">
                          <p className="text-white">@{profile?.page}</p>

                          <p className="text-white">{profile?.fonction}</p>
                        </div>
                      </div>
                      <div className="flex min-h-[3rem] max-w-full snap-x snap-mandatory items-center gap-2 overflow-auto  scroll-smooth [&::-webkit-scrollbar]:hidden ">
                        {profile?.Competence.map((competence) => {
                          return (
                            <span
                              key={competence.id}
                              className=" shrink-0 snap-center rounded-full bg-blue-100 px-0.5 py-0.5 text-xs  font-medium uppercase text-blue-800 "
                            >
                              {competence.name}
                            </span>
                          );
                        })}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            {/**
            <div>
              {profiles2?.map((profile) => {
                return (
                  <div key={profile?.id}>
                    <p>{profile?.id}</p>
                  </div>
                );
              })}

              <button
                onClick={async () => {
                  await fetchNextPage();
                }}
                disabled={!hasNextPage}
              >
                Load More
              </button>
            </div> */}
            {hasNextPage && !isFetching && (
              <div className="mt-5 flex items-center justify-center">
                <Button
                  variant={'tertiary'}
                  className="text-center "
                  onClick={async () => {
                    await fetchNextPage();
                  }}
                  disabled={!hasNextPage}
                >
                  Charger plus
                </Button>
              </div>
            )}

            {isFetchingNextPage && (
              <div className="mt-2 flex items-center justify-center">
                <Loader />
              </div>
            )}
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-200 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-300 ease-out"
                    enterFrom="scale-95 opacity-0"
                    enterTo="scale-100 opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="scale-100 opacity-100"
                    leaveTo="scale-95 opacity-0"
                  >
                    <Dialog.Panel
                      className={classNames(
                        'fixed z-50',
                        'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                        'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
                        ' bg-[#2b2d3c]  ',
                        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                      )}
                    >
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                        Recherche avancée
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col justify-center gap-2 p-2 lg:flex-row">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <input
                            className="rounded-md p-2 "
                            type="checkbox"
                            name="HTML"
                            id="HTML"
                            checked={
                              competences.includes('HTML') || competences.includes('HTML5')
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCompetences((prev) => [...prev, e.target.name]);
                              } else {
                                setCompetences((prev) =>
                                  prev.filter((item) => item !== e.target.name),
                                );
                              }
                            }}
                          />
                          <label htmlFor="HTML" className="flex-1 text-gray-100">
                            HTML
                          </label>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          <input
                            className="rounded-md  p-2 "
                            type="checkbox"
                            name="CSS"
                            id="CSS"
                            checked={competences.includes('CSS') ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCompetences((prev) => [...prev, e.target.name]);
                              } else {
                                setCompetences((prev) =>
                                  prev.filter((item) => item !== e.target.name),
                                );
                              }
                            }}
                          />
                          <label htmlFor="CSS" className="  flex-1 text-gray-100">
                            CSS
                          </label>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <input
                            className="rounded-md p-2  "
                            type="checkbox"
                            name="JAVASCRIPT"
                            id="JAVASCRIPT"
                            checked={competences.includes('JAVASCRIPT') ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCompetences((prev) => [...prev, e.target.name]);
                              } else {
                                setCompetences((prev) =>
                                  prev.filter((item) => item !== e.target.name),
                                );
                              }
                            }}
                          />
                          <label htmlFor="JAVASCRIPT" className="  flex-1 text-gray-100">
                            JAVASCRIPT
                          </label>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <input
                            className="rounded-md  p-2 "
                            type="checkbox"
                            name="REACT"
                            id="REACT"
                            checked={competences.includes('REACT') ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCompetences((prev) => [...prev, e.target.name]);
                              } else {
                                setCompetences((prev) =>
                                  prev.filter((item) => item !== e.target.name),
                                );
                              }
                            }}
                          />
                          <label htmlFor="REACT" className="  flex-1 text-gray-100">
                            REACT
                          </label>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <input
                            className="rounded-md  p-2"
                            type="checkbox"
                            name="NODEJS"
                            id="NODEJS"
                            checked={competences.includes('NODEJS') ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCompetences((prev) => [...prev, e.target.name]);
                              } else {
                                setCompetences((prev) =>
                                  prev.filter((item) => item !== e.target.name),
                                );
                              }
                            }}
                          />
                          <label htmlFor="NODE" className="flex-1 text-gray-100">
                            NODE
                          </label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="text-md inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-bold  text-white  hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
        </Container>
      )}
    </>
  );
};

export default Recherche;
