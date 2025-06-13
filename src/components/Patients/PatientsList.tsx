import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Phone, Mail, Calendar } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { Patient } from '../../types';
import { AddPatientModal } from './AddPatientModal';
import { PatientPortal } from './PatientPortal';
import { BookAppointmentModal } from '../Appointments/BookAppointmentModal';

export const PatientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPatientPortal, setShowPatientPortal] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState<string | null>(null);
  const [patients, setPatients] = useState(mockPatients);

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.includes(searchTerm) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (patientData: Omit<Patient, 'id' | 'createdAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: (patients.length + 1).toString(),
      createdAt: new Date().toISOString()
    };
    setPatients([...patients, newPatient]);
  };

  const handleBookAppointment = (appointmentData: any) => {
    console.log('Booking appointment:', appointmentData);
    setShowBookModal(null);
  };

  if (showPatientPortal) {
    return (
      <div className="space-y-4 lg:space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowPatientPortal(null)}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm lg:text-base"
          >
            ← Back to Patients List
          </button>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Patient Portal</h2>
        </div>
        <PatientPortal patientId={showPatientPortal} />
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 gap-3">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm lg:text-base"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm lg:text-base w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-xl shadow-soft p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <span className="text-primary-600 font-semibold text-sm">
                    {patient.firstName[0]}{patient.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {patient.gender} • {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-medical-100 text-medical-800">
                {patient.bloodGroup}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-3 w-3" />
                <span>{patient.phoneNumber}</span>
              </div>
              {patient.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{patient.email}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedPatient(patient)}
                className="flex items-center space-x-1 px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100"
              >
                <Eye className="h-3 w-3" />
                <span>View</span>
              </button>
              <button
                onClick={() => setShowBookModal(patient.id)}
                className="flex items-center space-x-1 px-2 py-1 text-xs bg-medical-50 text-medical-600 rounded hover:bg-medical-100"
              >
                <Calendar className="h-3 w-3" />
                <span>Book</span>
              </button>
              <button
                onClick={() => setShowPatientPortal(patient.id)}
                className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
              >
                Portal
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <span className="text-primary-600 font-semibold text-sm">
                          {patient.firstName[0]}{patient.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {patient.gender} • {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{patient.phoneNumber}</span>
                      </div>
                      {patient.email && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          <span>{patient.email}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-100 text-medical-800">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.status === 'Active' ? 'bg-medical-100 text-medical-800' :
                      patient.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-warning-100 text-warning-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedPatient(patient)}
                        className="p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded"
                        title="Edit Patient"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowBookModal(patient.id)}
                        className="p-1 text-medical-600 hover:text-medical-700 hover:bg-medical-50 rounded"
                        title="Book Appointment"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowPatientPortal(patient.id)}
                        className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100"
                      >
                        Portal
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400 mx-auto mt-2" />
          </div>
          <p className="text-gray-500">No patients found matching your search.</p>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Patient Details</h3>
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl lg:text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Name:</span> {selectedPatient.firstName} {selectedPatient.lastName}</p>
                      <p><span className="text-gray-500">Date of Birth:</span> {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                      <p><span className="text-gray-500">Gender:</span> {selectedPatient.gender}</p>
                      <p><span className="text-gray-500">Blood Group:</span> {selectedPatient.bloodGroup}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Phone:</span> {selectedPatient.phoneNumber}</p>
                      <p><span className="text-gray-500">Email:</span> {selectedPatient.email || 'Not provided'}</p>
                      <p><span className="text-gray-500">Address:</span> {selectedPatient.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
                  <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
                    <p className="text-sm"><span className="text-gray-500">Name:</span> {selectedPatient.emergencyContact.name}</p>
                    <p className="text-sm"><span className="text-gray-500">Relationship:</span> {selectedPatient.emergencyContact.relationship}</p>
                    <p className="text-sm"><span className="text-gray-500">Phone:</span> {selectedPatient.emergencyContact.phoneNumber}</p>
                  </div>
                </div>

                {selectedPatient.allergies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <span key={index} className="px-2 py-1 bg-danger-100 text-danger-700 rounded-full text-xs">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPatient.insuranceInfo && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Insurance Information</h4>
                    <div className="bg-primary-50 p-3 lg:p-4 rounded-lg">
                      <p className="text-sm"><span className="text-gray-500">Provider:</span> {selectedPatient.insuranceInfo.provider}</p>
                      <p className="text-sm"><span className="text-gray-500">Policy Number:</span> {selectedPatient.insuranceInfo.policyNumber}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowPatientPortal(selectedPatient.id)}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 text-sm lg:text-base"
                  >
                    Open Patient Portal
                  </button>
                  <button
                    onClick={() => setShowBookModal(selectedPatient.id)}
                    className="flex-1 bg-medical-600 text-white py-2 rounded-lg hover:bg-medical-700 text-sm lg:text-base"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddPatient}
      />

      {showBookModal && (
        <BookAppointmentModal
          isOpen={!!showBookModal}
          onClose={() => setShowBookModal(null)}
          onBook={handleBookAppointment}
          preselectedPatientId={showBookModal}
        />
      )}
    </div>
  );
};