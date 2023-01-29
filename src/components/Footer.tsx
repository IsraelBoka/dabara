import Link from 'next/link';

export const Footer = () => {
  const date = new Date();
  return (
    <footer className=" flex flex-col  items-center justify-center border-t border-t-gray-700 py-4 text-center text-white lg:flex-row">
      <div className="md:text-md flex items-center justify-center gap-2  text-sm">
        <p>
          {' '}
          &copy; {date.getFullYear()} - Tous droits réservés{' '}
          <span className="text-center font-bold">DABWEB</span>
        </p>
      </div>

      <ol className="flex  items-center justify-center space-x-2 p-2 text-xs font-bold  tracking-wide text-blue-500 underline md:text-sm lg:ml-auto  [&_a:hover]:text-blue-700 [&_a]:transition-colors ">
        <li>
          <Link href="/">Accueil</Link>
        </li>

        <li>
          <Link href="/creerpage">Profil</Link>
        </li>
        <li>
          <Link href={'mailto:israelboka5@gmail.com'}>
            <span className="hidden lg:inline-flex">Contactez-nous</span>

            <span className="inline-flex lg:hidden">Contact</span>
          </Link>
        </li>
      </ol>
    </footer>
  );
};
