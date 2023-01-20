import { Container } from "./container"
export const Footer = () => {
    const date = new Date()
    return (
        <footer className=" flex flex-col items-center justify-center lg:flex-row text-white py-4 border-t border-t-gray-700">
                <p className="text-md ">
                    &copy; {date.getFullYear()} - Tous droits réservés <span className="font-bold">DABWEB</span>
                </p>

                <ol className="lg:ml-auto flex justify-center text-xs md:text-sm p-2 items-center  space-x-2 underline font-bold [&_a:hover]:text-blue-700 [&_a]:transition-colors  text-blue-500 tracking-wide ">
                    <li>
                        <a href="#">Accueil</a>
                    </li>
                    
                    <li>
                        <a href="#">Créer un profil</a>
                    </li>
                    <li>
                        <a href="#">Contactez-nous</a>
                    </li>
                </ol>
        </footer>

    )
}

