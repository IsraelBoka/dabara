import React, { useState } from 'react';
import { api } from '../utils/api';

const TestAWS = () => {
  const [upload, setUpload] = useState(false);

  const [file, setFile] = useState<File>();

  const presignedurl = api.image.createpresignedurl.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const url = await presignedurl.mutateAsync({
      filetype: file.type,
      filename: file.name,
    });

    const options = {
      method: 'PUT',
      body: file,
    };

    setUpload(true);
    await fetch(url, options);
    setUpload(false);
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <input type="submit" />
      </form>
      {upload && <div> Uploading ... </div>}
    </div>
  );
};

export default TestAWS;
