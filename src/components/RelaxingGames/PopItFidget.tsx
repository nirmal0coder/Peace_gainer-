import React, { useState } from 'react';
import { RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

interface PopItBubble {
  id: number;
  color: string;
  isPopped: boolean;
}

export const PopItFidget: React.FC = () => {
  const bubbleColors = [
    '#3FCDA8', '#38BDF8', '#8B85C4', '#F472B6', '#F2A65A', '#FB7185'
  ];

  const [bubbles, setBubbles] = useState<PopItBubble[]>(() =>
    Array.from({ length: 24 }).map((_, idx) => ({
      id: idx,
      color: bubbleColors[idx % bubbleColors.length],
      isPopped: false
    }))
  );

  const [totalPops, setTotalPops] = useState(0);
  const [infiniteMode, setInfiniteMode] = useState(false);

  const handlePop = (id: number) => {
    audioSynth.playBubblePop();
    setTotalPops((prev) => prev + 1);

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isPopped: true } : b))
    );

    if (infiniteMode) {
      setTimeout(() => {
        setBubbles((prev) =>
          prev.map((b) => (b.id === id ? { ...b, isPopped: false } : b))
        );
      }, 1200);
    } else {
      const remaining = bubbles.filter((b) => !b.isPopped && b.id !== id);
      if (remaining.length === 0) {
        audioSynth.playChimeSuccess();
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const resetBoard = () => {
    audioSynth.playBubblePop();
    setBubbles((prev) => prev.map((b) => ({ ...b, isPopped: false })));
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Tactile Pop-It Fidget Board 🫧
          </h3>
          <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Press down bubbles to enjoy satisfying popping sounds and stress relief.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setInfiniteMode(!infiniteMode)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              infiniteMode
                ? 'bg-[#3FCDA8] text-[#081620] border-[#3FCDA8]'
                : 'bg-white dark:bg-[#0B1F2A] border-[#3FCDA8]/30 text-[#0B1F2A] dark:text-[#F7F3E9]'
            }`}
          >
            Infinite Re-pop {infiniteMode ? 'ON ⚡' : 'OFF'}
          </button>

          <div className="px-3.5 py-1.5 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs font-bold text-[#169375] dark:text-[#3FCDA8]">
            Pops: {totalPops}
          </div>
        </div>
      </div>

      {/* Pop-It Board Toy */}
      <div className="max-w-md mx-auto p-6 rounded-3xl bg-white dark:bg-[#0B1F2A] border-4 border-[#3FCDA8]/40 shadow-2xl">
        <div className="grid grid-cols-6 gap-3 sm:gap-4">
          {bubbles.map((b) => (
            <button
              key={b.id}
              onClick={() => handlePop(b.id)}
              style={{
                backgroundColor: b.isPopped ? 'rgba(0,0,0,0.15)' : b.color,
                boxShadow: b.isPopped
                  ? 'inset 0 4px 8px rgba(0,0,0,0.4)'
                  : '0 6px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.4)'
              }}
              className={`aspect-square rounded-full border-2 border-white/60 flex items-center justify-center transform cursor-pointer transition-all duration-200 active:scale-90 ${
                b.isPopped ? 'scale-90 opacity-75' : 'hover:scale-110'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white/60 transition-opacity ${
                  b.isPopped ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetBoard}
        className="px-5 py-2.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Flip & Reset Pop-It Board 🔄</span>
      </button>
    </div>
  );
};
