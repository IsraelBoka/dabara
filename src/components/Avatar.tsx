import classNames from 'classnames';
import Image from 'next/image';
import { type RefObject, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { api } from '../utils/api';

interface AvatarProps {
  classname?: string;
  lien?: string;
  nom: string;
  email?: string;
  sessionid?: string;
  userinfoid: string;
}

export const Avatar = (props: AvatarProps) => {
  const { classname, lien, nom, email, sessionid, userinfoid } = props;
  const [changeMail, setChangeMail] = useState(false);
  const utils = api.useContext();

  const updateProfile = api.profile.updateprofile.useMutation({
    onSuccess: async () => {
      await utils.page.getPage.invalidate();
      toast.success('Email modifié');
    },
  });

  const [newEmail, setEmail] = useState(email);

  const refemail = useRef<HTMLInputElement>();

  const OnChangeEmail = () => {
    if (email === newEmail) return setChangeMail(!changeMail);
    setChangeMail(!changeMail);
    updateProfile.mutate({ email: newEmail });
  };

  useOnClickOutside(refemail as RefObject<HTMLInputElement>, OnChangeEmail);

  console.log('email', email);
  return (
    <div
      className={classNames(
        'flex flex-row-reverse items-center justify-center  rounded lg:p-2',
        classname,
      )}
    >
      <div className="  rounded-full bg-gradient-to-tl from-[#fde047]  to-[#92c5fb] p-0.5 md:p-1 lg:p-1 ">
        {lien ? (
          <Image
            className=" h-11 w-11 rounded-full object-contain md:h-16 md:w-16"
            referrerPolicy="origin"
            src={lien}
            width={2000}
            height={2000}
            alt="Image  de profil"
          />
        ) : (
          <Image
            referrerPolicy="origin"
            className="h-16 w-16"
            src={`https://api.dicebear.com/5.x/lorelei/svg?seed=${nom.replace(' ', '-')}`}
            width={2000}
            height={2000}
            alt="test"
          />
        )}
      </div>
      <div className="m-2 ">
        <p className="font-display text-2xl font-extrabold ">@{nom}</p>

        {!changeMail && (
          <p
            className="text-sm"
            onClick={sessionid === userinfoid ? () => setChangeMail(!changeMail) : undefined}
          >
            {newEmail === 'undefined' ||
            newEmail === 'null' ||
            newEmail === 'NaN' ||
            newEmail === '' ? (
              <span className="text-gray-400">Ajouter un email</span>
            ) : (
              newEmail
            )}
          </p>
        )}

        {changeMail && (
          <div className="flex flex-col">
            <input
              ref={refemail as RefObject<HTMLInputElement>}
              className="border-0.5 w-40 rounded-md  border-gray-300 p-1 text-sm"
              type="text"
              value={newEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
