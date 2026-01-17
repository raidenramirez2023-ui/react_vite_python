import { Calculator, FileText, BarChart3 } from 'lucide-react';
import StatsCards from './StatsCards';
import QuickLinks from './QuickLinks';

export default function Dashboard({ stats, navigateTo, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 size={24} /> System Overview
        </h2>
        <StatsCards stats={stats} />
      </div>

      <div className="space-y-12">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Clean Water for a <span className="text-blue-600">Healthier</span> Community
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Providing safe, reliable, and affordable water services to Santa Cruz and surrounding communities since 1985.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigateTo('calculator')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Calculator size={20} /> Calculate Your Bill
              </button>
              <button 
                onClick={() => navigateTo('services')}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
              >
                <FileText size={20} /> Request Service
              </button>
            </div>
          </div>
        </div>

        <QuickLinks />
      </div>
    </>
  );
}