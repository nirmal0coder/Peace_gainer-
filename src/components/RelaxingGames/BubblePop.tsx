import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const BubblePop: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);

  const colors = [
    'rgba(63, 205, 168, 0.75)',  // Aurora Teal
    'rgba(242, 166, 90, 0.75)',  // Warm Gold
    'rgba(139, 133, 196, 0.75)', // Soft Lavender
    'rgba(244, 114, 182, 0.75)', // Blossom Pink
    'rgba(56, 189, 248, 0.75)'   // Sky Blue
  ];

  const generateBubbles = () => {
    const list: Bubble[] = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: Math.random() * 40 + 40,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setBubbles(list);
  };

  useEffect(() => {
    generateBubbles();
  }, []);

  const handlePop = (id: number) => {
    audioSynth.playBubblePop();
    setScore((prev) => prev + 1);
    setBubbles((prev) => prev.filter((b) => b.id !== id));

    if (bubbles.length === 1) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      setTimeout(generateBubbles, 1000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Bubble Pop Relaxation 🫧
          </h3>
          <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Tap colorful bubbles to burst them with soothing popping sounds. Zero pressure or timers!
          </p>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 shadow-sm text-xs font-bold text-[#169375] dark:text-[#3FCDA8] flex-shrink-0">
          Popped: {score} 🎈
        </div>
      </div>

      {/* Bubble Play Canvas */}
      <div className="relative w-full h-80 bg-white/80 dark:bg-[#0B1F2A]/80 rounded-3xl border border-[#3FCDA8]/30 overflow-hidden shadow-inner">
        {bubbles.map((b) => (
          <button
            key={b.id}
            onClick={() => handlePop(b.id)}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              backgroundColor: b.color
            }}
            className="absolute rounded-full backdrop-blur-sm border border-white/60 shadow-lg transform hover:scale-110 active:scale-95 transition-transform duration-200 flex items-center justify-center cursor-pointer animate-pulse"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-white/70 absolute top-2 left-2 pointer-events-none" />
          </button>
        ))}

        {bubbles.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
            <Sparkles className="w-8 h-8 text-[#F2A65A] animate-bounce" />
            <p className="text-sm font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
              All bubbles popped! Re-spawning fresh bubbles... 🌿
            </p>
          </div>
        )}
      </div>

      <button
        onClick={generateBubbles}
        className="px-5 py-2.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Bubbles ✨</span>
      </button>
    </div>
  );
};

