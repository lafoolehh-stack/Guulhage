
import React, { useState } from 'react';
import WaafiPayModal from './WaafiPayModal';

interface SubscriptionViewProps {
  onBack: () => void;
  onSubscribe: () => void;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ onBack, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const plans = {
    monthly: { price: 4.99, label: 'Qorshaha Bisha' },
    yearly: { price: 39.99, label: 'Qorshaha Sannadka' }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900 animate-fade-in">
      <div className="max-w-md w-full p-8 bg-gray-900 text-white rounded-[2.5rem] border border-gray-800 shadow-2xl relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-gray-500 hover:text-white transition"
        >
          <i className="fas fa-arrow-left"></i>
        </button>

        <div className="text-center mt-6">
          <h2 className="text-3xl font-black mb-2 text-yellow-500 italic tracking-tighter uppercase">Geli Heerka Sare</h2>
          <p className="text-gray-400 text-sm mb-10 font-bold uppercase tracking-widest">Fura 35-ka qaanuun iyo hagista gaarka ah.</p>
        </div>

        <div className="space-y-4">
          <label 
            onClick={() => setSelectedPlan('monthly')}
            className={`flex items-center justify-between p-6 bg-gray-800 rounded-3xl border-2 transition-all cursor-pointer ${
              selectedPlan === 'monthly' ? 'border-yellow-500 shadow-lg shadow-yellow-500/10' : 'border-transparent hover:border-gray-700'
            }`}
          >
            <div>
              <span className={`block font-black italic text-lg ${selectedPlan === 'monthly' ? 'text-yellow-500' : 'text-white'}`}>{plans.monthly.label}</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">${plans.monthly.price} bishii</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedPlan === 'monthly' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-600'
            }`}>
              {selectedPlan === 'monthly' && <i className="fas fa-check text-[10px] text-black"></i>}
            </div>
          </label>

          <label 
            onClick={() => setSelectedPlan('yearly')}
            className={`flex items-center justify-between p-6 bg-gray-800 rounded-3xl border-2 relative transition-all cursor-pointer ${
              selectedPlan === 'yearly' ? 'border-yellow-500 shadow-xl shadow-yellow-500/20' : 'border-transparent hover:border-gray-700'
            }`}
          >
            <span className="absolute -top-3 right-6 bg-yellow-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              BEST VALUE
            </span>
            <div>
              <span className={`block font-black italic text-lg ${selectedPlan === 'yearly' ? 'text-yellow-500' : 'text-white'}`}>{plans.yearly.label}</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">${plans.yearly.price} sanadkii</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedPlan === 'yearly' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-600'
            }`}>
              {selectedPlan === 'yearly' && <i className="fas fa-check text-[10px] text-black"></i>}
            </div>
          </label>
        </div>

        <button 
          onClick={() => setIsPaymentOpen(true)}
          className="w-full mt-10 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-yellow-400 transition transform hover:scale-[1.02] shadow-xl shadow-yellow-500/20"
        >
          Hadda Subscribe Dheh
        </button>
        
        <div className="mt-8 space-y-4">
          <p className="text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest">Waxaad kaga bixi kartaa wakhti kasta. Xogtaadu waa amaano.</p>
          <div className="flex justify-center gap-6 text-[9px] text-gray-700 font-bold uppercase tracking-widest">
            <span className="hover:text-gray-500 cursor-pointer">Terms</span>
            <span className="hover:text-gray-500 cursor-pointer">Privacy</span>
          </div>
        </div>
      </div>

      <WaafiPayModal 
        isOpen={isPaymentOpen}
        amount={plans[selectedPlan].price}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={onSubscribe}
      />
    </div>
  );
};

export default SubscriptionView;
