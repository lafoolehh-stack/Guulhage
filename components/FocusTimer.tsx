
import React, { useState, useEffect, useRef } from 'react';

interface FocusTimerProps {
  onSessionComplete: (coins: number) => void;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ onSessionComplete }) => {
  const WORK_TIME = 25 * 60;
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  // Fixed: Replaced NodeJS.Timeout with any because the NodeJS namespace is not available in the browser environment.
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleComplete = () => {
    setIsActive(false);
    onSessionComplete(20);
    alert("Hambalyo! Diiraddaadii 25-ka daqiiqo ahayd waa dhammaatay. Nasasho qaado.");
    setTimeLeft(WORK_TIME);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(WORK_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = ((WORK_TIME - timeLeft) / WORK_TIME) * 100;

  return (
    <div className="w-full bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border-2 border-gray-700 overflow-hidden relative">
      <div className="relative z-10 text-center">
        <h3 className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] mb-4">Focus Session</h3>
        
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Progress Circle (SVG) */}
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-900"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={364.4}
              strokeDashoffset={364.4 - (364.4 * progress) / 100}
              className="text-yellow-500 transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-3xl font-black italic text-white tracking-tighter">
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={toggleTimer}
            className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
              isActive 
                ? 'bg-gray-700 text-gray-400 border border-gray-600' 
                : 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
            }`}
          >
            {isActive ? 'Pause' : 'Start Focus'}
          </button>
          
          {isActive || timeLeft < WORK_TIME ? (
            <button
              onClick={resetTimer}
              className="w-14 bg-gray-900 text-gray-500 hover:text-white rounded-2xl border border-gray-700 flex items-center justify-center transition-colors"
            >
              <i className="fas fa-undo"></i>
            </button>
          ) : null}
        </div>

        <p className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          Dhamaystir si aad u hesho <span className="text-yellow-500">+20 Coins</span>
        </p>
      </div>
      
      {/* Background Decorative Icon */}
      <i className="fas fa-hourglass-start absolute -right-4 -bottom-4 text-7xl opacity-5"></i>
    </div>
  );
};

export default FocusTimer;
