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
    'rgba(251, 146, 60, 0.65)',
    'rgba(244, 114, 182, 0.65)',
    'rgba(252, 211, 77, 0.65)',
    'rgba(251, 113, 133, 0.65)',
    'rgba(253, 186, 116, 0.7)'
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
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
            Bubble Pop Relaxation
          </h3>
          <p className="text-xs text-stone-600 dark:text-rose-200/80">
            Tap bubbles to burst them with gentle popping sounds. No time limit or pressure!
          </p>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#381420] shadow-sm text-xs font-bold text-orange-700 dark:text-rose-200">
          Popped: {score}
        </div>
      </div>

      {/* Bubble Play Canvas */}
      <div className="relative w-full h-80 bg-white/70 dark:bg-[#200a12]/60 rounded-3xl border border-orange-200/60 dark:border-rose-900/60 overflow-hidden">
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
            <div className="w-3 h-3 rounded-full bg-white/70 absolute top-2 left-2" />
          </button>
        ))}

        {bubbles.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
            <Sparkles className="w-8 h-8 text-amber-500 animate-bounce" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              All bubbles popped! Re-spawning new bubbles...
            </p>
          </div>
        )}
      </div>

      <button
        onClick={generateBubbles}
        className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-md inline-flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Bubbles</span>
      </button>
    </div>
  );
};
