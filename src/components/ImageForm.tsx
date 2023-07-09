import { api } from '../utils/api';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    watch,
    formState: { errors },
  } = useForm<ImageFormProps>();
  const utils = api.useContext();
  const presignedurl = api.image.createpresignedurl.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadimage = api.image.addportfolio.useMutation({
    async onSuccess() {
      closeModal && closeModal();
      await utils.image.getuserimages.invalidate();
      setIsSubmitting(false);
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const watchImageInput = watch('image');

  useEffect(() => {
    if (watchImageInput && watchImageInput.length) {
      const file = watchImageInput[0];
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file as Blob);
    } else {
      setImagePreview(null);
    }
  }, [watchImageInput]);

  {
    /**const renderFilePreview = (data) => {
    const formData = new FormData();
    if (!data.image.item(0)) return null;

    // Type guard to check that selectedFile is not null

    return <img alt="machin" src={URL.createObjectURL(data.image.item(0) as Blob)} />;
  }; */
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // preview image before upload
    const reader = new FileReader();

    if (!data.image) return;
    if (!data.image.item(0)) return;

    const file = data.image.item(0) as File;
    reader.readAsDataURL(file);
    formData.append('file', file);

    const url = await presignedurl.mutateAsync({
      filetype: file.type,
      filename: file.name,
    });

    const options = {
      method: 'PUT',
      body: file,
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      await uploadimage.mutateAsync({
        public_id: file.name,
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
        <div className=" inline-flex items-center justify-center">
          {imagePreview && (
            <Image
              className="rounded border"
              width={200}
              height={200}
              src={imagePreview}
              alt="Preview"
            />
          )}
        </div>

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
