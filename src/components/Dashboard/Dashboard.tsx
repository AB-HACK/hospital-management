import React from 'react';
import { StatsCard } from './StatsCard';
import { Users, Calendar, Bed, CreditCard, AlertTriangle, Activity, Plus } from 'lucide-react';
import { mockPatients, mockAppointments, mockRooms, mockBills } from '../../data/mockData';

export const Dashboard: React.FC = () => {
  // Calculate stats
  const totalPatients = mockPatients.length;
  const todayAppointments = mockAppointments.filter(apt => 
    new Date(apt.dateTime).toDateString() === new Date().toDateString()
  ).length;
  const availableRooms = mockRooms.filter(room => room.status === 'Available').length;
  const pendingBills = mockBills.filter(bill => bill.status === 'Pending').length;

  const quickActions = [
    {
      title: 'Add New Patient',
      description: 'Register a new patient in the system',
      icon: Users,
      color: 'primary',
      action: () => console.log('Add patient')
    },
    {
      title: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: Calendar,
      color: 'medical',
      action: () => console.log('Schedule appointment')
    },
    {
      title: 'Check Room Status',
      description: 'View and manage room availability',
      icon: Bed,
      color: 'warning',
      action: () => console.log('Check rooms')
    },
    {
      title: 'Emergency Intake',
      description: 'Process emergency patient admission',
      icon: AlertTriangle,
      color: 'danger',
      action: () => console.log('Emergency intake')
    }
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <StatsCard
          title="Total Patients"
          value={totalPatients}
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="primary"
        />
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments}
          change="+5% from yesterday"
          changeType="increase"
          icon={Calendar}
          color="medical"
        />
        <StatsCard
          title="Available Rooms"
          value={availableRooms}
          icon={Bed}
          color="warning"
        />
        <StatsCard
          title="Pending Bills"
          value={pendingBills}
          change="-8% from last week"
          changeType="decrease"
          icon={CreditCard}
          color="danger"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Recent Appointments */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-soft p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Appointments</h3>
            <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
          </div>
          <div className="space-y-3 lg:space-y-4">
            {mockAppointments.slice(0, 5).map((appointment) => {
              const patient = mockPatients.find(p => p.id === appointment.patientId);
              return (
                <div key={appointment.id} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                    <div className="bg-primary-100 p-1.5 lg:p-2 rounded-full flex-shrink-0">
                      <Users className="h-3 w-3 lg:h-4 lg:w-4 text-primary-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm lg:text-base truncate">
                        {patient?.firstName} {patient?.lastName}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500 truncate">
                        {new Date(appointment.dateTime).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })} • {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.priority === 'High' ? 'bg-danger-100 text-danger-700' :
                      appointment.priority === 'Medium' ? 'bg-warning-100 text-warning-700' :
                      'bg-medical-100 text-medical-700'
                    }`}>
                      {appointment.priority}
                    </span>
                    <button className="px-2 lg:px-3 py-1 bg-primary-600 text-white rounded text-xs lg:text-sm hover:bg-primary-700 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-soft p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Quick Actions</h3>
          <div className="space-y-2 lg:space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                primary: 'bg-primary-50 hover:bg-primary-100 text-primary-700',
                medical: 'bg-medical-50 hover:bg-medical-100 text-medical-700',
                warning: 'bg-warning-50 hover:bg-warning-100 text-warning-700',
                danger: 'bg-danger-50 hover:bg-danger-100 text-danger-700'
              };
              
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`w-full flex items-center space-x-3 p-2.5 lg:p-3 text-left rounded-lg transition-colors ${colorClasses[action.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm lg:text-base">{action.title}</p>
                    <p className="text-xs opacity-75 hidden sm:block">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-soft p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="flex items-center space-x-3 p-3 lg:p-4 bg-medical-50 rounded-lg">
            <div className="bg-medical-100 p-1.5 lg:p-2 rounded-full flex-shrink-0">
              <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-medical-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm lg:text-base">Server Status</p>
              <p className="text-xs lg:text-sm text-medical-600">All systems operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 lg:p-4 bg-warning-50 rounded-lg">
            <div className="bg-warning-100 p-1.5 lg:p-2 rounded-full flex-shrink-0">
              <AlertTriangle className="h-4 w-4 lg:h-5 lg:w-5 text-warning-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm lg:text-base">Backup Status</p>
              <p className="text-xs lg:text-sm text-warning-600">Last backup: 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 lg:p-4 bg-primary-50 rounded-lg">
            <div className="bg-primary-100 p-1.5 lg:p-2 rounded-full flex-shrink-0">
              <Users className="h-4 w-4 lg:h-5 lg:w-5 text-primary-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm lg:text-base">Active Users</p>
              <p className="text-xs lg:text-sm text-primary-600">24 staff members online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};