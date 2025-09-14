export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'super_admin' | 'municipal_admin' | 'operator_admin';
  phone?: string;
  emergencyContacts?: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface Bus {
  id: string;
  number: string;
  routeId: string;
  driverId: string;
  currentLat: number;
  currentLng: number;
  speed: number;
  status: 'running' | 'scheduled' | 'breakdown' | 'delayed';
  passengers: number;
  capacity: number;
  nextStopId: string;
  eta: number; // minutes
}

export interface Route {
  id: string;
  number: string;
  name: string;
  stops: BusStop[];
  startTime: string;
  endTime: string;
  frequency: number; // minutes
  fare: number;
  distance: number;
}

export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
  status: 'covered' | 'to_be_covered' | 'missed';
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  rating: number;
  onTimePercentage: number;
  totalTrips: number;
}

export interface Trip {
  id: string;
  userId: string;
  busId: string;
  routeId: string;
  startStopId: string;
  endStopId: string;
  startTime: Date;
  endTime?: Date;
  fare: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Grievance {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'delay' | 'driver_behavior' | 'bus_condition' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  assignedTo?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetAudience: 'all' | 'route_specific' | 'user_specific';
  routeId?: string;
  userId?: string;
  createdAt: Date;
  expiresAt?: Date;
}