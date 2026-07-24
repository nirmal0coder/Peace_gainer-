import React, { useState, useEffect } from 'react';
import { Wind, Sparkles } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const BreathingBubble: React.FC = () => {
  const [size, setSize] = useState(100);
  const [phase, setPhase] = useState<'Inhale' | 'Exhale'>('Inhale');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'Inhale') {
          setSize(180);
          audioSynth.playBubblePop();
          return 'Exhale';
        } else {
          setSize(100);
          return 'Inhale';
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div>
        <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
          Breathing Bubble Rhythm
        </h3>
        <p className="text-xs text-stone-600 dark:text-rose-200/80">
          Sync your breath naturally with the expanding and shrinking bubble.
        </p>
      </div>

      <div className="flex items-center justify-center h-52">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-full bg-gradient-to-tr from-orange-400 via-rose-400 to-amber-400 shadow-2xl border-4 border-white/80 flex items-center justify-center text-white font-bold transition-all duration-4000 ease-in-out"
        >
          {phase === 'Inhale' ? 'Breathe In...' : 'Breathe Out...'}
        </div>
      </div>
    </div>
  );
};
