import React, { useState } from 'react';
import { Calendar, Users, Clock, Bed, Pill, FileText } from 'lucide-react';
import { mockAppointments, mockPatients, mockRooms, mockMedicalRecords } from '../../data/mockData';
import { format } from 'date-fns';

interface DoctorDashboardProps {
  doctorId: string;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ doctorId }) => {
  const [activeTab, setActiveTab] = useState('appointments');

  // Get doctor's appointments
  const doctorAppointments = mockAppointments.filter(apt => apt.doctorId === doctorId);
  const todayAppointments = doctorAppointments.filter(apt => 
    new Date(apt.dateTime).toDateString() === new Date().toDateString()
  );

  // Get doctor's patients
  const doctorPatientIds = [...new Set(doctorAppointments.map(apt => apt.patientId))];
  const doctorPatients = mockPatients.filter(patient => 
    doctorPatientIds.includes(patient.id)
  );

  // Get occupied rooms
  const occupiedRooms = mockRooms.filter(room => room.status === 'Occupied');
  const availableRooms = mockRooms.filter(room => room.status === 'Available');

  // Get medical records for doctor's patients
  const patientRecords = mockMedicalRecords.filter(record => 
    record.doctorId === doctorId
  );

  const renderAppointments = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-primary-600" />
            <div>
              <p className="text-2xl font-bold text-primary-900">{todayAppointments.length}</p>
              <p className="text-sm text-primary-600">Today's Appointments</p>
            </div>
          </div>
        </div>
        <div className="bg-medical-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-medical-600" />
            <div>
              <p className="text-2xl font-bold text-medical-900">{doctorPatients.length}</p>
              <p className="text-sm text-medical-600">Total Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-warning-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-warning-600" />
            <div>
              <p className="text-2xl font-bold text-warning-900">
                {doctorAppointments.filter(apt => apt.status === 'Scheduled').length}
              </p>
              <p className="text-sm text-warning-600">Pending Appointments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {todayAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No appointments scheduled for today</p>
          ) : (
            todayAppointments.map(appointment => {
              const patient = mockPatients.find(p => p.id === appointment.patientId);
              return (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-2 rounded-full">
                      <Users className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {patient?.firstName} {patient?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(appointment.dateTime), 'h:mm a')} • {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.priority === 'High' ? 'bg-danger-100 text-danger-700' :
                      appointment.priority === 'Medium' ? 'bg-warning-100 text-warning-700' :
                      'bg-medical-100 text-medical-700'
                    }`}>
                      {appointment.priority}
                    </span>
                    <button className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700">
                      Start Consultation
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">My Patients</h3>
      <div className="space-y-4">
        {doctorPatients.map(patient => (
          <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
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
                  {patient.gender} • {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years • {patient.bloodGroup}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-medical-50 text-medical-600 rounded text-sm hover:bg-medical-100">
                View Records
              </button>
              <button className="px-3 py-1 bg-primary-50 text-primary-600 rounded text-sm hover:bg-primary-100">
                Prescribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRooms = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bed className="h-5 w-5 mr-2 text-danger-600" />
            Occupied Rooms ({occupiedRooms.length})
          </h3>
          <div className="space-y-3">
            {occupiedRooms.map(room => {
              const patient = room.patientId ? mockPatients.find(p => p.id === room.patientId) : null;
              return (
                <div key={room.id} className="p-3 bg-danger-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Room {room.roomNumber}</p>
                      <p className="text-sm text-gray-600">Floor {room.floor} • {room.type}</p>
                      {patient && (
                        <p className="text-sm text-danger-700 font-medium">
                          Patient: {patient.firstName} {patient.lastName}
                        </p>
                      )}
                    </div>
                    <span className="px-2 py-1 bg-danger-100 text-danger-700 rounded-full text-xs">
                      Occupied
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bed className="h-5 w-5 mr-2 text-medical-600" />
            Available Rooms ({availableRooms.length})
          </h3>
          <div className="space-y-3">
            {availableRooms.slice(0, 5).map(room => (
              <div key={room.id} className="p-3 bg-medical-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Room {room.roomNumber}</p>
                    <p className="text-sm text-gray-600">Floor {room.floor} • {room.type}</p>
                    <p className="text-sm text-gray-500">${room.dailyRate}/day</p>
                  </div>
                  <span className="px-2 py-1 bg-medical-100 text-medical-700 rounded-full text-xs">
                    Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h3>
      <div className="space-y-4">
        {patientRecords.map(record => {
          const patient = mockPatients.find(p => p.id === record.patientId);
          return (
            <div key={record.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {patient?.firstName} {patient?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(record.date), 'MMM dd, yyyy')} • {record.diagnosis}
                  </p>
                </div>
                <Pill className="h-5 w-5 text-primary-600" />
              </div>
              <div className="space-y-2">
                {record.prescriptions.map(prescription => (
                  <div key={prescription.id} className="bg-white p-3 rounded border-l-4 border-primary-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{prescription.medicationName}</p>
                        <p className="text-sm text-gray-600">
                          {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{prescription.instructions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'patients', label: 'My Patients', icon: Users },
            { id: 'rooms', label: 'Room Status', icon: Bed },
            { id: 'prescriptions', label: 'Prescriptions', icon: Pill }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'appointments' && renderAppointments()}
      {activeTab === 'patients' && renderPatients()}
      {activeTab === 'rooms' && renderRooms()}
      {activeTab === 'prescriptions' && renderPrescriptions()}
    </div>
  );
};