import React from 'react';
import { useAuth } from '../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import ReviewerDashboard from './ReviewerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <>
      {user.role === 'student' ? <StudentDashboard /> : <ReviewerDashboard />}
    </>
  );
};

export default Dashboard;
