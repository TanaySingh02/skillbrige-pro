import React from "react";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import "../styles/ResumeCard.css";

const ResumeCard = ({ resume, isStudent, onDelete }) => {
  const {
    title,
    version = 1,
    createdAt,
    averageRating,
    status = "draft",
    filePath,
    _id,
  } = resume;

  const handleReviewRequest = () => {
    alert("Review request submitted!");
  };

  return (
    <div className="resume-card">
      {/* 🗑️ Icon top right */}
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
      <p>Status: {status}</p>

      <div className="resume-card-actions">
        {isStudent && (
          <button onClick={handleReviewRequest}>Request Review</button>
        )}

        {filePath && (
          <a href={`http://localhost:5000/${resume.filePath}`} download>
            Download
          </a>
        )}

<Link to={`http://localhost:5000/${resume.filePath}`} target="_blank" rel="noopener noreferrer">
  View
</Link>
      </div>
    </div>
  );
};

export default ResumeCard;
