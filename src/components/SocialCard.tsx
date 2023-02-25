import Image from 'next/image';
import { Logo } from './icons/logo';
import ClassNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

interface SocialCardProps {
  title: string;
  fonction: string;
  image: string;
  className?: string;
}

export const SocialCard = (props: SocialCardProps) => {
  const { title, fonction, image, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const CardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleCard = (e: MouseEvent) => {
      const clickoutside = !CardRef.current?.contains(e.target as Node);
      setIsOpen(clickoutside ? false : true);
    };
    window.addEventListener('click', toggleCard);

    return () => {
      window.removeEventListener('click', toggleCard);
    };
  }, []);

  return (
    <div
      className={ClassNames(
        'flex h-full w-80 flex-row rounded-md bg-[#1c1e2b] text-[#f7f8f8] transition-[transform,opacity] duration-200 md:w-96',
        className,
        isOpen
          ? 'opened -translate-y-10  opacity-100 '
          : 'translate-y-10 cursor-default opacity-60 ',
      )}
      ref={CardRef}
    >
      <div className="relative z-10 mt-auto mb-auto flex w-1/2 flex-col  p-8">
        <div className="my-2 flex w-8 flex-row items-center justify-center rounded-md border  ">
          <Logo classname="h-7 w-7" />
        </div>
        <h1 className="text-sm">Découvrez le portfolio de {title} </h1>
        <h1 className="text-xs">Parcourez son travail et contactez-le pour vos projets</h1>
      </div>
      <div className="flex w-1/2  flex-col rounded-r-md bg-[#21232f]">
        <div className=" mx-auto my-auto flex flex-col items-center">
          {/* es-lint-disable-next-line @next/no-img-element */}
          <Image
            src={image}
            className="  flex h-20 w-20 rounded-full "
            width={200}
            height={200}
            alt="rien du tout "
          />
          <h1 className="text-xs font-bold">@{title}</h1>
          <h2 className="text-xs font-medium">{fonction}</h2>
        </div>
        {/**
        <div className="absolute  left-32 top-0 h-[100%] w-[150px] rotate-12  bg-[#1c1e2b] "></div>
         * 
         */}
      </div>
    </div>
  );
};
