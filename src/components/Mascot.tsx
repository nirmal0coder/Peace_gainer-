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
        <div className="bg-white dark:bg-[#0F2836] p-4 rounded-3xl shadow-2xl border-2 border-[#3FCDA8]/40 max-w-xs space-y-3 relative text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-[#1C2D37]/50 dark:text-[#F7F3E9]/50 hover:text-[#0B1F2A] dark:hover:text-[#F7F3E9]"
            title="Minimize"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#169375] dark:text-[#3FCDA8]">
            <Sparkles className="w-4 h-4 text-[#F2A65A]" />
            <span>Peace Buddy says:</span>
          </div>

          <p className="text-xs font-medium leading-relaxed italic text-[#1C2D37] dark:text-[#F7F3E9]/90">
            &ldquo;{currentTip}&rdquo;
          </p>

          <button
            onClick={handleNextTip}
            className="w-full py-1.5 rounded-xl bg-[#F7F3E9] dark:bg-[#0B1F2A] text-[#0B1F2A] dark:text-[#F7F3E9] border border-[#3FCDA8]/30 font-bold text-[11px] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Next Tip</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#169375] dark:text-[#3FCDA8]" />
          </button>
        </div>
      )}

      {/* Mascot Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3FCDA8] via-[#8B85C4] to-[#F2A65A] shadow-2xl border-4 border-white dark:border-[#0B1F2A] flex items-center justify-center text-white transform hover:scale-110 active:scale-95 transition-transform group"
        title="Peace Buddy Tips"
      >
        <Heart className="w-7 h-7 fill-white/90 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F2A65A] border-2 border-white animate-ping" />
      </button>

    </div>
  );
};
