import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';

import { api } from '../utils/api';
import { Container } from '../components/container';
import { Hero, HeroSub, HeroTitle } from '../components/Hero';
import { Button } from '../components/Button';
import Image from 'next/image';
import { Footer } from '../components/Footer';

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
              Créez un <span className="text-blue-300"> portfolio </span>
              <br className="hidden md:block" />
              en quelques <span className="text-blue-300">secondes</span>{' '}
            </HeroTitle>
            <HeroSub className=" translate-y-[-1rem]  animate-fade-in opacity-0 [--animation-delay:400ms]">
              Montrez vos compétences et vos réalisations à vos futurs{' '}
              <br className="hidden md:block" /> employeurs et clients
            </HeroSub>
          </Hero>

          <div className="">
            <div className="flex justify-center  ">
              {
                <div>
                  {user?.page ? (
                    <Link href="/creerpage">
                      <Button
                        variant={'secondary'}
                        size="large"
                        className="translate-y-[-1rem]  animate-fade-in  opacity-0 [--animation-delay:600ms]"
                      >
                        Modifier votre profil
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/creerpage">
                      <Button
                        variant={'secondary'}
                        size="large"
                        className="translate-y-[-1rem]  animate-fade-in opacity-0 [--animation-delay:600ms]"
                      >
                        Créer un profil
                      </Button>
                    </Link>
                  )}
                </div>
              }
            </div>
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
            <div className="ml-auto  translate-y-[-1rem] animate-fade-in rounded border-2 border-blue-300 p-2 opacity-0 [--animation-delay:1200ms]">
              <Image
                src="/deuxiemeblackgirldev.jpg"
                width={700}
                height={700}
                alt="Rien du tout "
                className="rounded "
              />
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
            <div className="ml-auto  translate-y-[-1rem] animate-fade-in rounded border-2 border-orange-500 p-2 opacity-0 [--animation-delay:600ms]">
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
              <Link href="/recherche">
                <Button
                  variant={'tertiary'}
                  size="large"
                  className=" translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]"
                >
                  Rechercher un profil
                </Button>
              </Link>
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
