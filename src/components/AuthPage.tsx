import React, { useState } from 'react';
import { Bus, MapPin, Shield, Users } from 'lucide-react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<User['role'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = async (role: User['role']) => {
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.role === role) || mockUsers[0];
    onLogin(user);
    setIsLoading(false);
  };

  const roleOptions = [
    {
      role: 'user' as const,
      title: 'Commuter',
      description: 'Track buses, plan trips, and travel safely',
      icon: Bus,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      role: 'super_admin' as const,
      title: 'Super Admin',
      description: 'Full system control and analytics',
      icon: Shield,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      role: 'municipal_admin' as const,
      title: 'Municipal Admin',
      description: 'Manage local stops and routes',
      icon: MapPin,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      role: 'operator_admin' as const,
      title: 'Operator Admin',
      description: 'Manage fleet and drivers',
      icon: Users,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Logging you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <Bus className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Project Bolt</h1>
          </div>
          <p className="text-center text-gray-600 mt-2">Real-time Public Transport Tracking System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Project Bolt</h2>
          <p className="text-xl text-gray-600 mb-8">
            Revolutionizing commuting in small cities with reliable, safe, and convenient transport
          </p>
          <p className="text-lg text-gray-700">Choose your role to continue:</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleOptions.map(({ role, title, description, icon: Icon, color, hoverColor }) => (
            <div
              key={role}
              onClick={() => handleRoleSelect(role)}
              className={`
                ${color} ${hoverColor} text-white p-6 rounded-xl shadow-lg cursor-pointer 
                transform transition-all duration-300 hover:scale-105 hover:shadow-xl
              `}
            >
              <div className="text-center">
                <Icon className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm opacity-90">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Real-time Tracking</h4>
              <p className="text-gray-600">Live bus locations with accurate ETAs</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Safety Features</h4>
              <p className="text-gray-600">Share ride details with emergency contacts</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Smart Management</h4>
              <p className="text-gray-600">Comprehensive admin tools and analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};