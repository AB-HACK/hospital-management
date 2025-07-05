# Authentication Components

This directory contains components for user authentication, including login forms for staff and patient registration/login systems.

## 📁 **Components**

### **LoginModal.tsx**
**Purpose:** Staff authentication modal for doctors and administrators

**Features:**
- Username and password authentication
- Role-based login (admin/doctor detection)
- Password visibility toggle
- Loading states during authentication
- Demo credentials display
- Form validation and error handling

**Props:**
```typescript
interface LoginModalProps {
  isOpen: boolean;                    // Controls modal visibility
  onClose: () => void;               // Close modal handler
  onLogin: (credentials: {           // Login success handler
    username: string;
    password: string;
    role: string;
  }) => void;
}
```

**Key Functions:**
- `handleSubmit()` - Validates credentials and determines user role
- `setShowPassword()` - Toggles password visibility
- Mock authentication with predefined credentials

### **PatientAuthModal.tsx**
**Purpose:** Patient authentication with registration and login capabilities

**Features:**
- Dual-mode interface (Login/Signup tabs)
- Hospital registration code validation for new patients
- Comprehensive patient registration form
- Secure password handling with confirmation
- Form validation and error messaging
- Demo credentials and signup codes display

**Props:**
```typescript
interface PatientAuthModalProps {
  isOpen: boolean;                    // Controls modal visibility
  onClose: () => void;               // Close modal handler
  onLogin: (credentials: {           // Login success handler
    username: string;
    password: string;
    type: 'patient';
  }) => void;
}
```

**Key Functions:**
- `handleLogin()` - Patient login authentication
- `handleSignup()` - New patient registration with code validation
- `setIsSignup()` - Switches between login/signup modes
- Signup code validation against hospital-issued codes

## 🎯 **Usage Examples**

### **Staff Login Modal**
```typescript
import { LoginModal } from './components/Auth/LoginModal';

function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleStaffLogin = (credentials: any) => {
    // Handle staff authentication
    if (credentials.role === 'admin') {
      // Redirect to admin dashboard
    } else if (credentials.role === 'doctor') {
      // Redirect to doctor portal
    }
  };
  
  return (
    <div>
      <button onClick={() => setShowLoginModal(true)}>
        Staff Login
      </button>
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleStaffLogin}
      />
    </div>
  );
}
```

### **Patient Authentication Modal**
```typescript
import { PatientAuthModal } from './components/Auth/PatientAuthModal';

function PatientPortalAccess() {
  const [showPatientAuth, setShowPatientAuth] = useState(false);
  
  const handlePatientLogin = (credentials: any) => {
    // Handle patient authentication
    // Redirect to patient portal
  };
  
  return (
    <div>
      <button onClick={() => setShowPatientAuth(true)}>
        Patient Portal
      </button>
      
      <PatientAuthModal
        isOpen={showPatientAuth}
        onClose={() => setShowPatientAuth(false)}
        onLogin={handlePatientLogin}
      />
    </div>
  );
}
```

## 🔐 **Authentication Flow**

### **Staff Authentication**
1. **Username Input** - Staff member enters username
2. **Password Input** - Secure password entry with toggle visibility
3. **Role Detection** - System determines if admin or doctor
4. **Validation** - Credentials checked against mock database
5. **Redirect** - User sent to appropriate dashboard

### **Patient Authentication**
1. **Mode Selection** - Choose between Login or Signup
2. **Login Flow:**
   - Username/email and password entry
   - Credential validation
   - Redirect to patient portal
3. **Signup Flow:**
   - Hospital registration code validation
   - Personal information collection
   - Account creation with password confirmation
   - Automatic login after successful registration

## 📊 **Demo Credentials**

### **Staff Credentials**
```typescript
// Admin Access
username: 'admin'
password: 'admin123'

// Doctor Access
username: 'dr.watson'    // Dr. Emily Watson (Cardiology)
username: 'dr.chen'     // Dr. Michael Chen (Orthopedics)
username: 'dr.efisung'  // Dr. Emanuel Efisung (Neurology)
username: 'dr.moradeyo' // Dr. Ismail Moradeyo (Pediatrics)
username: 'dr.muhamed'  // Dr. Ridwan Muhamed (Dermatology)
password: 'doctor123'   // Same password for all doctors
```

### **Patient Credentials**
```typescript
// Existing Patients
username: 'john.doe'
username: 'sarah.johnson'
username: 'michael.brown'
username: 'emily.davis'
password: 'patient123'  // Same password for all patients
```

### **Registration Codes**
```typescript
// Valid signup codes for new patients
'HSP2024001', 'HSP2024002', 'HSP2024003'
'MED2024001', 'MED2024002', 'MED2024003'
'ADM2024001', 'ADM2024002'
```

## 🎨 **UI/UX Features**

### **Visual Design**
- **Modal Overlay** - Semi-transparent background
- **Smooth Animations** - Scale and fade transitions
- **Responsive Layout** - Works on all screen sizes
- **Accessible Forms** - Proper labels and focus management

### **User Experience**
- **Tab Navigation** - Easy switching between login/signup
- **Password Visibility** - Toggle to show/hide passwords
- **Loading States** - Visual feedback during authentication
- **Error Messages** - Clear, actionable error descriptions
- **Demo Helpers** - Visible demo credentials for testing

### **Form Validation**
- **Required Fields** - All necessary fields marked and validated
- **Email Validation** - Proper email format checking
- **Password Strength** - Minimum length requirements
- **Code Validation** - Hospital registration code verification
- **Real-time Feedback** - Immediate validation responses

## 🔧 **State Management**

### **LoginModal State**
```typescript
const [credentials, setCredentials] = useState({
  username: '',
  password: ''
});
const [showPassword, setShowPassword] = useState(false);
const [isLoading, setIsLoading] = useState(false);
```

### **PatientAuthModal State**
```typescript
const [isSignup, setIsSignup] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

// Login data
const [loginData, setLoginData] = useState({
  username: '',
  password: ''
});

// Signup data
const [signupData, setSignupData] = useState({
  signupCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  username: '',
  password: '',
  confirmPassword: ''
});
```

## 🔒 **Security Features**

### **Input Sanitization**
- All form inputs are validated and sanitized
- XSS prevention through proper escaping
- SQL injection prevention (when connected to real database)

### **Password Security**
- Password visibility toggle for user convenience
- Password confirmation for new registrations
- Minimum password length requirements
- Secure password storage (hashed in production)

### **Registration Code System**
- Hospital-issued codes prevent unauthorized registrations
- Codes can be single-use or multi-use (configurable)
- Admin-generated codes for controlled access
- Code expiration capability (future enhancement)

## 🔄 **Integration Points**

### **User Management**
- Links to user profiles and dashboards
- Role-based access control throughout application
- Session management and logout functionality

### **Data Flow**
1. **Authentication** → **User State Update**
2. **Role Detection** → **Dashboard Routing**
3. **Patient Registration** → **Patient Database**
4. **Session Creation** → **Persistent Login**

## 📱 **Mobile Optimization**

### **Responsive Design**
- Touch-friendly form inputs
- Optimized keyboard types (email, tel, etc.)
- Proper viewport handling
- Accessible tap targets

### **Mobile-Specific Features**
- Auto-focus on first input
- Smooth scrolling for long forms
- Optimized modal sizing
- Touch gesture support

## 🧪 **Testing Scenarios**

### **Authentication Tests**
1. **Valid Login** - Correct credentials
2. **Invalid Login** - Wrong username/password
3. **Role Detection** - Admin vs Doctor vs Patient
4. **Registration Flow** - New patient signup
5. **Code Validation** - Valid/invalid registration codes
6. **Form Validation** - Required fields and formats

### **Edge Cases**
- Empty form submissions
- Invalid email formats
- Password mismatch in registration
- Expired or used registration codes
- Network errors during authentication
- Modal behavior on different screen sizes

## 🚀 **Future Enhancements**

### **Security Improvements**
- Two-factor authentication (2FA)
- Password strength meter
- Account lockout after failed attempts
- Password reset functionality

### **User Experience**
- Social login options (Google, Apple)
- Biometric authentication (fingerprint, face)
- Remember me functionality
- Auto-logout for security

### **Administrative Features**
- Registration code management
- User activity monitoring
- Bulk user creation
- Advanced role permissions