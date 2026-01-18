
import React from 'react';
import { Consultant } from '../types';

export const SAMPLE_CONSULTANTS: Consultant[] = [
  {
    id: '1',
    name: "Nur Abdi Jim’ale",
    title: "Investment Consultant & Coach",
    specialty: "Maalgashiga & Maaliyadda",
    rating: 4.9,
    reviews: 120,
    bio: "Waxaan kaa caawinayaa dhisidda mashaariicda maalgashiga iyo sidii aad u kobcin lahayd hantidaada adoo isticmaalaya qorshe maaliyadeed oo cilmiyeysan.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    isVerified: true
  },
  {
    id: '2',
    name: "Hani Yusuf",
    title: "Leadership & Mindset Trainer",
    specialty: "Hoggaaminta & Isbeddelka",
    rating: 4.8,
    reviews: 85,
    bio: "Khubaro ku takhasustay horumarinta maskaxda guusha iyo dhisidda hoggaamiyeyaasha mustaqbalka. Waxaan ku bixiyaa tababaro gaar ah oo noloshaada beddelaya.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    isVerified: true
  },
  {
    id: '3',
    name: "Mohamed Warsame",
    title: "Digital Business Strategist",
    specialty: "Ganacsiga Casriga ah",
    rating: 4.7,
    reviews: 64,
    bio: "Ma doonaysaa inaad ganacsigaaga u beddesho mid dhijitaal ah? Waxaan kaa caawinayaa dhisidda sumcad internet-ka ah iyo iibka casriga ah.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    isVerified: false
  }
];

interface ConsultantsHubProps {
  onBack: () => void;
  onMessage: (consultant: Consultant) => void;
}

const ConsultantsHub: React.FC<ConsultantsHubProps> = ({ onBack, onMessage }) => {
  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto space-y-12 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white transition">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div>
            <h1 className="text-yellow-500 font-black text-3xl tracking-tighter italic uppercase">CONSULTANTS HUB</h1>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Khubaro diyaar kuu ah</p>
          </div>
        </div>
        
        <div className="bg-gray-800 px-6 py-3 rounded-2xl border border-gray-700 flex items-center gap-3">
          <i className="fas fa-search text-gray-500"></i>
          <input 
            type="text" 
            placeholder="Raadi khabiir..." 
            className="bg-transparent text-xs font-bold outline-none text-gray-300 w-32 md:w-48"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SAMPLE_CONSULTANTS.map((consultant) => (
          <div 
            key={consultant.id} 
            className="bg-gray-800 rounded-[2.5rem] p-8 border-2 border-gray-700 hover:border-yellow-500/50 transition-all relative overflow-hidden group shadow-2xl"
          >
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative flex-shrink-0">
                <img 
                  src={consultant.imageUrl} 
                  alt={consultant.name}
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-gray-900 shadow-xl group-hover:scale-105 transition-transform"
                />
                {consultant.isVerified && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full text-[10px] shadow-lg border-2 border-gray-800">
                    <i className="fas fa-check-double"></i>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter italic truncate">{consultant.name}</h3>
                <p className="text-yellow-500 text-xs font-black uppercase tracking-widest mt-1">{consultant.title}</p>
                <div className="flex items-center mt-3 text-gray-400 text-[10px] font-bold">
                  <span className="flex items-center bg-gray-900 px-2 py-1 rounded-lg">
                    <i className="fas fa-star text-yellow-500 mr-1.5"></i> {consultant.rating} ({consultant.reviews} Reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-2xl mb-6 border border-gray-700/50">
              <p className="text-gray-400 text-xs font-medium leading-relaxed italic">
                "{consultant.bio}"
              </p>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => alert(`Fadhi (Session) lala ballamay: ${consultant.name}. Waxaan kula soo xiriiri doonaa dhowaan.`)}
                className="flex-1 py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10"
              >
                Book a Session
              </button>
              <button 
                onClick={() => onMessage(consultant)}
                className="px-6 py-4 bg-gray-700 text-white rounded-2xl hover:bg-gray-600 transition-all border border-gray-600"
              >
                <i className="fas fa-comment-dots"></i>
              </button>
            </div>

            <i className={`fas fa-quote-right absolute -right-4 -top-4 text-8xl opacity-5`}></i>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-yellow-500/10 to-transparent p-10 rounded-[2.5rem] border border-yellow-500/20 text-center">
        <h3 className="text-xl font-black italic uppercase text-yellow-500 mb-2">Ma Tahay Khabiir?</h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Ku biir kooxda Guulhage oo caawi kumanyaal qof.</p>
        <button className="px-10 py-4 bg-gray-800 text-yellow-500 font-black uppercase tracking-widest text-xs rounded-2xl border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all">
          Apply as Consultant
        </button>
      </div>
    </div>
  );
};

export default ConsultantsHub;
