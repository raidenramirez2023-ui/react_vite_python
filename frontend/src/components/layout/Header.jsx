import { Menu, X, Droplet, Clock } from 'lucide-react';

export default function Header({ menuOpen, setMenuOpen, currentTime }) {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-2 rounded-xl">
              <Droplet size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Santa Cruz Water District</h1>
              <p className="text-blue-100 text-sm flex items-center gap-1">
                <Clock size={14} /> {currentTime}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}