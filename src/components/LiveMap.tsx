import React, { useState } from 'react';
import { MapPin, Bus, Clock, Users, Navigation } from 'lucide-react';
import { Bus as BusType, Route, BusStop } from '../types';
import { mockDrivers } from '../data/mockData';

interface LiveMapProps {
  buses: BusType[];
  routes: Route[];
  stops: BusStop[];
  onBusSelect: (busId: string | null) => void;
  selectedBus: string | null;
}

export const LiveMap: React.FC<LiveMapProps> = ({ buses, routes, stops, onBusSelect, selectedBus }) => {
  const [viewMode, setViewMode] = useState<'all' | 'route'>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const getBusStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'delayed': return 'bg-orange-500';
      case 'breakdown': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredBuses = viewMode === 'all' ? buses : buses.filter(bus => bus.routeId === selectedRoute);

  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Map Area */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Live Bus Tracking</h2>
            <div className="flex space-x-2">
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'all' | 'route')}
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="all">All Buses</option>
                <option value="route">By Route</option>
              </select>
              {viewMode === 'route' && (
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Select Route</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>Route {route.number}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
          
          {/* Simulated Map */}
          <div className="bg-gray-100 rounded-lg h-96 lg:h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              {/* Bus Stop Markers */}
              {stops.map((stop, index) => (
                <div
                  key={stop.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + (index * 15)}%`,
                    top: `${30 + (index * 10)}%`
                  }}
                >
                  <div className="bg-blue-600 rounded-full p-2 shadow-lg">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white px-2 py-1 rounded text-xs font-medium mt-1 shadow-md">
                    {stop.name}
                  </div>
                </div>
              ))}

              {/* Bus Markers */}
              {filteredBuses.map((bus, index) => (
                <div
                  key={bus.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${25 + (index * 20)}%`,
                    top: `${40 + (index * 15)}%`
                  }}
                  onClick={() => onBusSelect(selectedBus === bus.id ? null : bus.id)}
                >
                  <div className={`${getBusStatusColor(bus.status)} rounded-lg p-3 shadow-lg ${
                    selectedBus === bus.id ? 'ring-4 ring-blue-300' : ''
                  }`}>
                    <Bus className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white px-2 py-1 rounded text-xs font-medium mt-1 shadow-md">
                    {bus.number}
                  </div>
                  {selectedBus === bus.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded-lg shadow-lg min-w-48">
                      <div className="text-sm space-y-1">
                        <div className="font-semibold">{bus.number}</div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          ETA: {bus.eta} min
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-3 w-3 mr-1" />
                          {bus.passengers}/{bus.capacity}
                        </div>
                        <div className="text-gray-600">Speed: {bus.speed} km/h</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Route Lines (simplified) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                  </marker>
                </defs>
                <path
                  d="M 20% 30% Q 50% 20% 80% 70%"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-80 space-y-4">
          {/* Live Status Cards */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-bold mb-3">Fleet Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Buses</span>
                <span className="font-semibold">{buses.filter(b => b.status === 'running').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Delayed</span>
                <span className="font-semibold text-orange-600">{buses.filter(b => b.status === 'delayed').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Breakdown</span>
                <span className="font-semibold text-red-600">{buses.filter(b => b.status === 'breakdown').length}</span>
              </div>
            </div>
          </div>

          {/* Bus List */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-bold mb-3">Active Buses</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredBuses.map(bus => {
                const route = routes.find(r => r.id === bus.routeId);
                const driver = mockDrivers.find(d => d.id === bus.driverId);
                const nextStop = stops.find(s => s.id === bus.nextStopId);
                
                return (
                  <div
                    key={bus.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedBus === bus.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => onBusSelect(selectedBus === bus.id ? null : bus.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">{bus.number}</div>
                        <div className="text-sm text-gray-600">Route {route?.number}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getBusStatusColor(bus.status)}`}></div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Driver: {driver?.name}</div>
                      <div>Next: {nextStop?.name}</div>
                      <div className="flex justify-between">
                        <span>ETA: {bus.eta} min</span>
                        <span>{bus.passengers}/{bus.capacity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nearby Stops */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Nearby Stops</h3>
              <Navigation className="h-4 w-4 text-blue-600" />
            </div>
            <div className="space-y-2">
              {stops.slice(0, 4).map(stop => (
                <div key={stop.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <div className="font-medium text-sm">{stop.name}</div>
                    <div className="text-xs text-gray-500">
                      Routes: {stop.routes.join(', ')}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">0.2 km</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};