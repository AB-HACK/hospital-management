import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactSectionProps {
  onPatientLoginClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onPatientLoginClick }) => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Need medical assistance or have questions? We're here to help 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold mb-2">Emergency</h3>
            <p className="text-gray-300">+1 (555) 911-HELP</p>
            <p className="text-gray-300">24/7 Available</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold mb-2">Email</h3>
            <p className="text-gray-300">info@medicore.com</p>
            <p className="text-gray-300">appointments@medicore.com</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold mb-2">Location</h3>
            <p className="text-gray-300">123 Healthcare Blvd</p>
            <p className="text-gray-300">Medical City, MC 12345</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold mb-2">Hours</h3>
            <p className="text-gray-300">Mon-Fri: 8AM-8PM</p>
            <p className="text-gray-300">Emergency: 24/7</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onPatientLoginClick}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Schedule an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};