import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const reviewers = [
    {
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      experience: "8+ years",
      rating: 4.9,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "Michael Rodriguez",
      title: "Product Manager",
      company: "Microsoft",
      experience: "6+ years",
      rating: 4.8,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    {
      name: "Emily Johnson",
      title: "UX Designer",
      company: "Apple",
      experience: "7+ years",
      rating: 4.9,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    {
      name: "David Park",
      title: "Data Scientist",
      company: "Netflix",
      experience: "5+ years",
      rating: 4.7,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1a2 2 0 114 0z" />
        </svg>
      ),
      title: "Smart Builder",
      description: "Create resumes with ease and keep track of changes."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Expert Reviews",
      description: "Get feedback from certified professionals."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fast Turnaround",
      description: "Receive responses within 24 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <header className="relative px-6 pt-20 pb-32 sm:px-8 lg:px-16" id="home">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Build Resumes That{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                Get Noticed
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with certified professionals who provide expert feedback to help you land interviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/register" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center">
                  Get Started
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 text-gray-700 font-semibold border-2 border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-white/50 transition-all duration-200 backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative px-6 py-24 sm:px-8 lg:px-16" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SkillBridge?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create outstanding resumes and get professional feedback
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/80 transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2"
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-6 py-24 sm:px-8 lg:px-16 bg-white/30 backdrop-blur-sm" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to get your resume reviewed by experts
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Build Your Resume",
                description: "Use our form to easily create your resume.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                step: "2",
                title: "Submit for Review",
                description: "Send it to certified reviewers for feedback.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )
              },
              {
                step: "3",
                title: "Improve & Apply",
                description: "Use the suggestions to improve and apply confidently.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="relative group"
                style={{ animationDelay: `${idx * 300}ms` }}
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/90 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviewers Section */}
      <section className="relative px-6 py-24 sm:px-8 lg:px-16" id="reviewers">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Certified Reviewers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get feedback from industry professionals at leading companies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviewers.map((reviewer, idx) => (
              <div 
                key={idx} 
                className="group bg-white/60 backdrop-blur-sm rounded-3xl p-6 text-center hover:bg-white/80 transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-2"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative mb-6">
                  <img 
                    src={reviewer.image} 
                    alt={reviewer.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-white group-hover:ring-blue-200 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{reviewer.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{reviewer.title}</p>
                <p className="text-sm font-semibold text-blue-600 mb-3">{reviewer.company}</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span>{reviewer.experience}</span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {reviewer.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-16 sm:px-8 lg:px-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">SkillBridge</span>
          </div>
          <p className="text-gray-400 text-lg">
            &copy; 2025 SkillBridge. All rights reserved.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;