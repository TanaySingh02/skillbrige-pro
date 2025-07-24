import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email format';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const res = await axios.post('/api/auth/register', form);
      login(res.data);
      alert('Registered successfully!');
      setForm({
        name: '',
        email: '',
        password: '',
        role: 'student',
      });
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || err.message });
    }
  };

return (
  <div className="register-container">
    <h2>Join SkillBridge</h2>
    <p>Create your account</p>

    <form className="register-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      {errors.name && <div className="error-message">{errors.name}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
      />
      {errors.email && <div className="error-message">{errors.email}</div>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {errors.password && <div className="error-message">{errors.password}</div>}

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="certifiedReviewer">Certified Reviewer</option>
      </select>

      <button type="submit">Create Account</button>
      {errors.submit && <div className="error-message">{errors.submit}</div>}
    </form>

    <div className="login-redirect">
      Already have an account? <a href="/login">Sign in here</a>
    </div>
  </div>
);
};

export default Register;
