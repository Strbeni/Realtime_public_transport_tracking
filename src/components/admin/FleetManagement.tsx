import React, { useState } from 'react';
import { Bus, User, MapPin, Clock, Phone, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { User as UserType } from '../../types';
import { mockBuses, mockDrivers, mockRoutes, mockStops } from '../../data/mockData';

interface FleetManagementProps {
  user: UserType;
}

export const FleetManagement: React.FC<FleetManagementProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<'buses' | 'drivers'>('buses');
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const getBusStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'breakdown': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDriverRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Fleet Management</h1>
            <p className="text-gray-600">Manage your buses, drivers, and fleet operations</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => setActiveView('buses')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeView === 'buses' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buses
            </button>
            <button
              onClick={() => setActiveView('drivers')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeView === 'drivers' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Drivers
            </button>
          </div>
        </div>
      </div>

      {activeView === 'buses' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bus List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Fleet Overview</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add Bus
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {mockBuses.map(bus => {
                  const route = mockRoutes.find(r => r.id === bus.routeId);
                  const driver = mockDrivers.find(d => d.id === bus.driverId);
                  const nextStop = mockStops.find(s => s.id === bus.nextStopId);
                  
                  return (
                    <div 
                      key={bus.id} 
                      className={`p-6 hover:bg-gray-50 cursor-pointer ${
                        selectedBus === bus.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedBus(selectedBus === bus.id ? null : bus.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 rounded-lg p-3">
                            <Bus className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{bus.number}</h3>
                            <p className="text-gray-600">Route {route?.number} - {route?.name}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <User className="h-4 w-4 mr-1" />
                              <span>{driver?.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBusStatusColor(bus.status)}`}>
                            {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                          </span>
                          <div className="mt-2 text-sm text-gray-600">
                            <div>Speed: {bus.speed} km/h</div>
                            <div>Passengers: {bus.passengers}/{bus.capacity}</div>
                          </div>
                        </div>
                      </div>
                      
                      {selectedBus === bus.id && (
                        <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 px-6 rounded-b-lg">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Current Status</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Next Stop:</span>
                                  <span className="font-medium">{nextStop?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>ETA:</span>
                                  <span className="font-medium">{bus.eta} min</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Occupancy:</span>
                                  <span className="font-medium">{Math.round((bus.passengers / bus.capacity) * 100)}%</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Actions</h4>
                              <div className="space-y-2">
                                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
                                  Track Live
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                  <button className="bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 text-sm flex items-center justify-center">
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </button>
                                  <button className="bg-red-100 text-red-700 py-2 rounded hover:bg-red-200 text-sm flex items-center justify-center">
                                    <AlertTriangle className="h-4 w-4 mr-1" />
                                    Alert
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fleet Statistics */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Fleet Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Buses</span>
                  <span className="font-semibold">{mockBuses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-green-600">
                    {mockBuses.filter(b => b.status === 'running').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delayed</span>
                  <span className="font-semibold text-yellow-600">
                    {mockBuses.filter(b => b.status === 'delayed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breakdown</span>
                  <span className="font-semibold text-red-600">
                    {mockBuses.filter(b => b.status === 'breakdown').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">On-Time Performance</span>
                    <span className="text-sm font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Average Occupancy</span>
                    <span className="text-sm font-semibold">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Fleet Availability</span>
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'drivers' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Driver Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add Driver
              </button>
            </div>
          </div>
          
          <div className="divide-y">
            {mockDrivers.map(driver => {
              const assignedBus = mockBuses.find(b => b.driverId === driver.id);
              const route = assignedBus ? mockRoutes.find(r => r.id === assignedBus.routeId) : null;
              
              return (
                <div key={driver.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 rounded-full p-3">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{driver.name}</h3>
                        <p className="text-gray-600">License: {driver.licenseNumber}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{driver.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getDriverRatingColor(driver.rating)}`}>
                        {driver.rating.toFixed(1)} ★
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{driver.onTimePercentage}% On-Time</div>
                        <div>{driver.totalTrips} Total Trips</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                      {assignedBus && route ? (
                        <div className="flex items-center text-green-600">
                          <Bus className="h-4 w-4 mr-2" />
                          <span>Currently driving {assignedBus.number} on Route {route.number}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Off duty</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200">
                        <Edit className="h-4 w-4 inline mr-1" />
                        Edit
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};