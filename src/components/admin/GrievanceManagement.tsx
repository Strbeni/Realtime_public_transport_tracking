import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, MessageSquare, User, Calendar } from 'lucide-react';
import { User as UserType } from '../../types';
import { mockGrievances } from '../../data/mockData';

interface GrievanceManagementProps {
  user: UserType;
}

export const GrievanceManagement: React.FC<GrievanceManagementProps> = ({ user }) => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved' | 'closed'>('all');
  const [selectedGrievance, setSelectedGrievance] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'delay': return Clock;
      case 'driver_behavior': return User;
      case 'bus_condition': return AlertTriangle;
      default: return MessageSquare;
    }
  };

  const filteredGrievances = selectedStatus === 'all' 
    ? mockGrievances 
    : mockGrievances.filter(g => g.status === selectedStatus);

  const statusCounts = {
    all: mockGrievances.length,
    open: mockGrievances.filter(g => g.status === 'open').length,
    in_progress: mockGrievances.filter(g => g.status === 'in_progress').length,
    resolved: mockGrievances.filter(g => g.status === 'resolved').length,
    closed: mockGrievances.filter(g => g.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Grievance Management</h1>
            <p className="text-gray-600">Manage and resolve customer complaints and feedback</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-red-600">{statusCounts.open}</div>
                <div className="text-xs text-gray-600">Open</div>
              </div>
              <div>
                <div className="text-xl font-bold text-yellow-600">{statusCounts.in_progress}</div>
                <div className="text-xs text-gray-600">In Progress</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">{statusCounts.resolved}</div>
                <div className="text-xs text-gray-600">Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: `All (${statusCounts.all})` },
            { key: 'open', label: `Open (${statusCounts.open})` },
            { key: 'in_progress', label: `In Progress (${statusCounts.in_progress})` },
            { key: 'resolved', label: `Resolved (${statusCounts.resolved})` },
            { key: 'closed', label: `Closed (${statusCounts.closed})` }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedStatus(key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Grievances List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Grievances</h2>
            </div>
            
            <div className="divide-y max-h-96 overflow-y-auto">
              {filteredGrievances.map(grievance => {
                const CategoryIcon = getCategoryIcon(grievance.category);
                
                return (
                  <div 
                    key={grievance.id} 
                    className={`p-6 hover:bg-gray-50 cursor-pointer ${
                      selectedGrievance === grievance.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedGrievance(selectedGrievance === grievance.id ? null : grievance.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 rounded-lg p-2">
                          <CategoryIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{grievance.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{grievance.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{grievance.createdAt.toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>ID: {grievance.userId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(grievance.status)}`}>
                          {grievance.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <div className={`mt-2 text-sm font-medium ${getPriorityColor(grievance.priority)}`}>
                          {grievance.priority.charAt(0).toUpperCase() + grievance.priority.slice(1)} Priority
                        </div>
                      </div>
                    </div>
                    
                    {selectedGrievance === grievance.id && (
                      <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 px-6 rounded-b-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Details</h4>
                            <div className="space-y-2 text-sm">
                              <div><span className="font-medium">Category:</span> {grievance.category.replace('_', ' ')}</div>
                              <div><span className="font-medium">Priority:</span> {grievance.priority}</div>
                              <div><span className="font-medium">Created:</span> {grievance.createdAt.toLocaleString()}</div>
                              {grievance.assignedTo && (
                                <div><span className="font-medium">Assigned to:</span> {grievance.assignedTo}</div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Actions</h4>
                            <div className="space-y-2">
                              {grievance.status === 'open' && (
                                <button className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 text-sm">
                                  Assign to Team
                                </button>
                              )}
                              {grievance.status === 'in_progress' && (
                                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm">
                                  Mark Resolved
                                </button>
                              )}
                              <div className="grid grid-cols-2 gap-2">
                                <button className="bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200 text-sm">
                                  Contact User
                                </button>
                                <button className="bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 text-sm">
                                  Add Note
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

        {/* Statistics & Quick Actions */}
        <div className="space-y-6">
          {/* Grievance Statistics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">This Month</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Grievances</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolved</span>
                <span className="font-semibold text-green-600">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Resolution Time</span>
                <span className="font-semibold">2.3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-semibold">4.2/5</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-sm text-gray-600 mb-2">Resolution Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <div className="text-right text-xs text-gray-500 mt-1">68%</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {[
                { category: 'Delay', count: 18, color: 'bg-yellow-500' },
                { category: 'Driver Behavior', count: 12, color: 'bg-red-500' },
                { category: 'Bus Condition', count: 9, color: 'bg-blue-500' },
                { category: 'Other', count: 8, color: 'bg-gray-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-red-50 text-red-700 p-3 rounded-lg hover:bg-red-100 transition-colors text-left">
                <AlertTriangle className="h-5 w-5 inline mr-2" />
                View High Priority ({mockGrievances.filter(g => g.priority === 'high').length})
              </button>
              <button className="w-full bg-yellow-50 text-yellow-700 p-3 rounded-lg hover:bg-yellow-100 transition-colors text-left">
                <Clock className="h-5 w-5 inline mr-2" />
                Overdue Items (3)
              </button>
              <button className="w-full bg-green-50 text-green-700 p-3 rounded-lg hover:bg-green-100 transition-colors text-left">
                <CheckCircle className="h-5 w-5 inline mr-2" />
                Recently Resolved (8)
              </button>
              <button className="w-full bg-blue-50 text-blue-700 p-3 rounded-lg hover:bg-blue-100 transition-colors text-left">
                <MessageSquare className="h-5 w-5 inline mr-2" />
                Send Updates (5)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};