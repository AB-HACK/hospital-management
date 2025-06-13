import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="ml-12 lg:ml-0">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-xs lg:text-sm text-gray-500 mt-1 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search - Hidden on mobile, visible on tablet+ */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search patients, doctors..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-48 lg:w-80"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-danger-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs lg:text-sm font-medium text-gray-900">Dr. Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="bg-primary-600 p-1.5 lg:p-2 rounded-full">
              <User className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};