import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosInstance";
import UploadResumeForm from "../components/UploadResumeForm";
import ResumeCard from "../components/ResumeCard";
import "../styles/Dashboard.css";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showBuilder, setShowBuilder] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPreviewData, setCurrentPreviewData] = useState(null);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`/api/resume/my`);
      setResumes(res.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await axios.delete(`/api/resume/${id}`);
      fetchResumes();
    } catch (err) {
      console.error("Error deleting resume:", err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchResumes();
    }
  }, [user]);

  return (
    <div className="student-dashboard">
      <h2>Welcome, {user?.name || "Student"}!</h2>

      {/* ✳️ RESUME BUILDER TOGGLE BUTTON */}
      {!showBuilder && !showPreview && (
        <button
          onClick={() => setShowBuilder(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Build Resume
        </button>
      )}

      {/* ✳️ CONDITIONAL RENDER: FORM */}
      {showBuilder && (
        <ResumeForm
          onResumeCreated={(data) => {
            setShowBuilder(false);
            fetchResumes();
          }}
          onPreview={() => {
            setShowBuilder(false);
            setCurrentPreviewData(null); // optionally set preview data here
            setShowPreview(true);
          }}
        />
      )}

      {/* ✳️ CONDITIONAL RENDER: PREVIEW */}
      {showPreview && currentPreviewData && (
        <ResumePreview
          resume={currentPreviewData}
          onBack={() => {
            setShowPreview(false);
            setShowBuilder(false); // or true if you want to return to builder
          }}
        />
      )}

      {/* ✳️ DEFAULT VIEW: UPLOAD + RESUMES LIST */}
      {!showBuilder && !showPreview && (
        <>
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
                  onDelete={handleDeleteResume}
                  onPreview={(data) => {
                    setCurrentPreviewData(data);
                    setShowPreview(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <p>No resumes uploaded yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
