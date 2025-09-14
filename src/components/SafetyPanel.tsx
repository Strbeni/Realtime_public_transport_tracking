import React, { useState } from 'react';
import { Shield, Share2, Phone, MapPin, Clock, User, AlertTriangle } from 'lucide-react';
import { User as UserType, Bus, Route } from '../types';

interface SafetyPanelProps {
  user: UserType;
  activeBus: Bus | null;
  activeRoute: Route | null;
}

export const SafetyPanel: React.FC<SafetyPanelProps> = ({ user, activeBus, activeRoute }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');

  const handleShareRide = async () => {
    if (!activeBus || !activeRoute) return;
    
    setIsSharing(true);
    
    // Simulate sharing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const shareData = {
      busNumber: activeBus.number,
      route: activeRoute.name,
      currentLocation: `${activeBus.currentLat}, ${activeBus.currentLng}`,
      timestamp: new Date().toLocaleString(),
      driverName: 'John Smith', // This would come from driver data
      eta: activeBus.eta
    };
    
    // In a real app, this would send SMS/WhatsApp message
    console.log('Sharing ride data:', shareData);
    
    setIsSharing(false);
    alert('Ride details shared successfully with your emergency contact!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Shield className="h-8 w-8 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold">Safety & Emergency</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Share My Ride */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Share2 className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold">Share My Ride</h3>
          </div>
          
          {activeBus && activeRoute ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Current Trip Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Bus: {activeBus.number}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Route: {activeRoute.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>ETA: {activeBus.eta} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Driver: John Smith</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Emergency Contact
                </label>
                <select
                  value={selectedContact}
                  onChange={(e) => setSelectedContact(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose contact...</option>
                  {user.emergencyContacts?.map(contact => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name} ({contact.relationship}) - {contact.phone}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleShareRide}
                disabled={!selectedContact || isSharing}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center"
              >
                {isSharing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Ride Details
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No active trip to share</p>
              <p className="text-sm text-gray-500 mt-2">Start tracking a bus to share your ride</p>
            </div>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-xl font-semibold">Emergency Contacts</h3>
            </div>
            <button className="text-blue-600 text-sm hover:underline">
              Add Contact
            </button>
          </div>
          
          <div className="space-y-3">
            {user.emergencyContacts?.map(contact => (
              <div key={contact.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <p className="text-sm text-gray-800 mt-1">{contact.phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-center py-6">
                <Phone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No emergency contacts added</p>
                <button className="text-blue-600 text-sm hover:underline mt-2">
                  Add your first contact
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
            <h3 className="text-xl font-semibold">Safety Tips</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">During Your Trip</h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Share your ride details with trusted contacts</li>
                  <li>• Stay alert and aware of your surroundings</li>
                  <li>• Keep your phone charged and accessible</li>
                  <li>• Trust your instincts - if something feels wrong, it probably is</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Using the App</h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Always track your bus in real-time</li>
                  <li>• Use the Share My Ride feature for night trips</li>
                  <li>• Report any issues immediately through the app</li>
                  <li>• Keep your emergency contacts updated</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Emergency Situations</h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• Call local emergency services (911) immediately</li>
                  <li>• Use the SOS feature to alert your contacts</li>
                  <li>• Stay on the line and provide your location</li>
                  <li>• Report incidents to transport authorities</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Phone className="h-5 w-5 text-red-600 mr-2" />
                  <span className="font-semibold text-red-800">Emergency Hotline</span>
                </div>
                <div className="text-2xl font-bold text-red-600">911</div>
                <div className="text-sm text-red-700">Available 24/7 for all emergencies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};