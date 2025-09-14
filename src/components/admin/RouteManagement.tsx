import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Clock, DollarSign, Route } from 'lucide-react';
import { User } from '../../types';
import { mockRoutes, mockStops } from '../../data/mockData';

interface RouteManagementProps {
  user: User;
}

export const RouteManagement: React.FC<RouteManagementProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<'routes' | 'stops'>('routes');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isAddingStop, setIsAddingStop] = useState(false);

  const canManageStops = user.role === 'super_admin' || user.role === 'municipal_admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Routes & Stops</h1>
            <p className="text-gray-600">Manage bus routes, stops, and schedules</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => setActiveView('routes')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeView === 'routes' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Routes
            </button>
            {canManageStops && (
              <button
                onClick={() => setActiveView('stops')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeView === 'stops' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bus Stops
              </button>
            )}
          </div>
        </div>
      </div>

      {activeView === 'routes' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Routes List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Bus Routes</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Plus className="h-4 w-4 inline mr-1" />
                    Add Route
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {mockRoutes.map(route => (
                  <div 
                    key={route.id} 
                    className={`p-6 hover:bg-gray-50 cursor-pointer ${
                      selectedRoute === route.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 rounded-lg p-3">
                          <Route className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Route {route.number}</h3>
                          <p className="text-gray-600">{route.name}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{route.stops.length} stops • {route.distance} km</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">${route.fare}</div>
                        <div className="text-sm text-gray-600">
                          <div>{route.startTime} - {route.endTime}</div>
                          <div>Every {route.frequency} min</div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedRoute === route.id && (
                      <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 px-6 rounded-b-lg">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Route Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Operating Hours: {route.startTime} - {route.endTime}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Frequency: Every {route.frequency} minutes</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Base Fare: ${route.fare}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Total Distance: {route.distance} km</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Actions</h4>
                            <div className="space-y-2">
                              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
                                View on Map
                              </button>
                              <div className="grid grid-cols-2 gap-2">
                                <button className="bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 text-sm flex items-center justify-center">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </button>
                                <button className="bg-red-100 text-red-700 py-2 rounded hover:bg-red-200 text-sm flex items-center justify-center">
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Stops List */}
                        <div className="mt-4">
                          <h4 className="font-semibold mb-3">Route Stops</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {route.stops.map((stop, index) => (
                              <div key={stop.id} className="flex items-center p-2 bg-white rounded border">
                                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium text-blue-600 mr-3">
                                  {index + 1}
                                </div>
                                <span className="text-sm">{stop.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Route Statistics */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Route Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Routes</span>
                  <span className="font-semibold">{mockRoutes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Routes</span>
                  <span className="font-semibold text-green-600">{mockRoutes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Distance</span>
                  <span className="font-semibold">
                    {mockRoutes.reduce((sum, route) => sum + route.distance, 0).toFixed(1)} km
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Frequency</span>
                  <span className="font-semibold">
                    {Math.round(mockRoutes.reduce((sum, route) => sum + route.frequency, 0) / mockRoutes.length)} min
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
              <div className="space-y-3">
                {mockRoutes.map((route, index) => (
                  <div key={route.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Route {route.number}</div>
                      <div className="text-sm text-gray-600">{route.stops.length} stops</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{95 - index * 5}%</div>
                      <div className="text-xs text-gray-500">usage</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'stops' && canManageStops && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Bus Stops Management</h2>
              <button 
                onClick={() => setIsAddingStop(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 inline mr-1" />
                Add Bus Stop
              </button>
            </div>
          </div>
          
          <div className="divide-y">
            {mockStops.map(stop => (
              <div key={stop.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{stop.name}</h3>
                      <p className="text-gray-600">
                        Coordinates: {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
                      </p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Route className="h-4 w-4 mr-1" />
                        <span>Routes: {stop.routes.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200">
                      <Edit className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                    <button className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200">
                      <Trash2 className="h-4 w-4 inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Stop Modal */}
      {isAddingStop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Bus Stop</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stop Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stop name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Click on map or enter coordinates"
                />
              </div>
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center text-gray-500">
                <MapPin className="h-8 w-8 mr-2" />
                Interactive Map (Click to place stop)
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setIsAddingStop(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};