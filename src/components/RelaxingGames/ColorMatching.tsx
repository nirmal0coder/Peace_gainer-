import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export const ColorMatching: React.FC = () => {
  const [targetHue, setTargetHue] = useState(() => Math.floor(Math.random() * 360));
  const [currentHue, setCurrentHue] = useState(180);
  const [isMatched, setIsMatched] = useState(false);

  const diff = Math.abs(targetHue - currentHue);
  const accuracy = Math.max(0, 100 - Math.round((diff / 180) * 100));

  const handleSlider = (val: number) => {
    setCurrentHue(val);
    if (Math.abs(val - targetHue) < 10) {
      if (!isMatched) {
        setIsMatched(true);
        audioSynth.playChimeSuccess();
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      setIsMatched(false);
    }
  };

  const newChallenge = () => {
    setTargetHue(Math.floor(Math.random() * 360));
    setCurrentHue(180);
    setIsMatched(false);
  };

  return (
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div>
        <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
          Soothing Color Spectrum Harmony
        </h3>
        <p className="text-xs text-stone-600 dark:text-rose-200/80">
          Slide the color controller until your color seamlessly matches the target harmony hue.
        </p>
      </div>

      <div className="flex items-center justify-center gap-6">
        
        {/* Target Color Sphere */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Target Hue</span>
          <div
            style={{ backgroundColor: `hsl(${targetHue}, 70%, 60%)` }}
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white/80 transition-all"
          />
        </div>

        {/* User Color Sphere */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Your Hue</span>
          <div
            style={{ backgroundColor: `hsl(${currentHue}, 70%, 60%)` }}
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white/80 transition-all scale-105"
          />
        </div>

      </div>

      <div className="max-w-md mx-auto space-y-2">
        <input
          type="range"
          min="0"
          max="360"
          value={currentHue}
          onChange={(e) => handleSlider(parseInt(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer"
          style={{
            background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)'
          }}
        />
        <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
          Harmony Match: {accuracy}%
        </div>
      </div>

      {isMatched && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Perfect Color Harmony Found!</span>
        </div>
      )}

      <button
        onClick={newChallenge}
        className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md inline-flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        <span>New Color Target</span>
      </button>
    </div>
  );
};
