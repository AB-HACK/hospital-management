import React from 'react';
import { Calendar, Shield, Clock, Award } from 'lucide-react';

interface HeroSectionProps {
  onBookAppointment: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBookAppointment }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 rounded-full opacity-15 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              MediCare
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-gray-700">
              Hospital
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Providing exceptional healthcare services with compassion, innovation, and excellence. 
            Your health is our priority.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onBookAppointment}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Book Appointment
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300">
              Emergency Services
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* 24/7 Emergency */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Emergency</h3>
              <p className="text-gray-600">
                Round-the-clock emergency services with immediate medical attention
              </p>
            </div>

            {/* Expert Doctors */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Doctors</h3>
              <p className="text-gray-600">
                Highly qualified specialists with years of experience in their fields
              </p>
            </div>

            {/* Advanced Technology */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Advanced Technology</h3>
              <p className="text-gray-600">
                State-of-the-art medical equipment and cutting-edge treatment methods
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;