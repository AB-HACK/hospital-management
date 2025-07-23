import React from 'react';
import { Users, Award, Clock, MapPin } from 'lucide-react';

const AboutSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Patients Served',
      description: 'Happy patients treated with care'
    },
    {
      icon: Award,
      number: '25+',
      label: 'Years Experience',
      description: 'Decades of medical excellence'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Emergency Care',
      description: 'Round-the-clock medical support'
    },
    {
      icon: MapPin,
      number: '5',
      label: 'Locations',
      description: 'Convenient healthcare access'
    }
  ];

  const features = [
    'State-of-the-art medical equipment',
    'Highly qualified medical professionals',
    'Comprehensive diagnostic services',
    'Patient-centered care approach',
    'Advanced surgical procedures',
    'Rehabilitation and therapy services'
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About MediCare Hospital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading healthcare provider committed to delivering exceptional medical care 
            with compassion, innovation, and excellence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-blue-600 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Excellence in Healthcare Since 1999
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              MediCare Hospital has been at the forefront of medical innovation and patient care 
              for over two decades. Our commitment to excellence has made us a trusted healthcare 
              partner for thousands of families.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We combine cutting-edge medical technology with compassionate care to ensure 
              every patient receives the best possible treatment in a comfortable and 
              supportive environment.
            </p>

            {/* Mission Statement */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
              <h4 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h4>
              <p className="text-gray-600">
                To provide accessible, high-quality healthcare services that improve the 
                health and well-being of our community through innovation, compassion, 
                and clinical excellence.
              </p>
            </div>
          </div>

          {/* Right Content - Features */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Why Choose MediCare?
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Accreditation */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <h4 className="text-xl font-bold text-green-800 mb-3">
                Accredited & Certified
              </h4>
              <p className="text-green-700">
                Nationally accredited by healthcare quality organizations and 
                certified for excellence in patient safety and care standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;