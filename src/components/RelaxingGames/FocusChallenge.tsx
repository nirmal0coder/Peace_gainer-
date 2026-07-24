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
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
          1-Minute Gentle Focus Challenge 👁️
        </h3>
        <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
          Softly focus your gaze on the central glowing dot for 60 seconds without multi-tasking.
        </p>
      </div>

      <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
        <div
          className={`w-16 h-16 rounded-full bg-[#3FCDA8] shadow-2xl transition-all duration-1000 ${
            isActive ? 'scale-150 animate-pulse bg-[#F2A65A]' : 'scale-100'
          }`}
        />
      </div>

      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#169375] dark:text-[#3FCDA8]">
        {seconds}s
      </div>

      {!isActive && !completed && (
        <button
          onClick={handleStart}
          className="px-6 py-3 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
        >
          <Play className="w-4 h-4 fill-[#081620]" />
          <span>Start Focus Timer ✨</span>
        </button>
      )}

      {completed && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Great focus! Your mind is calm, centered, and still. 🌿</span>
        </div>
      )}
    </div>
  );
};

