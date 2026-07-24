import React, { useState } from 'react';
import { Sparkles, MessageCircle, X, ChevronRight, Heart } from 'lucide-react';
import { MASCOT_TIPS } from '../data/contentData';
import confetti from 'canvas-confetti';

export const Mascot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);

  const currentTip = MASCOT_TIPS[tipIndex];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % MASCOT_TIPS.length);
    confetti({ particleCount: 20, spread: 40, origin: { x: 0.9, y: 0.9 } });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      
      {/* Speech Bubble Tip Box */}
      {isOpen && (
        <div className="bg-white dark:bg-[#34121d] p-4 rounded-3xl shadow-2xl border-2 border-orange-300 dark:border-rose-800 max-w-xs space-y-3 animate-bounce-short relative text-stone-800 dark:text-rose-100">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-rose-200"
            title="Minimize"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-rose-300">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Peace Buddy says:</span>
          </div>

          <p className="text-xs font-medium leading-relaxed italic">
            &ldquo;{currentTip}&rdquo;
          </p>

          <button
            onClick={handleNextTip}
            className="w-full py-1.5 rounded-xl bg-orange-100 dark:bg-rose-950 text-orange-900 dark:text-rose-200 font-bold text-[11px] hover:bg-orange-200 dark:hover:bg-rose-900 transition-colors flex items-center justify-center gap-1"
          >
            <span>Next Tip</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mascot Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 via-rose-400 to-amber-400 shadow-2xl border-4 border-white dark:border-[#34121d] flex items-center justify-center text-white transform hover:scale-110 active:scale-95 transition-transform group"
        title="Peace Buddy Tips"
      >
        <Heart className="w-7 h-7 fill-white/90 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-white animate-ping" />
      </button>

    </div>
  );
};
