import React from 'react';
import { Heart, Brain, Bone, Eye, Baby, Stethoscope } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced cardiac procedures and treatments',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Expert neurological care for brain and nervous system disorders',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Specialized bone, joint, and muscle treatment with modern techniques',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine exams to complex surgeries',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Baby,
      title: 'Pediatrics',
      description: 'Dedicated healthcare for infants, children, and adolescents',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Stethoscope,
      title: 'General Medicine',
      description: 'Primary healthcare services for overall health and wellness',
      gradient: 'from-gray-500 to-slate-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of medical services with state-of-the-art facilities 
            and experienced healthcare professionals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Service Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Service Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-6">
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need Specialized Care?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our multidisciplinary team of specialists work together to provide 
              comprehensive care tailored to your specific needs
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
              Consult Our Specialists
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;