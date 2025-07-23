import React from 'react';
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';

interface ContactSectionProps {
  onScheduleAppointment: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onScheduleAppointment }) => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Emergency Hotline',
      details: '+1 (555) 911-HELP',
      subtitle: '24/7 Emergency Services',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Phone,
      title: 'General Inquiries',
      details: '+1 (555) 123-CARE',
      subtitle: 'Mon-Fri: 8AM-6PM',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@medicare-hospital.com',
      subtitle: 'We respond within 24 hours',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Healthcare Ave, Medical District',
      subtitle: 'City, State 12345',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const hours = [
    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 2:00 PM' },
    { day: 'Emergency Services', time: '24/7 Available' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our healthcare team. We're here to help you with 
            appointments, inquiries, and emergency care
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-lg font-semibold text-gray-700 mb-1">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-500">
                      {info.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={onScheduleAppointment}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule an Appointment</span>
                </button>
                <button className="border-2 border-red-500 text-red-500 p-4 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Emergency Call</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hours & Location */}
          <div className="space-y-8">
            {/* Operating Hours */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Operating Hours
                </h3>
              </div>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-600 font-medium">
                      {schedule.day}
                    </span>
                    <span className={`font-semibold ${
                      schedule.day === 'Emergency Services' 
                        ? 'text-red-600' 
                        : 'text-gray-800'
                    }`}>
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Find Us
                </h3>
              </div>
              <div className="bg-gray-100 h-48 rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">Coming Soon</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-1">MediCare Hospital</p>
                <p>123 Healthcare Avenue</p>
                <p>Medical District, City</p>
                <p>State 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;