# Components Directory

This directory contains all React components organized by feature domains. Each subdirectory represents a specific area of the hospital management system.

## 📁 **Directory Structure**

```
components/
├── Appointments/        # Appointment scheduling and management
├── Auth/               # Authentication and login components
├── Dashboard/          # Admin dashboard components
├── Doctors/            # Doctor management and doctor portal
├── Landing/            # Landing page sections
├── Layout/             # Shared layout components (Header, Sidebar)
├── MedicalRecords/     # Medical records management
├── Patients/           # Patient management and patient portal
└── Rooms/              # Room management and allocation
```

## 🧩 **Component Organization**

### **Feature-Based Structure**
Each directory contains components related to a specific feature:
- **Main Component:** Primary component for the feature
- **Modal Components:** Popup dialogs and forms
- **Sub-components:** Supporting components and utilities

### **Naming Convention**
- **Components:** PascalCase (e.g., `PatientsList.tsx`)
- **Props Interfaces:** ComponentNameProps
- **Event Handlers:** handle + Action (e.g., `handleSubmit`)

## 🎯 **Component Types**

### **Page Components**
Full-page components that represent main views:
- `Dashboard.tsx` - Admin dashboard
- `PatientsList.tsx` - Patient management page
- `DoctorsList.tsx` - Doctor management page

### **Modal Components**
Popup dialogs for forms and detailed views:
- `AddPatientModal.tsx` - Patient registration form
- `BookAppointmentModal.tsx` - Appointment booking
- `LoginModal.tsx` - Authentication forms

### **Layout Components**
Shared UI structure components:
- `Header.tsx` - Top navigation bar
- `Sidebar.tsx` - Side navigation menu
- `StatsCard.tsx` - Reusable statistics display

### **Section Components**
Landing page sections:
- `HeroSection.tsx` - Main hero area
- `ServicesSection.tsx` - Services showcase
- `AboutSection.tsx` - About information

## 🔧 **Component Patterns**

### **Props Interface Pattern**
```typescript
interface ComponentProps {
  // Required props
  title: string;
  data: DataType[];
  
  // Optional props with defaults
  isLoading?: boolean;
  
  // Event handlers
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}
```

### **State Management Pattern**
```typescript
const [formData, setFormData] = useState<FormType>(initialState);
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState<string[]>([]);
```

### **Event Handler Pattern**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    await onSubmit(formData);
    onSuccess();
  } catch (error) {
    setErrors([error.message]);
  } finally {
    setIsLoading(false);
  }
};
```

## 📱 **Responsive Design**

### **Mobile-First Approach**
All components are designed mobile-first with progressive enhancement:

```typescript
// Mobile layout (default)
<div className="p-4 space-y-4">
  
// Tablet layout (sm: breakpoint)
<div className="sm:p-6 sm:space-y-6">
  
// Desktop layout (lg: breakpoint)
<div className="lg:p-8 lg:space-y-8">
```

### **Responsive Patterns**
- **Grid Layouts:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Flex Layouts:** `flex-col sm:flex-row`
- **Spacing:** `space-y-4 lg:space-y-6`
- **Text Sizes:** `text-sm lg:text-base`

## 🎨 **Styling Guidelines**

### **Tailwind CSS Classes**
- **Layout:** `flex`, `grid`, `space-y-*`, `gap-*`
- **Spacing:** `p-*`, `m-*`, `px-*`, `py-*`
- **Colors:** Custom color palette (primary, medical, warning, danger)
- **Typography:** `text-*`, `font-*`, `leading-*`

### **Component States**
- **Hover:** `hover:bg-gray-100`, `hover:text-blue-600`
- **Focus:** `focus:outline-none`, `focus:ring-2`
- **Active:** `active:bg-gray-200`
- **Disabled:** `disabled:opacity-50`, `disabled:cursor-not-allowed`

## 🔄 **Data Flow**

### **Parent to Child (Props)**
```typescript
<ChildComponent 
  data={parentData}
  isLoading={loading}
  onAction={handleAction}
/>
```

### **Child to Parent (Events)**
```typescript
// In child component
const handleClick = () => {
  onAction(childData);
};

// In parent component
const handleChildAction = (data: DataType) => {
  setParentState(data);
};
```

## 🔒 **Security Considerations**

### **Input Validation**
- All form inputs are validated
- TypeScript provides compile-time type checking
- Runtime validation for user inputs

### **Role-Based Rendering**
```typescript
{user.role === 'admin' && (
  <AdminOnlyComponent />
)}

{user.role === 'doctor' && (
  <DoctorOnlyComponent doctorId={user.doctorId} />
)}
```

## 🧪 **Testing Considerations**

### **Component Testing**
Components are structured for easy testing:
- Pure functions where possible
- Clear prop interfaces
- Predictable state management
- Separated business logic

### **Mock Data Integration**
- All components use mock data from `/data/mockData.ts`
- Easy to replace with API calls
- Consistent data structure

## 🚀 **Performance Tips**

### **Optimization Patterns**
- Use `React.memo()` for expensive components
- Implement proper key props for lists
- Avoid inline object/function creation in render
- Use callback hooks for event handlers

### **Bundle Size**
- Import only needed icons from Lucide React
- Use dynamic imports for large components
- Optimize images and assets

## 📝 **Development Workflow**

### **Adding New Components**
1. Create component file in appropriate directory
2. Define TypeScript interfaces
3. Implement responsive design
4. Add proper error handling
5. Update parent components
6. Test across different screen sizes

### **Modifying Existing Components**
1. Check prop interfaces for breaking changes
2. Maintain backward compatibility
3. Update related components if needed
4. Test user flows end-to-end