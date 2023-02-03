import { api } from '../utils/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type ImageFormProps = {
  title: string;
  description: string;
  image: FileList;
  link: string;
};

export const ImageForm = ({ closeModal }: { closeModal?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageFormProps>();
  const utils = api.useContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadimage = api.image.addportfolio.useMutation({
    async onSuccess() {
      closeModal && closeModal();
      await utils.image.getuserimages.invalidate();
      setIsSubmitting(false);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();

    if (data.image === undefined) {
      return;
    }

    if (data.image.item(0) === undefined || data.image.item(0) === null) {
      return;
    }

    console.log('data.image.item(0) : ', data.image.item(0));
    formData.append('file', data?.image?.item(0) as File);

    formData.append('upload_preset', 'dabara');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dl2pqzw3i/image/upload', {
        method: 'POST',
        body: formData,
      });
      const response = (await res.json()) as { secure_url: string; public_id: string };
      console.log('data : ', response);
      await uploadimage.mutateAsync({
        url: response.secure_url,
        public_id: response.public_id,
        title: data.title,
        description: data.description,
        link: data.link,
      });
    } catch (error) {
      console.log('error : ', error);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2  [&_label]:text-left">
        <label htmlFor="title">Titre</label>
        <input
          className="rounded bg-change p-1 "
          type="text"
          {...register('title', {
            required: true,
          })}
          name="title"
        />
        {errors.title && <p className="text-xs text-red-500">un titre est requis</p>}
        <label htmlFor="description">Description</label>
        <textarea
          {...register('description', {
            required: true,
          })}
          className="rounded bg-change  p-1 "
          name="description"
        />
        {errors.description && <p className="text-xs text-red-500">une description est requise</p>}
        <label htmlFor="link">Lien de votre projet</label>
        <input className="rounded bg-change p-1  " type="text" {...register('link')} name="link" />

        <label htmlFor="image">Image</label>

        <input
          type="file"
          {...register('image', {
            required: true,
          })}
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-change text-sm  focus:outline-none"
          aria-describedby="file_input_help"
          accept="image/png, image/jpeg, image/jpg"
          multiple={false}
          name="image"
        />
        <p className="mt-1 text-left text-sm text-gray-500" id="file_input_help">
          PNG, JPG
        </p>
        {errors.image && <p className="text-xs text-red-500">une image est requise</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className=" cursor-pointer rounded bg-[#4a5067] p-2 text-gray-300 transition-colors duration-150 hover:bg-[#838396] hover:text-gray-800 disabled:bg-gray-100"
        >
          {isSubmitting ? 'En cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};
