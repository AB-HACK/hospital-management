# Appointments Components

This directory contains components for managing hospital appointments, including scheduling, viewing, and managing appointment status.

## 📁 **Components**

### **AppointmentsList.tsx**
**Purpose:** Main appointment management interface for administrators and staff

**Features:**
- View all appointments with filtering options
- Search appointments by patient or doctor name
- Filter by appointment status (Scheduled, In Progress, Completed, etc.)
- Mobile-responsive card view and desktop table view
- Real-time status updates (Start, Complete, Cancel)
- Priority indicators (Low, Medium, High, Critical)

**Props:**
```typescript
// No props - manages its own state
```

**Key Functions:**
- `handleStatusChange()` - Updates appointment status
- `handleCancelAppointment()` - Cancels appointments
- `handleBookAppointment()` - Creates new appointments

### **BookAppointmentModal.tsx**
**Purpose:** Modal dialog for booking new appointments

**Features:**
- Patient and doctor selection dropdowns
- Date and time picker with validation
- Appointment type selection (Consultation, Follow-up, Emergency, Surgery)
- Duration and priority settings
- Symptoms/reason input field
- Form validation and error handling

**Props:**
```typescript
interface BookAppointmentModalProps {
  isOpen: boolean;                    // Controls modal visibility
  onClose: () => void;               // Close modal handler
  onBook: (appointment: Omit<Appointment, 'id'>) => void; // Submit handler
  preselectedPatientId?: string;     // Pre-fill patient (optional)
  preselectedDoctorId?: string;      // Pre-fill doctor (optional)
}
```

**Key Functions:**
- `handleSubmit()` - Validates and submits appointment data
- Form state management with `useState`
- Date/time validation (prevents past dates)

## 🎯 **Usage Examples**

### **Basic Appointment List**
```typescript
import { AppointmentsList } from './components/Appointments/AppointmentsList';

function AdminDashboard() {
  return (
    <div>
      <h1>Appointment Management</h1>
      <AppointmentsList />
    </div>
  );
}
```

### **Booking Modal with Pre-selected Patient**
```typescript
import { BookAppointmentModal } from './components/Appointments/BookAppointmentModal';

function PatientProfile({ patientId }: { patientId: string }) {
  const [showBookModal, setShowBookModal] = useState(false);
  
  const handleBookAppointment = (appointmentData: any) => {
    // Handle appointment creation
    console.log('New appointment:', appointmentData);
    setShowBookModal(false);
  };
  
  return (
    <div>
      <button onClick={() => setShowBookModal(true)}>
        Book Appointment
      </button>
      
      <BookAppointmentModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        onBook={handleBookAppointment}
        preselectedPatientId={patientId}
      />
    </div>
  );
}
```

## 📊 **Data Structure**

### **Appointment Interface**
```typescript
interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: string;                  // ISO date string
  duration: number;                  // Minutes
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Surgery';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
  symptoms?: string;                 // Optional symptoms description
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}
```

## 🎨 **Styling Features**

### **Status Colors**
- **Scheduled:** Blue (`bg-primary-100 text-primary-700`)
- **In Progress:** Orange (`bg-warning-100 text-warning-700`)
- **Completed:** Green (`bg-medical-100 text-medical-700`)
- **Cancelled:** Gray (`bg-gray-100 text-gray-700`)
- **No Show:** Red (`bg-danger-100 text-danger-700`)

### **Priority Colors**
- **Critical:** Red (`bg-danger-100 text-danger-700`)
- **High:** Orange (`bg-warning-100 text-warning-700`)
- **Medium:** Blue (`bg-primary-100 text-primary-700`)
- **Low:** Gray (`bg-gray-100 text-gray-700`)

### **Responsive Design**
- **Mobile:** Card-based layout with stacked information
- **Desktop:** Table layout with inline actions
- **Tablet:** Hybrid approach with responsive grids

## 🔧 **State Management**

### **AppointmentsList State**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [statusFilter, setStatusFilter] = useState('All');
const [showBookModal, setShowBookModal] = useState(false);
const [appointments, setAppointments] = useState(mockAppointments);
```

### **BookAppointmentModal State**
```typescript
const [formData, setFormData] = useState({
  patientId: preselectedPatientId || '',
  doctorId: preselectedDoctorId || '',
  date: '',
  time: '',
  duration: 30,
  type: 'Consultation' as AppointmentType,
  symptoms: '',
  priority: 'Medium' as PriorityLevel
});
```

## 🔄 **Integration Points**

### **Data Dependencies**
- **Patients:** Links to patient records via `patientId`
- **Doctors:** Links to doctor profiles via `doctorId`
- **Medical Records:** Appointments can generate medical records
- **Billing:** Completed appointments generate billing items

### **Navigation Flow**
1. **Admin Dashboard** → **Appointments List**
2. **Patient Portal** → **Book Appointment Modal**
3. **Doctor Dashboard** → **Today's Appointments**
4. **Appointment Details** → **Medical Records**

## 🚀 **Performance Considerations**

### **Optimization Features**
- Filtered lists use `useMemo` for expensive calculations
- Modal components only render when open
- Search functionality debounced to prevent excessive filtering
- Virtual scrolling ready for large appointment lists

### **Loading States**
- Form submission shows loading indicators
- Appointment status changes provide immediate feedback
- Error states handled gracefully with user-friendly messages

## 📱 **Mobile Experience**

### **Touch-Friendly Design**
- Large tap targets for buttons and actions
- Swipe gestures for card interactions
- Optimized form inputs for mobile keyboards
- Accessible focus management

### **Mobile-Specific Features**
- Collapsible appointment details
- Quick action buttons (Call, Message, Reschedule)
- Date picker optimized for touch input
- Simplified navigation for small screens

## 🔒 **Security & Validation**

### **Input Validation**
- Date validation (no past dates for new appointments)
- Required field validation
- Patient and doctor existence validation
- Time slot availability checking

### **Role-Based Access**
- Admins can manage all appointments
- Doctors can view their assigned appointments
- Patients can only book and view their own appointments
- Staff can assist with appointment management

## 🧪 **Testing Scenarios**

### **User Flows to Test**
1. **Book New Appointment:** Complete form submission
2. **Filter Appointments:** Search and filter functionality
3. **Status Updates:** Change appointment status
4. **Mobile Responsiveness:** Test on different screen sizes
5. **Error Handling:** Invalid form submissions
6. **Role Permissions:** Different user access levels

### **Edge Cases**
- Booking appointments outside doctor availability
- Conflicting appointment times
- Cancelled appointment rescheduling
- Emergency appointment priority handling