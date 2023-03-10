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
import { Feature } from '../components/Feature';
import { Roue } from '../components/icons/features/Roue';
import { Users } from '../components/icons/features/Users';
import { BankCard } from '../components/icons/features/BankCard';
import { Share } from '../components/icons/features/Share';
import { SearchFeature } from '../components/icons/features/SearchFeature';
import { Chart } from '../components/icons/features/Charts';
import { Searchforlanding } from '../components/Searchforlanding';
import { NextSeo } from 'next-seo';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: user } = api.page.getUser.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <>
      <NextSeo
        title="Dabara - Créez un portfolio en quelques secondes"
        description="Montrez vos compétences et vos réalisations à vos futurs employeurs ou clients"
        canonical="https://dabara.vercel.app/"
        openGraph={{
          url: 'https://dabara.vercel.app/',
          title: 'Créez un portfolio en quelques secondes',
          description:
            'Montrez vos compétences et vos réalisations à vos futurs employeurs ou clients',
          images: [
            {
              url: 'https://dabara.vercel.app/og.png',
            },
          ],
          site_name: 'Dabara',
        }}
      />

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
            <div className="flex flex-col">
              <div className="div flex gap-1 rounded-t bg-[#101010] p-2 ">
                <div className="ml-4 h-1.5 w-1.5 rounded-full bg-gray-700 md:h-3 md:w-3" />
                <div className="h-1.5 w-1.5 rounded-full bg-gray-700 md:h-3 md:w-3" />
                <div className="h-1.5 w-1.5 rounded-full bg-gray-700 md:h-3 md:w-3" />
              </div>
              {/** 
              <Image
                src="/GIFPORTFOLIO.gif"
                width={2000}
                height={2000}
                className=" pointer-events-none rounded-b"
                alt="Rien du tout "
              />*/}
              {/** video to show the website */}
              <video autoPlay loop muted className="rounded-b">
                <source src="/Gifportfolio5.webm" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600 to-yellow-800 opacity-60 blur-lg transition-opacity duration-700 group-hover:opacity-100 " />
          </div>

          <div className="my-20 flex flex-col items-center lg:flex-row">
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
                  Vous obtenez une carte de visite à partager <br /> sur vos réseaux sociaux
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-12  flex flex-col items-center  lg:flex-row-reverse ">
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
            <div className="flex h-72 w-64 translate-y-[-1rem] animate-fade-in justify-center  overflow-clip rounded-md    border border-gray-700 p-2 opacity-0 [--animation-delay:1200ms] md:h-72 md:w-80 lg:mr-auto lg:h-72 lg:w-96 lg:py-4 lg:px-6">
              <Searchforlanding />
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

          <div className="mt-12  flex  flex-col ">
            <Hero>
              <HeroTitle
                size={'small'}
                className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
              >
                Des fonctionnalités <br className="hidden md:block" />
                <span className="text-blue-300">simples</span>
              </HeroTitle>
            </Hero>
            <hr className="m-8 h-[1px] border-none bg-gray-800" />
            <div className="mx-auto ">
              <Feature
                feature={[
                  {
                    title: 'Complètement modifiable',
                    description: ' Vous pouvez modifier votre profil à tout moment', // 100 caractères max
                    Icon: Roue,
                  },
                  {
                    title: "Créer un profil sans compte d'utilisateur",
                    description: ' Connectez vous avec votre compte LinkedIn, Google ou Discord', // 100 caractères max
                    Icon: Users,
                  },
                  {
                    title: 'Gratuit',
                    description:
                      ' Vous pouvez créer un profil gratuitement et sans limite de temps', // 100 caractères max
                    Icon: BankCard,
                  },
                  {
                    title: 'Carte de visite',
                    description:
                      ' Vous pouvez partager votre carte de visite sur vos réseaux sociaux', // 100 caractères max
                    Icon: Share,
                  },
                  {
                    title: 'Recherche de profils',
                    description: ' Vous pouvez rechercher des profils en fonction de vos critères', // 100 caractères max
                    Icon: SearchFeature,
                  },
                  {
                    title: 'Statistiques',
                    description:
                      " Vous pouvez consulter l'affluence que vous avez sur votre profil",
                    Icon: Chart,
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-32">
            <Footer />
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
