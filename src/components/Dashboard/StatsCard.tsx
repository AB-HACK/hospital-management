import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: LucideIcon;
  color: 'primary' | 'medical' | 'warning' | 'danger';
}

const colorClasses = {
  primary: 'bg-primary-50 text-primary-600 border-primary-200',
  medical: 'bg-medical-50 text-medical-600 border-medical-200',
  warning: 'bg-warning-50 text-warning-600 border-warning-200',
  danger: 'bg-danger-50 text-danger-600 border-danger-200',
};

const iconColors = {
  primary: 'text-primary-600',
  medical: 'text-medical-600',
  warning: 'text-warning-600',
  danger: 'text-danger-600',
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-3 lg:p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <p className="text-xl lg:text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-xs lg:text-sm mt-1 lg:mt-2 ${
              changeType === 'increase' ? 'text-medical-600' : 'text-danger-600'
            }`}>
              {changeType === 'increase' ? '↗' : '↘'} {change}
            </p>
          )}
        </div>
        <div className={`p-2 lg:p-3 rounded-lg flex-shrink-0 ${colorClasses[color]}`}>
          <Icon className={`h-4 w-4 lg:h-6 lg:w-6 ${iconColors[color]}`} />
        </div>
      </div>
    </div>
  );
};