// src/components/UploadResumeForm.jsx
import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import '../styles/UploadResumeForm.css';

const UploadResumeForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload");

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setUploading(true);
      await axios.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      onUpload(); // refetch resumes
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </form>
  );
};

export default UploadResumeForm;
