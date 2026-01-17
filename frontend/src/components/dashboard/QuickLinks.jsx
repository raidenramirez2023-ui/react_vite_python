import { Upload, Download, AlertCircle, ExternalLink } from 'lucide-react';

export default function QuickLinks() {
  const quickLinks = [
    { title: 'Pay Online', desc: 'Secure payment portal', icon: <Upload size={24} />, color: 'from-green-500 to-emerald-600' },
    { title: 'Download Forms', desc: 'Application forms & documents', icon: <Download size={24} />, color: 'from-purple-500 to-purple-600' },
    { title: 'Report Issue', desc: '24/7 emergency hotline', icon: <AlertCircle size={24} />, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((service, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${service.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                {service.icon}
              </div>
              <ExternalLink size={20} className="opacity-80" />
            </div>
            <h4 className="text-xl font-bold mb-2">{service.title}</h4>
            <p className="text-blue-100">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}