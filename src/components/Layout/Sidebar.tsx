import React, { useState, useCallback, useMemo } from 'react';
import { 
  Activity, 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  Package, 
  Bed, 
  UserCheck,
  BarChart3,
  Settings,
  Heart,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentUser?: { username: string; role: 'admin' | 'doctor' };
  onLogout?: () => void;
}

// Memoized menu items configuration
const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'doctors', label: 'Doctors', icon: UserCheck },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'records', label: 'Medical Records', icon: FileText },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'rooms', label: 'Room Management', icon: Bed },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'staff', label: 'Staff Management', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;

export const Sidebar: React.FC<SidebarProps> = React.memo(({ 
  activeSection, 
  onSectionChange, 
  currentUser,
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoized handlers for better performance
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMenuItemClick = useCallback((itemId: string) => {
    onSectionChange(itemId);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  }, [onSectionChange]);

  // Memoized portal title
  const portalTitle = useMemo(() => 
    currentUser?.role === 'admin' ? 'Admin Portal' : 'Hospital Management',
    [currentUser?.role]
  );

  // Memoized user initials
  const userInitials = useMemo(() => 
    currentUser?.username.charAt(0).toUpperCase() || 'U',
    [currentUser?.username]
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-soft border border-gray-200 hover:shadow-soft-lg transition-shadow"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-soft-lg transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:h-screen lg:sticky lg:top-0
      `}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">MediCore</h1>
              <p className="text-xs lg:text-sm text-gray-500">
                {portalTitle}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4 lg:mt-6 px-2 lg:px-3 pb-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 lg:py-3 text-left rounded-lg mb-1 transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-4 w-4 lg:h-5 lg:w-5 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className="font-medium text-sm lg:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        {currentUser && onLogout && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600 font-semibold text-sm">
                    {userInitials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{currentUser.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

Sidebar.displayName = 'Sidebar';