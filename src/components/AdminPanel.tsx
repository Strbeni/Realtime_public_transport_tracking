import React, { useState } from 'react';
import { 
  BarChart3, 
  Bus, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { User } from '../types';
import { AdminDashboard } from './admin/AdminDashboard';
import { FleetManagement } from './admin/FleetManagement';
import { RouteManagement } from './admin/RouteManagement';
import { Analytics } from './admin/Analytics';
import { GrievanceManagement } from './admin/GrievanceManagement';

interface AdminPanelProps {
  user: User;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'fleet' | 'routes' | 'analytics' | 'grievances'>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Administrator';
      case 'municipal_admin': return 'Municipal Administrator';
      case 'operator_admin': return 'Fleet Operator';
      default: return 'Administrator';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'text-red-600';
      case 'municipal_admin': return 'text-green-600';
      case 'operator_admin': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, available: true },
    { id: 'fleet', label: 'Fleet Management', icon: Bus, available: true },
    { id: 'routes', label: 'Routes & Stops', icon: MapPin, available: user.role !== 'operator_admin' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, available: true },
    { id: 'grievances', label: 'Grievances', icon: AlertTriangle, available: true },
  ];

  const availableItems = navigationItems.filter(item => item.available);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center lg:hidden">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Bolt Admin</h1>
          <p className={`text-sm ${getRoleColor(user.role)}`}>{getRoleTitle(user.role)}</p>
        </div>
        <button onClick={() => setIsMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-white w-80 h-full shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Admin Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-sm text-gray-600">
                Welcome, {user.name}
                <div className={`${getRoleColor(user.role)} font-medium`}>
                  {getRoleTitle(user.role)}
                </div>
              </div>
              {availableItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id as any);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {label}
                </button>
              ))}
              <button
                onClick={onLogout}
                className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen lg:h-auto">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:flex flex-col w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <div className="flex items-center mb-4">
              <Bus className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">Bolt Admin</span>
            </div>
            <div className="text-sm text-gray-600">
              Welcome, {user.name}
              <div className={`${getRoleColor(user.role)} font-medium`}>
                {getRoleTitle(user.role)}
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {availableItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t space-y-2">
            <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5 mr-3" />
              Notifications
            </button>
            <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {activeTab === 'dashboard' && <AdminDashboard user={user} />}
          {activeTab === 'fleet' && <FleetManagement user={user} />}
          {activeTab === 'routes' && <RouteManagement user={user} />}
          {activeTab === 'analytics' && <Analytics user={user} />}
          {activeTab === 'grievances' && <GrievanceManagement user={user} />}
        </div>
      </div>
    </div>
  );
};