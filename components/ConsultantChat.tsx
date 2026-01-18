
import React, { useState, useRef, useEffect } from 'react';
import { getConsultantResponse } from '../services/geminiService';
import { ChatMessage, Consultant } from '../types';

interface ConsultantChatProps {
  consultant: Consultant;
  onBack: () => void;
}

const ConsultantChat: React.FC<ConsultantChatProps> = ({ consultant, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: `Asc! Anigu waxaan ahay ${consultant.name}. Sideen kaaga caawin karaa mashaariicdaada iyo ${consultant.specialty}?` }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', parts: [{ text: userMsg }] }];
    setMessages(newMessages);
    setIsLoading(true);

    const responseText = await getConsultantResponse(consultant, userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 max-w-5xl mx-auto border-x border-gray-800 animate-fade-in">
      <header className="p-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white transition">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div className="flex items-center gap-4">
             <div className="relative">
                <img src={consultant.imageUrl} className="w-12 h-12 rounded-2xl object-cover border-2 border-yellow-500" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
             </div>
             <div>
               <h2 className="font-black text-white italic uppercase tracking-tighter flex items-center gap-2">
                 {consultant.name} 
                 {consultant.isVerified && <i className="fas fa-check-double text-blue-500 text-[10px]"></i>}
               </h2>
               <p className="text-[10px] text-yellow-500 font-black uppercase tracking-widest">{consultant.title}</p>
             </div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white p-2">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            <div className={`max-w-[85%] md:max-w-[75%] p-5 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-yellow-500 text-black font-bold shadow-xl shadow-yellow-500/10' 
                : 'bg-gray-800 text-gray-200 border border-gray-700'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap text-sm">{msg.parts[0].text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-4 rounded-3xl border border-gray-700 flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-6 border-t border-gray-800 bg-gray-900 sticky bottom-0">
        <div className="flex gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ku qor fariintaada halkan..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-[2rem] px-8 py-5 focus:outline-none focus:border-yellow-500 transition-all text-gray-200 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-yellow-500 text-black w-16 h-16 rounded-full flex items-center justify-center font-bold hover:bg-yellow-400 transition-all disabled:opacity-30 shadow-xl shadow-yellow-500/20"
          >
            <i className="fas fa-paper-plane text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantChat;
