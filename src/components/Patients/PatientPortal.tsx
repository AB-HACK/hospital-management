import React, { useState } from 'react';
import { Calendar, User, FileText, CreditCard, Clock, Phone } from 'lucide-react';
import { mockAppointments, mockDoctors, mockBills, mockMedicalRecords } from '../../data/mockData';
import { BookAppointmentModal } from '../Appointments/BookAppointmentModal';
import { format } from 'date-fns';

interface PatientPortalProps {
  patientId: string;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [showBookModal, setShowBookModal] = useState(false);

  // Get patient's data
  const patientAppointments = mockAppointments.filter(apt => apt.patientId === patientId);
  const patientBills = mockBills.filter(bill => bill.patientId === patientId);
  const patientRecords = mockMedicalRecords.filter(record => record.patientId === patientId);

  const upcomingAppointments = patientAppointments.filter(apt => 
    new Date(apt.dateTime) > new Date() && apt.status === 'Scheduled'
  );

  const handleBookAppointment = (appointmentData: any) => {
    console.log('Booking appointment:', appointmentData);
    // In a real app, this would make an API call
  };

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">My Appointments</h3>
        <button
          onClick={() => setShowBookModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Calendar className="h-4 w-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h4 className="font-medium text-gray-900 mb-4">Upcoming Appointments</h4>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            ) : (
              upcomingAppointments.map(appointment => {
                const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                return (
                  <div key={appointment.id} className="p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Dr. {doctor?.firstName} {doctor?.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                        <p className="text-sm text-primary-600 font-medium">
                          {format(new Date(appointment.dateTime), 'MMM dd, yyyy h:mm a')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.priority === 'High' ? 'bg-danger-100 text-danger-700' :
                        appointment.priority === 'Medium' ? 'bg-warning-100 text-warning-700' :
                        'bg-medical-100 text-medical-700'
                      }`}>
                        {appointment.priority}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700">
                        Reschedule
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <h4 className="font-medium text-gray-900 mb-4">Appointment History</h4>
          <div className="space-y-4">
            {patientAppointments.filter(apt => apt.status === 'Completed').slice(0, 3).map(appointment => {
              const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
              return (
                <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Dr. {doctor?.firstName} {doctor?.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(appointment.dateTime), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-medical-100 text-medical-700 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalRecords = () => (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Records</h3>
      <div className="space-y-6">
        {patientRecords.map(record => {
          const doctor = mockDoctors.find(d => d.id === record.doctorId);
          return (
            <div key={record.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                  <p className="text-sm text-gray-600">
                    Dr. {doctor?.firstName} {doctor?.lastName} • {format(new Date(record.date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Symptoms:</p>
                  <p className="text-sm text-gray-600">{record.symptoms}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Treatment:</p>
                  <p className="text-sm text-gray-600">{record.treatment}</p>
                </div>

                {record.prescriptions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Prescriptions:</p>
                    <div className="space-y-2">
                      {record.prescriptions.map(prescription => (
                        <div key={prescription.id} className="bg-primary-50 p-3 rounded">
                          <p className="font-medium text-primary-900">{prescription.medicationName}</p>
                          <p className="text-sm text-primary-700">
                            {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                          </p>
                          <p className="text-xs text-primary-600 mt-1">{prescription.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {record.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Notes:</p>
                    <p className="text-sm text-gray-600">{record.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Payments</h3>
      <div className="space-y-4">
        {patientBills.map(bill => (
          <div key={bill.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-medium text-gray-900">Bill #{bill.id}</p>
                <p className="text-sm text-gray-600">
                  Created: {format(new Date(bill.createdDate), 'MMM dd, yyyy')}
                </p>
                <p className="text-sm text-gray-600">
                  Due: {format(new Date(bill.dueDate), 'MMM dd, yyyy')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                bill.status === 'Paid' ? 'bg-medical-100 text-medical-700' :
                bill.status === 'Pending' ? 'bg-warning-100 text-warning-700' :
                bill.status === 'Overdue' ? 'bg-danger-100 text-danger-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {bill.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {bill.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.description} (x{item.quantity})</span>
                  <span className="font-medium">${item.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-lg">${bill.totalAmount}</span>
              </div>
              {bill.insuranceCovered && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Insurance Covered:</span>
                  <span className="text-medical-600">-${bill.insuranceCovered}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Due:</span>
                <span className="font-semibold text-lg text-danger-600">
                  ${bill.totalAmount - bill.paidAmount - (bill.insuranceCovered || 0)}
                </span>
              </div>
            </div>

            {bill.status !== 'Paid' && (
              <div className="mt-4 pt-4 border-t">
                <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                  Pay Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'records', label: 'Medical Records', icon: FileText },
            { id: 'billing', label: 'Billing', icon: CreditCard }
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
      {activeTab === 'records' && renderMedicalRecords()}
      {activeTab === 'billing' && renderBilling()}

      <BookAppointmentModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onBook={handleBookAppointment}
        preselectedPatientId={patientId}
      />
    </div>
  );
};