import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, Filter, Search, Play, Edit, X } from 'lucide-react';
import { mockAppointments, mockPatients, mockDoctors } from '../../data/mockData';
import { BookAppointmentModal } from './BookAppointmentModal';
import { format } from 'date-fns';

export const AppointmentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showBookModal, setShowBookModal] = useState(false);
  const [appointments, setAppointments] = useState(mockAppointments);

  const filteredAppointments = appointments.filter(appointment => {
    const patient = mockPatients.find(p => p.id === appointment.patientId);
    const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
    
    const matchesSearch = patient && (
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${doctor?.firstName} ${doctor?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleBookAppointment = (appointmentData: any) => {
    const newAppointment = {
      ...appointmentData,
      id: (appointments.length + 1).toString()
    };
    setAppointments([...appointments, newAppointment]);
    setShowBookModal(false);
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus as any } : apt
    ));
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'Cancelled' as any } : apt
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-danger-100 text-danger-700';
      case 'High': return 'bg-warning-100 text-warning-700';
      case 'Medium': return 'bg-primary-100 text-primary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-primary-100 text-primary-700';
      case 'In Progress': return 'bg-warning-100 text-warning-700';
      case 'Completed': return 'bg-medical-100 text-medical-700';
      case 'Cancelled': return 'bg-gray-100 text-gray-700';
      case 'No Show': return 'bg-danger-100 text-danger-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 lg:space-y-0 gap-3">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1 w-full">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 lg:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm lg:text-base"
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
        </div>
        <button
          onClick={() => setShowBookModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm lg:text-base w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {filteredAppointments.map((appointment) => {
          const patient = mockPatients.find(p => p.id === appointment.patientId);
          const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
          
          return (
            <div key={appointment.id} className="bg-white rounded-xl shadow-soft p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="bg-primary-100 p-2 rounded-full flex-shrink-0">
                    <Calendar className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {patient?.firstName} {patient?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      Dr. {doctor?.firstName} {doctor?.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                    {appointment.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>{format(new Date(appointment.dateTime), 'MMM dd, yyyy h:mm a')}</span>
                </div>
                <div>
                  <span className="font-medium">{appointment.type}</span>
                  <span> • {appointment.duration} min</span>
                </div>
              </div>

              {appointment.symptoms && (
                <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                  <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <button className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100">
                  View Details
                </button>
                {appointment.status === 'Scheduled' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'In Progress')}
                      className="flex items-center space-x-1 px-2 py-1 text-xs bg-medical-50 text-medical-600 rounded hover:bg-medical-100"
                    >
                      <Play className="h-3 w-3" />
                      <span>Start</span>
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="flex items-center space-x-1 px-2 py-1 text-xs bg-danger-50 text-danger-600 rounded hover:bg-danger-100"
                    >
                      <X className="h-3 w-3" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
                {appointment.status === 'In Progress' && (
                  <button
                    onClick={() => handleStatusChange(appointment.id, 'Completed')}
                    className="px-2 py-1 text-xs bg-medical-50 text-medical-600 rounded hover:bg-medical-100"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop List View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredAppointments.map((appointment) => {
            const patient = mockPatients.find(p => p.id === appointment.patientId);
            const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
            
            return (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {patient?.firstName} {patient?.lastName}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                            {appointment.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Dr. {doctor?.firstName} {doctor?.lastName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{format(new Date(appointment.dateTime), 'MMM dd, yyyy h:mm a')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{appointment.type}</span>
                            <span>• {appointment.duration} min</span>
                          </div>
                        </div>
                        {appointment.symptoms && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 text-sm bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                      View Details
                    </button>
                    {appointment.status === 'Scheduled' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'In Progress')}
                          className="flex items-center space-x-1 px-3 py-2 text-sm bg-medical-50 text-medical-600 rounded-lg hover:bg-medical-100 transition-colors"
                        >
                          <Play className="h-3 w-3" />
                          <span>Start</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Edit className="h-3 w-3" />
                          <span>Reschedule</span>
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="flex items-center space-x-1 px-3 py-2 text-sm bg-danger-50 text-danger-600 rounded-lg hover:bg-danger-100 transition-colors"
                        >
                          <X className="h-3 w-3" />
                          <span>Cancel</span>
                        </button>
                      </>
                    )}
                    {appointment.status === 'In Progress' && (
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'Completed')}
                        className="px-3 py-2 text-sm bg-medical-50 text-medical-600 rounded-lg hover:bg-medical-100 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400 mx-auto mt-2" />
          </div>
          <p className="text-gray-500">No appointments found.</p>
        </div>
      )}

      <BookAppointmentModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onBook={handleBookAppointment}
      />
    </div>
  );
};