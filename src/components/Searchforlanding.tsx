import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { TimeIcon } from './icons/features/TimeIcon';
import { Logo } from './icons/logo';
import { SearchIcon } from './icons/searchicon';
import { Angularjs } from './icons/skills/angular';
import { Css } from './icons/skills/css';
import { Html } from './icons/skills/html';
import { Javascript } from './icons/skills/javascript';
import { Nodejs } from './icons/skills/nodejs';
import { Reactjs } from './icons/skills/react';

const Actions = [
  { text: 'Recherchez un profil' },
  { text: 'Montrez vos compétences' },
  { text: 'Economie de temps' },
];
export const Searchforlanding = () => {
  const [selectedAction, setSelectedAction] = useState<string | undefined>('Recherchez un profil');

  const timeoutRef = useRef<NodeJS.Timeout>();

  const gotoNextAction = () => {
    const currentIndex = Actions.findIndex((action) => action.text === selectedAction);
    const nextIndex = (currentIndex + 1) % Actions.length;
    setSelectedAction(Actions[nextIndex]?.text);

    const nextActionElement = document.querySelector<HTMLButtonElement>(
      `[data-action="${Actions[nextIndex]?.text as string}"]`,
    );

    scrollToPosition(nextActionElement?.offsetLeft || 0);
  };

  const scrollToPosition = (position: number) => {
    if (!wrapperRef.current) return;

    wrapperRef.current.scrollTo({
      left: position - wrapperRef.current.clientWidth / 2,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(gotoNextAction, 2500);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedAction]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const onActionButtonClick = (ev: React.MouseEvent<HTMLButtonElement>, action: string) => {
    ev.preventDefault();

    switch (action) {
      case 'Recherchez un profil':
        setSelectedAction(action);
        break;
      case 'Montrez vos compétences':
        setSelectedAction(action);
        break;
      case 'Economie de temps':
        setSelectedAction(action);
        break;
      default:
        break;
    }

    if (!wrapperRef.current) return;

    wrapperRef.current.scrollTo({
      left: ev.currentTarget.offsetLeft - wrapperRef.current.clientWidth / 2,
      behavior: 'smooth',
    });
  };
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      {selectedAction === 'Recherchez un profil' && (
        <div className=" mt-8 flex flex-col items-center justify-center">
          <div className="group relative ">
            <div
              className="transition-[scale, opacity] absolute inset-0 left-36 
            top-0 right-0 bottom-0 z-10 scale-0  opacity-0 duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100 
            "
            >
              <Link href="/recherche" passHref>
                <span className="rounded-md border   border-gray-600 bg-[#121216] px-4 py-2 text-sm font-bold text-gray-300 transition-all duration-200">
                  Recherche
                </span>
              </Link>
            </div>
            <div className="  flex items-center justify-center opacity-60 md:w-96">
              <Logo classname=" h-9 w-9   " />
            </div>
            <div className="mb-1 flex items-center  justify-center opacity-60  ">
              <div className=" rounded-l-sm bg-[#2b2d3c] p-1">
                <SearchIcon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <input
                className=" decoration-none w-56 rounded-r-sm border-0 bg-[#2b2d3c] p-0 focus:border-0 focus:outline-none  focus:ring-0 focus:ring-offset-0 md:w-72 md:p-0.5 "
                disabled={true}
                type="text"
                placeholder="Recherche..."
              />
            </div>
          </div>
          <div className=" mt-4 flex  justify-center">
            <span className="  text-center text-sm text-gray-400">
              Vous pouvez rechercher par nom <br className="hidden md:block" /> et trier par
              compétences
            </span>
          </div>
        </div>
      )}

      {selectedAction === 'Montrez vos compétences' && (
        <div className="flex flex-col items-center justify-center">
          <div className=" mt-8 flex flex-wrap items-center  justify-center gap-3 transition-all lg:w-48">
            <Html className="h-8 w-8" />

            <Css className="h-8 w-8" />

            <Javascript className="h-8 w-8" />

            <Reactjs className="h-8 w-8" />
            <Nodejs className="h-8 w-8" />
            <Angularjs className="h-8 w-8" />
          </div>

          <div className=" mx-auto mt-2 flex  justify-center">
            <span className="  text-center text-sm text-gray-400">
              Vous pouvez ajouter vos compétences <br className="hidden md:block" /> et les partager
              avec le monde
            </span>
          </div>
        </div>
      )}

      {selectedAction === 'Economie de temps' && (
        <div className="flex flex-col items-center justify-center">
          <TimeIcon className="mt-8 h-8 w-8 fill-orange-300" />
          <div className="mt-4 flex flex-col items-center justify-center text-center text-sm text-gray-400">
            Economisez du temps en créant votre profil <br className="hidden md:block" /> et gardez
            votre portfolio à jour <br className="hidden md:block" /> en un seul endroit
          </div>
        </div>
      )}
      <div className="mt-auto  hidden items-center justify-center md:block">
        <div className="  h-[4rem] min-h-[4rem] w-full overflow-hidden bg-transparent">
          <div
            ref={wrapperRef}
            className=" mask-shortcutkeys min-h-8 flex max-w-xs snap-x snap-mandatory  gap-2 overflow-auto scroll-smooth   pb-8 [&::-webkit-scrollbar]:hidden "
          >
            {Actions.map((action, index) => (
              <button
                onClick={(ev) => onActionButtonClick(ev, action.text)}
                key={index}
                data-action={action.text}
                className={classNames(
                  ' shrink-0 snap-center rounded-full border border-gray-800  p-1 text-sm font-medium first:ml-[50vw] last:mr-[50vw]',
                  selectedAction === action.text ? '' : 'opacity-60',
                )}
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
