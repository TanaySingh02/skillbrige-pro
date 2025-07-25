import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  SkillBridge
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <button 
                onClick={() => scrollToSection('features')}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 relative group"
              >
                Features
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 relative group"
              >
                How It Works
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
              <button 
                onClick={() => scrollToSection('reviewers')}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 relative group"
              >
                Reviewers
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link 
                to="/login" 
                className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg">
            <div className="px-6 py-4 space-y-2">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('reviewers')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Reviewers
              </button>
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link 
                  to="/login" 
                  className="block px-4 py-3 text-gray-700 font-medium hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;