import React, { useState } from 'react';
import { Search, Plus, Calendar, Phone, Mail, Award, Eye } from 'lucide-react';
import { mockDoctors } from '../../data/mockData';
import { DoctorDashboard } from './DoctorDashboard';
import { BookAppointmentModal } from '../Appointments/BookAppointmentModal';

export const DoctorsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDoctorDashboard, setShowDoctorDashboard] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState<string | null>(null);

  const filteredDoctors = mockDoctors.filter(doctor =>
    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (appointmentData: any) => {
    console.log('Booking appointment:', appointmentData);
    setShowBookModal(null);
  };

  if (showDoctorDashboard) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowDoctorDashboard(null)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Doctors List
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Doctor Dashboard</h2>
        </div>
        <DoctorDashboard doctorId={showDoctorDashboard} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Doctor</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-soft p-6 hover:shadow-soft-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-3 rounded-full">
                  <span className="text-primary-600 font-bold text-lg">
                    {doctor.firstName[0]}{doctor.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{doctor.firstName} {doctor.lastName}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                doctor.status === 'Available' ? 'bg-medical-100 text-medical-700' :
                doctor.status === 'Busy' ? 'bg-warning-100 text-warning-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {doctor.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="h-4 w-4" />
                <span>{doctor.yearsOfExperience} years experience</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{doctor.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{doctor.email}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Department</p>
              <p className="text-sm text-gray-600">{doctor.department}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="text-lg font-semibold text-gray-900">${doctor.consultationFee}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setShowBookModal(doctor.id)}
                className="flex items-center space-x-2 bg-primary-50 text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-100 transition-colors flex-1"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule</span>
              </button>
              <button
                onClick={() => setShowDoctorDashboard(doctor.id)}
                className="flex items-center space-x-2 bg-medical-50 text-medical-600 px-3 py-2 rounded-lg hover:bg-medical-100 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400 mx-auto mt-2" />
          </div>
          <p className="text-gray-500">No doctors found matching your search.</p>
        </div>
      )}

      {showBookModal && (
        <BookAppointmentModal
          isOpen={!!showBookModal}
          onClose={() => setShowBookModal(null)}
          onBook={handleBookAppointment}
          preselectedDoctorId={showBookModal}
        />
      )}
    </div>
  );
};