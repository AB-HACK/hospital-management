# Data Directory

This directory contains mock data and constants used throughout the hospital management system for demonstration and development purposes.

## 📁 **Files**

### **mockData.ts**
**Purpose:** Comprehensive mock data for all entities in the hospital management system

**Contents:**
- **Patient Records** - Sample patient profiles with complete information
- **Doctor Profiles** - Medical staff with specializations and availability
- **Appointment Data** - Scheduled appointments with various statuses
- **Medical Records** - Patient medical history and prescriptions
- **Room Information** - Hospital rooms with status and equipment
- **Billing Data** - Patient bills and payment information
- **Staff Records** - Hospital staff and their roles
- **Inventory Items** - Medical supplies and equipment
- **User Credentials** - Demo login credentials for testing

## 📊 **Data Structure Overview**

### **Patient Data (mockPatients)**
```typescript
// Sample patient structure
{
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1985-03-15',
  gender: 'Male',
  phoneNumber: '+1-555-0123',
  email: 'john.doe@email.com',
  address: '123 Main St, Anytown, ST 12345',
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phoneNumber: '+1-555-0124'
  },
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Shellfish'],
  medicalHistory: [],
  insuranceInfo: {
    provider: 'HealthCare Plus',
    policyNumber: 'HC123456789'
  },
  createdAt: '2024-01-15T10:30:00Z',
  status: 'Active',
  patientNumber: 'PT001'
}
```

### **Doctor Data (mockDoctors)**
```typescript
// Sample doctor structure
{
  id: '1',
  firstName: 'Dr. Emily',
  lastName: 'Watson',
  specialization: 'Cardiology',
  phoneNumber: '+1-555-1001',
  email: 'e.watson@hospital.com',
  licenseNumber: 'MD123456',
  department: 'Cardiology',
  yearsOfExperience: 12,
  availability: {
    'Monday': [{ start: '09:00', end: '17:00' }],
    'Tuesday': [{ start: '09:00', end: '17:00' }],
    // ... weekly schedule
  },
  status: 'Available',
  consultationFee: 200
}
```

### **Appointment Data (mockAppointments)**
```typescript
// Sample appointment structure
{
  id: '1',
  patientId: '1',
  doctorId: '1',
  dateTime: '2024-01-25T10:00:00Z',
  duration: 30,
  type: 'Consultation',
  status: 'Scheduled',
  symptoms: 'Chest pain, shortness of breath',
  priority: 'High'
}
```

## 🏥 **Medical Data**

### **Medical Records (mockMedicalRecords)**
- **Complete Patient History** - Diagnosis, symptoms, treatments
- **Prescription Information** - Medications with dosage and instructions
- **Follow-up Appointments** - Scheduled follow-up care
- **Doctor Notes** - Clinical observations and recommendations

### **Prescription Data**
```typescript
// Sample prescription structure
{
  id: '1',
  medicationName: 'Lisinopril',
  dosage: '10mg',
  frequency: 'Once daily',
  duration: '30 days',
  instructions: 'Take with food',
  prescribedDate: '2024-01-20'
}
```

## 🏢 **Hospital Infrastructure**

### **Room Data (mockRooms)**
- **Room Types** - General, ICU, Private, Emergency, Surgery
- **Status Tracking** - Available, Occupied, Maintenance, Reserved
- **Equipment Lists** - Medical equipment available in each room
- **Capacity Information** - Bed count and patient capacity
- **Pricing** - Daily rates for different room types

### **Staff Data (mockStaff)**
- **Role Definitions** - Nurses, Technicians, Administrators
- **Department Assignments** - Staff allocation across departments
- **Shift Information** - Morning, Evening, Night shifts
- **Contact Information** - Phone and email for staff members

## 💰 **Financial Data**

### **Billing Information (mockBills)**
```typescript
// Sample bill structure
{
  id: '1',
  patientId: '1',
  items: [
    {
      id: '1',
      description: 'Cardiology Consultation',
      quantity: 1,
      unitPrice: 200,
      totalPrice: 200,
      category: 'Consultation'
    }
  ],
  totalAmount: 275,
  paidAmount: 0,
  status: 'Pending',
  dueDate: '2024-02-15',
  createdDate: '2024-01-20',
  insuranceCovered: 220
}
```

### **Inventory Data (mockInventoryItems)**
- **Medical Supplies** - Medications, surgical supplies, equipment
- **Stock Levels** - Current and minimum stock quantities
- **Supplier Information** - Vendor details and contact information
- **Expiry Tracking** - Medication and supply expiration dates
- **Location Tracking** - Storage locations within the hospital

## 🔐 **Authentication Data**

### **User Credentials (mockUsers)**
```typescript
// Demo login credentials
const mockUsers = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator'
  },
  {
    username: 'dr.watson',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Emily Watson',
    doctorId: '1'
  },
  // ... additional users
];
```

### **Patient Registration Codes**
```typescript
// Valid signup codes for patient registration
const validSignupCodes = [
  'HSP2024001', 'HSP2024002', 'HSP2024003',
  'MED2024001', 'MED2024002', 'MED2024003',
  'ADM2024001', 'ADM2024002'
];
```

## 🎯 **Usage Guidelines**

### **Importing Mock Data**
```typescript
// Import specific data sets
import { 
  mockPatients, 
  mockDoctors, 
  mockAppointments,
  mockMedicalRecords,
  mockRooms,
  mockBills
} from '../data/mockData';

// Use in components
const totalPatients = mockPatients.length;
const availableRooms = mockRooms.filter(room => room.status === 'Available');
```

### **Data Relationships**
- **Patients ↔ Appointments** - Linked via `patientId`
- **Doctors ↔ Appointments** - Linked via `doctorId`
- **Patients ↔ Medical Records** - Linked via `patientId`
- **Patients ↔ Bills** - Linked via `patientId`
- **Rooms ↔ Patients** - Linked via `patientId` when occupied

## 🔄 **Data Consistency**

### **Referential Integrity**
- All foreign key relationships are maintained
- Patient IDs exist in patient records before being referenced
- Doctor IDs are valid and correspond to actual doctors
- Room assignments reference existing patients

### **Data Validation**
- Date formats are consistent (ISO 8601)
- Phone numbers follow standard format
- Email addresses are properly formatted
- Medical data follows healthcare standards

## 🚀 **Development Benefits**

### **Realistic Testing Data**
- **Comprehensive Coverage** - All system features have supporting data
- **Edge Cases** - Various scenarios and data combinations
- **Realistic Volumes** - Appropriate data quantities for testing
- **Consistent Quality** - Well-structured, clean data

### **Easy Customization**
- **Modular Structure** - Each data type in separate arrays
- **Clear Formatting** - Easy to read and modify
- **Extensible Design** - Simple to add new records
- **Type Safety** - Full TypeScript support

## 🔮 **Migration to Real Data**

### **API Integration Points**
```typescript
// Replace mock data with API calls
const fetchPatients = async () => {
  // Replace: return mockPatients;
  const response = await fetch('/api/patients');
  return response.json();
};
```

### **Database Schema**
The mock data structure directly maps to database schemas:
- **Patients Table** - Patient demographic and contact information
- **Doctors Table** - Medical staff profiles and availability
- **Appointments Table** - Appointment scheduling and status
- **Medical_Records Table** - Patient medical history
- **Rooms Table** - Hospital room management
- **Bills Table** - Financial and billing information

## 📝 **Data Maintenance**

### **Adding New Records**
1. **Follow Existing Structure** - Maintain consistent data format
2. **Update Relationships** - Ensure foreign keys are valid
3. **Increment IDs** - Use sequential ID numbering
4. **Validate Data** - Check for data consistency

### **Modifying Existing Records**
1. **Preserve Relationships** - Don't break existing links
2. **Update Related Data** - Maintain data consistency
3. **Test Thoroughly** - Verify changes don't break functionality
4. **Document Changes** - Note any structural modifications

## 🧪 **Testing Support**

### **Test Scenarios**
- **User Authentication** - Valid and invalid login attempts
- **Data Filtering** - Search and filter functionality
- **CRUD Operations** - Create, read, update, delete operations
- **Relationship Testing** - Cross-entity data relationships
- **Edge Cases** - Boundary conditions and error scenarios

### **Performance Testing**
- **Large Data Sets** - Test with increased data volumes
- **Search Performance** - Optimize search and filter operations
- **Memory Usage** - Monitor memory consumption with large datasets
- **Rendering Performance** - Test UI performance with extensive data

This mock data provides a solid foundation for development and testing while maintaining the flexibility to easily transition to a real database system when ready for production deployment.