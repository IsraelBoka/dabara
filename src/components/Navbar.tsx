import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./container";
import { signIn, signOut, useSession } from "next-auth/react";
import { Logo } from "./icons/logo";

const Navbar = () => {
  const { data: sessionData } = useSession();
  return (
    <header className="fixed top-0 left-0 w-full border-b border-white backdrop-blur-[12px]">
      <Container classname="flex items-center h-12">
        <Link className="flex items-center " href="#">
          <Logo classname="w-8 h-8 mr-4 stroke-white" />
          DABARA
        </Link>
        <nav className="h-full">
          <ul className="h-full flex items-center space-x-4 text-sm [&_a]:transition-colors [&_a:hover]:text-gray-200 [&_li]:ml-6">
            <li>
              <Link href="/creerpage">Création</Link>
            </li>
            <li>
              <Link href="#">Sponsor</Link>
            </li>
            
            <li>
              <Link href="#">Recherche</Link>
            </li>
          </ul>
        </nav>
        <div className="ml-auto h-full flex items-center  text-sm ">
          {
            sessionData?.user ? (
              <Button variant="secondary" size="small" >
                <span onClick={() => void signOut()}>
                Se déconnecter
                </span>
              </Button>
            ) : (
              <Button >
                Se connecter
                  
              </Button>
            )
          }

        </div>
      </Container>
    </header>
  );
};
export default Navbar;
