import React, { useState } from 'react';
import { Heart, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { KINDNESS_TASKS } from '../../data/contentData';
import confetti from 'canvas-confetti';

export const KindnessChallenge: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const current = KINDNESS_TASKS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % KINDNESS_TASKS.length);
    setCompleted(false);
  };

  const handleComplete = () => {
    setCompleted(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-rose-50/70 via-pink-50/60 to-purple-50/70 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900 p-8 sm:p-10 rounded-3xl border border-rose-100 dark:border-slate-700 shadow-xl space-y-6 text-center">
      
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Random Kindness Challenge
        </span>
        <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
          {current.title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-white/80 dark:bg-slate-700/80 p-5 rounded-2xl border border-rose-100 dark:border-slate-600 italic">
        &ldquo;{current.description}&rdquo;
      </p>

      <div className="flex items-center justify-center gap-3">
        {!completed ? (
          <button
            onClick={handleComplete}
            className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Completed This Today!</span>
          </button>
        ) : (
          <div className="px-5 py-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Awesome! Kindness spreads warmth!</span>
          </div>
        )}

        <button
          onClick={handleNext}
          className="p-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors"
          title="New Challenge"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
