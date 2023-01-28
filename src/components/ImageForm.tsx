import { useState } from 'react';
import { api } from '../utils/api';
export const ImageForm = () => {
  const [file, setFile] = useState<File>();

  const [image, setImage] = useState<string>();
  const uploadimage = api.image.addportfolio.useMutation();

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('file : ', file);

    const formData = new FormData();

    if (file === undefined) {
      return;
    }

    formData.append('file', file);
    formData.append('upload_preset', 'dabara');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dl2pqzw3i/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = (await res.json()) as { secure_url: string; public_id: string };
      console.log('data : ', data);
      setImage(data.secure_url);
      await uploadimage.mutateAsync({
        url: data.secure_url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.log('error : ', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={onFileChange}
          accept="image/png, image/jpeg, image/jpg"
          multiple={false}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
