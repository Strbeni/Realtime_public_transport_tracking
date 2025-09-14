import React, { useState } from 'react';
import { MapPin, Bus, Share2, Bell, Menu, X, LogOut, Phone, Shield, Navigation, Clock } from 'lucide-react';
import { User } from '../types';
import { mockBuses, mockRoutes, mockStops } from '../data/mockData';
import { LiveMap } from './LiveMap';
import { TripPlanner } from './TripPlanner';
import { SafetyPanel } from './SafetyPanel';

interface UserAppProps {
  user: User;
  onLogout: () => void;
}

export const UserApp: React.FC<UserAppProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'map' | 'planner' | 'safety' | 'profile'>('map');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const activeBus = selectedBus ? mockBuses.find(b => b.id === selectedBus) : null;
  const activeRoute = activeBus ? mockRoutes.find(r => r.id === activeBus.routeId) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600';
      case 'delayed': return 'text-orange-600';
      case 'breakdown': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const tabs = [
    { id: 'map', label: 'Live Map', icon: MapPin },
    { id: 'planner', label: 'Trip Planner', icon: Navigation },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'profile', label: 'Profile', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center lg:hidden">
        <div className="flex items-center">
          <Bus className="h-6 w-6 mr-2" />
          <span className="font-bold">Bolt Transit</span>
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
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-sm text-gray-600">Welcome, {user.name}</div>
              {tabs.map(({ id, label, icon: Icon }) => (
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
              <span className="text-xl font-bold text-gray-900">Bolt Transit</span>
            </div>
            <div className="text-sm text-gray-600">Welcome, {user.name}</div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map(({ id, label, icon: Icon }) => (
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

          <div className="p-4 border-t">
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
        <div className="flex-1 flex flex-col min-h-0">
          {/* Active Bus Info Bar */}
          {activeBus && activeRoute && (
            <div className="bg-white border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bus className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-semibold">Bus {activeBus.number}</div>
                    <div className="text-sm text-gray-600">Route {activeRoute.number} - {activeRoute.name}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activeBus.status === 'running' ? 'bg-green-100 text-green-800' :
                    activeBus.status === 'delayed' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {activeBus.status.charAt(0).toUpperCase() + activeBus.status.slice(1)}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    ETA: {activeBus.eta} min
                  </div>
                  <div>
                    Speed: {activeBus.speed} km/h
                  </div>
                  <div>
                    Passengers: {activeBus.passengers}/{activeBus.capacity}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          <div className="flex-1 p-4 lg:p-6 overflow-auto">
            {activeTab === 'map' && (
              <LiveMap 
                buses={mockBuses} 
                routes={mockRoutes} 
                stops={mockStops}
                onBusSelect={setSelectedBus}
                selectedBus={selectedBus}
              />
            )}
            {activeTab === 'planner' && (
              <TripPlanner routes={mockRoutes} stops={mockStops} />
            )}
            {activeTab === 'safety' && (
              <SafetyPanel user={user} activeBus={activeBus} activeRoute={activeRoute} />
            )}
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      value={user.name} 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={user.email} 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      value={user.phone || ''} 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Emergency Contacts</h3>
                    {user.emergencyContacts?.map((contact, index) => (
                      <div key={contact.id} className="bg-gray-50 p-4 rounded-lg mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input 
                              type="text" 
                              value={contact.name} 
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input 
                              type="tel" 
                              value={contact.phone} 
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                            <input 
                              type="text" 
                              value={contact.relationship} 
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Add Emergency Contact
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <div className="lg:hidden bg-white border-t">
        <div className="grid grid-cols-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`p-3 text-center ${
                activeTab === id ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="h-5 w-5 mx-auto mb-1" />
              <div className="text-xs">{label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};