import React, { useState } from 'react';
import { LandingPage } from './components/Landing/LandingPage';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PatientsList } from './components/Patients/PatientsList';
import { DoctorsList } from './components/Doctors/DoctorsList';
import { AppointmentsList } from './components/Appointments/AppointmentsList';
import { RoomManagement } from './components/Rooms/RoomManagement';
import { MedicalRecords } from './components/MedicalRecords/MedicalRecords';
import { DoctorDashboard } from './components/Doctors/DoctorDashboard';
import { PatientPortal } from './components/Patients/PatientPortal';
import { mockPatients } from './data/mockData';

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

interface User {
  username: string;
  role: 'admin' | 'doctor' | 'patient';
  doctorId?: string;
  patientId?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    // Mock authentication - in real app, this would be an API call
    const userData: User = {
      username: credentials.username,
      role: credentials.role as 'admin' | 'doctor'
    };

    // If it's a doctor, assign a doctor ID based on username
    if (credentials.role === 'doctor') {
      // Map usernames to doctor IDs from mockData
      const doctorMap: { [key: string]: string } = {
        'dr.watson': '1',
        'dr.chen': '2',
        'dr.efisung': '3',
        'dr.moradeyo': '4',
        'dr.muhamed': '5'
      };
      userData.doctorId = doctorMap[credentials.username] || '1';
    }

    setUser(userData);
  };

  const handlePatientLogin = (credentials: { username: string; password: string; type: 'patient' }) => {
    // Mock patient authentication
    const patientMap: { [key: string]: string } = {
      'john.doe': '1',
      'sarah.johnson': '2',
      'michael.brown': '3',
      'emily.davis': '4'
    };

    const userData: User = {
      username: credentials.username,
      role: 'patient',
      patientId: patientMap[credentials.username] || '1'
    };

    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection('dashboard');
  };

  // If user is not logged in, show landing page
  if (!user) {
    return <LandingPage onLogin={handleLogin} onPatientLogin={handlePatientLogin} />;
  }

  // Patient Portal - limited access for patients
  if (user.role === 'patient') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-100 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">Patient Portal</h1>
                <p className="text-xs lg:text-sm text-gray-500">Welcome, {user.username}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        <main className="p-4 lg:p-6">
          <PatientPortal patientId={user.patientId!} />
        </main>
      </div>
    );
  }

  // Doctor Dashboard - limited access
  if (user.role === 'doctor') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-soft-lg">
          <div className="p-4 lg:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <span className="text-white font-bold text-sm">MD</span>
                </div>
                <div>
                  <h1 className="text-lg lg:text-xl font-bold text-gray-900">Doctor Portal</h1>
                  <p className="text-xs lg:text-sm text-gray-500">Welcome, {user.username}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
          <Header title="Doctor Dashboard" />
          <main className="flex-1 p-3 sm:p-4 lg:p-6">
            <DoctorDashboard doctorId={user.doctorId!} />
          </main>
        </div>
      </div>
    );
  }

  // Admin Dashboard - full access
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
      case 'medical-records':
        return <MedicalRecords />;
      case 'rooms':
        return <RoomManagement />;
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
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        user={user}
        onLogout={handleLogout}
      />
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