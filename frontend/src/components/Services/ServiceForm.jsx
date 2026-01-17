import { useState } from 'react';
import { FileText } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';

export default function ServiceForm({ onSubmitSuccess }) {
  const [serviceRequest, setServiceRequest] = useState({
    name: '', 
    email: '', 
    phone: '', 
    address: '', 
    service_type: 'new_connection', 
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const serviceTypes = [
    { id: 'new_connection', label: 'New Connection' },
    { id: 'repair', label: 'Pipe Repair' },
    { id: 'meter', label: 'Meter Installation' },
    { id: 'billing', label: 'Billing Inquiry' },
    { id: 'complaint', label: 'Service Complaint' },
    { id: 'others', label: 'Others' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!serviceRequest.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!serviceRequest.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(serviceRequest.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!serviceRequest.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!serviceRequest.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      onSubmitSuccess('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Submitting service request:', serviceRequest);
      
      const response = await fetch(`${API_BASE_URL}/api/service-request`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceRequest)
      });
      
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to submit request`);
      }
      
      if (data.success) {
        const successMessage = `✅ Request submitted successfully! Reference ID: ${data.reference_number}`;
        onSubmitSuccess(successMessage);
        
        // Reset form
        setServiceRequest({
          name: '', email: '', phone: '', address: '', 
          service_type: 'new_connection', message: ''
        });
        setErrors({});
        
        setTimeout(() => onSubmitSuccess(''), 5000);
      } else {
        throw new Error(data.message || 'Request failed');
      }
      
    } catch (error) {
      console.error('Error submitting request:', error);
      onSubmitSuccess(`❌ Error: ${error.message || 'Failed to submit request'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FileText size={32} className="text-blue-600" />
        Service Request Form
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
            <input
              type="text"
              value={serviceRequest.name}
              onChange={(e) => setServiceRequest(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
            <input
              type="email"
              value={serviceRequest.email}
              onChange={(e) => setServiceRequest(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
            <input
              type="tel"
              value={serviceRequest.phone}
              onChange={(e) => setServiceRequest(prev => ({ ...prev, phone: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
              disabled={loading}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Service Type *</label>
            <select
              value={serviceRequest.service_type}
              onChange={(e) => setServiceRequest(prev => ({ ...prev, service_type: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              disabled={loading}
            >
              {serviceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Address *</label>
          <input
            type="text"
            value={serviceRequest.address}
            onChange={(e) => setServiceRequest(prev => ({ ...prev, address: e.target.value }))}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your complete address"
            disabled={loading}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Additional Details</label>
          <textarea
            value={serviceRequest.message}
            onChange={(e) => setServiceRequest(prev => ({ ...prev, message: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition h-32"
            placeholder="Describe your request in detail..."
            disabled={loading}
          />
          <p className="text-gray-500 text-sm mt-1">Optional: Provide more details about your request</p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <FileText size={20} />
              Submit Service Request
            </>
          )}
        </button>
        
        <div className="text-center text-gray-500 text-sm">
          <p>We'll respond to your request within 24-48 hours.</p>
          <p>For emergencies, call (02) 8888-9999</p>
        </div>
      </form>
    </div>
  );
}