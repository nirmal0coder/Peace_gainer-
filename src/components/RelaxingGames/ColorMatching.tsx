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
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
          Soothing Color Spectrum Harmony 🎨
        </h3>
        <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
          Slide the color controller until your color seamlessly matches the target harmony hue.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        
        {/* Target Color Sphere */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#0B1F2A]/80 dark:text-[#F7F3E9]/80 uppercase tracking-wider block">Target Hue</span>
          <div
            style={{ backgroundColor: `hsl(${targetHue}, 70%, 60%)` }}
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white/80 transition-all mx-auto"
          />
        </div>

        {/* User Color Sphere */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#169375] dark:text-[#3FCDA8] uppercase tracking-wider block">Your Hue</span>
          <div
            style={{ backgroundColor: `hsl(${currentHue}, 70%, 60%)` }}
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white/80 transition-all scale-105 mx-auto"
          />
        </div>

      </div>

      <div className="max-w-md mx-auto space-y-3">
        <input
          type="range"
          min="0"
          max="360"
          value={currentHue}
          onChange={(e) => handleSlider(parseInt(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-[#3FCDA8]"
          style={{
            background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)'
          }}
        />
        <div className="text-xs font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
          Harmony Match: <span className="text-[#169375] dark:text-[#3FCDA8] text-sm">{accuracy}%</span>
        </div>
      </div>

      {isMatched && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Perfect Color Harmony Found! ✨</span>
        </div>
      )}

      <button
        onClick={newChallenge}
        className="px-5 py-2.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>New Color Target</span>
      </button>
    </div>
  );
};

