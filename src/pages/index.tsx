import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

import { api } from "../utils/api";
import { Container } from "../components/container";
import { Hero, HeroSub, HeroTitle } from "../components/Hero";
import { Button } from "../components/Button";
import Image from "next/image";
import { Footer } from "../components/Footer";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: user } =
    api.page.getUser.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined }
    );

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="p-4 pt-12 ">
        <Container>
          <Hero >
            <HeroTitle size={"large"}>
              Créez un <span className="text-blue-300"> profil </span>
              <br className="hidden md:block" />
              en quelques <span className="text-blue-300">secondes</span>{" "}
            </HeroTitle>
            <HeroSub>
              Montrez vos compétences et vos réalisations à vos futurs
              employeurs
            </HeroSub>
          </Hero>

          <div className="">
            <div className="flex justify-center  ">
              {
                <div>
                  {user?.page ? (
                    <Link href="/creerpage">
                      <Button variant={"secondary"} size="large">
                        Modifier votre profil
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/creerpage">
                      <Button variant={"secondary"} size="large">
                        Créer un profil
                      </Button>
                    </Link>
                  )}
                </div>
              }
            </div>
          </div>

          <div className="flex flex-col items-center lg:flex-row my-5">
            <Hero>
              <HeroTitle>
                Partagez vos réseaux <br className="hidden md:block" />
                <span className="text-blue-300">sociaux</span>
              </HeroTitle>
              <HeroSub>
                Ajoutez vos réseaux sociaux et vos liens vers vos<br className="hidden md:block"/> projets et vos réalisations
              </HeroSub>
            </Hero>
            <div className="ml-auto  border-2 border-blue-300 p-2 rounded ">
              <Image src="/deuxiemeblackgirldev.jpg" width={700} height={700} alt="Rien du tout "
              className="rounded "
              />
            </div>
          </div>

          <div className="mt-12  flex flex-col-reverse lg:flex-row-reverse ">
            <Hero>
              <HeroTitle>
                Pour les <span className="text-orange-300">employeurs</span>
              </HeroTitle>
              <HeroSub>
                Trouvez les meilleurs profils pour vos projets et vos  
                recrutements <br className="hidden md:block" />en quelques clics grace à notre moteur de recherche
              </HeroSub>
            </Hero>
            <div className="ml-auto  border-2 border-orange-500 p-2 rounded ">
              <Image src="/jeunecadredynamique.jpg" width={700} height={700} alt="Rien du tout "
              className="rounded "
              />
              </div>
          </div>
          <div>
            <div className="flex justify-center mt-8 ">
              <Link href="/recherche">
                <Button variant={"tertiary"} size="large">
                  Rechercher un profil
                </Button>
              </Link>
              </div>
          </div>
          <div className="mt-12">
          <Footer/>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;

