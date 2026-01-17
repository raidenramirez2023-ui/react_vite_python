import { useState } from 'react';
import ServiceForm from './ServiceForm';
import ServiceInfo from './ServiceInfo';

const API_BASE_URL = 'http://localhost:5000';

export default function Services() {
  const [submitMessage, setSubmitMessage] = useState('');
  
  const handleFormSubmit = (message) => {
    setSubmitMessage(message);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ServiceForm onSubmitSuccess={handleFormSubmit} />
      </div>
      
      <div className="space-y-6">
        <ServiceInfo />
        {submitMessage && (
          <div className={`p-4 rounded-lg ${submitMessage.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
}