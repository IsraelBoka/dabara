import { useState } from 'react';

export const ImageForm = () => {
  const [file, setFile] = useState();
  const [presignedUrl, setPresignedUrl] = useState(null);

  const [upload, setUpload] = useState(false);
  return (
    <div>
      <form>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.currentTarget.files[0]);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
