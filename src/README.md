# Source Code Directory

This directory contains all the source code for the MediCore Hospital Management System.

## 📁 **Directory Structure**

```
src/
├── components/          # React components organized by feature
├── data/               # Mock data and application constants
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles and Tailwind imports
└── vite-env.d.ts       # Vite environment type definitions
```

## 🧩 **Key Files**

### **App.tsx**
- **Purpose:** Main application component and routing logic
- **Features:** 
  - User authentication state management
  - Role-based rendering (Admin, Doctor, Patient)
  - Navigation between different user interfaces
  - Login/logout functionality

### **main.tsx**
- **Purpose:** Application entry point
- **Features:**
  - React DOM rendering
  - Strict mode configuration
  - CSS imports

### **index.css**
- **Purpose:** Global styles and Tailwind CSS imports
- **Features:**
  - Tailwind base, components, and utilities
  - Global CSS reset and base styles

## 🔧 **Development Notes**

### **State Management**
- Uses React hooks (useState, useEffect)
- Local state management for simplicity
- Easy to migrate to Redux/Zustand if needed

### **Authentication Flow**
1. Landing page with login options
2. Role-based authentication
3. Redirect to appropriate dashboard
4. Session management

### **Responsive Design**
- Mobile-first approach
- Tailwind CSS breakpoints
- Flexible grid layouts
- Touch-friendly interfaces

## 📝 **Code Style Guidelines**

### **Component Structure**
```typescript
// 1. Imports
import React, { useState } from 'react';
import { ComponentProps } from '../types';

// 2. Interface definitions
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

// 3. Component definition
export const ComponentName: React.FC<ComponentNameProps> = ({ 
  prop1, 
  prop2 = defaultValue 
}) => {
  // 4. State and hooks
  const [state, setState] = useState(initialValue);
  
  // 5. Event handlers
  const handleEvent = () => {
    // Handler logic
  };
  
  // 6. Render
  return (
    <div className="responsive-classes">
      {/* Component JSX */}
    </div>
  );
};
```

### **Naming Conventions**
- **Components:** PascalCase (e.g., `PatientsList`)
- **Files:** PascalCase for components, camelCase for utilities
- **Props:** camelCase
- **CSS Classes:** Tailwind utility classes

### **TypeScript Usage**
- All components use TypeScript
- Props interfaces defined for each component
- Type safety enforced throughout
- Generic types used where appropriate

## 🎨 **Styling Approach**

### **Tailwind CSS**
- Utility-first CSS framework
- Responsive design utilities
- Custom color palette defined in config
- Consistent spacing system

### **Component Styling**
- No CSS modules or styled-components
- All styling through Tailwind classes
- Responsive classes for mobile/tablet/desktop
- Hover and focus states included

## 🔄 **Data Flow**

### **Props Down, Events Up**
- Parent components pass data via props
- Child components emit events to parents
- Unidirectional data flow maintained

### **Mock Data Integration**
- All data imported from `/data/mockData.ts`
- Easy to replace with API calls
- Consistent data structure throughout

## 📱 **Responsive Breakpoints**

- **Mobile:** Default (< 640px)
- **Tablet:** `sm:` (≥ 640px)
- **Desktop:** `lg:` (≥ 1024px)
- **Large Desktop:** `xl:` (≥ 1280px)

## 🚀 **Performance Considerations**

- Functional components with hooks
- Minimal re-renders through proper state management
- Lazy loading ready (can be added)
- Optimized bundle size with Vite