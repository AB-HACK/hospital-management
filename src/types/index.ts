// User and Authentication Types
export interface User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  department?: string;
  specialization?: string;
  phone?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'staff';

// Patient Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: string[];
  insurance: string;
  createdAt: string;
  username?: string;
  password?: string;
  appointments?: Appointment[];
  medicalRecords?: MedicalRecord[];
  bills?: Bill[];
}

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  duration: number; // in minutes
  room?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
}

export type AppointmentType = 'consultation' | 'follow-up' | 'surgery' | 'emergency' | 'checkup';
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

// Medical Record Types
export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescriptions: Prescription[];
  notes: string;
  followUpDate?: string;
  attachments?: string[];
  vitals?: VitalSigns;
  createdAt: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  refills: number;
}

export interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  respiratoryRate: number;
  oxygenSaturation: number;
}

// Doctor Types
export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  licenseNumber: string;
  experience: number; // years
  education: string[];
  certifications: string[];
  availability: DoctorAvailability[];
  consultationFee: number;
  rating: number;
  totalPatients: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  profileImage?: string;
}

export interface DoctorAvailability {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Room Types
export interface Room {
  id: string;
  number: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  capacity: number;
  currentPatient?: string;
  assignedDoctor?: string;
  equipment: string[];
  dailyRate: number;
  features: string[];
  lastCleaned: string;
  nextMaintenance: string;
}

export type RoomType = 'general' | 'private' | 'icu' | 'emergency' | 'surgery' | 'maternity' | 'pediatric';
export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'reserved';

// Billing Types
export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  balance: number;
  status: BillStatus;
  paymentMethod?: string;
  insuranceCoverage?: number;
  notes?: string;
  createdAt: string;
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'consultation' | 'procedure' | 'medication' | 'room' | 'lab' | 'other';
}

export type BillStatus = 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded';

// Dashboard Statistics Types
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  revenue: number;
  pendingBills: number;
}

// Form Types
export interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: AppointmentType;
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: string[];
  insurance: string;
}

export interface DoctorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  licenseNumber: string;
  experience: number;
  education: string[];
  certifications: string[];
  consultationFee: number;
}

// Search and Filter Types
export interface SearchFilters {
  query: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: string;
  type?: string;
  department?: string;
  priority?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  icon: any; // Lucide icon component
  path: string;
  roles: UserRole[];
}