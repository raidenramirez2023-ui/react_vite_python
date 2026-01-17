import { Droplet, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Droplet size={24} />
              </div>
              <h3 className="text-xl font-bold">Santa Cruz Water District</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Providing safe and reliable water services to our community since 1985.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>(+63) 912-345-6789</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>contact@santacruzwd.gov.ph</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Santa Cruz Main Office, Laguna</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Water Quality Report', 'Payment Options', 'Service Areas', 'Careers', 'FAQs'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-400 hover:text-white transition hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Business Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Monday-Friday: 8:00 AM - 5:00 PM</li>
              <li>Saturday: 8:00 AM - 12:00 PM</li>
              <li>Emergency: 24/7 Available</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2026 Santa Cruz Water District. All rights reserved.</p>
          <p className="mt-2 text-sm">Committed to excellence in water service delivery</p>
        </div>
      </div>
    </footer>
  );
}