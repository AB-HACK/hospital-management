import React, { useState, useCallback, useMemo } from 'react';
import { User, UserRole } from './types';
import { LandingPage } from './components/Landing/LandingPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Sidebar } from './components/Layout/Sidebar';
import { AppointmentsList } from './components/Appointments/AppointmentsList';
import { DoctorsList } from './components/Doctors/DoctorsList';
import { PatientsList } from './components/Patients/PatientsList';
import { RoomManagement } from './components/Rooms/RoomManagement';
import { MedicalRecords } from './components/MedicalRecords/MedicalRecords';
import { PatientPortal } from './components/Patients/PatientPortal';

// Memoized section titles for better performance
const SECTION_TITLES = {
  dashboard: 'Dashboard',
  patients: 'Patient Management',
  doctors: 'Doctor Management',
  appointments: 'Appointments',
  records: 'Medical Records',
  rooms: 'Room Management',
} as const;

function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  
  // Navigation state
  const [activeSection, setActiveSection] = useState('dashboard');

  // Memoized handlers for better performance
  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setActiveSection('dashboard');
  }, []);

  const handlePatientLogout = useCallback(() => {
    setCurrentPatient(null);
  }, []);

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  // Memoized current page title
  const currentTitle = useMemo(() => 
    SECTION_TITLES[activeSection as keyof typeof SECTION_TITLES] || 'Dashboard',
    [activeSection]
  );

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

  // Memoized main content renderer for better performance
  const renderMainContent = useMemo(() => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'appointments':
        return <AppointmentsList currentUser={currentUser} />;
      case 'doctors':
        return <DoctorsList currentUser={currentUser} />;
      case 'patients':
        return <PatientsList currentUser={currentUser} />;
      case 'rooms':
        return <RoomManagement currentUser={currentUser} />;
      case 'records':
        return <MedicalRecords currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  }, [activeSection, currentUser]);

  // Render main dashboard for authenticated staff
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar
        currentUser={currentUser}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-6">
          <div className="mb-4 lg:mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {currentTitle}
            </h1>
          </div>
          {renderMainContent}
        </div>
      </main>
    </div>
  );
}

export default React.memo(App);