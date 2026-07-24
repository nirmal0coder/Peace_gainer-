import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, Eye } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export const FocusChallenge: React.FC = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      setCompleted(true);
      audioSynth.playChimeSuccess();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStart = () => {
    setIsActive(true);
    setCompleted(false);
    setSeconds(60);
  };

  return (
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div>
        <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
          1-Minute Gentle Focus Challenge
        </h3>
        <p className="text-xs text-stone-600 dark:text-rose-200/80">
          Softly focus your gaze on the central glowing dot for 60 seconds without multi-tasking.
        </p>
      </div>

      <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
        <div
          className={`w-16 h-16 rounded-full bg-orange-500 shadow-2xl transition-all duration-1000 ${
            isActive ? 'scale-150 animate-pulse bg-rose-400' : 'scale-100'
          }`}
        />
      </div>

      <div className="text-3xl font-extrabold font-mono text-orange-900 dark:text-rose-200">
        {seconds}s
      </div>

      {!isActive && !completed && (
        <button
          onClick={handleStart}
          className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md inline-flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Focus Timer</span>
        </button>
      )}

      {completed && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Great focus! Your mind is calm and centered.</span>
        </div>
      )}
    </div>
  );
};
