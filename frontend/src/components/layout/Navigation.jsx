import { Home, Bell, Calculator, FileText, Phone, Users, BarChart3 } from 'lucide-react';

export default function Navigation({ menuOpen, activeSection, navigateTo, announcementsCount }) {
  const navItems = [
    { name: 'Dashboard', icon: <Home size={18} />, key: 'home' },
    { name: 'Analytics', icon: <BarChart3 size={18} />, key: 'analytics' },
    { name: 'Announcements', icon: <Bell size={18} />, key: 'announcements', badge: announcementsCount },
    { name: 'Bill Calculator', icon: <Calculator size={18} />, key: 'calculator' },
    { name: 'Services', icon: <FileText size={18} />, key: 'services' },
    { name: 'Contact', icon: <Phone size={18} />, key: 'contact' },
    { name: 'About', icon: <Users size={18} />, key: 'about' }
  ];

  return (
    <nav className={`bg-white/95 backdrop-blur-sm shadow-lg lg:block ${menuOpen ? 'block' : 'hidden'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-1 py-3">
          {navItems.map((btn) => (
            <button
              key={btn.key}
              onClick={() => navigateTo(btn.key)}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 relative
                ${activeSection === btn.key 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
            >
              {btn.icon}
              <span>{btn.name}</span>
              {btn.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {btn.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}