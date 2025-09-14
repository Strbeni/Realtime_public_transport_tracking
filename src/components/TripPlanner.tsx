import React, { useState } from 'react';
import { MapPin, Search, Clock, DollarSign, Route, ArrowRight } from 'lucide-react';
import { Route as RouteType, BusStop } from '../types';

interface TripPlannerProps {
  routes: RouteType[];
  stops: BusStop[];
}

export const TripPlanner: React.FC<TripPlannerProps> = ({ routes, stops }) => {
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [searchResults, setSearchResults] = useState<RouteType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!fromStop || !toStop) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find routes that connect the selected stops
    const relevantRoutes = routes.filter(route => {
      const stopIds = route.stops.map(s => s.id);
      const fromIndex = stopIds.indexOf(fromStop);
      const toIndex = stopIds.indexOf(toStop);
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });
    
    setSearchResults(relevantRoutes);
    setIsSearching(false);
  };

  const getStopName = (stopId: string) => {
    return stops.find(s => s.id === stopId)?.name || stopId;
  };

  const calculateTripTime = (route: RouteType, fromStopId: string, toStopId: string) => {
    const stopIds = route.stops.map(s => s.id);
    const fromIndex = stopIds.indexOf(fromStopId);
    const toIndex = stopIds.indexOf(toStopId);
    const stopCount = toIndex - fromIndex;
    return Math.round(stopCount * 3 + Math.random() * 10); // Rough estimate
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Plan Your Journey</h2>
      
      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={fromStop}
                onChange={(e) => setFromStop(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select departure stop</option>
                {stops.map(stop => (
                  <option key={stop.id} value={stop.id}>{stop.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={toStop}
                onChange={(e) => setToStop(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select destination stop</option>
                {stops.map(stop => (
                  <option key={stop.id} value={stop.id}>{stop.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!fromStop || !toStop || isSearching}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isSearching ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Find Routes
            </>
          )}
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Available Routes</h3>
          {searchResults.map(route => {
            const tripTime = calculateTripTime(route, fromStop, toStop);
            const estimatedFare = (route.fare * 0.8).toFixed(2); // Assuming distance-based pricing
            
            return (
              <div key={route.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Route className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Route {route.number}</h4>
                      <p className="text-gray-600">{route.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">${estimatedFare}</div>
                    <div className="text-sm text-gray-500">Estimated fare</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium">{tripTime} min</div>
                      <div className="text-sm text-gray-500">Journey time</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium">Every {route.frequency} min</div>
                      <div className="text-sm text-gray-500">Frequency</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium">{route.startTime} - {route.endTime}</div>
                      <div className="text-sm text-gray-500">Operating hours</div>
                    </div>
                  </div>
                </div>
                
                {/* Route Path */}
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">{getStopName(fromStop)}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {route.stops.filter(stop => {
                        const fromIndex = route.stops.findIndex(s => s.id === fromStop);
                        const toIndex = route.stops.findIndex(s => s.id === toStop);
                        const currentIndex = route.stops.findIndex(s => s.id === stop.id);
                        return currentIndex > fromIndex && currentIndex < toIndex;
                      }).length} intermediate stops
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{getStopName(toStop)}</span>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Track This Route
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && fromStop && toStop && !isSearching && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-yellow-800">
            <h3 className="font-semibold mb-2">No Direct Routes Found</h3>
            <p>We couldn't find a direct route between these stops. You might need to transfer between routes.</p>
          </div>
        </div>
      )}

      {/* Popular Routes */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Popular Routes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {routes.slice(0, 4).map(route => (
            <div key={route.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">Route {route.number}</h4>
                  <p className="text-sm text-gray-600">{route.name}</p>
                </div>
                <span className="text-lg font-bold text-blue-600">${route.fare}</span>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <div>{route.stops.length} stops • {route.distance} km</div>
                <div>Every {route.frequency} min • {route.startTime}-{route.endTime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};