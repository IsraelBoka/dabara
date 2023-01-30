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
      <div className="flex flex-col items-center justify-center">
        <Image
          src={image}
          alt={title}
          height={300}
          width={300}
          className="h-96 w-[32rem] rounded border border-gray-800 object-scale-down"
        />
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-bold text-white">{title}</p>
          <p className=" text-center text-sm text-white ">{description}</p>
        </div>
      </div>
      <div className="">
        <Link href={link} target="_blank" rel="noreferrer">
          <Button variant={'secondary'} size="large">
            Voir le projet
          </Button>
        </Link>
      </div>
    </div>
  );
};
