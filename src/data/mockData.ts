import { Patient, Doctor, Appointment, Room, Staff, InventoryItem, MedicalRecord, Bill } from '../types';

export const mockPatients: Patient[] = [
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
    status: 'Active'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1992-07-22',
    gender: 'Female',
    phoneNumber: '+1-555-0234',
    email: 'sarah.johnson@email.com',
    address: '456 Oak Ave, Somewhere, ST 67890',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Brother',
      phoneNumber: '+1-555-0235'
    },
    bloodGroup: 'A-',
    allergies: ['Latex'],
    medicalHistory: [],
    createdAt: '2024-01-20T14:15:00Z',
    status: 'Active'
  }
];

export const mockDoctors: Doctor[] = [
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
      'Wednesday': [{ start: '09:00', end: '17:00' }],
      'Thursday': [{ start: '09:00', end: '17:00' }],
      'Friday': [{ start: '09:00', end: '15:00' }]
    },
    status: 'Available',
    consultationFee: 200
  },
  {
    id: '2',
    firstName: 'Dr. Michael',
    lastName: 'Chen',
    specialization: 'Orthopedics',
    phoneNumber: '+1-555-1002',
    email: 'm.chen@hospital.com',
    licenseNumber: 'MD789012',
    department: 'Orthopedics',
    yearsOfExperience: 8,
    availability: {
      'Monday': [{ start: '08:00', end: '16:00' }],
      'Tuesday': [{ start: '08:00', end: '16:00' }],
      'Wednesday': [{ start: '08:00', end: '16:00' }],
      'Thursday': [{ start: '08:00', end: '16:00' }],
      'Friday': [{ start: '08:00', end: '14:00' }]
    },
    status: 'Available',
    consultationFee: 180
  }
];

export const mockAppointments: Appointment[] = [
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
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    dateTime: '2024-01-25T14:30:00Z',
    duration: 45,
    type: 'Follow-up',
    status: 'Scheduled',
    symptoms: 'Knee pain follow-up',
    priority: 'Medium'
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    roomNumber: '101',
    type: 'General',
    status: 'Available',
    floor: 1,
    capacity: 2,
    equipment: ['Bed', 'Monitor', 'Oxygen'],
    dailyRate: 150
  },
  {
    id: '2',
    roomNumber: '201',
    type: 'ICU',
    status: 'Occupied',
    patientId: '1',
    floor: 2,
    capacity: 1,
    equipment: ['Ventilator', 'Cardiac Monitor', 'Defibrillator'],
    dailyRate: 500
  }
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    firstName: 'Lisa',
    lastName: 'Anderson',
    role: 'Nurse',
    department: 'Emergency',
    phoneNumber: '+1-555-2001',
    email: 'l.anderson@hospital.com',
    shift: 'Morning',
    status: 'Active',
    hireDate: '2020-03-15'
  },
  {
    id: '2',
    firstName: 'Robert',
    lastName: 'Martinez',
    role: 'Technician',
    department: 'Radiology',
    phoneNumber: '+1-555-2002',
    email: 'r.martinez@hospital.com',
    shift: 'Evening',
    status: 'Active',
    hireDate: '2021-08-20'
  }
];

export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Medication',
    currentStock: 250,
    minimumStock: 100,
    unitPrice: 0.50,
    supplier: 'PharmaCorp',
    expiryDate: '2025-12-31',
    location: 'Pharmacy A-1',
    status: 'In Stock'
  },
  {
    id: '2',
    name: 'Surgical Gloves',
    category: 'Supplies',
    currentStock: 25,
    minimumStock: 50,
    unitPrice: 12.99,
    supplier: 'MedSupply Co',
    location: 'Storage Room B',
    status: 'Low Stock'
  }
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-20T10:00:00Z',
    diagnosis: 'Hypertension',
    symptoms: 'Chest pain, elevated blood pressure',
    treatment: 'Prescribed medication, lifestyle changes',
    prescriptions: [
      {
        id: '1',
        medicationName: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with food',
        prescribedDate: '2024-01-20'
      }
    ],
    notes: 'Patient advised to monitor blood pressure daily',
    followUpDate: '2024-02-20'
  }
];

export const mockBills: Bill[] = [
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
      },
      {
        id: '2',
        description: 'ECG Test',
        quantity: 1,
        unitPrice: 75,
        totalPrice: 75,
        category: 'Test'
      }
    ],
    totalAmount: 275,
    paidAmount: 0,
    status: 'Pending',
    dueDate: '2024-02-15',
    createdDate: '2024-01-20',
    insuranceCovered: 220
  }
];