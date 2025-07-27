import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import ResumeCard from '../components/ResumeCard';

const ReviewerDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/resume/reviewer/resumes');
      
      // Ensure we always get an array, even if response.data is null/undefined
      const data = Array.isArray(response?.data) ? response.data : [];
      
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError(error.response?.data?.message || 'Failed to fetch resumes');
      toast.error('Failed to load resumes. Please try again.');
      setResumes([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Reviewer Dashboard</h1>
        
        {/* Refresh button */}
        <button
          onClick={fetchResumes}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh List'}
        </button>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && resumes.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">No resumes submitted for review yet.</p>
          </div>
        )}

        {/* Success state */}
        {!loading && !error && resumes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard 
                key={resume._id} 
                resume={resume} 
                isReviewerView={true} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewerDashboard;