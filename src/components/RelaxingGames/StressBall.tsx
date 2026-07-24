import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const StressBall: React.FC = () => {
  const [squeezes, setSqueezes] = useState(0);
  const [isSquished, setIsSquished] = useState(false);

  const messages = [
    'Release the tension...',
    'You are safe and supported.',
    'Let go of all stress.',
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
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div>
        <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
          Interactive Squishy Stress Sphere
        </h3>
        <p className="text-xs text-stone-600 dark:text-rose-200/80">
          Click or tap the squishy sphere to squeeze out physical and mental tension.
        </p>
      </div>

      <div className="flex items-center justify-center h-48">
        <button
          onClick={handleSqueeze}
          className={`w-36 h-36 rounded-full bg-gradient-to-tr from-orange-400 via-rose-400 to-amber-400 shadow-2xl border-4 border-white/80 flex flex-col items-center justify-center text-white cursor-pointer transition-transform duration-150 ${
            isSquished ? 'scale-75 rotate-3 rounded-3xl' : 'scale-100 hover:scale-105'
          }`}
        >
          <Heart className="w-10 h-10 fill-white/80 animate-pulse" />
          <span className="text-xs font-bold mt-1">Squeeze Me</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#381420]/80 border border-orange-100 dark:border-rose-900/60 text-xs sm:text-sm font-semibold text-orange-900 dark:text-rose-200">
        &ldquo;{messages[squeezes % messages.length]}&rdquo;
      </div>

      <div className="text-xs font-bold text-slate-500">
        Total Stress Squeezes: {squeezes}
      </div>
    </div>
  );
};
