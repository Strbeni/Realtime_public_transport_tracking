import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, Users, Clock, DollarSign, MapPin } from 'lucide-react';
import { User } from '../../types';

interface AnalyticsProps {
  user: User;
}

export const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedMetric, setSelectedMetric] = useState<'ridership' | 'performance' | 'revenue'>('ridership');

  const metrics = [
    {
      id: 'ridership',
      title: 'Ridership Analytics',
      icon: Users,
      color: 'bg-blue-500',
      value: '2,847',
      change: '+12.5%',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    },
    {
      id: 'performance',
      title: 'On-Time Performance',
      icon: Clock,
      color: 'bg-green-500',
      value: '85.2%',
      change: '+2.1%',
      data: [78, 82, 85, 87, 85, 88, 85]
    },
    {
      id: 'revenue',
      title: 'Daily Revenue',
      icon: DollarSign,
      color: 'bg-purple-500',
      value: '$4,235',
      change: '+8.7%',
      data: [3200, 3800, 3600, 3900, 4100, 4300, 4235]
    }
  ];

  const routes = [
    { id: '101', name: 'City Center - University', ridership: 1250, onTime: 92, revenue: 1875 },
    { id: '102', name: 'Hospital - Shopping Mall', ridership: 980, onTime: 88, revenue: 1470 },
    { id: '103', name: 'Railway - Airport Express', ridership: 617, onTime: 95, revenue: 1852 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Comprehensive insights into your transport system performance</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div 
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id as any)}
            className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
              selectedMetric === metric.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} rounded-lg p-3`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">{metric.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600 mb-4">{metric.title}</div>
            
            {/* Mini Chart */}
            <div className="flex items-end space-x-1 h-8">
              {metric.data.map((value, index) => (
                <div
                  key={index}
                  className={`${metric.color} rounded-sm flex-1`}
                  style={{ height: `${(value / Math.max(...metric.data)) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {metrics.find(m => m.id === selectedMetric)?.title} Trend
            </h2>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Last 7 days</span>
            </div>
          </div>
          
          {/* Chart Area */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-between p-4">
            {metrics.find(m => m.id === selectedMetric)?.data.map((value, index) => {
              const maxValue = Math.max(...(metrics.find(m => m.id === selectedMetric)?.data || []));
              const height = (value / maxValue) * 200;
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-gray-600 mb-2">{value}</div>
                  <div 
                    className="bg-blue-500 rounded-t w-8 transition-all hover:bg-blue-600"
                    style={{ height: `${height}px` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">
                    Day {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Route Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Route Performance</h2>
          
          <div className="space-y-4">
            {routes.map(route => {
              const performanceColor = route.onTime >= 90 ? 'text-green-600' : 
                                     route.onTime >= 80 ? 'text-yellow-600' : 'text-red-600';
              const performanceBg = route.onTime >= 90 ? 'bg-green-100' : 
                                  route.onTime >= 80 ? 'bg-yellow-100' : 'bg-red-100';
              
              return (
                <div key={route.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">Route {route.id}</div>
                      <div className="text-sm text-gray-600">{route.name}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${performanceBg} ${performanceColor}`}>
                      {route.onTime}% On-Time
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Ridership</div>
                      <div className="font-semibold">{route.ridership.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Revenue</div>
                      <div className="font-semibold">${route.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Efficiency</div>
                      <div className="font-semibold">{Math.round(route.revenue / route.ridership * 100) / 100}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Today's Summary</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12,847</div>
                <div className="text-sm text-gray-600">Total Passengers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$18,235</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fleet Utilization</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Satisfaction</span>
                  <span>4.6/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fuel Efficiency</span>
                  <span>8.2 km/L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Hours Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Peak Hours Analysis</h2>
          
          <div className="space-y-4">
            {[
              { time: '7:00 - 9:00 AM', usage: 95, label: 'Morning Rush' },
              { time: '12:00 - 2:00 PM', usage: 70, label: 'Lunch Hours' },
              { time: '5:00 - 7:00 PM', usage: 88, label: 'Evening Rush' },
              { time: '10:00 PM - 6:00 AM', usage: 25, label: 'Night Hours' }
            ].map((period, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{period.label}</div>
                  <div className="text-sm text-gray-600">{period.time}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${period.usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">{period.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};