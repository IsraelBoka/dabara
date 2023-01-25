{
  /**
import React, { useState } from 'react';
import { api } from '../utils/api';
 const TestAWS = () => {

    const [upload , setUpload] = useState(false);
    
    const [file, setFile] = useState<any>(null);
    const presignedurl = api.image.createpresignedurl.useMutation()

    const handleUpload = async (e : React.FormEvent<HTMLFormElement>) => {
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
       
    }

    const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFile(e.currentTarget.files?.[0]);
    }



    return (
        <div>
            <form onSubmit={(handleUpload)}>
                <input type = "file" onChange={onFileChange}/>
                <input type="submit" />
            </form>
            {upload && <div> Uploading ... </div>}
        </div>
    );
    };

export default TestAWS; */
}

const TestAWS = () => {
  return (
    <div>
      <h1 className="text-red-800 sm:text-right md:text-left lg:flex lg:text-center"> Test AWS</h1>
    </div>
  );
};
export default TestAWS;
