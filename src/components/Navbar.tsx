import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./container";
import { signIn, signOut, useSession } from "next-auth/react";
import { Logo } from "./icons/logo";
import { Hamburger } from "./icons/hamburger";
import classNames from "classnames";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  useEffect (() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", open);
  } , [open])

  useEffect (() => {
    window.addEventListener("orentationchange", () => { 
      setOpen(false);
    })
    window.addEventListener("resize", () => {
      setOpen(false);
    })

    return () => {
      window.removeEventListener("orentationchange", () => { 
        setOpen(false);
      })
      window.removeEventListener("resize", () => {
        setOpen(false);
      })
    }

  } , [open])
  return (
    <header className="z-10 fixed top-0 left-0 w-full px-8  backdrop-blur-[12px]">
      <Container classname="flex  h-12 justify-center items-center border-gray-700   border-b">
        <Link
          className="md:text-md mr-2 flex items-center justify-center"
          href="#"
        >
          <Logo classname="w-8 h-8 mr-2 stroke-white" />
          <p className="text-md font-extrabold">
            <span className="">DAB</span>
            <span className="text-blue-300">ARA</span>
          </p>
        </Link>
        <div
          className={classNames(
            "md:visible ",
            open ? "visible " : "invisible  delay-500"
          )}
        >
          <nav
            className={classNames(
              "fixed top-12  left-0 h-[calc(100vh_-_3rem)] w-full overflow-auto bg-[#121216] transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto  md:translate-x-0 md:bg-transparent md:opacity-100",
              open
                ? " opacity-100 "
                : " opacity-0 translate-x-[-100vw] "
            )}
          >
            <ul
              className={classNames(
                "[&_a]:transition-[color, transform] [&_a]:mr-8 [&_a]:ml-1 stext-md flex  h-full flex-col ease-in md:flex-row md:items-center md:text-sm  [&_a]:flex [&_a]:h-12 [&_a]:translate-y-8 [&_a]:items-center [&_a]:border-b [&_a]:border-gray-500 [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:border-b-0  [&_a:hover]:text-gray-200 [&_li]:ml-6",
                open && "[&_a]:translate-y-0 "
              )}
            >
              <li>
                <Link target={"_blank"} href="/creerpage">Création</Link>
              </li>
              <li>
                <Link href="#">Sponsor</Link>
              </li>

              <li>
                <Link href="#">Recherche</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="ml-auto flex h-full items-center  text-sm ">
          {sessionData?.user ? (
            <Button >
              <span onClick={() => void signOut()}>Déconnexion</span>
            </Button>
          ) : (
            <Button > 
              <span onClick={() => void signIn()}>Connexion</span>
            </Button>
          )}

          <button className="ml-4   md:hidden" onClick={() => setOpen(!open)}>
            <Hamburger classname=" w-4 " />
          </button>
        </div>
      </Container>
    </header>
  );
};
export default Navbar;
