import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';

const ResumeDetailPage = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`/resume/${id}`);
        setResume(res.data);
      } catch (err) {
        console.error('Failed to fetch resume details', err);
      }
    };

    fetchResume();
  }, [id]);

  if (!resume) return <p>Loading...</p>;

  return (
    <div>
      <h2>{resume.title}</h2>
      <p>Status: {resume.status}</p>
      <p>Version: {resume.version}</p>
      <p>Uploaded: {new Date(resume.createdAt).toLocaleDateString()}</p>
      {/* You can add more detailed rendering of resume sections/comments if needed */}
    </div>
  );
};

export default ResumeDetailPage;
