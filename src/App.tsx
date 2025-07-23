import React, { useState } from 'react';
import { User, UserRole } from './types';
import LandingPage from './components/Landing/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Sidebar from './components/Layout/Sidebar';
import AppointmentsList from './components/Appointments/AppointmentsList';
import DoctorsList from './components/Doctors/DoctorsList';
import Patients from './components/Patients/Patients';
import Rooms from './components/Rooms/Rooms';
import MedicalRecords from './components/MedicalRecords/MedicalRecords';
import PatientPortal from './components/Patients/PatientPortal';

function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  
  // Navigation state
  const [activeSection, setActiveSection] = useState('dashboard');

  // Handle staff logout
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSection('dashboard');
  };

  // Handle patient logout
  const handlePatientLogout = () => {
    setCurrentPatient(null);
  };

  // Render patient portal if patient is logged in
  if (currentPatient) {
    return (
      <PatientPortal 
        patient={currentPatient} 
        onLogout={handlePatientLogout} 
      />
    );
  }

  // Render landing page if no user is logged in
  if (!currentUser) {
    return (
      <LandingPage 
        onLogin={setCurrentUser} 
        onPatientLogin={setCurrentPatient} 
      />
    );
  }

  // Render main dashboard for authenticated staff
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar
        currentUser={currentUser}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Render active section based on navigation */}
          {activeSection === 'dashboard' && (
            <Dashboard currentUser={currentUser} />
          )}
          {activeSection === 'appointments' && (
            <AppointmentsList currentUser={currentUser} />
          )}
          {activeSection === 'doctors' && (
            <DoctorsList currentUser={currentUser} />
          )}
          {activeSection === 'patients' && (
            <Patients currentUser={currentUser} />
          )}
          {activeSection === 'rooms' && (
            <Rooms currentUser={currentUser} />
          )}
          {activeSection === 'records' && (
            <MedicalRecords currentUser={currentUser} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;