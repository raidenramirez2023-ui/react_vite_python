import { Shield, CheckCircle } from 'lucide-react';

export default function ServiceInfo() {
  const serviceTypes = [
    { id: 'new_connection', label: 'New Connection', icon: null },
    { id: 'repair', label: 'Pipe Repair', icon: null },
    { id: 'meter', label: 'Meter Installation', icon: null },
    { id: 'billing', label: 'Billing Inquiry', icon: null },
    { id: 'complaint', label: 'Service Complaint', icon: null }
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Shield size={20} className="text-blue-600" />
          Service Information
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">24-48 hour response time</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">No service fee for basic requests</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Track request status online</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Emergency services available</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Service Types</h3>
        <div className="space-y-3">
          {serviceTypes.map(type => (
            <div 
              key={type.id}
              className="p-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-gray-100">
                  {type.icon}
                </div>
                <span className="font-medium">{type.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}