# MediCore Hospital Management System

A comprehensive hospital management system built with React, TypeScript, and Tailwind CSS. This system provides different interfaces for administrators, doctors, and patients with role-based access control.

## 🏥 **System Overview**

MediCore is a full-featured hospital management system that handles:
- **Patient Management** - Registration, records, appointments
- **Doctor Management** - Schedules, consultations, patient assignments
- **Appointment Scheduling** - Booking, tracking, status management
- **Medical Records** - Patient history, prescriptions, treatments
- **Room Management** - Availability, assignments, maintenance
- **Billing System** - Invoice generation, payment tracking
- **User Authentication** - Role-based access (Admin, Doctor, Patient)

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd hospital-management-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## 👥 **User Roles & Access**

### 🔐 **Demo Credentials**

#### Admin Access
- **Username:** `admin`
- **Password:** `admin123`
- **Access:** Full system management

#### Doctor Access
- **Username:** `dr.watson` | **Password:** `doctor123`
- **Username:** `dr.chen` | **Password:** `doctor123`
- **Username:** `dr.efisung` | **Password:** `doctor123`
- **Username:** `dr.moradeyo` | **Password:** `doctor123`
- **Username:** `dr.muhamed` | **Password:** `doctor123`

#### Patient Access
- **Username:** `john.doe` | **Password:** `patient123`
- **Username:** `sarah.johnson` | **Password:** `patient123`
- **Username:** `michael.brown` | **Password:** `patient123`
- **Username:** `emily.davis` | **Password:** `patient123`

#### Patient Registration Codes
New patients can register using these codes:
- `HSP2024001`, `HSP2024002`, `HSP2024003`
- `MED2024001`, `MED2024002`, `MED2024003`
- `ADM2024001`, `ADM2024002`

## 🏗️ **Project Structure**

```
src/
├── components/          # React components organized by feature
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 **Design System**

### Color Palette
- **Primary:** Blue shades (#2563eb)
- **Medical:** Teal shades (#14b8a6)
- **Warning:** Orange shades (#f97316)
- **Danger:** Red shades (#ef4444)
- **Background:** Gray shades

### Typography
- **Font Family:** Inter
- **Responsive:** Mobile-first approach
- **Accessibility:** WCAG compliant contrast ratios

## 🔧 **Technology Stack**

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Build Tool:** Vite
- **Linting:** ESLint

## 📱 **Features**

### Admin Dashboard
- Complete system overview
- User management (patients, doctors, staff)
- Appointment scheduling and management
- Room and resource allocation
- Billing and financial reports
- System settings and configuration

### Doctor Portal
- Personal dashboard with assigned patients
- Appointment management
- Medical record creation and updates
- Prescription management
- Patient consultation tools

### Patient Portal
- Personal health dashboard
- Appointment booking and history
- Medical records access
- Prescription tracking
- Billing and payment information
- Secure messaging with healthcare providers

## 🔒 **Security Features**

- Role-based authentication
- Secure patient registration with hospital codes
- Protected routes based on user roles
- Data validation and sanitization
- Session management

## 📊 **Data Management**

Currently uses mock data for demonstration. The system is designed to easily integrate with:
- REST APIs
- GraphQL endpoints
- Database systems (PostgreSQL, MySQL, MongoDB)
- Cloud storage solutions

## 🎯 **Development Guidelines**

### Code Organization
- Components are organized by feature/domain
- Shared utilities in common directories
- TypeScript for type safety
- Consistent naming conventions

### Styling Guidelines
- Tailwind CSS utility classes
- Responsive design patterns
- Consistent spacing system (8px grid)
- Accessible color contrasts

### Component Structure
- Functional components with hooks
- Props interfaces defined
- Error boundaries where needed
- Loading states handled

## 🚀 **Deployment**

The application can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Docker containers
- Traditional web servers

## 📝 **Contributing**

1. Follow the existing code structure
2. Use TypeScript for all new components
3. Maintain responsive design principles
4. Add proper error handling
5. Update documentation for new features

## 📞 **Support**

For technical support or questions about the system:
- Check the component README files
- Review the type definitions in `/src/types/`
- Examine the mock data structure in `/src/data/`

## 🔄 **Future Enhancements**

- Real-time notifications
- Advanced reporting and analytics
- Integration with medical devices
- Telemedicine capabilities
- Mobile application
- API documentation
- Automated testing suite