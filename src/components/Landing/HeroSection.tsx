import React from 'react';
import { Heart, Shield, Users, Award, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onLoginClick: () => void;
  onPatientLoginClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick, onPatientLoginClick }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-blue-300 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <Heart className="h-6 w-6" />
                <span className="font-semibold">Trusted Healthcare</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="text-blue-600 block">Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience world-class healthcare with our state-of-the-art facilities, 
                expert medical professionals, and compassionate care that puts you first.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={onPatientLoginClick}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
              >
                <span>Book Appointment</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={onLoginClick}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
              >
                Staff Login
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10k+</div>
                <div className="text-gray-600">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hospital Image/Illustration */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <Heart className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">MediCore Hospital</h3>
                      <p className="text-blue-100">Excellence in Healthcare</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-blue-200" />
                      <span>24/7 Emergency Care</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-200" />
                      <span>Specialized Departments</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-blue-200" />
                      <span>Award-Winning Care</span>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-10 rounded-xl p-4">
                    <div className="text-sm text-blue-100 mb-2">Patient Satisfaction</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-11/12 animate-pulse"></div>
                      </div>
                      <span className="text-sm font-bold">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};