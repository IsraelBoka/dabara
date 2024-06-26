import { type NextPage } from 'next';
import Link from 'next/link';
import { Container } from '../../components/container';
import { Logo } from '../../components/icons/logo';
import { LinkedIn } from '../../components/icons/linkedin';
import { Google } from '../../components/icons/google';
import { Discord } from '../../components/icons/discord';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import { NextSeo } from 'next-seo';

const Signin: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const { error: errorType } = router.query;

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <Loader />
      </div>
    );
  }
  if (status === 'authenticated') {
    router
      .push(`/creerpage`)
      .then(() => window.scrollTo(0, 0))
      .catch(() => {
        console.log('error');
      });
  }
  const errors = {
    Signin: 'Essayez de vous connecter avec un autre compte.',
    OAuthSignin: 'Essayez de vous connecter avec un autre compte.',
    OAuthCallback: 'Essayez de vous connecter avec un autre compte.',
    OAuthCreateAccount: 'Essayez de vous connecter avec un autre compte.',
    EmailCreateAccount: 'Essayez de vous connecter avec un autre compte.',
    Callback: 'Essayez de vous connecter avec un autre compte.',
    OAuthAccountNotLinked: 'Cet email est déjà associé à un autre compte ',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'La connexion a échoué. Vérifiez que les identifiants que vous avez fournis sont corrects.',
    default: 'Impossible de se connecter.',
  };

  const error = errorType && (errors[errorType as keyof typeof errors] ?? errors.default);

  return (
    <>
      <NextSeo
        title={`Dabara - Se connecter `}
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
      {status === 'authenticated' ? (
        <div className="flex min-h-screen items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <Container classname="lg:px-48">
          <div className=" flex min-h-screen flex-col items-center justify-center gap-4">
            <Link href={'/'} passHref className="  transition  duration-300 hover:scale-105">
              <Logo classname=" h-16 w-16 animate-fade-in opacity-0 [--animation-delay:200ms] " />
            </Link>

            {error && (
              <div className="text-center text-sm tracking-wide text-red-500 md:text-lg lg:text-xl">
                {error}
              </div>
            )}
            <div className="[&_button]:text-md flex flex-col gap-4 md:[&_button]:text-lg lg:[&_button]:text-xl">
              <button
                className="inline-flex items-center justify-center gap-2 rounded border p-2  transition-colors duration-300 hover:bg-gray-900 "
                onClick={async () => {
                  await signIn('linkedin');
                }}
              >
                <span className="flex-1">Se connecter avec LinkedIn</span>
                <LinkedIn classname="h-8 w-8" />
              </button>
              <button
                className="inline-flex items-center justify-center  gap-2 rounded border p-2 transition-colors duration-300 hover:bg-gray-900 "
                onClick={async () => {
                  await signIn('google');
                }}
              >
                <span className="flex-1">Se connecter avec Google</span>
                <Google className="h-8 w-8" />
              </button>

              <button
                onClick={async () => {
                  await signIn('discord');
                }}
                className="inline-flex items-center justify-center gap-2 rounded border p-2  transition-colors duration-300 hover:bg-gray-900"
              >
                <span className="flex-1">Se connecter avec Discord</span>
                <Discord className="h-8 w-8" />
              </button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Signin;
