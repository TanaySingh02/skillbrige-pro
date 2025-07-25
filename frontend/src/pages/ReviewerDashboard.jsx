// ReviewerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import ResumeCard from '../components/ResumeCard';

const ReviewerDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('/api/reviewer/resumes');
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Reviewer Dashboard</h1>
      {loading ? (
        <p>Loading resumes...</p>
      ) : resumes.length === 0 ? (
        <p>No resumes submitted for review yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} isReviewerView={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewerDashboard;
