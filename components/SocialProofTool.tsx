
import React, { useState } from 'react';

interface SocialProofToolProps {
  onAwardCoins: (amount: number) => void;
}

const SocialProofTool: React.FC<SocialProofToolProps> = ({ onAwardCoins }) => {
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !project.trim()) return;

    const message = `Asc ${name}, waxaan ka shaqaynayaa mashruuca ${project}. Ma ii qori kartaa hal jumlad oo ku saabsan tayada shaqadayda? Waxay ii tahay dhiirigelin weyn.`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, '_blank');
    onAwardCoins(30);
    
    // Reset and close
    setName('');
    setProject('');
    setShowForm(false);
    alert("Hambalyo! Waxaad dirtay codsigaagii. Waxaad heshay +30 Coins maadaama aad dhisayso saamayntaada.");
  };

  if (!showForm) {
    return (
      <button 
        onClick={() => setShowForm(true)}
        className="w-full bg-green-600/10 border-2 border-green-500/50 p-6 rounded-[2rem] flex items-center gap-4 group hover:bg-green-600/20 transition-all"
      >
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-green-500/20">
          <i className="fab fa-whatsapp"></i>
        </div>
        <div className="text-left">
          <h4 className="font-black italic uppercase tracking-tighter text-green-400">Social Proof Power</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Codso Marqaati Bulsho (WhatsApp)</p>
        </div>
        <i className="fas fa-plus-circle ml-auto text-green-500 opacity-50 group-hover:opacity-100 transition-opacity"></i>
      </button>
    );
  }

  return (
    <div className="w-full bg-gray-800 p-8 rounded-[2.5rem] border-2 border-green-500 shadow-2xl shadow-green-500/10 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-green-500 font-black italic uppercase tracking-tighter text-xl">Dhis Saamayntaada</h3>
        <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleRequest} className="space-y-4">
        <div>
          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Magaca Qofka</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tusaale: Axmed"
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 text-sm text-gray-200 focus:border-green-500 outline-none transition-all font-bold"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Magaca Mashruuca</label>
          <input 
            type="text" 
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Tusaale: Ganacsiga Dharka"
            className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 text-sm text-gray-200 focus:border-green-500 outline-none transition-all font-bold"
            required
          />
        </div>
        
        <button 
          type="submit"
          className="w-full py-4 bg-green-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-green-500/20 hover:bg-green-400 transition-all flex items-center justify-center gap-3"
        >
          <i className="fab fa-whatsapp text-lg"></i> Dir Codsiga (+30 Coins)
        </button>
      </form>
      
      <p className="mt-4 text-[9px] text-gray-500 font-bold uppercase tracking-widest text-center leading-relaxed">
        Codso hal jumlad oo marqaati ah si aad u kordhiso kalsoonida macaamiishaada.
      </p>
    </div>
  );
};

export default SocialProofTool;
