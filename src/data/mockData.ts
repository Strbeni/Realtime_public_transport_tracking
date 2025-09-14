import { Bus, Route, BusStop, Driver, User, Grievance } from '../types';

export const mockStops: BusStop[] = [
  { id: '1', name: 'City Center', lat: 40.7128, lng: -74.0060, routes: ['101', '102'], status: 'covered' },
  { id: '2', name: 'Railway Station', lat: 40.7580, lng: -73.9855, routes: ['101', '103'], status: 'to_be_covered' },
  { id: '3', name: 'Hospital', lat: 40.7489, lng: -73.9680, routes: ['102', '103'], status: 'covered' },
  { id: '4', name: 'University', lat: 40.7282, lng: -73.9942, routes: ['101', '102'], status: 'to_be_covered' },
  { id: '5', name: 'Shopping Mall', lat: 40.7349, lng: -74.0020, routes: ['102', '103'], status: 'covered' },
  { id: '6', name: 'Airport', lat: 40.6892, lng: -74.1745, routes: ['103'], status: 'to_be_covered' },
];

export const mockRoutes: Route[] = [
  {
    id: '101',
    number: '101',
    name: 'City Center - University',
    stops: [mockStops[0], mockStops[1], mockStops[3]],
    startTime: '06:00',
    endTime: '22:00',
    frequency: 15,
    fare: 2.50,
    distance: 12.5
  },
  {
    id: '102',
    number: '102',
    name: 'Hospital - Shopping Mall',
    stops: [mockStops[2], mockStops[0], mockStops[4], mockStops[3]],
    startTime: '05:30',
    endTime: '23:00',
    frequency: 20,
    fare: 3.00,
    distance: 18.2
  },
  {
    id: '103',
    number: '103',
    name: 'Railway - Airport Express',
    stops: [mockStops[1], mockStops[2], mockStops[4], mockStops[5]],
    startTime: '05:00',
    endTime: '23:30',
    frequency: 30,
    fare: 5.00,
    distance: 28.7
  }
];

export const mockDrivers: Driver[] = [
  { id: '1', name: 'John Smith', phone: '+1234567890', licenseNumber: 'DL123456', rating: 4.8, onTimePercentage: 95, totalTrips: 1240 },
  { id: '2', name: 'Maria Garcia', phone: '+1234567891', licenseNumber: 'DL123457', rating: 4.9, onTimePercentage: 97, totalTrips: 980 },
  { id: '3', name: 'David Johnson', phone: '+1234567892', licenseNumber: 'DL123458', rating: 4.6, onTimePercentage: 92, totalTrips: 1580 },
  { id: '4', name: 'Sarah Wilson', phone: '+1234567893', licenseNumber: 'DL123459', rating: 4.7, onTimePercentage: 94, totalTrips: 760 },
];

export const mockBuses: Bus[] = [
  {
    id: '1',
    number: 'BT-101-A',
    routeId: '101',
    driverId: '1',
    currentLat: 40.7128,
    currentLng: -74.0060,
    speed: 25,
    status: 'running',
    passengers: 18,
    capacity: 50,
    nextStopId: '2',
    eta: 8
  },
  {
    id: '2',
    number: 'BT-102-B',
    routeId: '102',
    driverId: '2',
    currentLat: 40.7489,
    currentLng: -73.9680,
    speed: 0,
    status: 'breakdown',
    passengers: 12,
    capacity: 50,
    nextStopId: '1',
    eta: 0
  },
  {
    id: '3',
    number: 'BT-103-C',
    routeId: '103',
    driverId: '3',
    currentLat: 40.7580,
    currentLng: -73.9855,
    speed: 35,
    status: 'delayed',
    passengers: 32,
    capacity: 60,
    nextStopId: '3',
    eta: 12
  }
];

export const mockGrievances: Grievance[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Bus 101-A arrived 15 minutes late',
    description: 'The bus was consistently late for the past week during morning hours.',
    category: 'delay',
    status: 'open',
    priority: 'medium',
    createdAt: new Date('2024-01-15T08:30:00'),
  },
  {
    id: '2',
    userId: 'user2',
    title: 'Driver behavior - Route 102',
    description: 'Driver was using phone while driving and skipped a bus stop.',
    category: 'driver_behavior',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date('2024-01-14T16:45:00'),
    assignedTo: 'supervisor1'
  },
  {
    id: '3',
    userId: 'user3',
    title: 'Bus condition poor - AC not working',
    description: 'Air conditioning system in bus 103-C has not been working for several days.',
    category: 'bus_condition',
    status: 'resolved',
    priority: 'medium',
    createdAt: new Date('2024-01-12T11:20:00'),
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'user',
    phone: '+1234567890',
    emergencyContacts: [
      { id: '1', name: 'Bob Johnson', phone: '+1234567891', relationship: 'Spouse' }
    ]
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@boltransit.com',
    role: 'super_admin'
  },
  {
    id: 'municipal1',
    name: 'Municipal Admin',
    email: 'municipal@city.gov',
    role: 'municipal_admin'
  }
];