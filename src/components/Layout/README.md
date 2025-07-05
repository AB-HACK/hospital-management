# Layout Components

This directory contains shared layout components that provide consistent structure and navigation throughout the hospital management system.

## 📁 **Components**

### **Header.tsx**
**Purpose:** Top navigation bar for authenticated users with search functionality and user profile

**Features:**
- Dynamic page title display
- Current date and time information
- Global search functionality (patients, doctors)
- Notification bell with indicator
- User profile dropdown with role display
- Responsive design for mobile and desktop

**Props:**
```typescript
interface HeaderProps {
  title: string;                     // Current page/section title
}
```

**Key Functions:**
- Displays contextual page information
- Provides global search across the system
- Shows user authentication status
- Responsive layout adaptation

### **Sidebar.tsx**
**Purpose:** Main navigation sidebar for the hospital management system

**Features:**
- Hierarchical navigation menu
- Active section highlighting
- User profile display with logout
- Mobile hamburger menu
- Role-based menu item visibility
- Smooth animations and transitions

**Props:**
```typescript
interface SidebarProps {
  activeSection: string;             // Currently active menu section
  onSectionChange: (section: string) => void; // Navigation handler
  user?: {                          // Current user information
    username: string;
    role: 'admin' | 'doctor';
  };
  onLogout?: () => void;            // Logout handler
}
```

**Key Functions:**
- `handleMenuItemClick()` - Navigates between sections
- `toggleMobileMenu()` - Mobile menu visibility control
- Active section highlighting and state management

## 🎯 **Usage Examples**

### **Basic Layout Structure**
```typescript
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const user = { username: 'admin', role: 'admin' };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### **Mobile-Responsive Layout**
```typescript
function ResponsiveLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with mobile overlay */}
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={handleLogout}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <Header title={sectionTitles[activeSection]} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
```

## 🧭 **Navigation Structure**

### **Menu Items Configuration**
```typescript
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'doctors', label: 'Doctors', icon: UserCheck },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'medical-records', label: 'Medical Records', icon: FileText },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'rooms', label: 'Room Management', icon: Bed },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'staff', label: 'Staff Management', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];
```

### **Section Title Mapping**
```typescript
const sectionTitles = {
  dashboard: 'Dashboard',
  patients: 'Patient Management',
  doctors: 'Doctor Management',
  appointments: 'Appointments',
  'medical-records': 'Medical Records',
  billing: 'Billing & Payments',
  rooms: 'Room Management',
  inventory: 'Inventory Management',
  staff: 'Staff Management',
  settings: 'Settings',
};
```

## 🎨 **Visual Design**

### **Header Design**
- **Background:** Clean white with subtle shadow
- **Typography:** Large title with date subtitle
- **Search Bar:** Prominent search functionality
- **User Area:** Profile info with notification bell
- **Responsive:** Adapts to mobile screens

### **Sidebar Design**
- **Background:** White with soft shadow
- **Logo Area:** Hospital branding with user role
- **Navigation:** Icon + text menu items
- **Active State:** Blue highlight with border accent
- **User Profile:** Bottom-positioned with logout

### **Color Scheme**
- **Active Item:** Blue background (`bg-blue-50`) with blue text
- **Hover State:** Gray background (`hover:bg-gray-50`)
- **Icons:** Gray default, blue when active
- **Text:** Dark gray with blue accents

## 📱 **Mobile Experience**

### **Mobile Sidebar**
- **Hidden by Default:** Off-screen on mobile
- **Hamburger Menu:** Top-left toggle button
- **Overlay:** Semi-transparent background
- **Slide Animation:** Smooth in/out transitions
- **Touch Gestures:** Swipe to close functionality

### **Mobile Header**
- **Compact Layout:** Reduced padding and spacing
- **Hidden Search:** Search hidden on small screens
- **Responsive Text:** Smaller font sizes
- **Touch Targets:** Larger tap areas

### **Responsive Breakpoints**
```typescript
// Mobile menu button (visible on mobile only)
<button className="lg:hidden fixed top-4 left-4 z-50">

// Sidebar positioning
<div className={`
  fixed lg:static inset-y-0 left-0 z-40 w-64
  ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
`}>

// Main content margin
<div className="flex-1 flex flex-col min-w-0 lg:ml-0">
```

## 🔧 **State Management**

### **Sidebar State**
```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};

const handleMenuItemClick = (itemId: string) => {
  onSectionChange(itemId);
  setIsMobileMenuOpen(false); // Close mobile menu after selection
};
```

### **Header State**
```typescript
// Date display with real-time updates
const currentDate = new Date().toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});
```

## 🔍 **Search Functionality**

### **Global Search Features**
- **Multi-Entity Search:** Patients, doctors, appointments
- **Real-Time Results:** Instant search as you type
- **Keyboard Shortcuts:** Quick access with hotkeys
- **Search History:** Recent searches saved
- **Advanced Filters:** Date ranges, categories

### **Search Implementation**
```typescript
// Search input with icon
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
  <input
    type="text"
    placeholder="Search patients, doctors..."
    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
  />
</div>
```

## 🔔 **Notification System**

### **Notification Bell**
- **Visual Indicator:** Red dot for unread notifications
- **Click Handler:** Opens notification dropdown
- **Badge Count:** Number of unread notifications
- **Real-Time Updates:** Live notification updates

### **Notification Types**
- **Appointments:** New bookings, cancellations
- **Patients:** New registrations, updates
- **System:** Maintenance, updates
- **Emergency:** Critical alerts

## 👤 **User Profile Area**

### **Profile Information Display**
```typescript
<div className="flex items-center space-x-3">
  <div className="text-right">
    <p className="text-sm font-medium text-gray-900">{user.username}</p>
    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
  </div>
  <div className="bg-primary-600 p-2 rounded-full">
    <User className="h-4 w-4 text-white" />
  </div>
</div>
```

### **Logout Functionality**
- **Secure Logout:** Clears user session
- **Confirmation:** Optional logout confirmation
- **Redirect:** Returns to landing page
- **State Cleanup:** Clears all user data

## 🔒 **Security Features**

### **Role-Based Navigation**
- **Admin Access:** Full navigation menu
- **Doctor Access:** Limited menu items
- **Staff Access:** Role-specific sections
- **Patient Access:** Separate portal interface

### **Session Management**
- **Auto-Logout:** Inactive session timeout
- **Session Validation:** Continuous authentication check
- **Secure Storage:** Encrypted session data
- **Cross-Tab Sync:** Consistent login state

## 🚀 **Performance Optimization**

### **Efficient Rendering**
- **Conditional Rendering:** Only show relevant menu items
- **Memoization:** Prevent unnecessary re-renders
- **Lazy Loading:** Load sections on demand
- **Optimized Icons:** Efficient icon loading

### **Animation Performance**
- **CSS Transforms:** Hardware-accelerated animations
- **Smooth Transitions:** 60fps animations
- **Reduced Motion:** Respect user preferences
- **Optimized Reflows:** Minimal layout thrashing

## 🧪 **Testing Scenarios**

### **Navigation Tests**
1. **Menu Navigation:** All menu items work correctly
2. **Active State:** Proper highlighting of current section
3. **Mobile Menu:** Toggle functionality works
4. **Search:** Global search returns relevant results
5. **Logout:** Secure logout and redirect

### **Responsive Tests**
1. **Mobile Layout:** Proper mobile menu behavior
2. **Tablet View:** Appropriate layout adaptation
3. **Desktop:** Full-featured layout display
4. **Touch Interaction:** Mobile-friendly interactions
5. **Keyboard Navigation:** Accessibility compliance

## 🔮 **Future Enhancements**

### **Advanced Features**
- **Breadcrumb Navigation:** Hierarchical navigation
- **Quick Actions:** Keyboard shortcuts
- **Customizable Layout:** User preferences
- **Theme Switching:** Dark/light mode toggle

### **User Experience**
- **Smart Search:** AI-powered search suggestions
- **Contextual Help:** In-app guidance
- **Personalization:** Customized navigation
- **Accessibility:** Enhanced screen reader support