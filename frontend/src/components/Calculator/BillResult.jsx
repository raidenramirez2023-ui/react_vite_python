import { CheckCircle, Calendar, Receipt } from 'lucide-react';

export default function BillResult({ billResult }) {
  if (!billResult) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CheckCircle className="text-green-500" />
        Bill Calculation Results
      </h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">Consumption</p>
            <p className="text-xl font-bold text-gray-800">{billResult.consumption} m³</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">Customer Type</p>
            <p className="text-xl font-bold text-gray-800 capitalize">{billResult.customer_type}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Receipt size={18} />
            Bill Breakdown
          </h4>
          <div className="space-y-2">
            {billResult.breakdown && billResult.breakdown.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Total Amount Due</p>
              <p className="text-3xl font-bold">₱{billResult.total_bill?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Calendar size={16} className="text-blue-200" />
                <p className="text-blue-100 text-sm">Due Date</p>
              </div>
              <p className="font-semibold">15th of next month</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}