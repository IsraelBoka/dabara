import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

interface ImageCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const ImageCard = (props: ImageCardProps) => {
  const { image, title, description, link } = props;
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={image}
          alt={title}
          height={400}
          width={400}
          className=" rounded-xl object-scale-down"
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-2xl font-bold text-white">{title} </p>
          <p className=" w-[32rem] text-center indent-1 text-sm text-white ">{description}</p>
        </div>
      </div>
      <div className="my-2">
        <Button variant={'secondary'} href={link}>
          Voir le projet
        </Button>
      </div>
    </div>
  );
};
