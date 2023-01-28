import React, { useCallback, useState } from 'react';
import { api } from '../utils/api';
const TestAWS = () => {
  const [upload, setUpload] = useState(false);

  const PRESET = 'cld7jf1e90000upxwvrnrosba - portfolio';

  const [urlid, setUrlid] = useState<string>();
  const [file, setFile] = useState<File>();

  const [image, setImage] = useState<string>();

  const presignedurl = api.image.createpresignedurl.useMutation();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('file : ', file);
    {
      /**
    const urlandpreset = await presignedurl.mutateAsync({
      file: file,
    }); */
    }

    const formData = new FormData();

    if (file === undefined) {
      return;
    }

    formData.append('file', file);
    formData.append('upload_preset', 'dabara');

    await fetch('https://api.cloudinary.com/v1_1/dl2pqzw3i/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('response : ', response.json());
        return response.json();
      })
      .catch((error) => {
        console.log('error : ', error);
      });

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dl2pqzw3i/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('data : ', data);
      setImage(data.secure_url as string);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  {
    /**const handleUpload = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {url, fields} : {url: string, fields: any} =  await presignedurl.mutateAsync();
        const formData = new FormData();

         const data =  {
            ...fields,
            file: file
        }
        console.log("data : " , data)
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });


       const res =   await fetch(url, { method: 'POST', body: formData });

       if (res.status === 204) {
           setUpload(true);
       } 
       if (res.status === 403) {
           console.log("error")
       }
       
    } */
  }

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
  };
  {
    /**
  const onFileDrop = useCallback(async (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const newFile = Object.values(target.files).map((file: File) => file);
    const formData = new FormData();
    formData.append('file', newFile[0]);
    console.log('newFile : ', newFile[0]);
    formData.append('upload_preset', 'dabara');

    await fetch('https://api.cloudinary.com/v1_1/dl2pqzw3i/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('response : ', response);
        return response.json();
      })
      .catch((error) => {
        console.log('error : ', error);
      });
  }, []); */
  }

  return (
    <div>
      {image}
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

export default TestAWS;
