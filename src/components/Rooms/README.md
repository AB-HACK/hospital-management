# Rooms Components

This directory contains components for hospital room management, including room allocation, status tracking, and maintenance scheduling.

## 📁 **Components**

### **RoomManagement.tsx**
**Purpose:** Comprehensive room management interface for hospital administrators and staff

**Features:**
- Real-time room status monitoring (Available, Occupied, Maintenance, Reserved)
- Room statistics dashboard with key metrics
- Patient assignment and discharge management
- Room maintenance scheduling and tracking
- Equipment inventory per room
- Mobile-responsive card layout with touch-friendly interactions
- Quick status change actions and room management tools

**Props:**
```typescript
// No props - manages its own state and room data
```

**Key Functions:**
- `handleRoomStatusChange()` - Updates room status and patient assignments
- `getStatusIcon()` / `getStatusColor()` - Visual status indicators
- `getRoomTypeColor()` - Room type color coding
- Real-time statistics calculation and display

## 🎯 **Usage Examples**

### **Basic Room Management**
```typescript
import { RoomManagement } from './components/Rooms/RoomManagement';

function HospitalRoomManagement() {
  return (
    <div>
      <h1>Room Management System</h1>
      <RoomManagement />
    </div>
  );
}
```

### **Integration with Patient Management**
```typescript
function PatientAdmission({ patientId }: { patientId: string }) {
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  
  const handleRoomAssignment = (roomId: string) => {
    // Assign patient to room
    console.log(`Assigning patient ${patientId} to room ${roomId}`);
  };
  
  return (
    <div>
      <button onClick={() => setShowRoomSelection(true)}>
        Assign Room
      </button>
      {showRoomSelection && <RoomManagement />}
    </div>
  );
}
```

## 📊 **Room Data Structure**

### **Room Interface**
```typescript
interface Room {
  id: string;
  roomNumber: string;                // Room identifier (e.g., "101", "A-205")
  type: 'General' | 'ICU' | 'Private' | 'Emergency' | 'Surgery';
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  patientId?: string;                // Currently assigned patient (if occupied)
  floor: number;                     // Floor number
  capacity: number;                  // Number of beds
  equipment: string[];               // Available equipment list
  dailyRate: number;                 // Cost per day in dollars
}
```

### **Room Status Types**
- **Available** - Ready for patient assignment
- **Occupied** - Currently has a patient
- **Maintenance** - Under repair or cleaning
- **Reserved** - Held for specific patient or procedure

### **Room Types**
- **General** - Standard patient rooms
- **ICU** - Intensive Care Unit rooms
- **Private** - Single-patient private rooms
- **Emergency** - Emergency department rooms
- **Surgery** - Operating rooms and surgical suites

## 🎨 **Visual Design Features**

### **Status Indicators**
```typescript
// Status colors and icons
const statusConfig = {
  Available: {
    color: 'bg-medical-100 text-medical-700 border-medical-200',
    icon: CheckCircle,
    iconColor: 'text-medical-600'
  },
  Occupied: {
    color: 'bg-primary-100 text-primary-700 border-primary-200',
    icon: Users,
    iconColor: 'text-primary-600'
  },
  Maintenance: {
    color: 'bg-warning-100 text-warning-700 border-warning-200',
    icon: AlertCircle,
    iconColor: 'text-warning-600'
  },
  Reserved: {
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: Bed,
    iconColor: 'text-gray-600'
  }
};
```

### **Room Type Colors**
- **ICU** - Red (`bg-danger-100 text-danger-700`) - Critical care
- **Emergency** - Orange (`bg-warning-100 text-warning-700`) - Urgent care
- **Surgery** - Blue (`bg-primary-100 text-primary-700`) - Surgical procedures
- **Private** - Green (`bg-medical-100 text-medical-700`) - Premium care
- **General** - Gray (`bg-gray-100 text-gray-700`) - Standard care

### **Room Cards Layout**
- **Status Badge** - Prominent status indicator
- **Room Information** - Number, floor, type, capacity
- **Patient Information** - Current patient details (if occupied)
- **Equipment List** - Available medical equipment
- **Action Buttons** - Quick status change actions

## 🏥 **Room Management Features**

### **Statistics Dashboard**
```typescript
// Real-time room statistics
const roomStats = {
  available: rooms.filter(r => r.status === 'Available').length,
  occupied: rooms.filter(r => r.status === 'Occupied').length,
  maintenance: rooms.filter(r => r.status === 'Maintenance').length,
  total: rooms.length
};
```

### **Quick Actions**
- **Assign Patient** - Move available room to occupied status
- **Discharge Patient** - Free up occupied room
- **Schedule Maintenance** - Mark room for maintenance
- **Mark Ready** - Return maintenance room to available
- **Reserve Room** - Hold room for specific use

### **Patient Assignment**
- **Available Rooms** - Show rooms ready for assignment
- **Patient Selection** - Choose patient for room assignment
- **Automatic Assignment** - Smart room allocation based on needs
- **Transfer Patients** - Move patients between rooms

## 📱 **Responsive Design**

### **Mobile Experience**
- **Card-Based Layout** - Touch-friendly room cards
- **Swipe Gestures** - Natural mobile interactions
- **Compact Information** - Essential details prominently displayed
- **Quick Actions** - Large, accessible action buttons
- **Status Indicators** - Clear visual status representation

### **Tablet Optimization**
- **Grid Layout** - Efficient use of screen space
- **Touch Interactions** - Tablet-optimized gestures
- **Balanced Information** - Optimal information density
- **Multi-Column Display** - Better organization of room data

### **Desktop Features**
- **Comprehensive View** - All room details visible
- **Advanced Filtering** - Complex search and filter options
- **Bulk Operations** - Multiple room management
- **Detailed Statistics** - Comprehensive analytics display

## 🔧 **State Management**

### **Room Management State**
```typescript
const [statusFilter, setStatusFilter] = useState('All');
const [rooms, setRooms] = useState(mockRooms);

// Filter rooms based on status
const filteredRooms = rooms.filter(room => 
  statusFilter === 'All' || room.status === statusFilter
);
```

### **Status Change Handling**
```typescript
const handleRoomStatusChange = (roomId: string, newStatus: string, patientId?: string) => {
  setRooms(rooms.map(room => 
    room.id === roomId 
      ? { 
          ...room, 
          status: newStatus as RoomStatus, 
          patientId: newStatus === 'Occupied' ? patientId : undefined 
        }
      : room
  ));
};
```

## 🔄 **Integration Points**

### **Patient Management Integration**
- **Patient Assignment** - Link patients to rooms
- **Admission Process** - Automatic room assignment during admission
- **Discharge Process** - Room cleanup and availability update
- **Transfer Management** - Move patients between rooms

### **Billing Integration**
- **Room Charges** - Daily rate billing for occupied rooms
- **Service Charges** - Additional charges for room services
- **Insurance Coverage** - Room type coverage validation
- **Cost Tracking** - Monitor room utilization costs

### **Maintenance Integration**
- **Work Orders** - Create maintenance requests
- **Maintenance Scheduling** - Plan room maintenance
- **Equipment Tracking** - Monitor room equipment status
- **Cleaning Schedules** - Room cleaning and preparation

## 🚀 **Performance Optimization**

### **Efficient Rendering**
- **Virtual Scrolling** - Handle large numbers of rooms
- **Lazy Loading** - Load room details on demand
- **Optimized Updates** - Minimal re-renders on status changes
- **Cached Data** - Cache frequently accessed room information

### **Real-Time Updates**
- **Status Synchronization** - Real-time room status updates
- **Conflict Prevention** - Prevent double-booking of rooms
- **Automatic Refresh** - Periodic data refresh
- **Change Notifications** - Alert staff to room status changes

## 🔒 **Security and Access Control**

### **Role-Based Permissions**
- **Administrators** - Full room management access
- **Nurses** - Room status updates and patient assignment
- **Doctors** - View room status and patient information
- **Housekeeping** - Maintenance status updates
- **Patients** - Limited room information access

### **Data Security**
- **Patient Privacy** - Secure patient-room associations
- **Access Logging** - Track room management actions
- **Data Validation** - Validate room status changes
- **Secure Communication** - Encrypted data transmission

## 🧪 **Testing Scenarios**

### **Room Management Tests**
1. **Status Changes** - Test all room status transitions
2. **Patient Assignment** - Assign and discharge patients
3. **Maintenance Scheduling** - Schedule and complete maintenance
4. **Filter Functionality** - Test room filtering options
5. **Mobile Responsiveness** - Test on various screen sizes

### **Integration Tests**
1. **Patient Admission** - Complete admission with room assignment
2. **Billing Integration** - Verify room charges are calculated
3. **Maintenance Workflow** - Complete maintenance cycle
4. **Transfer Process** - Move patients between rooms
5. **Discharge Process** - Complete patient discharge

### **Edge Cases**
- **Double Booking Prevention** - Prevent room conflicts
- **Emergency Assignments** - Priority room allocation
- **Maintenance Conflicts** - Handle maintenance scheduling conflicts
- **Capacity Management** - Handle room capacity limits
- **Equipment Failures** - Manage equipment-related room issues

## 🔮 **Future Enhancements**

### **Advanced Features**
- **Smart Room Assignment** - AI-powered room allocation
- **Predictive Maintenance** - Predict maintenance needs
- **IoT Integration** - Smart room sensors and automation
- **Energy Management** - Room energy usage optimization
- **Infection Control** - Enhanced cleaning and safety protocols

### **Analytics and Reporting**
- **Utilization Analytics** - Room usage patterns and optimization
- **Revenue Analysis** - Room revenue and profitability
- **Maintenance Analytics** - Maintenance cost and efficiency
- **Patient Flow** - Room turnover and patient flow analysis
- **Capacity Planning** - Future room capacity needs

### **Communication Features**
- **Staff Notifications** - Real-time room status alerts
- **Patient Communication** - Room assignment notifications
- **Maintenance Alerts** - Automated maintenance reminders
- **Emergency Protocols** - Emergency room allocation procedures

## 📈 **Operational Insights**

### **Key Performance Indicators**
- **Occupancy Rate** - Percentage of rooms occupied
- **Turnover Time** - Time between patient discharge and next admission
- **Maintenance Efficiency** - Average maintenance completion time
- **Revenue per Room** - Financial performance by room type
- **Patient Satisfaction** - Room-related patient feedback

### **Resource Optimization**
- **Capacity Utilization** - Optimize room usage
- **Staff Allocation** - Efficient staff assignment to rooms
- **Equipment Distribution** - Optimal equipment placement
- **Cost Management** - Control room-related expenses
- **Quality Improvement** - Enhance room services and amenities