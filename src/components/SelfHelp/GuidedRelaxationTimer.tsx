import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export const GuidedRelaxationTimer: React.FC = () => {
  const TOTAL_SECONDS = 300; // 5 minutes
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  const prompts = [
    { time: 300, text: 'Find a comfortable seated position. Gently close your eyes or soften your gaze.' },
    { time: 240, text: 'Unclench your jaw, relax your tongue away from the roof of your mouth, and drop your shoulders.' },
    { time: 180, text: 'Feel the gentle rise and fall of your chest. With each exhale, release tension.' },
    { time: 120, text: 'Notice any racing thoughts without holding onto them. Imagine them floating away like clouds.' },
    { time: 60, text: 'Bring gratitude to your body for supporting you through every single moment today.' },
    { time: 10, text: 'Almost there. Take one deep, luxurious breath in... and let it all go.' }
  ];

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      audioSynth.playChimeSuccess();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const currentPrompt = prompts.find((p) => timeLeft >= p.time - 50)?.text || prompts[prompts.length - 1].text;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    audioSynth.startRain(0.3); // Gentle ambient background
  };

  const handlePause = () => {
    setIsRunning(false);
    audioSynth.stopRain();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_SECONDS);
    audioSynth.stopRain();
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-indigo-50/70 via-purple-50/60 to-sky-50/70 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900 p-8 sm:p-12 rounded-3xl border border-indigo-100 dark:border-slate-700 shadow-xl text-center space-y-6">
      
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> 5-Minute Reset
        </span>
        <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
          Guided Relaxation Session
        </h3>
      </div>

      {/* Timer Display */}
      <div className="text-5xl sm:text-6xl font-extrabold font-mono text-indigo-900 dark:text-indigo-200 tracking-wider">
        {formatTime(timeLeft)}
      </div>

      {/* Guided Relaxation Text Prompt */}
      <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-700/80 border border-indigo-100 dark:border-slate-600 min-h-[80px] flex items-center justify-center">
        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 italic leading-relaxed">
          &ldquo;{currentPrompt}&rdquo;
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{timeLeft === TOTAL_SECONDS ? 'Start Relaxation' : 'Resume'}</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
          >
            <Pause className="w-4 h-4 fill-white" />
            <span>Pause Session</span>
          </button>
        )}

        <button
          onClick={handleReset}
          className="p-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {timeLeft === 0 && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Session Completed! Thank you for giving yourself 5 minutes of peace.</span>
        </div>
      )}

    </div>
  );
};
