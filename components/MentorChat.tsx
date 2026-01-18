
import React, { useState, useRef, useEffect } from 'react';
import { getMentorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface MentorChatProps {
  onBack: () => void;
  userLevel: number;
}

const MentorChat: React.FC<MentorChatProps> = ({ onBack, userLevel }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Ku soo dhowaad! Anigu waxaan ahay Hage Mentor. Caqabadda maanta ku haysata waa fursadda berrito. Maxaan kugu caawin karaa?" }]
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

    const responseText = await getMentorResponse(userMsg, userLevel, messages);
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 max-w-5xl mx-auto border-x border-gray-800 animate-fade-in">
      {/* Header aligned with requested HTML snippet */}
      <header className="p-5 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-950 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors p-2">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-black text-lg shadow-lg shadow-yellow-500/10">
               HM
             </div>
             <div>
               <h2 className="font-bold text-white text-sm flex items-center gap-1.5">
                 Hage Mentor <span className="text-blue-500 text-xs">✔</span>
               </h2>
               <p className="text-[10px] text-green-500 italic">Online - Diyaar u ah inuu ku hago</p>
             </div>
          </div>
        </div>
        <div className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700 hidden sm:block">
           <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Level {userLevel} Context Active</span>
        </div>
      </header>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gray-950">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm ${
              msg.role === 'user' 
                ? 'bg-yellow-500 text-black font-bold shadow-xl shadow-yellow-500/10 rounded-tr-none' 
                : 'bg-gray-900 text-gray-300 border border-gray-800 rounded-tl-none'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.parts[0].text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-900 p-4 rounded-2xl rounded-tl-none border border-gray-800 flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area aligned with requested HTML snippet */}
      <div className="p-4 bg-gray-900 border-t border-gray-800 flex space-x-2 sticky bottom-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Weydii Hage Mentor..."
          className="flex-1 bg-gray-800 text-white p-4 rounded-xl outline-none text-sm focus:border-yellow-500 border border-transparent transition-all placeholder:text-gray-600"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-yellow-500 p-4 rounded-xl w-14 h-14 flex items-center justify-center transition-all hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-yellow-500/20"
        >
          <i className="fas fa-paper-plane text-black text-xl"></i>
        </button>
      </div>
      <div className="bg-gray-950 pb-2 text-center">
         <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em] italic">
           Hage Mentor: Ka hor tag caqabadaha, dhiso fursadaha.
        </p>
      </div>
    </div>
  );
};

export default MentorChat;
