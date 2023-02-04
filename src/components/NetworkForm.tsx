import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../utils/api';

interface NetworkProps {
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  github?: string;
  closeModal?: () => void;
}
export const NetworkForm = (props: NetworkProps) => {
  const utils = api.useContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateNetwork = api.profile.updateprofile.useMutation({
    onSuccess: async () => {
      setIsSubmitting(false);
      props.closeModal && props.closeModal();
      await utils.page.getPage.invalidate();
      toast.success('Réseaux sociaux mis à jour');
    },
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      youtube: props.youtube,
      linkedin: props.linkedin,
      twitter: props.twitter,
      instagram: props.instagram,
      facebook: props.facebook,
      github: props.github,
    },
  });

  const onSubmit = handleSubmit(async (data: NetworkProps) => {
    setIsSubmitting(true);
    if (
      data.youtube !== props.youtube ||
      data.linkedin !== props.linkedin ||
      data.twitter !== props.twitter ||
      data.instagram !== props.instagram ||
      data.facebook !== props.facebook ||
      data.github !== props.github
    ) {
      await updateNetwork.mutateAsync(data);
    }
    props.closeModal && props.closeModal();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center  ">
      <div className=" rounded ">
        <div className="flex flex-col">
          <label className="py-2 text-white">▶️ Youtube :</label>
          <div className=" flex flex-row-reverse items-center justify-center text-xs  ">
            <input
              className="peer w-24 rounded-r-md border-l-0 border-gray-500  py-2  px-0  text-xs ring-0 placeholder:text-gray-600 visited:bg-change  autofill:bg-transparent focus:border-blue-300 focus:outline-none  focus:ring-0"
              type="text"
              placeholder=""
              {...register('youtube')}
            />

            <span className=" flex-1 rounded-l-md border  border-r-0 border-gray-500  bg-change py-2  text-right focus:ring-0  peer-focus:border-blue-300  lg:w-40">
              https://www.youtube.com/c/
            </span>
          </div>
        </div>

        <label className="py-2 text-white">💼 Linkedin :</label>
        <div className="flex flex-row-reverse items-center justify-center text-xs">
          <input
            className="peer w-24 rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
            type="text"
            placeholder=""
            {...register('linkedin')}
          />

          <span className="flex-1 rounded-l-md  border  border-r-0 border-gray-500 bg-change p-2 px-0 text-right focus:ring-0 peer-focus:border-blue-300  lg:w-40">
            https://www.linkedin.com/in/
          </span>
        </div>
        <label className="py-2 text-white">🐦 Twitter :</label>
        <div className="flex flex-col">
          <div className="flex flex-row-reverse  items-center justify-center  text-xs">
            <input
              className=" peer w-24 rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
              type="text"
              placeholder=""
              {...register('twitter')}
            />

            <span className="flex-1 rounded-l-md  border  border-r-0 border-gray-500 bg-change p-2 px-0 text-right focus:ring-0 peer-focus:border-blue-300  lg:w-40">
              https://www.twitter.com/
            </span>
          </div>
        </div>
        <label className="py-2 text-white">📸 Instagram :</label>
        <div className="flex flex-row-reverse  items-center justify-center  text-xs ">
          <input
            className=" peer w-24 rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
            type="text"
            placeholder=""
            {...register('instagram')}
          />

          <span className="flex-1 rounded-l-md  border border-r-0 border-gray-500 bg-change p-2 px-0 text-right focus:ring-0 peer-focus:border-blue-300  lg:w-40">
            https://www.instagram.com/
          </span>
        </div>
        <label className="py-2 text-white">📟 Facebook :</label>
        <div className="flex flex-row-reverse items-center justify-center text-xs">
          <input
            className=" peer w-24 rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
            type="text"
            placeholder=""
            {...register('facebook')}
          />

          <span className=" flex-1 rounded-l-md  border border-r-0 border-gray-500 bg-change p-2 px-0 text-right focus:ring-0 peer-focus:border-blue-300  lg:w-40">
            https://www.facebook.com/
          </span>
        </div>
        <label className="py-2 text-white">👨‍💻 Github :</label>
        <div className="flex flex-row-reverse items-center justify-center text-xs">
          <input
            className=" peer w-24 rounded-r-md border-l-0 border-gray-500 px-0 py-2  text-xs text-white ring-0    placeholder:text-gray-600 focus:border-blue-300 focus:outline-none  focus:ring-0"
            type="text"
            placeholder=""
            {...register('github')}
          />

          <span className=" flex-1 rounded-l-md  border border-r-0 border-gray-500 bg-change p-2 px-0 text-right focus:ring-0 peer-focus:border-blue-300  lg:w-40">
            https://www.github.com/
          </span>
        </div>

        <div className="text-md mt-2 items-center justify-center">
          <button
            disabled={isSubmitting}
            className="rounded bg-blue-300 p-2 font-bold text-gray-800 transition-colors duration-300 hover:bg-blue-400"
            type="submit"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </form>
  );
};
