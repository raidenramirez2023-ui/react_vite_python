import { useState } from 'react';
import { Calculator, Droplet, Home, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function BillCalculator() {
  const [calculatorState, setCalculatorState] = useState({
    consumption: '',
    customerType: 'residential',
    billResult: null,
    loading: false,
    error: null
  });

  const waterRates = {
    residential: {
      base: 120.00,
      tiers: [
        { range: '0-10', rate: 180.00, description: 'First 10 cu.m (fixed)' },
        { range: '11-20', rate: 22.50, description: 'Per cu.m' },
        { range: '21-30', rate: 28.00, description: 'Per cu.m' },
        { range: '31+', rate: 35.00, description: 'Per cu.m' }
      ]
    },
    commercial: {
      base: 250.00,
      tiers: [
        { range: '0-20', rate: 450.00, description: 'First 20 cu.m (fixed)' },
        { range: '21-40', rate: 40.00, description: 'Per cu.m' },
        { range: '41-60', rate: 45.00, description: 'Per cu.m' },
        { range: '61+', rate: 50.00, description: 'Per cu.m' }
      ]
    }
  };

  const calculateBill = () => {
    // Reset state
    setCalculatorState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null, 
      billResult: null 
    }));

    try {
      const consumption = parseFloat(calculatorState.consumption);
      
      // Validate input
      if (!consumption || consumption <= 0 || isNaN(consumption)) {
        throw new Error('Please enter a valid consumption amount (greater than 0)');
      }
      
      if (consumption > 1000) {
        throw new Error('Consumption seems too high. Please verify your input.');
      }

      const rates = waterRates[calculatorState.customerType];
      let total = rates.base;
      let breakdown = [];
      let details = [];
      
      // Add base fee
      details.push({ item: 'Base Fee', amount: rates.base, description: 'Monthly service charge' });
      breakdown.push(`Base Fee: ₱${rates.base.toFixed(2)}`);
      
      if (calculatorState.customerType === 'residential') {
        if (consumption <= 10) {
          total += rates.tiers[0].rate;
          details.push({ 
            item: 'Tier 1 (0-10 cu.m)', 
            amount: rates.tiers[0].rate, 
            description: 'Fixed rate for first 10 cubic meters' 
          });
          breakdown.push(`First 10 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
        } else if (consumption <= 20) {
          total += rates.tiers[0].rate;
          const tier2Amount = (consumption - 10) * rates.tiers[1].rate;
          total += tier2Amount;
          
          details.push({ 
            item: 'Tier 1 (0-10 cu.m)', 
            amount: rates.tiers[0].rate, 
            description: 'Fixed rate' 
          });
          details.push({ 
            item: `Tier 2 (11-20 cu.m)`, 
            amount: tier2Amount, 
            description: `${consumption-10} cu.m × ₱${rates.tiers[1].rate}` 
          });
          
          breakdown.push(`First 10 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
          breakdown.push(`Next ${consumption-10} cu.m: ₱${tier2Amount.toFixed(2)}`);
        } else if (consumption <= 30) {
          total += rates.tiers[0].rate;
          const tier2Amount = 10 * rates.tiers[1].rate;
          const tier3Amount = (consumption - 20) * rates.tiers[2].rate;
          total += tier2Amount + tier3Amount;
          
          details.push({ item: 'Tier 1 (0-10 cu.m)', amount: rates.tiers[0].rate, description: 'Fixed rate' });
          details.push({ item: 'Tier 2 (11-20 cu.m)', amount: tier2Amount, description: '10 cu.m × ₱22.50' });
          details.push({ 
            item: `Tier 3 (21-30 cu.m)`, 
            amount: tier3Amount, 
            description: `${consumption-20} cu.m × ₱${rates.tiers[2].rate}` 
          });
          
          breakdown.push(`First 10 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
          breakdown.push(`Next 10 cu.m: ₱${tier2Amount.toFixed(2)}`);
          breakdown.push(`Next ${consumption-20} cu.m: ₱${tier3Amount.toFixed(2)}`);
        } else {
          total += rates.tiers[0].rate;
          const tier2Amount = 10 * rates.tiers[1].rate;
          const tier3Amount = 10 * rates.tiers[2].rate;
          const tier4Amount = (consumption - 30) * rates.tiers[3].rate;
          total += tier2Amount + tier3Amount + tier4Amount;
          
          details.push({ item: 'Tier 1 (0-10 cu.m)', amount: rates.tiers[0].rate, description: 'Fixed rate' });
          details.push({ item: 'Tier 2 (11-20 cu.m)', amount: tier2Amount, description: '10 cu.m × ₱22.50' });
          details.push({ item: 'Tier 3 (21-30 cu.m)', amount: tier3Amount, description: '10 cu.m × ₱28.00' });
          details.push({ 
            item: `Tier 4 (31+ cu.m)`, 
            amount: tier4Amount, 
            description: `${consumption-30} cu.m × ₱${rates.tiers[3].rate}` 
          });
          
          breakdown.push(`First 10 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
          breakdown.push(`Next 10 cu.m: ₱${tier2Amount.toFixed(2)}`);
          breakdown.push(`Next 10 cu.m: ₱${tier3Amount.toFixed(2)}`);
          breakdown.push(`Remaining ${consumption-30} cu.m: ₱${tier4Amount.toFixed(2)}`);
        }
        
        // Add environmental fee (5%)
        const envFee = total * 0.05;
        total += envFee;
        details.push({ item: 'Environmental Fee', amount: envFee, description: '5% of subtotal' });
        breakdown.push(`Environmental Fee (5%): ₱${envFee.toFixed(2)}`);
      } else {
        // Commercial calculation
        if (consumption <= 20) {
          total += rates.tiers[0].rate;
          details.push({ 
            item: 'Tier 1 (0-20 cu.m)', 
            amount: rates.tiers[0].rate, 
            description: 'Fixed rate for first 20 cubic meters' 
          });
          breakdown.push(`First 20 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
        } else if (consumption <= 40) {
          total += rates.tiers[0].rate;
          const tier2Amount = (consumption - 20) * rates.tiers[1].rate;
          total += tier2Amount;
          
          details.push({ item: 'Tier 1 (0-20 cu.m)', amount: rates.tiers[0].rate, description: 'Fixed rate' });
          details.push({ 
            item: `Tier 2 (21-40 cu.m)`, 
            amount: tier2Amount, 
            description: `${consumption-20} cu.m × ₱${rates.tiers[1].rate}` 
          });
          
          breakdown.push(`First 20 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
          breakdown.push(`Next ${consumption-20} cu.m: ₱${tier2Amount.toFixed(2)}`);
        } else if (consumption <= 60) {
          total += rates.tiers[0].rate;
          const tier2Amount = 20 * rates.tiers[1].rate;
          const tier3Amount = (consumption - 40) * rates.tiers[2].rate;
          total += tier2Amount + tier3Amount;
          
          details.push({ item: 'Tier 1 (0-20 cu.m)', amount: rates.tiers[0].rate, description: 'Fixed rate' });
          details.push({ item: 'Tier 2 (21-40 cu.m)', amount: tier2Amount, description: '20 cu.m × ₱40.00' });
          details.push({ 
            item: `Tier 3 (41-60 cu.m)`, 
            amount: tier3Amount, 
            description: `${consumption-40} cu.m × ₱${rates.tiers[2].rate}` 
          });
          
          breakdown.push(`First 20 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
          breakdown.push(`Next 20 cu.m: ₱${tier2Amount.toFixed(2)}`);
          breakdown.push(`Next ${consumption-40} cu.m: ₱${tier3Amount.toFixed(2)}`);
        } else {
          total += rates.tiers[0].rate;
          const tier2Amount = 20 * rates.tiers[1].rate;
          const tier3Amount = 20 * rates.tiers[2].rate;
          const tier4Amount = (consumption - 60) * rates.tiers[3].rate;
          total += tier2Amount + tier3Amount + tier4Amount;
          
          details.push({ item: 'Tier 1 (0-20 cu.m)', amount: rates.tiers[0].rate, description: 'Fixed rate' });
          details.push({ item: 'Tier 2 (21-40 cu.m)', amount: tier2Amount, description: '20 cu.m × ₱40.00' });
          details.push({ item: 'Tier 3 (41-60 cu.m)', amount: tier3Amount, description: '20 cu.m × ₱45.00' });
          details.push({ 
            item: `Tier 4 (61+ cu.m)`, 
            amount: tier4Amount, 
            description: `${consumption-60} cu.m × ₱${rates.tiers[3].rate}` 
          });
          
          breakdown.push(`First 20 cu.m: ₱${rates.tiers[0].rate.toFixed(2)}`);
          breakdown.push(`Next 20 cu.m: ₱${tier2Amount.toFixed(2)}`);
          breakdown.push(`Next 20 cu.m: ₱${tier3Amount.toFixed(2)}`);
          breakdown.push(`Remaining ${consumption-60} cu.m: ₱${tier4Amount.toFixed(2)}`);
        }
        
        // Add VAT for commercial (12%)
        const vat = total * 0.12;
        total += vat;
        details.push({ item: 'VAT (12%)', amount: vat, description: 'Value Added Tax' });
        breakdown.push(`VAT (12%): ₱${vat.toFixed(2)}`);
      }

      // Create result object
      const result = {
        success: true,
        consumption: consumption,
        customer_type: calculatorState.customerType,
        total_bill: parseFloat(total.toFixed(2)),
        breakdown: breakdown,
        details: details,
        calculation_date: new Date().toISOString(),
        due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      // Add small delay for better UX
      setTimeout(() => {
        setCalculatorState(prev => ({ 
          ...prev, 
          billResult: result, 
          loading: false 
        }));
      }, 500);

    } catch (err) {
      setTimeout(() => {
        setCalculatorState(prev => ({ 
          ...prev, 
          loading: false, 
          error: err.message,
          billResult: null
        }));
      }, 500);
    }
  };

  const handleConsumptionChange = (value) => {
    // Allow only numbers and one decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCalculatorState(prev => ({ 
        ...prev, 
        consumption: value,
        error: null,
        billResult: null
      }));
    }
  };

  const resetCalculator = () => {
    setCalculatorState({
      consumption: '',
      customerType: 'residential',
      billResult: null,
      loading: false,
      error: null
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Calculator size={32} />
          Water Bill Calculator
        </h2>
        <p className="text-blue-100 mt-2">Estimate your monthly water bill quickly and accurately</p>
      </div>
      
      <div className="p-6 md:p-8">
        {/* Error Message */}
        {calculatorState.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium">Error: {calculatorState.error}</p>
                <p className="text-red-600 text-sm mt-1">Please check your input and try again.</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Customer Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCalculatorState(prev => ({ 
                    ...prev, 
                    customerType: 'residential',
                    billResult: null 
                  }))}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                    calculatorState.customerType === 'residential'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  disabled={calculatorState.loading}
                >
                  <Home size={24} />
                  <span className="font-medium">Residential</span>
                  <span className="text-xs text-gray-500">Home & Personal Use</span>
                </button>
                <button
                  onClick={() => setCalculatorState(prev => ({ 
                    ...prev, 
                    customerType: 'commercial',
                    billResult: null 
                  }))}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                    calculatorState.customerType === 'commercial'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  disabled={calculatorState.loading}
                >
                  <Users size={24} />
                  <span className="font-medium">Commercial</span>
                  <span className="text-xs text-gray-500">Business & Industrial</span>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Water Consumption (cubic meters)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={calculatorState.consumption}
                  onChange={(e) => handleConsumptionChange(e.target.value)}
                  className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-lg disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="e.g., 25.5"
                  disabled={calculatorState.loading}
                  inputMode="decimal"
                />
                <Droplet size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm">Enter water usage in cubic meters (m³)</p>
                <button
                  type="button"
                  onClick={() => handleConsumptionChange('')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={calculateBill}
                disabled={calculatorState.loading || !calculatorState.consumption}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-sm"
              >
                {calculatorState.loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator size={20} />
                    Calculate Bill
                  </>
                )}
              </button>
              
              <button
                onClick={resetCalculator}
                disabled={calculatorState.loading}
                className="px-4 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Reset calculator"
              >
                Reset
              </button>
            </div>
            
            {/* Rate Information */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <Droplet size={18} />
                Rate Information ({calculatorState.customerType})
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                {waterRates[calculatorState.customerType].tiers.map((tier, idx) => (
                  <p key={idx} className="flex justify-between">
                    <span>{tier.range} cu.m:</span>
                    <span className="font-medium">₱{tier.rate.toFixed(2)} {tier.description}</span>
                  </p>
                ))}
                <p className="flex justify-between pt-1 border-t border-blue-200 mt-1">
                  <span>Base Fee:</span>
                  <span className="font-medium">₱{waterRates[calculatorState.customerType].base.toFixed(2)}</span>
                </p>
                {calculatorState.customerType === 'commercial' && (
                  <p className="text-xs text-blue-600 italic">+ 12% VAT for commercial customers</p>
                )}
                {calculatorState.customerType === 'residential' && (
                  <p className="text-xs text-blue-600 italic">+ 5% environmental fee for residential</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Panel - Results */}
          <div>
            {calculatorState.billResult ? (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  Bill Calculation Results
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs">
                      <p className="text-sm text-gray-500">Consumption</p>
                      <p className="text-xl font-bold text-gray-800">{calculatorState.billResult.consumption} m³</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs">
                      <p className="text-sm text-gray-500">Customer Type</p>
                      <p className="text-xl font-bold text-gray-800 capitalize">{calculatorState.billResult.customer_type}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="font-bold text-gray-700 mb-3">Detailed Breakdown</h4>
                    <div className="space-y-3">
                      {calculatorState.billResult.details.map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="text-gray-800 font-medium">{item.item}</p>
                            <p className="text-gray-500 text-xs">{item.description}</p>
                          </div>
                          <span className="font-bold text-gray-900">₱{item.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-blue-100">Total Amount Due</p>
                        <p className="text-3xl font-bold">₱{calculatorState.billResult.total_bill.toFixed(2)}</p>
                        <p className="text-blue-200 text-sm mt-1">Due: {calculatorState.billResult.due_date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-100 text-sm">Calculation Date</p>
                        <p className="font-semibold">
                          {new Date(calculatorState.billResult.calculation_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print Bill
                    </button>
                    <button
                      onClick={resetCalculator}
                      className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
                    >
                      New Calculation
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300 p-8 h-full flex flex-col items-center justify-center text-center">
                <Calculator size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-500 mb-2">Calculation Results</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Enter your water consumption and select customer type, then click "Calculate Bill" to see the detailed breakdown here.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-700">Sample Residential</p>
                    <p className="text-xs text-blue-600">25 m³ ≈ ₱795.25</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-700">Sample Commercial</p>
                    <p className="text-xs text-green-600">50 m³ ≈ ₱3,256.00</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}