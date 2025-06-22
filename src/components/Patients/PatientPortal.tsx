import React, { useState } from 'react';
import { Calendar, User, FileText, CreditCard, Clock, Phone, Download, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { mockAppointments, mockDoctors, mockBills, mockMedicalRecords } from '../../data/mockData';
import { BookAppointmentModal } from '../Appointments/BookAppointmentModal';
import { format } from 'date-fns';

interface PatientPortalProps {
  patientId: string;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookModal, setShowBookModal] = useState(false);

  // Get patient's data
  const patientAppointments = mockAppointments.filter(apt => apt.patientId === patientId);
  const patientBills = mockBills.filter(bill => bill.patientId === patientId);
  const patientRecords = mockMedicalRecords.filter(record => record.patientId === patientId);

  const upcomingAppointments = patientAppointments.filter(apt => 
    new Date(apt.dateTime) > new Date() && apt.status === 'Scheduled'
  );

  const recentAppointments = patientAppointments.filter(apt => 
    apt.status === 'Completed'
  ).slice(0, 3);

  const pendingBills = patientBills.filter(bill => bill.status === 'Pending' || bill.status === 'Overdue');

  const handleBookAppointment = (appointmentData: any) => {
    console.log('Booking appointment:', appointmentData);
    setShowBookModal(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
              <p className="text-sm opacity-90">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">{patientRecords.length}</p>
              <p className="text-sm opacity-90">Records</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">{pendingBills.length}</p>
              <p className="text-sm opacity-90">Pending Bills</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">{recentAppointments.length}</p>
              <p className="text-sm opacity-90">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
          <button
            onClick={() => setShowBookModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Book New
          </button>
        </div>
        
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No upcoming appointments</p>
            <button
              onClick={() => setShowBookModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Your First Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => {
              const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
              return (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Dr. {doctor?.firstName} {doctor?.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                        <p className="text-sm text-blue-600 font-medium">
                          {format(new Date(appointment.dateTime), 'EEEE, MMM dd, yyyy h:mm a')}
                        </p>
                        <p className="text-sm text-gray-500">{appointment.type} • {appointment.duration} min</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.priority === 'High' ? 'bg-red-100 text-red-700' :
                        appointment.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {appointment.priority} Priority
                      </span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200">
                          Reschedule
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Records */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Medical Records</h3>
          {patientRecords.slice(0, 3).map(record => {
            const doctor = mockDoctors.find(d => d.id === record.doctorId);
            return (
              <div key={record.id} className="border-l-4 border-blue-500 pl-4 py-3 border-b border-gray-100 last:border-b-0">
                <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                <p className="text-sm text-gray-600">Dr. {doctor?.firstName} {doctor?.lastName}</p>
                <p className="text-sm text-gray-500">{format(new Date(record.date), 'MMM dd, yyyy')}</p>
              </div>
            );
          })}
        </div>

        {/* Pending Bills */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
          {pendingBills.length === 0 ? (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-600 font-medium">All bills are paid!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingBills.map(bill => (
                <div key={bill.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Bill #{bill.id}</p>
                    <p className="text-sm text-gray-600">Due: {format(new Date(bill.dueDate), 'MMM dd, yyyy')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">${bill.totalAmount - bill.paidAmount}</p>
                    <button className="text-xs bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700">
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">My Appointments</h3>
        <button
          onClick={() => setShowBookModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Calendar className="h-4 w-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Upcoming Appointments</h4>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            ) : (
              upcomingAppointments.map(appointment => {
                const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
                return (
                  <div key={appointment.id} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Dr. {doctor?.firstName} {doctor?.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{doctor?.specialization}</p>
                        <p className="text-sm text-blue-600 font-medium">
                          {format(new Date(appointment.dateTime), 'MMM dd, yyyy h:mm a')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.priority === 'High' ? 'bg-red-100 text-red-700' :
                        appointment.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {appointment.priority}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
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

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Appointment History</h4>
          <div className="space-y-4">
            {recentAppointments.map(appointment => {
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
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
        <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
          <Download className="h-4 w-4" />
          <span>Download All</span>
        </button>
      </div>
      
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
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
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
                        <div key={prescription.id} className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                          <p className="font-medium text-blue-900">{prescription.medicationName}</p>
                          <p className="text-sm text-blue-700">
                            {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">{prescription.instructions}</p>
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

                {record.followUpDate && (
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                    <p className="text-sm font-medium text-yellow-900">
                      Follow-up scheduled: {format(new Date(record.followUpDate), 'MMM dd, yyyy')}
                    </p>
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
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing & Payments</h3>
        
        {/* Billing Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-900">
                  ${patientBills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.totalAmount, 0)}
                </p>
                <p className="text-sm text-green-600">Total Paid</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-900">
                  ${pendingBills.reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0)}
                </p>
                <p className="text-sm text-orange-600">Outstanding</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{patientBills.length}</p>
                <p className="text-sm text-blue-600">Total Bills</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bills List */}
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
                  bill.status === 'Paid' ? 'bg-green-100 text-green-700' :
                  bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  bill.status === 'Overdue' ? 'bg-red-100 text-red-700' :
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
                    <span className="text-green-600">-${bill.insuranceCovered}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Due:</span>
                  <span className="font-semibold text-lg text-red-600">
                    ${bill.totalAmount - bill.paidAmount - (bill.insuranceCovered || 0)}
                  </span>
                </div>
              </div>

              {bill.status !== 'Paid' && (
                <div className="mt-4 pt-4 border-t flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Pay Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Download
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: User },
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
                    ? 'border-blue-500 text-blue-600'
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

      {activeTab === 'overview' && renderOverview()}
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