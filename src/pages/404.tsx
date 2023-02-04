import { type NextPage } from 'next';
import Link from 'next/link';
import { Logo } from '../components/icons/logo';

export const UnFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 ">
      <Link href={'/'} passHref className="  transition  duration-300 hover:scale-105">
        <Logo classname=" w-16 h-16 animate-fade-in [--animation-delay:200ms] opacity-0 " />
      </Link>
      <div className="text-center">
        <h1 className="py-2 text-3xl font-bold">Introuvable</h1>
        <h2 className="py-2 text-sm font-bold">
          La page à laquelle vous essayez d&apos;accéder n&apos;existe pas.
        </h2>
      </div>
    </div>
  );
};
const NotFoundPage: NextPage = () => {
  return <UnFound />;
};

export default NotFoundPage;
