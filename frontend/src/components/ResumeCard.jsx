import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import "../styles/ResumeCard.css";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

const ResumeCard = ({ resume, isStudent, onDelete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    title,
    version = 1,
    createdAt,
    averageRating,
    status = "draft",
    filePath,
    _id,
    type,
  } = resume;

  const handleReviewRequest = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/resume/${_id}/request-review`, {
        resumeType: type || "file"
      });
      
      toast.success(response.data.message || "Resume submitted for review!");
      // Optionally update local state if needed
    } catch (err) {
      console.error("Review request error:", err);
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         "Failed to submit review request";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const formattedRating = averageRating ? `${averageRating.toFixed(1)} ★` : "Not rated";

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className={`resume-card ${status}`}>
      {isStudent && (
        <button
          className="delete-icon-btn"
          onClick={() => onDelete(_id)}
          title="Delete Resume"
          aria-label="Delete resume"
        >
          <FiTrash />
        </button>
      )}

      <div className="resume-card-content">
        <h4>{title || "Untitled Resume"}</h4>
        
        <div className="resume-meta">
          <p><span>Version:</span> {version}</p>
          <p><span>Uploaded:</span> {formattedDate}</p>
          <p><span>Rating:</span> {formattedRating}</p>
          <p className={`status-badge ${status}`}>
            <span>Status:</span> {formattedStatus}
          </p>
        </div>

        <div className="resume-card-actions">
          {isStudent && status === "draft" && (
            <button 
              onClick={handleReviewRequest}
              disabled={isSubmitting}
              className="review-btn"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                "Request Review"
              )}
            </button>
          )}

          {filePath && (
            <>
              <a
                href={`/api/resume/${_id}/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn download-btn"
              >
                Download
              </a>
              <Link
                to={filePath.startsWith('/') ? filePath : `/${filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn view-btn"
              >
                View
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;