import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const StressBall: React.FC = () => {
  const [squeezes, setSqueezes] = useState(0);
  const [isSquished, setIsSquished] = useState(false);

  const messages = [
    'Release the tension...',
    'You are safe, supported, and worthy.',
    'Let go of all stress with every squeeze.',
    'Breathe in calm, breathe out worry.',
    'You are doing wonderfully!'
  ];

  const handleSqueeze = () => {
    audioSynth.playSquishSound();
    setIsSquished(true);
    setSqueezes((prev) => prev + 1);
    setTimeout(() => setIsSquished(false), 200);
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
          Interactive Squishy Stress Sphere 🎈
        </h3>
        <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
          Click or tap the squishy sphere to squeeze out physical and mental tension.
        </p>
      </div>

      <div className="flex items-center justify-center h-48">
        <button
          onClick={handleSqueeze}
          className={`w-36 h-36 rounded-full bg-gradient-to-tr from-[#3FCDA8] via-[#8B85C4] to-[#F2A65A] shadow-2xl border-4 border-white dark:border-[#0B1F2A] flex flex-col items-center justify-center text-white cursor-pointer transition-transform duration-150 active:scale-75 ${
            isSquished ? 'scale-75 rotate-3 rounded-3xl' : 'scale-100 hover:scale-105'
          }`}
        >
          <Heart className="w-10 h-10 fill-white/80 animate-pulse" />
          <span className="text-xs font-bold mt-1 uppercase tracking-wider">Squeeze Me</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs sm:text-sm font-bold text-[#0B1F2A] dark:text-[#F7F3E9] shadow-sm">
        &ldquo;{messages[squeezes % messages.length]}&rdquo;
      </div>

      <div className="text-xs font-bold text-[#169375] dark:text-[#3FCDA8]">
        Total Stress Squeezes: {squeezes} ✨
      </div>
    </div>
  );
};

