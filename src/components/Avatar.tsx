import classNames from 'classnames';
import Image from 'next/image';
import { type RefObject, useRef, useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { api } from '../utils/api';
import { TrashIcon } from './icons/trash';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

interface AvatarProps {
  classname?: string;
  lien?: string;
  nom: string;
  email?: string;
  sessionid?: string;
  profileid?: string;
  userinfoid: string;
}

export const Avatar = (props: AvatarProps) => {
  const { classname, lien, nom, email, sessionid, userinfoid, profileid } = props;
  const [changeMail, setChangeMail] = useState(false);
  const router = useRouter();
  const utils = api.useContext();

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  function closeModal() {
    setIsOpenDelete(false);
  }

  const updateProfile = api.profile.updateprofile.useMutation({
    onSuccess: async () => {
      await utils.page.getPage.invalidate();
      toast.success('Email modifié');
    },
  });

  const [newEmail, setEmail] = useState(email);
  const deleteprofile = api.profile.deleteprofile.useMutation({
    onSuccess: async () => {
      await utils.page.getPage.invalidate();
      await router.push('/');
    },
  });

  const refemail = useRef<HTMLInputElement>();

  const OnChangeEmail = () => {
    if (email === newEmail) return setChangeMail(!changeMail);
    setChangeMail(!changeMail);
    updateProfile.mutate({ email: newEmail });
  };

  useOnClickOutside(refemail as RefObject<HTMLInputElement>, OnChangeEmail);

  return (
    <div
      className={classNames(
        'flex flex-row-reverse items-center justify-center  rounded lg:p-2',
        classname,
      )}
    >
      {/**----------------------------------- Modal for Profile deletion ------------------------------------- */}

      <Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    'fixed z-50',
                    'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                    'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                    ' bg-secondary  ',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                    Supprimer le profil ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">
                      Vous êtes sur le point de supprimer votre profil. Cette action est
                      irréversible.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      className=" inline-flex justify-center rounded-md  border border-red-300 bg-red-500 px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-red-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
                      onClick={() => {
                        deleteprofile.mutate();
                      }}
                    >
                      OUI
                    </button>

                    <button
                      type="button"
                      className=" inline-flex justify-center rounded-md  border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-modalbutton  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Quitter
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="flex">
        <div className=" shrink-0 rounded-full bg-gradient-to-tl from-[#fde047]  to-[#92c5fb] p-0.5 md:p-1 lg:p-1 ">
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

        {sessionid === userinfoid && (
          <button onClick={() => setIsOpenDelete(true)} className="">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
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
