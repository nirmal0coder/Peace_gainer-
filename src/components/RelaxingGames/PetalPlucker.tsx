import React, { useState } from 'react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

interface Petal {
  id: number;
  angle: number;
  isPlucked: boolean;
  affirmation: string;
}

export const PetalPlucker: React.FC = () => {
  const affirmationsList = [
    'You are worthy of quiet peace.',
    'Every breath restores your strength.',
    'You are doing the best you can.',
    'It is safe to let go of worries.',
    'Your feelings are valid and respected.',
    'You bring light into the world.',
    'Be gentle with your heart today.',
    'Progress is gentle and step by step.',
    'You are safe and surrounded by care.',
    'Inner calm is always within reach.'
  ];

  const [petals, setPetals] = useState<Petal[]>(() =>
    Array.from({ length: 10 }).map((_, idx) => ({
      id: idx,
      angle: idx * 36,
      isPlucked: false,
      affirmation: affirmationsList[idx]
    }))
  );

  const [lastAffirmation, setLastAffirmation] = useState<string>(
    'Tap any petal off the lotus flower to discover your gentle affirmation 🌸'
  );

  const [pluckedCount, setPluckedCount] = useState(0);

  const handlePluck = (id: number) => {
    audioSynth.playChimeSuccess();

    setPetals((prev) =>
      prev.map((p) => {
        if (p.id === id && !p.isPlucked) {
          setLastAffirmation(p.affirmation);
          setPluckedCount((c) => {
            const nextCount = c + 1;
            if (nextCount === 10) {
              confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
            }
            return nextCount;
          });
          return { ...p, isPlucked: true };
        }
        return p;
      })
    );
  };

  const resetFlower = () => {
    audioSynth.playBubblePop();
    const shuffled = [...affirmationsList].sort(() => Math.random() - 0.5);
    setPetals(
      Array.from({ length: 10 }).map((_, idx) => ({
        id: idx,
        angle: idx * 36,
        isPlucked: false,
        affirmation: shuffled[idx]
      }))
    );
    setPluckedCount(0);
    setLastAffirmation('Tap any petal off the fresh lotus flower 🌸');
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Mindful Petal Plucking 🌸
          </h3>
          <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Pluck lotus petals one by one to uncover calming self-compassion thoughts.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs font-bold text-[#169375] dark:text-[#3FCDA8] flex-shrink-0">
          Petals Plucked: {pluckedCount} / 10
        </div>
      </div>

      {/* Flower Display */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center my-4">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {petals.map((petal) => {
            if (petal.isPlucked) return null;
            return (
              <g key={petal.id} transform={`rotate(${petal.angle} 100 100)`}>
                <path
                  d="M100 25 C120 50 120 75 100 100 C80 75 80 50 100 25 Z"
                  fill="url(#petalGradient)"
                  stroke="#3FCDA8"
                  strokeWidth="1.5"
                  onClick={() => handlePluck(petal.id)}
                  className="cursor-pointer hover:scale-110 transform origin-center transition-transform hover:brightness-110"
                />
              </g>
            );
          })}

          <defs>
            <linearGradient id="petalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#3FCDA8" />
            </linearGradient>
          </defs>

          {/* Lotus Core */}
          <circle
            cx="100"
            cy="100"
            r="22"
            fill="#F2A65A"
            stroke="#ffffff"
            strokeWidth="3"
            className="shadow-md"
          />
        </svg>

        {pluckedCount === 10 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
            <Sparkles className="w-10 h-10 text-[#F2A65A] animate-bounce" />
            <p className="text-xs font-bold text-[#169375] dark:text-[#3FCDA8]">
              Full Lotus Bloomed! ✨
            </p>
          </div>
        )}
      </div>

      {/* Affirmation Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0B1F2A] border border-[#3FCDA8]/40 shadow-md text-xs sm:text-sm font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
        &ldquo;{lastAffirmation}&rdquo;
      </div>

      <button
        onClick={resetFlower}
        className="px-5 py-2.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Bloom Fresh Flower 🌸</span>
      </button>
    </div>
  );
};
