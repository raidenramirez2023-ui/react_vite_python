import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, BarChart3, PieChart as PieChartIcon, 
  Calendar, Download, Filter, Users, Droplet, DollarSign, Clock,
  AlertCircle
} from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Sample data - directly in component (no API needed for now)
  const consumptionData = [
    { month: 'Jan', residential: 4000, commercial: 2400, industrial: 2400, government: 800 },
    { month: 'Feb', residential: 3000, commercial: 1398, industrial: 2210, government: 850 },
    { month: 'Mar', residential: 2000, commercial: 9800, industrial: 2290, government: 900 },
    { month: 'Apr', residential: 2780, commercial: 3908, industrial: 2000, government: 950 },
    { month: 'May', residential: 1890, commercial: 4800, industrial: 2181, government: 800 },
    { month: 'Jun', residential: 2390, commercial: 3800, industrial: 2500, government: 850 },
    { month: 'Jul', residential: 3490, commercial: 4300, industrial: 2100, government: 900 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4000000, target: 3800000 },
    { month: 'Feb', revenue: 3000000, target: 3500000 },
    { month: 'Mar', revenue: 4500000, target: 4200000 },
    { month: 'Apr', revenue: 3780000, target: 4000000 },
    { month: 'May', revenue: 3890000, target: 3900000 },
    { month: 'Jun', revenue: 4390000, target: 4300000 },
    { month: 'Jul', revenue: 3490000, target: 3800000 },
  ];

  const waterQualityData = [
    { day: 'Mon', ph: 7.2, chlorine: 0.5, turbidity: 0.8 },
    { day: 'Tue', ph: 7.4, chlorine: 0.6, turbidity: 0.7 },
    { day: 'Wed', ph: 7.3, chlorine: 0.55, turbidity: 0.9 },
    { day: 'Thu', ph: 7.5, chlorine: 0.65, turbidity: 0.6 },
    { day: 'Fri', ph: 7.4, chlorine: 0.58, turbidity: 0.7 },
    { day: 'Sat', ph: 7.6, chlorine: 0.62, turbidity: 0.8 },
    { day: 'Sun', ph: 7.3, chlorine: 0.59, turbidity: 0.75 },
  ];

  const serviceDistributionData = [
    { name: 'New Connections', value: 35, color: '#0088FE' },
    { name: 'Repairs', value: 25, color: '#00C49F' },
    { name: 'Billing Issues', value: 20, color: '#FFBB28' },
    { name: 'Meter Issues', value: 15, color: '#FF8042' },
    { name: 'Others', value: 5, color: '#8884D8' }
  ];

  const [metrics] = useState([
    { label: 'Total Consumption', value: '2.5M m³', change: '+12.5%', icon: <Droplet className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Revenue', value: '₱25.8M', change: '+8.3%', icon: <DollarSign className="text-green-500" />, color: 'bg-green-50' },
    { label: 'Active Customers', value: '15,842', change: '+4.2%', icon: <Users className="text-purple-500" />, color: 'bg-purple-50' },
    { label: 'Avg Response Time', value: '2.4 hrs', change: '-15%', icon: <Clock className="text-orange-500" />, color: 'bg-orange-50' }
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Format data based on time range
  const getFormattedData = () => {
    if (timeRange === 'weekly') {
      return consumptionData.slice(-7).map((item, index) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] || `Day ${index + 1}`,
        residential: item.residential * 0.9 + (Math.random() * 200),
        commercial: item.commercial * 0.85 + (Math.random() * 300),
        industrial: item.industrial * 0.95 + (Math.random() * 150)
      }));
    }
    return consumptionData;
  };

  const chartData = getFormattedData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const exportData = () => {
    const dataStr = JSON.stringify({
      consumptionData: chartData,
      revenueData,
      waterQualityData,
      serviceDistributionData
    }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `water-district-analytics-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BarChart3 size={32} className="text-blue-600" />
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 mt-2">Monitor water district performance and trends</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
            <Calendar size={18} className="text-gray-500" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-gray-700"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <button 
            onClick={exportData}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition shadow-sm"
          >
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-1">Using sample data for demonstration.</p>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className={`${metric.color} p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white rounded-xl shadow-xs">
                {metric.icon}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                metric.change.startsWith('+') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Water Consumption Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-600" />
              Water Consumption by Sector
            </h3>
            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
              {timeRange === 'weekly' ? 'Last 7 Days' : 'Monthly'}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={timeRange === 'weekly' ? 'day' : 'month'} 
                  tick={{ fill: '#4B5563' }}
                />
                <YAxis 
                  label={{ 
                    value: 'm³', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#4B5563' }
                  }}
                  tick={{ fill: '#4B5563' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} m³`, 'Consumption']}
                  labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="residential" 
                  name="Residential" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar 
                  dataKey="commercial" 
                  name="Commercial" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar 
                  dataKey="industrial" 
                  name="Industrial" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                {timeRange === 'monthly' && (
                  <Bar 
                    dataKey="government" 
                    name="Government" 
                    fill="#8B5CF6" 
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue vs Target Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <DollarSign size={24} className="text-green-600" />
              Revenue vs Target
            </h3>
            <span className="text-sm text-gray-500">Monthly (in millions)</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#4B5563' }}
                />
                <YAxis 
                  tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`}
                  tick={{ fill: '#4B5563' }}
                />
                <Tooltip 
                  formatter={(value) => [`₱${value.toLocaleString()}`, 'Amount']}
                  labelFormatter={(label) => `Month: ${label}`}
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Actual Revenue" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  name="Target Revenue" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.05}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Requests Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <PieChartIcon size={24} className="text-purple-600" />
              Service Requests Distribution
            </h3>
            <span className="text-sm text-gray-500 bg-purple-50 text-purple-700 px-3 py-1 rounded-lg">
              Total: 100 requests
            </span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}
                />
                <Legend 
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Quality Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Droplet size={24} className="text-cyan-600" />
              Water Quality Monitoring
            </h3>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={waterQualityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#4B5563' }}
                />
                <YAxis 
                  tick={{ fill: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ph" 
                  name="pH Level" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#3B82F6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="chlorine" 
                  name="Chlorine (ppm)" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="turbidity" 
                  name="Turbidity (NTU)" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#F59E0B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Detailed Consumption Data</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {timeRange === 'weekly' ? 'Day' : 'Month'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Residential (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commercial (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industrial (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Revenue (₱)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.map((row, index) => {
                const total = row.residential + row.commercial + row.industrial + (row.government || 0);
                const revenue = total * 35; // Sample calculation
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {timeRange === 'weekly' ? row.day : row.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">
                      {row.residential.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                      {row.commercial.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-orange-600 font-medium">
                      {row.industrial.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                      {total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-green-700">
                      ₱{revenue.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h4 className="font-bold text-gray-800">Consumption Trend</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Commercial sector consumption increased by 15% this month compared to last month.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <h4 className="font-bold text-gray-800">Revenue Performance</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Exceeded revenue target by 8.3% for Q2 2026. Strong performance in industrial sector.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h4 className="font-bold text-gray-800">Water Quality</h4>
            </div>
            <p className="text-gray-600 text-sm">
              All quality parameters within safe limits for the past 30 days. pH levels stable at 7.0-7.6.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}