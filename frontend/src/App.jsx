import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import Analytics from './components/Analytics/Analytics';
import Announcements from './components/Announcements/Announcements';
import BillCalculator from './components/Calculator/BillCalculator';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import About from './components/About/About';

export default function WaterDistrictApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [announcements, setAnnouncements] = useState([]);
  const [stats, setStats] = useState({});
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    // Load initial data
    fetchAnnouncements();
    fetchStats();
    
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));
  };

  const fetchAnnouncements = async () => {
    try {
      // Using sample data
      setAnnouncements([
        { id: 1, title: "Scheduled Water Interruption", content: "Water service will be interrupted on Jan 20, 2026 from 8:00 AM to 4:00 PM for system maintenance in Zone 3.", date: "2026-01-15", type: "maintenance", priority: "high" },
        { id: 2, title: "New Payment Center Opening", content: "A new payment center opens Jan 25, 2026 at Santa Cruz Town Center. Enjoy extended hours until 7:00 PM.", date: "2026-01-10", type: "news", priority: "medium" },
        { id: 3, title: "Water Quality Report Available", content: "Annual water quality report for 2025 is now available for download. Meeting all safety standards.", date: "2026-01-05", type: "info", priority: "low" }
      ]);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Using sample data
      setStats({
        totalCustomers: '15,842',
        dailyConsumption: '2.5M',
        serviceRequests: '128',
        satisfactionRate: '94%',
        revenue_today: '₱950,000',
        water_pressure: '52 psi',
        system_efficiency: '92%',
        response_time: '2.8 hrs'
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const navigateTo = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Dashboard stats={stats} navigateTo={navigateTo} />;
      case 'analytics':
        return <Analytics />;
      case 'announcements':
        return <Announcements announcements={announcements} />;
      case 'calculator':
        return <BillCalculator />;
      case 'services':
        return <Services />;
      case 'contact':
        return <Contact />;
      case 'about':
        return <About />;
      default:
        return <Dashboard stats={stats} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        currentTime={currentTime} 
      />
      
      <Navigation 
        menuOpen={menuOpen} 
        activeSection={activeSection} 
        navigateTo={navigateTo}
        announcementsCount={announcements.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>
      
      <Footer />
    </div>
  );
}