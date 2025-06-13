import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PatientsList } from './components/Patients/PatientsList';
import { DoctorsList } from './components/Doctors/DoctorsList';
import { AppointmentsList } from './components/Appointments/AppointmentsList';
import { RoomManagement } from './components/Rooms/RoomManagement';

const sectionTitles = {
  dashboard: 'Dashboard',
  patients: 'Patient Management',
  doctors: 'Doctor Management',
  appointments: 'Appointments',
  'medical-records': 'Medical Records',
  billing: 'Billing & Payments',
  rooms: 'Room Management',
  inventory: 'Inventory Management',
  staff: 'Staff Management',
  settings: 'Settings',
};

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientsList />;
      case 'doctors':
        return <DoctorsList />;
      case 'appointments':
        return <AppointmentsList />;
      case 'rooms':
        return <RoomManagement />;
      case 'medical-records':
        return (
          <div className="bg-white rounded-xl shadow-soft p-6 lg:p-8 text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Medical Records</h3>
            <p className="text-sm lg:text-base text-gray-600">Electronic health records management system coming soon...</p>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-white rounded-xl shadow-soft p-6 lg:p-8 text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Billing & Payments</h3>
            <p className="text-sm lg:text-base text-gray-600">Comprehensive billing management system coming soon...</p>
          </div>
        );
      case 'inventory':
        return (
          <div className="bg-white rounded-xl shadow-soft p-6 lg:p-8 text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Inventory Management</h3>
            <p className="text-sm lg:text-base text-gray-600">Medical supplies and equipment tracking coming soon...</p>
          </div>
        );
      case 'staff':
        return (
          <div className="bg-white rounded-xl shadow-soft p-6 lg:p-8 text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Staff Management</h3>
            <p className="text-sm lg:text-base text-gray-600">Staff scheduling and management system coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-soft p-6 lg:p-8 text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Settings</h3>
            <p className="text-sm lg:text-base text-gray-600">System configuration and preferences coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Header title={sectionTitles[activeSection as keyof typeof sectionTitles]} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;