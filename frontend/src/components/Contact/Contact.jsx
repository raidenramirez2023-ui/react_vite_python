import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    { icon: <Phone className="text-blue-600" />, title: 'Phone Numbers', items: ['Emergency: (02) 8888-9999', 'Office: (02) 7777-8888', 'Hotline: 165-MAYNILAD'] },
    { icon: <Mail className="text-green-600" />, title: 'Email Addresses', items: ['Support: support@waterdistrict.gov.ph', 'Billing: billing@waterdistrict.gov.ph', 'Emergency: emergency@waterdistrict.gov.ph'] },
    { icon: <MapPin className="text-red-600" />, title: 'Office Locations', items: ['Main Office: Santa Cruz, Laguna', 'Branch: Calamba City', 'Branch: San Pablo City'] },
    { icon: <Clock className="text-purple-600" />, title: 'Business Hours', items: ['Monday-Friday: 8:00 AM - 5:00 PM', 'Saturday: 8:00 AM - 12:00 PM', 'Emergency: 24/7 Available'] }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
      <p className="text-gray-600 mb-8">Get in touch with our team for any inquiries or concerns</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare size={24} className="text-blue-600" />
              Send us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
          <div className="space-y-6">
            {contactInfo.map((section, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg">
                    {section.icon}
                  </div>
                  <h4 className="font-bold text-gray-800">{section.title}</h4>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-600 text-sm pl-2">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}