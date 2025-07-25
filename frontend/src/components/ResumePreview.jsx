import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const ResumePreview = ({ resume, onBack }) => {
  if (!resume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No resume data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Edit</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-8">
            <h1 className="text-3xl font-bold mb-2">{resume.personalInfo.name || 'Your Name'}</h1>
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              {resume.personalInfo.email && (
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{resume.personalInfo.email}</span>
                </div>
              )}
              {resume.personalInfo.phone && (
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>{resume.personalInfo.phone}</span>
                </div>
              )}
              {resume.personalInfo.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{resume.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Professional Summary */}
            {resume.personalInfo.summary && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
              </section>
            )}

            {/* Education */}
            {resume.education && resume.education.some(edu => edu.school) && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                  Education
                </h2>
                <div className="space-y-4">
                  {resume.education.map((edu, index) => (
                    edu.school && (
                      <div key={index}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                            <p className="text-gray-700">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                          </div>
                          {edu.year && (
                            <span className="text-gray-600 md:text-right">{edu.year}</span>
                          )}
                        </div>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Work Experience */}
            {resume.experience && resume.experience.some(exp => exp.company) && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {resume.experience.map((exp, index) => (
                    exp.company && (
                      <div key={index}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                            <p className="text-blue-600 font-medium">{exp.company}</p>
                          </div>
                          {(exp.startDate || exp.endDate) && (
                            <span className="text-gray-600 md:text-right">
                              {exp.startDate} {exp.startDate && exp.endDate && '- '} {exp.endDate}
                            </span>
                          )}
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.some(project => project.name) && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                  Projects
                </h2>
                <div className="space-y-6">
                  {resume.projects.map((project, index) => (
                    project.name && (
                      <div key={index}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{project.name}</h3>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>View</span>
                            </a>
                          )}
                        </div>
                        {project.technologies && (
                          <p className="text-sm text-blue-600 font-medium mb-2">{project.technologies}</p>
                        )}
                        {project.description && (
                          <p className="text-gray-700 leading-relaxed">{project.description}</p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {(resume.skills.technical || resume.skills.soft) && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
                  Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resume.skills.technical && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Technical Skills</h3>
                      <p className="text-gray-700 leading-relaxed">{resume.skills.technical}</p>
                    </div>
                  )}
                  {resume.skills.soft && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Soft Skills</h3>
                      <p className="text-gray-700 leading-relaxed">{resume.skills.soft}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;