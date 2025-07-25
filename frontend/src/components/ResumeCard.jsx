import React from "react";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import "../styles/ResumeCard.css";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

const ResumeCard = ({ resume, isStudent, onDelete }) => {
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
    try {
      const response = await axios.post("/api/review/request", {
        resumeId: _id,
        resumeType: type || "file", // fallback if undefined
      });

      toast.success("Resume submitted for review!");
    } catch (err) {
      console.error("Review request error:", err);
      toast.error("Failed to submit review request.");
    }
  };

  return (
    <div className="resume-card">
      {/* 🗑️ Delete button for students */}
      {isStudent && (
        <button
          className="delete-icon-btn"
          onClick={() => onDelete(_id)}
          title="Delete Resume"
        >
          <FiTrash />
        </button>
      )}

      <h4>{title || "Untitled Resume"}</h4>
      <p>Version: {version}</p>
      <p>Uploaded: {new Date(createdAt).toLocaleDateString()}</p>
      <p>Rating: {averageRating ? `${averageRating.toFixed(1)} ★` : "—"}</p>
      <p>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</p>

      <div className="resume-card-actions">
        {/* Review Request button for students */}
        {isStudent && (
          <button onClick={handleReviewRequest}>Request Review</button>
        )}

        {/* Download button */}
        {filePath && (
          <a
            href={`http://localhost:5000/api/resume/${_id}/download`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        )}

        {/* View link */}
        {filePath && (
          <Link
            to={`http://localhost:5000${filePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;
