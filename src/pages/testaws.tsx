import React, { useState } from 'react';
import { api } from '../utils/api';
const TestAWS = () => {
  const [upload, setUpload] = useState(false);

  const PRESET = 'cld7jf1e90000upxwvrnrosba - portfolio';

  const [file, setFile] = useState<any>(null);

  const presignedurl = api.image.createpresignedurl.useMutation();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('file : ', file);

    const urlandpreset = await presignedurl.mutateAsync({
      file: file,
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'cld7jf1e90000upxwvrnrosba - portfolio');

    console.log('urlandpreset : ', urlandpreset.url);
    const res = await fetch('https://api.cloudinary.com/v1_1/dl2pqzw3i/image/upload', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      console.log('response : ', response);
    });
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

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={onFileChange} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TestAWS;
