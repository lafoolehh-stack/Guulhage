
import React, { useState, useRef, useEffect } from 'react';
import { getMentorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface MentorChatProps {
  onBack: () => void;
}

const MentorChat: React.FC<MentorChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Assalamu Alaikum! Anigu waxaan ahay Success Mentor-kaaga. Sideen kuugu caawin karaa inaad gaarto masiirkaaga maanta?" }]
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

    const responseText = await getMentorResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 max-w-5xl mx-auto border-x border-gray-800">
      <header className="p-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black">
               <i className="fas fa-robot"></i>
             </div>
             <div>
               <h2 className="font-black">Success Mentor</h2>
               <div className="flex items-center gap-1">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Online</span>
               </div>
             </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-yellow-500 text-black font-medium' 
                : 'bg-gray-800 text-gray-200 border border-gray-700'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.parts[0].text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-4 rounded-3xl border border-gray-700 flex gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
            placeholder="Weydii wax kasta..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-gray-200"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-yellow-500 text-black w-14 h-14 rounded-2xl flex items-center justify-center font-bold hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-gray-500 text-center mt-4 uppercase tracking-widest font-bold">
           Mentor-ka AI wuxuu sameyn karaa khaladaad. Mar walba isticmaal caqligaaga.
        </p>
      </div>
    </div>
  );
};

export default MentorChat;
