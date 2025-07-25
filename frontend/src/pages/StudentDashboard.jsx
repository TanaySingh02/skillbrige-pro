import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosInstance";
import UploadResumeForm from "../components/UploadResumeForm";
import ResumeCard from "../components/ResumeCard";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header Section with Gradient Overlay */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="relative px-6 py-12 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome back, <span className="text-blue-600">{user?.name || "Student"}</span>!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Build, manage, and showcase your professional resumes with our advanced tools
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pb-16">
        {/* Resume Builder Toggle Button */}
        {!showBuilder && !showPreview && (
          <div className="mb-12 text-center">
            <button
              onClick={() => setShowBuilder(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mt-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Build New Resume
            </button>
          </div>
        )}

        {/* Resume Form */}
        {showBuilder && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
              <p className="text-gray-600 mt-1">Create your professional resume</p>
            </div>
            <div className="p-8">
              <ResumeForm
                onResumeCreated={(data) => {
                  setShowBuilder(false);
                  fetchResumes();
                }}
                onPreview={() => {
                  setShowBuilder(false);
                  setCurrentPreviewData(null);
                  setShowPreview(true);
                }}
              />
            </div>
          </div>
        )}

        {/* Resume Preview */}
        {showPreview && currentPreviewData && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
                  <p className="text-gray-600 mt-1">Review your resume before finalizing</p>
                </div>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    setShowBuilder(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
            <div className="p-8">
              <ResumePreview
                resume={currentPreviewData}
                onBack={() => {
                  setShowPreview(false);
                  setShowBuilder(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Default View: Upload + Resumes List */}
        {!showBuilder && !showPreview && (
          <>
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Resume
                </h2>
                <p className="text-gray-600 mt-1">Upload an existing resume file to get started</p>
              </div>
              <div className="p-8">
                <UploadResumeForm onUpload={fetchResumes} />
              </div>
            </div>

            {/* Resumes Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-8 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Your Resumes
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {resumes.length > 0 ? `${resumes.length} resume${resumes.length !== 1 ? 's' : ''} in your collection` : 'Start building your resume collection'}
                    </p>
                  </div>
                  {resumes.length > 0 && (
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {resumes.length} total
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-8">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="text-gray-600 font-medium">Loading your resumes...</span>
                    </div>
                  </div>
                ) : resumes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                      <div key={resume._id} className="transform hover:scale-105 transition-transform duration-200">
                        <ResumeCard
                          resume={resume}
                          isStudent
                          onDelete={handleDeleteResume}
                          onPreview={(data) => {
                            setCurrentPreviewData(data);
                            setShowPreview(true);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Get started by building a new resume or uploading an existing one. Your professional journey begins here!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setShowBuilder(true)}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Build Resume
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;