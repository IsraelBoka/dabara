import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./container";
import { signIn, signOut, useSession } from "next-auth/react";
import { Logo } from "./icons/logo";
import { Hamburger } from "./icons/hamburger";
import classNames from "classnames";
import { useState } from "react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full border-b border-white backdrop-blur-[12px]">
      <Container classname="flex  h-12">
        <Link className="flex items-center justify-center text-xs  md:text-md" href="#">
          <Logo classname="w-8 h-8 mr-2 stroke-white" />
          <span>
            
          DABARA
          </span>
        </Link>
        <nav className={classNames("h-[calc(100vh_-_3rem)] w-full fixed md:relative top-12 md:top-0 md:h-auto md:w-auto md:bg-transparent md:block bg-[#121216] left-0 overflow-auto",  open ? "" : "hidden")}>
          <ul className=" flex flex-col md:flex-row [&_li]:border-b md:[&_li]:border-b-0 [&_li]:border-gray-700  [&_a]:flex [&_a]:items-center [&_a]:h-12   md:items-center h-full text-md md:text-sm [&_a]:transition-colors [&_a:hover]:text-gray-200 [&_li]:ml-6">
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
              <Button variant="secondary" >
                <span onClick={() => void signOut()}>
                Se déconnecter
                </span>
              </Button>
            ) : (
              <Button  >
                Se connecter
                  
              </Button>
            )
          }
          
        <button className="ml-4 md:hidden" onClick={() => setOpen(!open)}>
          <Hamburger classname=" w-4 "/>
        </button>

        </div>
      </Container>
    </header>
  );
};
export default Navbar;
