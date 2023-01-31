import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { Button } from './Button';
import { Editicon } from './icons/editicon';

interface ImageCardProps {
  image: string;
  userinfoid: string;
  sessionid: string;
  id: string;
  title: string;
  description: string;
  link: string;
}

export const ImageCard = (props: ImageCardProps) => {
  const { image, title, description, link, id } = props;
  const [changedesc, setchangedesc] = useState(false);
  const [newdescription, setNewdescription] = useState(description);

  const [changetitle, setchangetitle] = useState(false);
  const [newtitle, setNewtitle] = useState(title);

  const utils = api.useContext();

  const update = api.profile.updateportfolio.useMutation({
    async onSuccess() {
      setchangetitle(false);
      setchangedesc(false);
      toast.success('Portfolio modifié');
      await utils.image.getuserimages.invalidate();
    },
  });

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
          {changetitle ? (
            <div className="inline-flex items-center rounded-lg border ">
              <input
                autoFocus
                value={newtitle}
                onChange={(e) => {
                  setNewtitle(e.target.value);
                }}
                className="rounded-l-lg bg-[#2b2d3c] p-2 text-center text-sm text-white"
              />
              <button
                className="rounded-r-lg border-0  border-l bg-[#2b2d3c] p-2"
                onClick={() => {
                  if (newtitle === title) {
                    setchangetitle(!changetitle);
                    return;
                  }

                  update.mutate({ id, title: newtitle });
                }}
              >
                <Editicon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <p
              className="text-2xl font-bold text-white"
              onClick={() => {
                props.sessionid === props.userinfoid ? setchangetitle(!changetitle) : undefined;
              }}
            >
              {newtitle}
            </p>
          )}

          <div>
            {changedesc ? (
              <div className="flex flex-col items-center ">
                <textarea
                  autoFocus
                  value={newdescription}
                  onChange={(e) => {
                    setNewdescription(e.target.value);
                  }}
                  className=" h-32 w-64 rounded bg-[#2b2d3c] p-2"
                />
                <button
                  className="mt-1 rounded bg-blue-600 p-1"
                  onClick={() => {
                    if (newdescription === description) {
                      setchangedesc(!changedesc);
                      return;
                    }
                    update.mutate({ id, description: newdescription });
                  }}
                >
                  <Editicon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <p
                onClick={() => {
                  props.sessionid === props.userinfoid ? setchangedesc(!changedesc) : undefined;
                }}
                className=" w-[32rem] text-center indent-1 text-sm text-white "
              >
                {newdescription}
              </p>
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
