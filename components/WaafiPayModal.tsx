
import React, { useState, useEffect } from 'react';

interface WaafiPayModalProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const WaafiPayModal: React.FC<WaafiPayModalProps> = ({ amount, isOpen, onClose, onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 7) {
      setError('Fadlan geli lambar sax ah');
      return;
    }
    
    setError('');
    setStep('processing');
    
    // Simulate API call to WaafiPay
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 w-full max-w-sm rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden">
        {step === 'input' && (
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black italic text-yellow-500 uppercase tracking-tighter">WaafiPay Checkout</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Cadadka Lacagta</p>
              <p className="text-2xl font-black text-white">${amount.toFixed(2)}</p>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Lambarka Taleefanka</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">+252</span>
                   <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="61xxxxxxx"
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-16 pr-5 py-4 text-sm text-white focus:border-yellow-500 outline-none transition-all font-bold"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{error}</p>}
              </div>
              
              <p className="text-[10px] text-gray-500 leading-relaxed italic">
                Markaad gujiso 'Bixi hadda', waxaa taleefankaaga ku soo dhici doona fariin PIN ah (USSD Push).
              </p>

              <button 
                type="submit"
                className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-yellow-500/20 hover:bg-yellow-400 transition-all"
              >
                Bixi hadda
              </button>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 text-center space-y-6">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
              <i className="fas fa-mobile-screen absolute text-2xl text-yellow-500 animate-pulse"></i>
            </div>
            <div>
              <h3 className="text-lg font-black text-white italic uppercase tracking-tighter mb-2">Sugaya PIN-ka...</h3>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">
                Fadlan geli PIN-kaaga taleefankaaga si aad u xaqiijiso lacag bixinta.
              </p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl text-black mx-auto shadow-xl shadow-green-500/20 animate-bounce">
              <i className="fas fa-check"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Lacagtu waa Guul!</h3>
              <p className="text-xs text-gray-500 font-bold">
                Waxaad hadda si rasmi ah u tahay xubin ka mid ah Mastery Premium.
              </p>
            </div>
            <button 
              onClick={handleFinish}
              className="w-full py-4 bg-green-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-green-400 transition-all"
            >
              Bilow Mastery
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaafiPayModal;
