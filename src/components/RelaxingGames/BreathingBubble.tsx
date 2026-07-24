import React, { useState, useEffect } from 'react';
import { Wind, Sparkles } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const BreathingBubble: React.FC = () => {
  const [size, setSize] = useState(110);
  const [phase, setPhase] = useState<'Inhale' | 'Exhale'>('Inhale');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'Inhale') {
          setSize(190);
          audioSynth.playBubblePop();
          return 'Exhale';
        } else {
          setSize(110);
          return 'Inhale';
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
          Breathing Bubble Rhythm 🌬️
        </h3>
        <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
          Sync your breath naturally with the expanding and shrinking lotus bubble.
        </p>
      </div>

      <div className="flex items-center justify-center h-52">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-full bg-gradient-to-tr from-[#3FCDA8] via-[#8B85C4] to-[#F2A65A] shadow-2xl border-4 border-white dark:border-[#0B1F2A] flex items-center justify-center text-white font-bold text-sm sm:text-base transition-all duration-4000 ease-in-out uppercase tracking-wider"
        >
          {phase === 'Inhale' ? 'Breathe In... 🍃' : 'Breathe Out... 🕊️'}
        </div>
      </div>
    </div>
  );
};

