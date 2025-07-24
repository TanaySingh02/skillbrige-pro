import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li><Link to="/dashboard">My Resumes</Link></li>
        <li><Link to="/dashboard/notifications">Notifications</Link></li>
        {/* future: profile, settings */}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
