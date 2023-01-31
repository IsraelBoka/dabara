import classNames from 'classnames';
import Image from 'next/image';

interface AvatarProps {
  classname?: string;
  lien?: string;
  nom: string;
  email?: string;
}

export const Avatar = (props: AvatarProps) => {
  const { classname, lien, nom, email } = props;
  return (
    <div className={classNames('flex items-center  rounded lg:p-2', classname)}>
      <div className="  rounded-full bg-gradient-to-tl from-[#fde047]  to-[#92c5fb] p-1 lg:p-1 ">
        {lien ? (
          <Image
            className=" h-13 w-13 rounded-full object-contain md:h-16 md:w-16"
            referrerPolicy="origin"
            src={lien}
            width={500}
            height={500}
            alt="test"
          />
        ) : (
          <Image
            referrerPolicy="origin"
            className="h-16 w-16"
            src={`https://api.dicebear.com/5.x/lorelei/svg?seed=${nom.replace(' ', '-')}`}
            width={500}
            height={500}
            alt="test"
          />
        )}
      </div>
      <div className="m-2 ">
        <p className="text-xl font-extrabold tracking-wide">{nom}</p>
        <p className="text-sm">{email}</p>
      </div>
    </div>
  );
};
