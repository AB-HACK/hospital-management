import React from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Award-Winning Care',
      description: 'Recognized for excellence in patient care and medical innovation.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Board-certified physicians and healthcare professionals.'
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Round-the-clock emergency services and critical care.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Highest standards of safety and infection control protocols.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About MediCore Hospital
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                For over 15 years, MediCore Hospital has been at the forefront of healthcare 
                innovation, providing exceptional medical care to our community. Our commitment 
                to excellence, combined with cutting-edge technology and compassionate care, 
                makes us the trusted choice for thousands of patients.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every patient deserves personalized attention and the highest 
                quality of care. Our multidisciplinary approach ensures that you receive 
                comprehensive treatment tailored to your unique needs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Beds Available</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Medical Specialists</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};