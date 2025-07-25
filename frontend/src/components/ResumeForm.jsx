import React, { useState } from 'react';
import { Save, Eye, Plus, Trash2 } from 'lucide-react';
import axios from "../api/axiosInstance";

const ResumeForm = ({ onResumeCreated, onPreview }) => {
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

  const handlePreview = () => {
    onResumeCreated(formData);
    onPreview();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Create Resume</h1>
            <p className="mt-1 text-sm text-gray-600">Fill in your information to build your professional resume</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.personalInfo.location}
                    onChange={handlePersonalInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="New York, NY"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea
                    name="summary"
                    value={formData.personalInfo.summary}
                    onChange={handlePersonalInfoChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="A brief summary of your professional background and goals..."
                  />
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Education</h2>
                <button
                  onClick={() => addArrayItem('education')}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">Education {index + 1}</h3>
                    {formData.education.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('education', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School/University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleArrayItemChange('education', index, 'school', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="University of California, Berkeley"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleArrayItemChange('education', index, 'field', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleArrayItemChange('education', index, 'year', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2024"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Experience */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
                <button
                  onClick={() => addArrayItem('experience')}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>
              {formData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">Experience {index + 1}</h3>
                    {formData.experience.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('experience', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleArrayItemChange('experience', index, 'company', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Google Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleArrayItemChange('experience', index, 'position', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleArrayItemChange('experience', index, 'startDate', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="January 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleArrayItemChange('experience', index, 'endDate', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Present"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleArrayItemChange('experience', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
                <button
                  onClick={() => addArrayItem('projects')}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
              {formData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">Project {index + 1}</h3>
                    {formData.projects.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('projects', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleArrayItemChange('projects', index, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) => handleArrayItemChange('projects', index, 'technologies', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleArrayItemChange('projects', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe your project, its features, and your role..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => handleArrayItemChange('projects', index, 'link', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
                  <textarea
                    value={formData.skills.technical}
                    onChange={(e) => handleSkillsChange('technical', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="JavaScript, Python, React, Node.js, MongoDB, AWS..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
                  <textarea
                    value={formData.skills.soft}
                    onChange={(e) => handleSkillsChange('soft', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leadership, Communication, Problem-solving, Teamwork..."
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Resume'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;