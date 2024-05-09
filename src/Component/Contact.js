import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  function handleMultipleChange(event) {
    const selectedFiles = event.target.files;
    const newFilesArray = Array.from(selectedFiles); // Convert FileList to Array
  
    // Update the files state with the new array of files
    setFiles(newFilesArray);
  }
  

  function handleMultipleSubmit(event) {
    event.preventDefault();
    const url = 'https://prakash58.xyz/api/category';
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    formData.append('name', name); // Append name to formData
    formData.append('isChecked', isChecked); // Append isChecked to formData

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setUploadedFiles(response.data.files);
      })
      .catch((error) => {
        console.error("Error uploading files: ", error);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleMultipleSubmit}>
        <h1>React Multiple File Upload</h1>
        <input 
          type='text' 
          placeholder='Enter name' 
          value={name} 
          onChange={(e) => setName(e.target.value)} // Update name state
        /><br/>
        <input 
          type='checkbox' 
          checked={isChecked} 
          onChange={(e) => setIsChecked(e.target.checked)} // Update isChecked state
        /><br/>
        <input type="file" multiple onChange={handleMultipleChange} /><br/>
        <button type="submit">Upload</button>
      </form>
      {uploadedFiles.map((file, index) => (
        <img key={index} src={file} alt={`Uploaded content ${index}`} />
      ))}
    </div>
  );
}

export default Contact;
