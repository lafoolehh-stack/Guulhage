
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-yellow-500">QAANUUNKA GUUSHA</h1>
        <div className="space-x-6 hidden md:flex items-center">
          <a href="#features" className="hover:text-yellow-500 text-sm">Faa'iidooyinka</a>
          <a href="#pricing" className="hover:text-yellow-500 text-sm">Qiimaha</a>
          <button onClick={onStart} className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition">
            Login
          </button>
        </div>
      </nav>

      <header className="py-20 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 leading-tight">
          Dhis Masiirkaaga, Baro Qawaaniinta Guusha
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Ku biir kumanyaal qof oo noloshooda ku beddelay 12-ka qaanuun. Hel casharro maalinle ah, checklist, iyo talooyin gaar ah oo AI ku shaqaynaya.
        </p>
        <button 
          onClick={onStart} 
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-xl px-12 py-5 rounded-2xl font-black transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/20"
        >
          Hadda Bilow Safarkaaga <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </header>

      <section id="features" className="py-24 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="fa-book-open" 
            title="12-ka Qaanuun" 
            desc="Dhammaan cutubyada buugga oo si qoto dheer loo sharraxay." 
          />
          <FeatureCard 
            icon="fa-tasks" 
            title="Checklist Maalinle ah" 
            desc="Cabir horumarkaaga maalin kasta adoo isticmaalaya checklist-ka gaarka ah." 
          />
          <FeatureCard 
            icon="fa-robot" 
            title="AI Mentor" 
            desc="Kula sheekayso Success Mentor si aad u hesho talooyin ku habboon noloshaada." 
          />
        </div>
      </section>

      <section id="pricing" className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-16">Dooro Qorshahaaga</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <PricingCard 
              type="Monthly" 
              price="$9.99" 
              period="/bishii"
              features={["12-ka Qaanuun", "Checklist Maalinle ah", "AI Chat Bot"]}
              onSelect={onStart}
            />
            <PricingCard 
              type="Yearly" 
              price="$79.99" 
              period="/sanadkii"
              recommended
              features={["Full Access", "Checklist & Community", "Priority AI Mentor"]}
              onSelect={onStart}
            />
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-gray-800 text-gray-500">
        <p>&copy; 2026 Qaanuunka Guusha. Xuquuqda oo dhan waa dhowran tahay.</p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="text-center p-10 bg-gray-800 rounded-3xl border border-gray-700 hover:border-yellow-500/50 transition-all group">
    <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500 transition-colors">
      <i className={`fas ${icon} text-3xl text-yellow-500 group-hover:text-black`}></i>
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const PricingCard: React.FC<{ type: string; price: string; period: string; features: string[]; recommended?: boolean; onSelect: () => void }> = ({ 
  type, price, period, features, recommended, onSelect 
}) => (
  <div className={`p-10 rounded-3xl border-2 transition-all flex flex-col h-full ${
    recommended ? 'bg-gray-800 border-yellow-500 relative' : 'bg-gray-800 border-transparent hover:border-gray-700'
  }`}>
    {recommended && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
        Loogu Jecelyahay
      </span>
    )}
    <h3 className="text-2xl font-bold mb-6">{type}</h3>
    <div className="text-5xl font-black mb-10">{price}<span className="text-lg text-gray-500 font-medium">{period}</span></div>
    <ul className="text-left space-y-5 mb-12 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center text-gray-300">
          <i className="fas fa-check text-yellow-500 mr-3 text-sm"></i> {f}
        </li>
      ))}
    </ul>
    <button 
      onClick={onSelect}
      className={`w-full py-4 rounded-xl font-bold transition-all ${
        recommended ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-gray-700 text-white hover:bg-gray-600'
      }`}
    >
      Hadda Billow
    </button>
  </div>
);

export default LandingPage;
