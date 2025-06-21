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
    status: 'Active',
    patientNumber: 'PT001'
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
    status: 'Active',
    patientNumber: 'PT002'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    dateOfBirth: '1978-11-08',
    gender: 'Male',
    phoneNumber: '+1-555-0345',
    email: 'michael.brown@email.com',
    address: '789 Pine St, Elsewhere, ST 54321',
    emergencyContact: {
      name: 'Lisa Brown',
      relationship: 'Wife',
      phoneNumber: '+1-555-0346'
    },
    bloodGroup: 'B+',
    allergies: ['Aspirin'],
    medicalHistory: [],
    createdAt: '2023-12-10T09:45:00Z',
    status: 'Active',
    patientNumber: 'PT003'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    dateOfBirth: '1995-05-30',
    gender: 'Female',
    phoneNumber: '+1-555-0456',
    email: 'emily.davis@email.com',
    address: '321 Elm St, Nowhere, ST 98765',
    emergencyContact: {
      name: 'Robert Davis',
      relationship: 'Father',
      phoneNumber: '+1-555-0457'
    },
    bloodGroup: 'AB-',
    allergies: [],
    medicalHistory: [],
    createdAt: '2023-11-25T16:20:00Z',
    status: 'Active',
    patientNumber: 'PT004'
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
      'Friday': [{ start: '09:00', end: '15:00' }],
      'Saturday': [],
      'Sunday': []
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
      'Friday': [{ start: '08:00', end: '14:00' }],
      'Saturday': [],
      'Sunday': []
    },
    status: 'Available',
    consultationFee: 180
  },
  {
    id: '3',
    firstName: 'Dr. Emanuel',
    lastName: 'Efisung',
    specialization: 'Neurology',
    phoneNumber: '+1-555-1003',
    email: 'e.efisung@hospital.com',
    licenseNumber: 'MD345678',
    department: 'Neurology',
    yearsOfExperience: 10,
    availability: {
      'Monday': [{ start: '08:30', end: '16:30' }],
      'Tuesday': [{ start: '08:30', end: '16:30' }],
      'Wednesday': [{ start: '08:30', end: '16:30' }],
      'Thursday': [{ start: '08:30', end: '16:30' }],
      'Friday': [{ start: '08:30', end: '15:30' }],
      'Saturday': [],
      'Sunday': []
    },
    status: 'Available',
    consultationFee: 220
  },
  {
    id: '4',
    firstName: 'Dr. Ismail',
    lastName: 'Moradeyo',
    specialization: 'Pediatrics',
    phoneNumber: '+1-555-1004',
    email: 'i.moradeyo@hospital.com',
    licenseNumber: 'MD901234',
    department: 'Pediatrics',
    yearsOfExperience: 9,
    availability: {
      'Monday': [{ start: '09:00', end: '17:00' }],
      'Tuesday': [{ start: '09:00', end: '17:00' }],
      'Wednesday': [{ start: '09:00', end: '17:00' }],
      'Thursday': [{ start: '09:00', end: '17:00' }],
      'Friday': [{ start: '09:00', end: '16:00' }],
      'Saturday': [],
      'Sunday': []
    },
    status: 'Available',
    consultationFee: 190
  },
  {
    id: '5',
    firstName: 'Dr. Ridwan',
    lastName: 'Muhamed',
    specialization: 'Dermatology',
    phoneNumber: '+1-555-1005',
    email: 'r.muhamed@hospital.com',
    licenseNumber: 'MD567890',
    department: 'Dermatology',
    yearsOfExperience: 6,
    availability: {
      'Monday': [{ start: '10:00', end: '18:00' }],
      'Tuesday': [{ start: '10:00', end: '18:00' }],
      'Wednesday': [{ start: '10:00', end: '18:00' }],
      'Thursday': [{ start: '10:00', end: '18:00' }],
      'Friday': [{ start: '10:00', end: '17:00' }],
      'Saturday': [],
      'Sunday': []
    },
    status: 'Available',
    consultationFee: 160
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
  },
  {
    id: '3',
    patientId: '1',
    doctorId: '3',
    dateTime: '2024-01-26T11:00:00Z',
    duration: 60,
    type: 'Consultation',
    status: 'Scheduled',
    symptoms: 'Headaches and dizziness',
    priority: 'Medium'
  },
  {
    id: '4',
    patientId: '2',
    doctorId: '4',
    dateTime: '2024-01-26T15:00:00Z',
    duration: 30,
    type: 'Consultation',
    status: 'Scheduled',
    symptoms: 'Child wellness check',
    priority: 'Low'
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
  },
  {
    id: '3',
    roomNumber: '102',
    type: 'Private',
    status: 'Available',
    floor: 1,
    capacity: 1,
    equipment: ['Bed', 'TV', 'Private Bathroom', 'Oxygen'],
    dailyRate: 250
  },
  {
    id: '4',
    roomNumber: '301',
    type: 'General',
    status: 'Maintenance',
    floor: 3,
    capacity: 2,
    equipment: ['Bed', 'Monitor'],
    dailyRate: 150
  },
  {
    id: '5',
    roomNumber: '202',
    type: 'ICU',
    status: 'Available',
    floor: 2,
    capacity: 1,
    equipment: ['Ventilator', 'Cardiac Monitor', 'Defibrillator', 'IV Pump'],
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
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '3',
    date: '2024-01-22T14:00:00Z',
    diagnosis: 'Migraine',
    symptoms: 'Severe headaches, light sensitivity',
    treatment: 'Pain management, lifestyle modifications',
    prescriptions: [
      {
        id: '2',
        medicationName: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed',
        duration: '30 days',
        instructions: 'Take at onset of headache',
        prescribedDate: '2024-01-22'
      }
    ],
    notes: 'Recommend stress management techniques',
    followUpDate: '2024-02-22'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '2',
    date: '2023-12-15T09:30:00Z',
    diagnosis: 'Fractured Wrist',
    symptoms: 'Pain and swelling in left wrist after fall',
    treatment: 'Cast application, pain medication',
    prescriptions: [
      {
        id: '3',
        medicationName: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'Three times daily',
        duration: '14 days',
        instructions: 'Take with food to avoid stomach upset',
        prescribedDate: '2023-12-15'
      }
    ],
    notes: 'Patient should return in 6 weeks for cast removal',
    followUpDate: '2024-01-26'
  },
  {
    id: '4',
    patientId: '4',
    doctorId: '4',
    date: '2023-11-30T11:15:00Z',
    diagnosis: 'Routine Checkup',
    symptoms: 'No specific symptoms, routine health screening',
    treatment: 'Preventive care counseling, vaccinations updated',
    prescriptions: [],
    notes: 'Patient in good health, continue current lifestyle',
    followUpDate: '2024-11-30'
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
  },
  {
    id: '2',
    patientId: '2',
    items: [
      {
        id: '3',
        description: 'Pediatric Consultation',
        quantity: 1,
        unitPrice: 190,
        totalPrice: 190,
        category: 'Consultation'
      },
      {
        id: '4',
        description: 'Vaccination',
        quantity: 2,
        unitPrice: 25,
        totalPrice: 50,
        category: 'Procedure'
      }
    ],
    totalAmount: 240,
    paidAmount: 240,
    status: 'Paid',
    dueDate: '2024-02-10',
    createdDate: '2024-01-18',
    paymentMethod: 'Credit Card'
  }
];

// Mock user credentials for authentication
export const mockUsers = [
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
  {
    username: 'dr.chen',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Michael Chen',
    doctorId: '2'
  },
  {
    username: 'dr.efisung',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Emanuel Efisung',
    doctorId: '3'
  },
  {
    username: 'dr.moradeyo',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Ismail Moradeyo',
    doctorId: '4'
  },
  {
    username: 'dr.muhamed',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Ridwan Muhamed',
    doctorId: '5'
  }
];