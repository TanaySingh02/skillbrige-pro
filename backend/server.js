const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();
connectDB(); // ✅ Connect to MongoDB

const app = express();

// ✅ Enable CORS for frontend (adjust origin as needed)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// ✅ Parse JSON payloads
app.use(express.json());

// ✅ Serve static files in uploads/ folder like: /uploads/file.pdf
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/comments', commentRoutes);

// ✅ Central error handling middleware
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
