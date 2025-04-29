import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => {
  const isTrendPositive = trend.startsWith('+');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={`rounded-lg p-6 border transition-shadow ${
      isDark 
        ? 'bg-dark-surface border-dark-border hover:shadow-md shadow-sm shadow-black/20' 
        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium mb-1 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>{title}</p>
          <h4 className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>{value}</h4>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-xs font-medium ${isTrendPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend} 
        </span>
        <span className={`text-xs ml-1 ${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>from last period</span>
      </div>
    </div>
  );
};

export default StatCard;