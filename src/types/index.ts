export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  email?: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  bloodGroup: string;
  allergies: string[];
  medicalHistory: MedicalRecord[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Discharged';
  patientNumber: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
  department: string;
  yearsOfExperience: number;
  availability: {
    [key: string]: { start: string; end: string; }[];
  };
  status: 'Available' | 'On Leave' | 'Busy';
  consultationFee: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: string;
  duration: number;
  type: 'Consultation' | 'Follow-up' | 'Emergency' | 'Surgery';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
  notes?: string;
  symptoms?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  prescriptions: Prescription[];
  labResults?: LabResult[];
  notes: string;
  followUpDate?: string;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedDate: string;
}

export interface LabResult {
  id: string;
  testName: string;
  result: string;
  normalRange: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
  testDate: string;
  comments?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: 'General' | 'ICU' | 'Private' | 'Emergency' | 'Surgery';
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  patientId?: string;
  floor: number;
  capacity: number;
  equipment: string[];
  dailyRate: number;
}

export interface Bill {
  id: string;
  patientId: string;
  items: BillItem[];
  totalAmount: number;
  paidAmount: number;
  status: 'Pending' | 'Partially Paid' | 'Paid' | 'Overdue';
  dueDate: string;
  createdDate: string;
  paymentMethod?: string;
  insuranceCovered?: number;
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: 'Consultation' | 'Procedure' | 'Medication' | 'Room' | 'Test' | 'Other';
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: 'Doctor' | 'Nurse' | 'Technician' | 'Administrator' | 'Receptionist' | 'Pharmacist';
  department: string;
  phoneNumber: string;
  email: string;
  shift: 'Morning' | 'Evening' | 'Night';
  status: 'Active' | 'On Leave' | 'Inactive';
  hireDate: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Medication' | 'Equipment' | 'Supplies' | 'Consumables';
  currentStock: number;
  minimumStock: number;
  unitPrice: number;
  supplier: string;
  expiryDate?: string;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired';
}