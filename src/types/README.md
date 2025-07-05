# Types Directory

This directory contains TypeScript type definitions that provide type safety and structure for the entire hospital management system.

## 📁 **Files**

### **index.ts**
**Purpose:** Central type definitions for all entities in the hospital management system

**Contents:**
- **Core Entity Types** - Patient, Doctor, Appointment, Room, etc.
- **Medical Types** - Medical records, prescriptions, lab results
- **Financial Types** - Billing, payments, insurance information
- **System Types** - Staff, inventory, user management
- **Utility Types** - Common interfaces and enums

## 🏥 **Core Entity Types**

### **Patient Interface**
```typescript
interface Patient {
  id: string;                        // Unique patient identifier
  firstName: string;                 // Patient's first name
  lastName: string;                  // Patient's last name
  dateOfBirth: string;              // ISO date string
  gender: 'Male' | 'Female' | 'Other'; // Gender options
  phoneNumber: string;               // Contact phone number
  email?: string;                    // Optional email address
  address: string;                   // Physical address
  emergencyContact: {                // Emergency contact information
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  bloodGroup: string;                // Blood type (A+, B-, O+, etc.)
  allergies: string[];               // List of known allergies
  medicalHistory: MedicalRecord[];   // Patient's medical records
  insuranceInfo?: {                  // Optional insurance information
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  createdAt: string;                 // Registration timestamp
  status: 'Active' | 'Inactive' | 'Discharged'; // Patient status
  patientNumber: string;             // Unique patient number
}
```

### **Doctor Interface**
```typescript
interface Doctor {
  id: string;                        // Unique doctor identifier
  firstName: string;                 // Doctor's first name
  lastName: string;                  // Doctor's last name
  specialization: string;            // Medical specialization
  phoneNumber: string;               // Contact phone number
  email: string;                     // Email address
  licenseNumber: string;             // Medical license number
  department: string;                // Hospital department
  yearsOfExperience: number;         // Years of medical experience
  availability: {                    // Weekly availability schedule
    [key: string]: { start: string; end: string; }[];
  };
  status: 'Available' | 'On Leave' | 'Busy'; // Current status
  consultationFee: number;           // Consultation fee in dollars
}
```

### **Appointment Interface**
```typescript
interface Appointment {
  id: string;                        // Unique appointment identifier
  patientId: string;                 // Reference to patient
  doctorId: string;                  // Reference to doctor
  dateTime: string;                  // ISO datetime string
  duration: number;                  // Duration in minutes
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Surgery'; // Appointment type
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show'; // Status
  notes?: string;                    // Optional appointment notes
  symptoms?: string;                 // Patient symptoms
  priority: 'Low' | 'Medium' | 'High' | 'Critical'; // Priority level
}
```

## 🏥 **Medical Types**

### **Medical Record Interface**
```typescript
interface MedicalRecord {
  id: string;                        // Unique record identifier
  patientId: string;                 // Reference to patient
  doctorId: string;                  // Reference to doctor
  date: string;                      // Record date (ISO string)
  diagnosis: string;                 // Primary diagnosis
  symptoms: string;                  // Patient symptoms
  treatment: string;                 // Treatment provided
  prescriptions: Prescription[];     // Prescribed medications
  labResults?: LabResult[];          // Optional lab results
  notes: string;                     // Additional notes
  followUpDate?: string;             // Optional follow-up date
}
```

### **Prescription Interface**
```typescript
interface Prescription {
  id: string;                        // Unique prescription identifier
  medicationName: string;            // Name of medication
  dosage: string;                    // Dosage amount (e.g., "500mg")
  frequency: string;                 // Frequency (e.g., "Twice daily")
  duration: string;                  // Duration (e.g., "7 days")
  instructions: string;              // Special instructions
  prescribedDate: string;            // Date prescribed
}
```

### **Lab Result Interface**
```typescript
interface LabResult {
  id: string;                        // Unique result identifier
  testName: string;                  // Name of the test
  result: string;                    // Test result value
  normalRange: string;               // Normal range for the test
  status: 'Normal' | 'Abnormal' | 'Critical'; // Result status
  testDate: string;                  // Date test was performed
  comments?: string;                 // Optional comments
}
```

## 🏢 **Infrastructure Types**

### **Room Interface**
```typescript
interface Room {
  id: string;                        // Unique room identifier
  roomNumber: string;                // Room number (e.g., "101", "A-205")
  type: 'General' | 'ICU' | 'Private' | 'Emergency' | 'Surgery'; // Room type
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved'; // Current status
  patientId?: string;                // Currently assigned patient (if occupied)
  floor: number;                     // Floor number
  capacity: number;                  // Number of beds
  equipment: string[];               // Available equipment
  dailyRate: number;                 // Daily rate in dollars
}
```

### **Staff Interface**
```typescript
interface Staff {
  id: string;                        // Unique staff identifier
  firstName: string;                 // Staff member's first name
  lastName: string;                  // Staff member's last name
  role: 'Doctor' | 'Nurse' | 'Technician' | 'Administrator' | 'Receptionist' | 'Pharmacist'; // Role
  department: string;                // Department assignment
  phoneNumber: string;               // Contact phone number
  email: string;                     // Email address
  shift: 'Morning' | 'Evening' | 'Night'; // Work shift
  status: 'Active' | 'On Leave' | 'Inactive'; // Employment status
  hireDate: string;                  // Date of hire
}
```

## 💰 **Financial Types**

### **Bill Interface**
```typescript
interface Bill {
  id: string;                        // Unique bill identifier
  patientId: string;                 // Reference to patient
  items: BillItem[];                 // List of billable items
  totalAmount: number;               // Total bill amount
  paidAmount: number;                // Amount already paid
  status: 'Pending' | 'Partially Paid' | 'Paid' | 'Overdue'; // Payment status
  dueDate: string;                   // Payment due date
  createdDate: string;               // Bill creation date
  paymentMethod?: string;            // Payment method used
  insuranceCovered?: number;         // Amount covered by insurance
}
```

### **Bill Item Interface**
```typescript
interface BillItem {
  id: string;                        // Unique item identifier
  description: string;               // Item description
  quantity: number;                  // Quantity of items
  unitPrice: number;                 // Price per unit
  totalPrice: number;                // Total price for this item
  category: 'Consultation' | 'Procedure' | 'Medication' | 'Room' | 'Test' | 'Other'; // Item category
}
```

## 📦 **Inventory Types**

### **Inventory Item Interface**
```typescript
interface InventoryItem {
  id: string;                        // Unique item identifier
  name: string;                      // Item name
  category: 'Medication' | 'Equipment' | 'Supplies' | 'Consumables'; // Item category
  currentStock: number;              // Current stock quantity
  minimumStock: number;              // Minimum stock threshold
  unitPrice: number;                 // Price per unit
  supplier: string;                  // Supplier name
  expiryDate?: string;               // Expiry date (for medications)
  location: string;                  // Storage location
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired'; // Stock status
}
```

## 🎯 **Usage Examples**

### **Type-Safe Component Props**
```typescript
interface PatientListProps {
  patients: Patient[];               // Array of patient objects
  onPatientSelect: (patient: Patient) => void; // Patient selection handler
  searchTerm?: string;               // Optional search term
}

const PatientList: React.FC<PatientListProps> = ({ 
  patients, 
  onPatientSelect, 
  searchTerm 
}) => {
  // Component implementation with full type safety
};
```

### **API Response Types**
```typescript
// Type-safe API responses
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Usage with specific types
type PatientsResponse = ApiResponse<Patient[]>;
type DoctorResponse = ApiResponse<Doctor>;
type AppointmentResponse = ApiResponse<Appointment>;
```

### **Form Data Types**
```typescript
// Type-safe form handling
type PatientFormData = Omit<Patient, 'id' | 'createdAt' | 'medicalHistory'>;
type DoctorFormData = Omit<Doctor, 'id'>;
type AppointmentFormData = Omit<Appointment, 'id' | 'status'>;
```

## 🔧 **Utility Types**

### **Common Patterns**
```typescript
// Status types used across entities
type EntityStatus = 'Active' | 'Inactive';
type AppointmentStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
type RoomStatus = 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
type BillStatus = 'Pending' | 'Partially Paid' | 'Paid' | 'Overdue';

// Priority levels
type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

// Gender options
type Gender = 'Male' | 'Female' | 'Other';

// User roles
type UserRole = 'admin' | 'doctor' | 'nurse' | 'staff' | 'patient';
```

### **Relationship Types**
```typescript
// Types for entity relationships
interface PatientWithAppointments extends Patient {
  appointments: Appointment[];
}

interface DoctorWithSchedule extends Doctor {
  todayAppointments: Appointment[];
  patients: Patient[];
}

interface RoomWithPatient extends Room {
  currentPatient?: Patient;
}
```

## 🔒 **Type Safety Benefits**

### **Compile-Time Validation**
- **Property Checking** - Ensures all required properties are provided
- **Type Checking** - Prevents type mismatches and errors
- **IntelliSense Support** - Enhanced IDE autocomplete and suggestions
- **Refactoring Safety** - Safe code refactoring with type checking

### **Runtime Error Prevention**
- **Null Safety** - Optional properties clearly marked
- **Enum Validation** - Restricted values for status fields
- **Interface Compliance** - Ensures objects match expected structure
- **API Contract Enforcement** - Consistent data structure across system

## 🚀 **Development Workflow**

### **Adding New Types**
1. **Define Interface** - Create new interface in `index.ts`
2. **Export Type** - Make type available for import
3. **Update Components** - Use new type in relevant components
4. **Update Mock Data** - Ensure mock data matches new type structure

### **Modifying Existing Types**
1. **Assess Impact** - Check which components use the type
2. **Update Interface** - Modify type definition
3. **Fix Compilation Errors** - Update affected code
4. **Test Thoroughly** - Verify changes work correctly

## 🧪 **Type Testing**

### **Type Validation**
```typescript
// Utility functions for type checking
const isPatient = (obj: any): obj is Patient => {
  return obj && typeof obj.id === 'string' && typeof obj.firstName === 'string';
};

const isDoctor = (obj: any): obj is Doctor => {
  return obj && typeof obj.id === 'string' && typeof obj.specialization === 'string';
};
```

### **Mock Data Validation**
```typescript
// Ensure mock data matches type definitions
const validateMockData = () => {
  mockPatients.forEach(patient => {
    if (!isPatient(patient)) {
      console.error('Invalid patient data:', patient);
    }
  });
};
```

## 🔮 **Future Enhancements**

### **Advanced Types**
- **Generic Types** - Reusable type patterns
- **Conditional Types** - Dynamic type generation
- **Mapped Types** - Transform existing types
- **Template Literal Types** - String pattern types

### **Validation Integration**
- **Runtime Validation** - Validate data at runtime
- **Schema Validation** - JSON schema integration
- **API Validation** - Validate API responses
- **Form Validation** - Type-safe form validation

### **Documentation Generation**
- **Type Documentation** - Auto-generate type documentation
- **API Documentation** - Generate API docs from types
- **Component Documentation** - Document component prop types
- **Schema Export** - Export types as JSON schema

This comprehensive type system provides the foundation for a robust, type-safe hospital management system that prevents errors, improves developer experience, and ensures data consistency throughout the application.