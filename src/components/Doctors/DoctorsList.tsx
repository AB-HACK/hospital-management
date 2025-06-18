import React, { useState } from 'react';
import { Search, Plus, Calendar, Phone, Mail, Award, Eye, Edit, Trash2 } from 'lucide-react';
import { mockDoctors } from '../../data/mockData';
import { Doctor } from '../../types';
import { DoctorDashboard } from './DoctorDashboard';
import { BookAppointmentModal } from '../Appointments/BookAppointmentModal';
import { AddDoctorModal } from './AddDoctorModal';

export const DoctorsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDoctorDashboard, setShowDoctorDashboard] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doctor =>
    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = (doctorData: Omit<Doctor, 'id'>) => {
    const newDoctor: Doctor = {
      ...doctorData,
      id: (doctors.length + 1).toString()
    };
    setDoctors([...doctors, newDoctor]);
  };

  const handleDeleteDoctor = (doctorId: string) => {
    if (window.confirm('Are you sure you want to remove this doctor? This action cannot be undone.')) {
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    }
  };

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
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Doctor</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-primary-600">{doctors.length}</div>
          <div className="text-sm text-gray-600">Total Doctors</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-medical-600">
            {doctors.filter(d => d.status === 'Available').length}
          </div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-warning-600">
            {doctors.filter(d => d.status === 'Busy').length}
          </div>
          <div className="text-sm text-gray-600">Busy</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-soft">
          <div className="text-2xl font-bold text-gray-600">
            {[...new Set(doctors.map(d => d.specialization))].length}
          </div>
          <div className="text-sm text-gray-600">Specializations</div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-soft p-4">
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
                  <p className="text-xs text-gray-500">{doctor.department}</p>
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

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Award className="h-3 w-3" />
                <span>{doctor.yearsOfExperience} years experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3" />
                <span>{doctor.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3" />
                <span className="truncate">{doctor.email}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Consultation Fee</span>
                <span className="font-semibold text-gray-900">${doctor.consultationFee}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowBookModal(doctor.id)}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100"
              >
                <Calendar className="h-3 w-3" />
                <span>Schedule</span>
              </button>
              <button
                onClick={() => setShowDoctorDashboard(doctor.id)}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-medical-50 text-medical-600 rounded hover:bg-medical-100"
              >
                <Eye className="h-3 w-3" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
              >
                <Edit className="h-3 w-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteDoctor(doctor.id)}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-danger-50 text-danger-600 rounded hover:bg-danger-100"
              >
                <Trash2 className="h-3 w-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-xs text-gray-500">{doctor.department}</p>
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
                <span className="truncate">{doctor.email}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Consultation Fee</span>
                <span className="font-semibold text-gray-900">${doctor.consultationFee}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowBookModal(doctor.id)}
                  className="flex items-center justify-center space-x-1 flex-1 bg-primary-50 text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule</span>
                </button>
                <button
                  onClick={() => setShowDoctorDashboard(doctor.id)}
                  className="flex items-center justify-center space-x-1 flex-1 bg-medical-50 text-medical-600 px-3 py-2 rounded-lg hover:bg-medical-100 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="flex items-center justify-center space-x-1 flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="flex items-center justify-center space-x-1 flex-1 bg-danger-50 text-danger-600 px-3 py-2 rounded-lg hover:bg-danger-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400 mx-auto mt-2" />
          </div>
          <p className="text-gray-500 mb-4">No doctors found matching your search.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Add First Doctor
          </button>
        </div>
      )}

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Doctor Details</h3>
                <button 
                  onClick={() => setSelectedDoctor(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-4 rounded-full">
                    <span className="text-primary-600 font-bold text-2xl">
                      {selectedDoctor.firstName[0]}{selectedDoctor.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {selectedDoctor.firstName} {selectedDoctor.lastName}
                    </h4>
                    <p className="text-gray-600">{selectedDoctor.specialization}</p>
                    <p className="text-sm text-gray-500">{selectedDoctor.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Contact Information</h5>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Phone:</span> {selectedDoctor.phoneNumber}</p>
                      <p><span className="text-gray-500">Email:</span> {selectedDoctor.email}</p>
                      <p><span className="text-gray-500">License:</span> {selectedDoctor.licenseNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Professional Details</h5>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Experience:</span> {selectedDoctor.yearsOfExperience} years</p>
                      <p><span className="text-gray-500">Consultation Fee:</span> ${selectedDoctor.consultationFee}</p>
                      <p><span className="text-gray-500">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          selectedDoctor.status === 'Available' ? 'bg-medical-100 text-medical-700' :
                          selectedDoctor.status === 'Busy' ? 'bg-warning-100 text-warning-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {selectedDoctor.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Weekly Availability</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(selectedDoctor.availability).map(([day, slots]) => (
                      <div key={day} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-sm text-gray-900">{day}</p>
                        {slots.length === 0 ? (
                          <p className="text-xs text-gray-500">Not available</p>
                        ) : (
                          <div className="space-y-1">
                            {slots.map((slot, index) => (
                              <p key={index} className="text-xs text-gray-600">
                                {slot.start} - {slot.end}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowBookModal(selectedDoctor.id)}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setShowDoctorDashboard(selectedDoctor.id)}
                    className="flex-1 bg-medical-600 text-white py-2 rounded-lg hover:bg-medical-700"
                  >
                    View Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddDoctorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddDoctor}
      />

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