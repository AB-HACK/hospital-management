import { Patient, Doctor, Appointment, Room, Staff, InventoryItem, MedicalRecord, Bill } from '../types';

// Patients data with optimized structure
export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    phone: '+1-555-0123',
    email: 'john.doe@email.com',
    address: '123 Main St, Anytown, ST 12345',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1-555-0124',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    medicalHistory: [],
    insurance: 'HealthCare Plus - HC123456789',
    createdAt: '2024-01-15T10:30:00Z',
    username: 'john.doe',
    password: 'patient123'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1992-07-22',
    gender: 'female',
    phone: '+1-555-0234',
    email: 'sarah.johnson@email.com',
    address: '456 Oak Ave, Somewhere, ST 67890',
    emergencyContact: 'Michael Johnson',
    emergencyPhone: '+1-555-0235',
    bloodType: 'A-',
    allergies: ['Latex'],
    medicalHistory: [],
    insurance: 'MediCare Pro - MP987654321',
    createdAt: '2024-01-20T14:15:00Z',
    username: 'sarah.johnson',
    password: 'patient123'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    phone: '+1-555-0345',
    email: 'michael.brown@email.com',
    address: '789 Pine St, Elsewhere, ST 54321',
    emergencyContact: 'Lisa Brown',
    emergencyPhone: '+1-555-0346',
    bloodType: 'B+',
    allergies: ['Aspirin'],
    medicalHistory: [],
    insurance: 'Health First - HF456789123',
    createdAt: '2023-12-10T09:45:00Z',
    username: 'michael.brown',
    password: 'patient123'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    dateOfBirth: '1995-05-30',
    gender: 'female',
    phone: '+1-555-0456',
    email: 'emily.davis@email.com',
    address: '321 Elm St, Nowhere, ST 98765',
    emergencyContact: 'Robert Davis',
    emergencyPhone: '+1-555-0457',
    bloodType: 'AB-',
    allergies: [],
    medicalHistory: [],
    insurance: 'Universal Health - UH789123456',
    createdAt: '2023-11-25T16:20:00Z',
    username: 'emily.davis',
    password: 'patient123'
  }
];

// Doctors data with optimized structure
export const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'Emily',
    lastName: 'Watson',
    email: 'e.watson@hospital.com',
    phone: '+1-555-1001',
    specialization: 'Cardiology',
    department: 'Cardiology',
    licenseNumber: 'MD123456',
    experience: 12,
    education: ['Harvard Medical School', 'Johns Hopkins Residency'],
    certifications: ['Board Certified Cardiologist', 'Advanced Cardiac Life Support'],
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true },
      { day: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    consultationFee: 200,
    rating: 4.8,
    totalPatients: 150,
    joinDate: '2012-03-15',
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'm.chen@hospital.com',
    phone: '+1-555-1002',
    specialization: 'Orthopedics',
    department: 'Orthopedics',
    licenseNumber: 'MD789012',
    experience: 8,
    education: ['Stanford Medical School', 'Mayo Clinic Fellowship'],
    certifications: ['Board Certified Orthopedic Surgeon', 'Sports Medicine Specialist'],
    availability: [
      { day: 'Monday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '14:00', isAvailable: true },
      { day: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    consultationFee: 180,
    rating: 4.7,
    totalPatients: 120,
    joinDate: '2016-08-20',
    status: 'active'
  },
  {
    id: '3',
    firstName: 'Emanuel',
    lastName: 'Efisung',
    email: 'e.efisung@hospital.com',
    phone: '+1-555-1003',
    specialization: 'Neurology',
    department: 'Neurology',
    licenseNumber: 'MD345678',
    experience: 10,
    education: ['Yale Medical School', 'Cleveland Clinic Residency'],
    certifications: ['Board Certified Neurologist', 'Epilepsy Specialist'],
    availability: [
      { day: 'Monday', startTime: '08:30', endTime: '16:30', isAvailable: true },
      { day: 'Tuesday', startTime: '08:30', endTime: '16:30', isAvailable: true },
      { day: 'Wednesday', startTime: '08:30', endTime: '16:30', isAvailable: true },
      { day: 'Thursday', startTime: '08:30', endTime: '16:30', isAvailable: true },
      { day: 'Friday', startTime: '08:30', endTime: '15:30', isAvailable: true },
      { day: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    consultationFee: 220,
    rating: 4.9,
    totalPatients: 95,
    joinDate: '2014-05-10',
    status: 'active'
  },
  {
    id: '4',
    firstName: 'Ismail',
    lastName: 'Moradeyo',
    email: 'i.moradeyo@hospital.com',
    phone: '+1-555-1004',
    specialization: 'Pediatrics',
    department: 'Pediatrics',
    licenseNumber: 'MD901234',
    experience: 9,
    education: ['UCLA Medical School', 'Children\'s Hospital Fellowship'],
    certifications: ['Board Certified Pediatrician', 'Pediatric Emergency Medicine'],
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '16:00', isAvailable: true },
      { day: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    consultationFee: 190,
    rating: 4.6,
    totalPatients: 200,
    joinDate: '2015-09-01',
    status: 'active'
  },
  {
    id: '5',
    firstName: 'Ridwan',
    lastName: 'Muhamed',
    email: 'r.muhamed@hospital.com',
    phone: '+1-555-1005',
    specialization: 'Dermatology',
    department: 'Dermatology',
    licenseNumber: 'MD567890',
    experience: 6,
    education: ['NYU Medical School', 'Mount Sinai Dermatology Residency'],
    certifications: ['Board Certified Dermatologist', 'Mohs Surgery Specialist'],
    availability: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
      { day: 'Friday', startTime: '10:00', endTime: '17:00', isAvailable: true },
      { day: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
    ],
    consultationFee: 160,
    rating: 4.5,
    totalPatients: 80,
    joinDate: '2018-01-15',
    status: 'active'
  }
];

// Appointments data with optimized structure
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Emily Watson',
    date: '2024-01-25',
    time: '10:00',
    type: 'consultation',
    status: 'scheduled',
    reason: 'Chest pain and shortness of breath',
    duration: 30,
    priority: 'high',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Michael Chen',
    date: '2024-01-25',
    time: '14:30',
    type: 'follow-up',
    status: 'scheduled',
    reason: 'Knee pain follow-up',
    duration: 45,
    priority: 'medium',
    createdAt: '2024-01-22T14:30:00Z'
  },
  {
    id: '3',
    patientId: '1',
    doctorId: '3',
    patientName: 'John Doe',
    doctorName: 'Dr. Emanuel Efisung',
    date: '2024-01-26',
    time: '11:00',
    type: 'consultation',
    status: 'scheduled',
    reason: 'Headaches and dizziness',
    duration: 60,
    priority: 'medium',
    createdAt: '2024-01-23T11:00:00Z'
  },
  {
    id: '4',
    patientId: '2',
    doctorId: '4',
    patientName: 'Sarah Johnson',
    doctorName: 'Dr. Ismail Moradeyo',
    date: '2024-01-26',
    time: '15:00',
    type: 'checkup',
    status: 'scheduled',
    reason: 'Child wellness check',
    duration: 30,
    priority: 'low',
    createdAt: '2024-01-24T15:00:00Z'
  },
  {
    id: '5',
    patientId: '1',
    doctorId: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Emily Watson',
    date: '2024-01-10',
    time: '10:00',
    type: 'consultation',
    status: 'completed',
    reason: 'Regular checkup',
    duration: 30,
    priority: 'low',
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '6',
    patientId: '3',
    doctorId: '2',
    patientName: 'Michael Brown',
    doctorName: 'Dr. Michael Chen',
    date: '2023-12-15',
    time: '14:00',
    type: 'consultation',
    status: 'completed',
    reason: 'Wrist injury',
    duration: 45,
    priority: 'medium',
    createdAt: '2023-12-10T14:00:00Z'
  }
];

// Rooms data with optimized structure
export const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'general',
    status: 'available',
    floor: 1,
    capacity: 2,
    equipment: ['Bed', 'Monitor', 'Oxygen'],
    dailyRate: 150,
    features: ['Private bathroom', 'TV', 'WiFi'],
    lastCleaned: '2024-01-24T08:00:00Z',
    nextMaintenance: '2024-02-01T10:00:00Z'
  },
  {
    id: '2',
    number: '201',
    type: 'icu',
    status: 'occupied',
    floor: 2,
    capacity: 1,
    currentPatient: '1',
    equipment: ['Ventilator', 'Cardiac Monitor', 'Defibrillator'],
    dailyRate: 500,
    features: ['ICU monitoring', '24/7 nursing', 'Emergency equipment'],
    lastCleaned: '2024-01-24T06:00:00Z',
    nextMaintenance: '2024-01-30T14:00:00Z'
  },
  {
    id: '3',
    number: '102',
    type: 'private',
    status: 'available',
    floor: 1,
    capacity: 1,
    equipment: ['Bed', 'TV', 'Private Bathroom', 'Oxygen'],
    dailyRate: 250,
    features: ['Private room', 'Premium amenities', 'Family seating'],
    lastCleaned: '2024-01-24T10:00:00Z',
    nextMaintenance: '2024-02-05T09:00:00Z'
  },
  {
    id: '4',
    number: '301',
    type: 'general',
    status: 'maintenance',
    floor: 3,
    capacity: 2,
    equipment: ['Bed', 'Monitor'],
    dailyRate: 150,
    features: ['Shared bathroom', 'TV', 'WiFi'],
    lastCleaned: '2024-01-23T16:00:00Z',
    nextMaintenance: '2024-01-25T08:00:00Z'
  },
  {
    id: '5',
    number: '202',
    type: 'icu',
    status: 'available',
    floor: 2,
    capacity: 1,
    equipment: ['Ventilator', 'Cardiac Monitor', 'Defibrillator', 'IV Pump'],
    dailyRate: 500,
    features: ['ICU monitoring', '24/7 nursing', 'Emergency equipment'],
    lastCleaned: '2024-01-24T12:00:00Z',
    nextMaintenance: '2024-02-02T11:00:00Z'
  }
];

// Staff data with optimized structure
export const mockStaff: Staff[] = [
  {
    id: '1',
    firstName: 'Lisa',
    lastName: 'Anderson',
    role: 'Doctor',
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

// Inventory items with optimized structure
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

// Medical records with optimized structure
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Emily Watson',
    date: '2024-01-20',
    diagnosis: 'Hypertension',
    symptoms: ['Chest pain', 'Elevated blood pressure'],
    treatment: 'Prescribed medication, lifestyle changes',
    prescriptions: [
      {
        id: '1',
        medication: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with food',
        refills: 2
      }
    ],
    notes: 'Patient advised to monitor blood pressure daily',
    followUpDate: '2024-02-20',
    vitals: {
      bloodPressure: '140/90',
      heartRate: 78,
      temperature: 98.6,
      weight: 180,
      height: 70,
      respiratoryRate: 16,
      oxygenSaturation: 98
    },
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '3',
    patientName: 'John Doe',
    doctorName: 'Dr. Emanuel Efisung',
    date: '2024-01-22',
    diagnosis: 'Migraine',
    symptoms: ['Severe headaches', 'Light sensitivity'],
    treatment: 'Pain management, lifestyle modifications',
    prescriptions: [
      {
        id: '2',
        medication: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed',
        duration: '30 days',
        instructions: 'Take at onset of headache',
        refills: 1
      }
    ],
    notes: 'Recommend stress management techniques',
    followUpDate: '2024-02-22',
    createdAt: '2024-01-22T14:00:00Z'
  }
];

// Bills data with optimized structure
export const mockBills: Bill[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    date: '2024-01-20',
    dueDate: '2024-02-15',
    items: [
      {
        id: '1',
        description: 'Cardiology Consultation',
        quantity: 1,
        unitPrice: 200,
        total: 200,
        category: 'consultation'
      },
      {
        id: '2',
        description: 'ECG Test',
        quantity: 1,
        unitPrice: 75,
        total: 75,
        category: 'lab'
      }
    ],
    subtotal: 275,
    tax: 0,
    discount: 0,
    total: 275,
    amountPaid: 0,
    balance: 275,
    status: 'pending',
    insuranceCoverage: 220,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Sarah Johnson',
    date: '2024-01-18',
    dueDate: '2024-02-10',
    items: [
      {
        id: '3',
        description: 'Pediatric Consultation',
        quantity: 1,
        unitPrice: 190,
        total: 190,
        category: 'consultation'
      },
      {
        id: '4',
        description: 'Vaccination',
        quantity: 2,
        unitPrice: 25,
        total: 50,
        category: 'procedure'
      }
    ],
    subtotal: 240,
    tax: 0,
    discount: 0,
    total: 240,
    amountPaid: 240,
    balance: 0,
    status: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: '2024-01-18T09:00:00Z'
  }
];

// User credentials for authentication
export const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    firstName: 'System',
    lastName: 'Administrator',
    email: 'admin@medicore.com',
    role: 'admin' as const,
    department: 'Administration',
    phone: '+1-555-0001',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    username: 'dr.watson',
    password: 'doctor123',
    firstName: 'Emily',
    lastName: 'Watson',
    email: 'e.watson@hospital.com',
    role: 'doctor' as const,
    department: 'Cardiology',
    specialization: 'Cardiology',
    phone: '+1-555-1001',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    username: 'dr.chen',
    password: 'doctor123',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'm.chen@hospital.com',
    role: 'doctor' as const,
    department: 'Orthopedics',
    specialization: 'Orthopedics',
    phone: '+1-555-1002',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    username: 'dr.efisung',
    password: 'doctor123',
    firstName: 'Emanuel',
    lastName: 'Efisung',
    email: 'e.efisung@hospital.com',
    role: 'doctor' as const,
    department: 'Neurology',
    specialization: 'Neurology',
    phone: '+1-555-1003',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    username: 'dr.moradeyo',
    password: 'doctor123',
    firstName: 'Ismail',
    lastName: 'Moradeyo',
    email: 'i.moradeyo@hospital.com',
    role: 'doctor' as const,
    department: 'Pediatrics',
    specialization: 'Pediatrics',
    phone: '+1-555-1004',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    username: 'dr.muhamed',
    password: 'doctor123',
    firstName: 'Ridwan',
    lastName: 'Muhamed',
    email: 'r.muhamed@hospital.com',
    role: 'doctor' as const,
    department: 'Dermatology',
    specialization: 'Dermatology',
    phone: '+1-555-1005',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Patient users for authentication
export const patients = mockPatients;

// Valid signup codes for patient registration
export const signupCodes = [
  'HSP2024001', 'HSP2024002', 'HSP2024003', 'HSP2024004', 'HSP2024005',
  'MED2024001', 'MED2024002', 'MED2024003', 'ADM2024001', 'ADM2024002'
];

// Export all data for easy access
export const mockData = {
  patients: mockPatients,
  doctors: mockDoctors,
  appointments: mockAppointments,
  rooms: mockRooms,
  staff: mockStaff,
  inventory: mockInventoryItems,
  medicalRecords: mockMedicalRecords,
  bills: mockBills,
  users: mockUsers,
  signupCodes
};

export default mockData;