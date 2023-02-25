import { type NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';

import { api } from '../utils/api';
import { Container } from '../components/container';
import { Hero, HeroSub, HeroTitle } from '../components/Hero';
import { Button } from '../components/Button';
import Image from 'next/image';
import { Footer } from '../components/Footer';
import { SocialCard } from '../components/SocialCard';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: user } = api.page.getUser.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <>
      <Head>
        <title>Dabara</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="p-4 pt-12 ">
        <Container>
          <Hero>
            <HeroTitle
              size={'large'}
              className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
            >
              Créez un <span className=" text-blue-300"> portfolio </span>
              <br className="hidden md:block" />
              en quelques <span className="text-blue-300">secondes</span>{' '}
            </HeroTitle>
            <HeroSub className=" translate-y-[-1rem]  animate-fade-in opacity-0 [--animation-delay:400ms]">
              Montrez vos compétences et vos réalisations à vos futurs{' '}
              <br className="hidden md:block" /> employeurs ou clients
            </HeroSub>
          </Hero>

          <div className="">
            <div className="flex justify-center  ">
              {
                <div>
                  {user?.page ? (
                    <Button
                      variant={'secondary'}
                      size="large"
                      href={`/${user?.page}`}
                      className="translate-y-[-1rem]  animate-fade-in  opacity-0 [--animation-delay:600ms]"
                    >
                      Modifier votre profil
                    </Button>
                  ) : (
                    <Button
                      variant={'secondary'}
                      href="/creerpage"
                      size="large"
                      className="translate-y-[-1rem]  animate-fade-in opacity-0 [--animation-delay:600ms]"
                    >
                      Créer un profil
                    </Button>
                  )}
                </div>
              }
            </div>
          </div>

          <div className="group relative my-10 translate-y-[-1rem] animate-fade-in rounded   p-1 opacity-0 [--animation-delay:800ms]">
            <div>
              <Image
                src="/dabara.vercel.app_Erica.png"
                width={2000}
                height={2000}
                className=" rounded "
                alt="Rien du tout "
              />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600 to-yellow-800 opacity-60 blur-lg transition-opacity duration-700 group-hover:opacity-100 " />
          </div>

          <div className="my-8 flex flex-col items-center lg:flex-row">
            <Hero>
              <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
                Partagez vos réseaux <br className="hidden md:block" />
                <span className="text-blue-300">sociaux</span>
              </HeroTitle>
              <HeroSub className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
                Ajoutez vos réseaux sociaux et vos liens vers vos
                <br className="hidden md:block" /> projets et vos réalisations
              </HeroSub>
            </Hero>
            <div className="flex translate-y-[-1rem] animate-fade-in flex-col-reverse items-center   overflow-clip rounded-md border border-gray-700 p-1 opacity-0 [--animation-delay:1200ms] lg:ml-auto lg:py-4 lg:px-6">
              <SocialCard
                image="/SocialCardErica.webp"
                title="Erica"
                className="cursor-pointer "
                fonction="Designer UX/UI"
              />
              <div className="transition-opacity duration-100 [.opened+&]:cursor-default	 [.opened+&]:opacity-0">
                <h1 className="text-center   font-bold "> Carte de visite</h1>
                <h2 className="m-2 text-center text-sm text-gray-400 ">
                  Vous obtenez une carte de visite à partager <br /> sur vos réseaux
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-12  flex flex-col lg:flex-row-reverse ">
            <Hero>
              <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                Pour les <span className="text-orange-300">employeurs</span>
              </HeroTitle>
              <HeroSub className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
                Trouvez les meilleurs profils pour vos projets et vos{' '}
                <br className="hidden md:block" />
                recrutements grace à notre moteur de recherche
              </HeroSub>
            </Hero>
            <div className="flex translate-y-[-1rem] animate-fade-in flex-col-reverse items-center   overflow-clip rounded-md border border-gray-700 p-1 opacity-0 [--animation-delay:1200ms] lg:ml-auto lg:py-4 lg:px-6 ">
              <Image
                src="/jeunecadredynamique.jpg"
                width={700}
                height={700}
                alt="Rien du tout "
                className="rounded "
              />
            </div>
          </div>
          <div>
            <div className="mt-8 flex justify-center ">
              <Button
                variant={'tertiary'}
                href="/recherche"
                size="large"
                className=" translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]"
              >
                Rechercher un profil
              </Button>
            </div>
          </div>
          <div className="mt-12">
            <Footer />
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
