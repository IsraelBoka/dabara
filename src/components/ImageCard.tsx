import Image from 'next/image';
import { type RefObject, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { api } from '../utils/api';
import { Button } from './Button';

interface ImageCardProps {
  image: string;
  userinfoid: string;
  sessionid: string;
  id: string;
  title: string;
  description?: string;
  link: string;
}

export const ImageCard = (props: ImageCardProps) => {
  const [changedesc, setchangedesc] = useState(false);

  console.log(changedesc);

  const { image, title, description, link, id } = props;
  const [newdescription, setNewdescription] = useState(description);

  const [changetitle, setchangetitle] = useState(false);
  const [newtitle, setNewtitle] = useState(title);

  const utils = api.useContext();

  const update = api.profile.updateportfolio.useMutation({
    async onSuccess() {
      toast.success('Portfolio modifié');
      await utils.image.getuserimages.invalidate();
    },
  });

  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef<HTMLTextAreaElement>();
  const reftitre = useRef<HTMLInputElement>();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(reftitre as RefObject<HTMLInputElement>, () => {
    if (newtitle === title) {
      setchangetitle(!changetitle);
      return;
    }
    setchangetitle(!changetitle);
    update.mutate({ id, title: newtitle });
  });

  useOnClickOutside(ref as RefObject<HTMLTextAreaElement>, () => {
    if (newdescription === description) {
      setchangedesc(!changedesc);
      return;
    }
    setchangedesc(!changedesc);
    update.mutate({ id, description: newdescription });
  });

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={image}
          alt={title}
          height={400}
          width={400}
          className=" rounded-xl lg:object-scale-down"
        />
        <div className="flex flex-col items-center justify-center gap-3">
          {changetitle ? (
            <div className="inline-flex items-center rounded-lg border ">
              <input
                autoFocus
                value={newtitle}
                ref={reftitre as RefObject<HTMLInputElement>}
                onChange={(e) => {
                  setNewtitle(e.target.value);
                }}
                className="rounded-lg border border-gray-300  bg-[#2b2d3c] p-2 text-left text-sm text-white outline-none"
              />
            </div>
          ) : props.sessionid === props.userinfoid ? (
            <p
              className="text-2xl font-bold text-white"
              onClick={() => {
                props.sessionid === props.userinfoid ? setchangetitle(!changetitle) : undefined;
              }}
            >
              {newtitle === '' ? 'Ajouter un titre' : newtitle}
            </p>
          ) : (
            <p className="text-2xl font-bold text-white">{newtitle}</p>
          )}

          <div>
            {changedesc ? (
              <div className="flex flex-col items-center ">
                <textarea
                  autoFocus
                  value={newdescription}
                  ref={ref as RefObject<HTMLTextAreaElement>}
                  onChange={(e) => {
                    setNewdescription(e.target.value);
                  }}
                  className=" h-32 rounded bg-[#2b2d3c] p-2 lg:w-64"
                />
              </div>
            ) : props.sessionid === props.userinfoid ? (
              <p
                onClick={() => {
                  props.sessionid === props.userinfoid ? setchangedesc(true) : undefined;
                }}
                className=" w-44 text-center text-sm text-white md:w-auto "
              >
                {newdescription === '' ? 'Ajouter une description' : newdescription}
              </p>
            ) : (
              <p className=" w-44 text-center text-sm text-white md:w-auto ">{newdescription}</p>
            )}
          </div>
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
