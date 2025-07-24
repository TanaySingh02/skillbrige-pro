import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosInstance';
import UploadResumeForm from '../components/UploadResumeForm';
import ResumeCard from '../components/ResumeCard';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`/api/resume/my`);
      setResumes(res.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle delete
  const handleDeleteResume = async (id) => {
    try {
      await axios.delete(`/api/resume/${id}`);
      fetchResumes(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting resume:', err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchResumes();
    }
  }, [user]);

  return (
    <div className="student-dashboard">
      <h2>Welcome, {user?.name || 'Student'}!</h2>

      <UploadResumeForm onUpload={fetchResumes} />

      <h3>Your Resumes</h3>
      {loading ? (
        <p>Loading...</p>
      ) : resumes.length > 0 ? (
        <div className="resume-grid">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              isStudent
              onDelete={handleDeleteResume} // ✅ pass the delete handler
            />
          ))}
        </div>
      ) : (
        <p>No resumes uploaded yet.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
