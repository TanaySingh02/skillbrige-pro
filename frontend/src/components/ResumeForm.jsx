import React, { useState } from 'react';
import { Save, Eye, Plus, Trash2, ChevronLeft } from 'lucide-react';
import axios from "../api/axiosInstance";
import ResumePreview from './ResumePreview';

const ResumeForm = ({ onResumeCreated }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    education: [
      { school: '', degree: '', field: '', year: '', gpa: '' }
    ],
    experience: [
      { company: '', position: '', startDate: '', endDate: '', description: '' }
    ],
    projects: [
      { name: '', description: '', technologies: '', link: '' }
    ],
    skills: {
      technical: '',
      soft: ''
    }
  });

  const [loading, setSaving] = useState(false);

  const handlePersonalInfoChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleArrayItemChange = (section, index, field, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index][field] = value;
    setFormData({
      ...formData,
      [section]: updatedArray
    });
  };

  const addArrayItem = (section) => {
    const templates = {
      education: { school: '', degree: '', field: '', year: '', gpa: '' },
      experience: { company: '', position: '', startDate: '', endDate: '', description: '' },
      projects: { name: '', description: '', technologies: '', link: '' }
    };
    
    setFormData({
      ...formData,
      [section]: [...formData[section], templates[section]]
    });
  };

  const removeArrayItem = (section, index) => {
    if (formData[section].length > 1) {
      const updatedArray = formData[section].filter((_, i) => i !== index);
      setFormData({
        ...formData,
        [section]: updatedArray
      });
    }
  };

  const handleSkillsChange = (type, value) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [type]: value
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.post('/api/resume', formData);
      onResumeCreated(response.data);
      alert('Resume saved successfully!');
    } catch (error) {
      alert('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleBackFromPreview = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackFromPreview}
            className="flex items-center space-x-2 mb-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Editing</span>
          </button>
          <ResumePreview data={formData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            <div className="relative">
              <h1 className="text-4xl font-bold mb-2 tracking-tight">Create Your Resume</h1>
              <p className="text-blue-100 text-lg font-medium">Build a professional resume that stands out</p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>
          </div>

          <div className="p-8 space-y-12">
            {/* Personal Information */}
            <section className="group">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl p-6 border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.personalInfo.location}
                      onChange={handlePersonalInfoChange}
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white"
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
                    <textarea
                      name="summary"
                      value={formData.personalInfo.summary}
                      onChange={handlePersonalInfoChange}
                      rows={4}
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white resize-none"
                      placeholder="A brief summary of your professional background and goals..."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="group">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                </div>
                <button
                  onClick={() => addArrayItem('education')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add Education</span>
                </button>
              </div>
              <div className="space-y-6">
                {formData.education.map((edu, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Education {index + 1}
                      </h3>
                      {formData.education.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('education', index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">School/University</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleArrayItemChange('education', index, 'school', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="University of California, Berkeley"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => handleArrayItemChange('education', index, 'field', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Graduation Year</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleArrayItemChange('education', index, 'year', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="2024"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="group">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
                </div>
                <button
                  onClick={() => addArrayItem('experience')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add Experience</span>
                </button>
              </div>
              <div className="space-y-6">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Experience {index + 1}
                      </h3>
                      {formData.experience.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('experience', index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleArrayItemChange('experience', index, 'company', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="Google Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Position</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleArrayItemChange('experience', index, 'position', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleArrayItemChange('experience', index, 'startDate', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="January 2023"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleArrayItemChange('experience', index, 'endDate', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="Present"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleArrayItemChange('experience', index, 'description', e.target.value)}
                          rows={4}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 resize-none"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="group">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                </div>
                <button
                  onClick={() => addArrayItem('projects')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add Project</span>
                </button>
              </div>
              <div className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Project {index + 1}
                      </h3>
                      {formData.projects.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('projects', index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Project Name</label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleArrayItemChange('projects', index, 'name', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="E-commerce Platform"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Technologies Used</label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => handleArrayItemChange('projects', index, 'technologies', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Project Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handleArrayItemChange('projects', index, 'description', e.target.value)}
                          rows={4}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 resize-none"
                          placeholder="Describe your project, its features, and your role..."
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Project Link (Optional)</label>
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => handleArrayItemChange('projects', index, 'link', e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="group">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl p-6 border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Technical Skills</label>
                    <textarea
                      value={formData.skills.technical}
                      onChange={(e) => handleSkillsChange('technical', e.target.value)}
                      rows={4}
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white resize-none"
                      placeholder="JavaScript, Python, React, Node.js, MongoDB, AWS..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Soft Skills</label>
                    <textarea
                      value={formData.skills.soft}
                      onChange={(e) => handleSkillsChange('soft', e.target.value)}
                      rows={4}
                      className="w-full border-2 border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white resize-none"
                      placeholder="Leadership, Communication, Problem-solving, Teamwork..."
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-8 py-6 border-t border-blue-100/50 flex justify-end space-x-4">
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-blue-200 rounded-xl text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Saving...' : 'Save Resume'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;