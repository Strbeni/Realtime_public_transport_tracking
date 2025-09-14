import React from 'react';
import { 
  Bus, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Clock, 
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { User } from '../../types';
import { mockBuses, mockRoutes, mockGrievances } from '../../data/mockData';

interface AdminDashboardProps {
  user: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const activeBuses = mockBuses.filter(bus => bus.status === 'running').length;
  const totalBuses = mockBuses.length;
  const onTimePercentage = 85; // Mock calculation
  const openGrievances = mockGrievances.filter(g => g.status === 'open').length;
  
  const statusCards = [
    {
      title: 'Active Buses',
      value: `${activeBuses}/${totalBuses}`,
      icon: Bus,
      color: 'bg-blue-500',
      trend: '+2.5%'
    },
    {
      title: 'On-Time Performance',
      value: `${onTimePercentage}%`,
      icon: Clock,
      color: 'bg-green-500',
      trend: '+1.2%'
    },
    {
      title: 'Open Grievances',
      value: openGrievances.toString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: '-15%'
    },
    {
      title: 'Daily Passengers',
      value: '2,847',
      icon: Users,
      color: 'bg-purple-500',
      trend: '+8.3%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fleet Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your public transport system</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">{card.trend}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
            <div className="text-sm text-gray-600">{card.title}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live Fleet Map */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Live Fleet Map</h2>
            <button className="text-blue-600 text-sm hover:underline">View Full Map</button>
          </div>
          
          {/* Simulated Map */}
          <div className="bg-gray-100 rounded-lg h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              {mockBuses.map((bus, index) => {
                const statusColor = bus.status === 'running' ? 'bg-green-500' : 
                                   bus.status === 'delayed' ? 'bg-orange-500' : 'bg-red-500';
                return (
                  <div
                    key={bus.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${25 + (index * 25)}%`,
                      top: `${30 + (index * 20)}%`
                    }}
                  >
                    <div className={`${statusColor} rounded-full p-2 shadow-lg`}>
                      <Bus className="h-4 w-4 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>On Time</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span>Delayed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Breakdown</span>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Alerts</h2>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Bus BT-102-B Breakdown</p>
                <p className="text-xs text-red-600 mt-1">Route 102 at Hospital Stop - 15 min ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">Route 103 Delayed</p>
                <p className="text-xs text-yellow-600 mt-1">Heavy traffic at City Center - 8 min ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">Route 101 Back on Schedule</p>
                <p className="text-xs text-green-600 mt-1">All buses running normally - 3 min ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Route Performance Today</h2>
          
          <div className="space-y-4">
            {mockRoutes.map((route, index) => {
              const performance = [92, 88, 95][index]; // Mock performance data
              const performanceColor = performance >= 90 ? 'text-green-600' : 
                                     performance >= 80 ? 'text-yellow-600' : 'text-red-600';
              const performanceBg = performance >= 90 ? 'bg-green-100' : 
                                  performance >= 80 ? 'bg-yellow-100' : 'bg-red-100';
              
              return (
                <div key={route.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Route {route.number}</div>
                      <div className="text-sm text-gray-600">{route.name}</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${performanceBg} ${performanceColor}`}>
                    {performance}% On-Time
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-50 text-blue-700 p-4 rounded-lg hover:bg-blue-100 transition-colors">
              <Bus className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Track Fleet</div>
            </button>
            <button className="bg-green-50 text-green-700 p-4 rounded-lg hover:bg-green-100 transition-colors">
              <MapPin className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Add Route</div>
            </button>
            <button className="bg-purple-50 text-purple-700 p-4 rounded-lg hover:bg-purple-100 transition-colors">
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">View Analytics</div>
            </button>
            <button className="bg-red-50 text-red-700 p-4 rounded-lg hover:bg-red-100 transition-colors">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Grievances</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};