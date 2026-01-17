import { Users, Droplet, FileText, CheckCircle, ChevronRight } from 'lucide-react';

export default function StatsCards({ stats }) {
  const statItems = [
    { label: 'Total Customers', value: stats.totalCustomers || '15,842', icon: <Users className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Daily Consumption', value: stats.dailyConsumption || '2.5M', icon: <Droplet className="text-green-500" />, bg: 'bg-green-50' },
    { label: 'Active Requests', value: stats.serviceRequests || '128', icon: <FileText className="text-orange-500" />, bg: 'bg-orange-50' },
    { label: 'Satisfaction Rate', value: stats.satisfactionRate || '94%', icon: <CheckCircle className="text-purple-500" />, bg: 'bg-purple-50' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, idx) => (
        <div key={idx} className={`${stat.bg} p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-[1.02]`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              {stat.icon}
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
          <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}