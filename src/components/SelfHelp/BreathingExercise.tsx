import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Volume2, VolumeX } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [counter, setCounter] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let timer: number;
    if (isActive) {
      timer = window.setInterval(() => {
        setCounter((prev) => {
          if (prev > 1) return prev - 1;

          // Transition phase
          if (phase === 'Inhale') {
            setPhase('Hold');
            if (soundEnabled) audioSynth.playZenBowl(432);
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            if (soundEnabled) audioSynth.playZenBowl(380);
            return 4;
          } else {
            setPhase('Inhale');
            if (soundEnabled) audioSynth.playZenBowl(528);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, soundEnabled]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('Inhale');
    setCounter(4);
    if (soundEnabled) audioSynth.playZenBowl(528);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCounter(4);
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-8 bg-gradient-to-b from-orange-50/80 via-amber-50/60 to-rose-50/80 dark:from-stone-800 dark:via-stone-800/90 dark:to-stone-900 p-8 sm:p-12 rounded-3xl border border-orange-200 dark:border-stone-700 shadow-xl">
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
          Box Breathing Exercise
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-300">
          Inhale for 4s, Hold for 4s, Exhale for 4s. This instantly resets your parasympathetic nervous system.
        </p>
      </div>

      {/* Animated Expanding Breathing Sphere */}
      <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
        
        {/* Outer Pulsing Rings */}
        <div
          className={`absolute inset-0 rounded-full bg-orange-300/40 dark:bg-orange-500/20 transition-all duration-1000 ${
            isActive && phase === 'Inhale'
              ? 'scale-125 opacity-100'
              : isActive && phase === 'Exhale'
              ? 'scale-75 opacity-50'
              : 'scale-100 opacity-70'
          }`}
        />

        <div
          className={`w-40 h-40 rounded-full bg-gradient-to-tr from-orange-400 via-amber-400 to-rose-400 dark:from-orange-500 dark:to-rose-600 shadow-2xl flex flex-col items-center justify-center text-white transition-transform duration-1000 ease-in-out ${
            isActive && phase === 'Inhale'
              ? 'scale-110'
              : isActive && phase === 'Exhale'
              ? 'scale-90'
              : 'scale-100'
          }`}
        >
          <span className="text-sm font-bold uppercase tracking-widest opacity-90">
            {isActive ? phase : 'Ready'}
          </span>
          <span className="text-4xl font-extrabold font-mono mt-1">
            {isActive ? counter : '4-4-4'}
          </span>
        </div>

      </div>

      {/* Instructions Prompt */}
      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 h-6">
        {isActive
          ? phase === 'Inhale'
            ? 'Breathe in slowly through your nose...'
            : phase === 'Hold'
            ? 'Hold your breath gently...'
            : 'Exhale fully through your mouth...'
          : 'Click Start to begin your soothing breath loop.'}
      </p>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Breathing</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
          >
            <Pause className="w-4 h-4 fill-white" />
            <span>Pause</span>
          </button>
        )}

        <button
          onClick={handleReset}
          className="p-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-3 rounded-2xl border transition-colors ${
            soundEnabled
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300'
              : 'bg-white dark:bg-slate-700 text-slate-400 border-slate-200'
          }`}
          title="Toggle Chime Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
