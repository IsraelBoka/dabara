import Image from 'next/image';
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
        <Image src={image} alt={title} height={700} width={700} />
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-bold text-white">{title} petit titre </p>
          <p className="text-sm text-white">{description} petite description</p>
        </div>
      </div>
      <div className="">
        <a href={link} target="_blank" rel="noreferrer">
          <Button variant={'secondary'} size="large">
            Voir le projet
          </Button>
        </a>
      </div>
    </div>
  );
};
