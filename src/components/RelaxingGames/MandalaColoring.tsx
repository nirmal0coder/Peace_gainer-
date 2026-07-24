import React, { useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const MandalaColoring: React.FC = () => {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [selectedPalette, setSelectedPalette] = useState('#34D399');

  const palette = [
    '#34D399', '#38BDF8', '#A78BFA', '#F472B6', '#FBBF24',
    '#60A5FA', '#F43F5E', '#10B981', '#818CF8', '#F471B5'
  ];

  const handlePetalClick = (petalId: string) => {
    audioSynth.playBubblePop();
    setColors((prev) => ({ ...prev, [petalId]: selectedPalette }));
  };

  const resetColoring = () => {
    setColors({});
  };

  return (
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
            Mandala Pastel Coloring
          </h3>
          <p className="text-xs text-stone-600 dark:text-rose-200/80">
            Select a soothing pastel color and tap petals to color your mandala.
          </p>
        </div>
        <button
          onClick={resetColoring}
          className="px-4 py-2 rounded-2xl bg-white dark:bg-[#381420] shadow-sm text-xs font-bold text-orange-700 dark:text-rose-200 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Mandala
        </button>
      </div>

      {/* Palette selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {palette.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedPalette(c)}
            style={{ backgroundColor: c }}
            className={`w-8 h-8 rounded-full shadow-md border-2 transition-transform ${
              selectedPalette === c ? 'border-slate-900 scale-125' : 'border-white'
            }`}
          />
        ))}
      </div>

      {/* Interactive SVG Mandala */}
      <div className="w-64 h-64 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <circle cx="100" cy="100" r="95" fill={colors['bg'] || '#ffffff'} stroke="#cbd5e1" strokeWidth="2" onClick={() => handlePetalClick('bg')} className="cursor-pointer" />
          
          {/* 8 Outer Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
            <g key={idx} transform={`rotate(${deg} 100 100)`}>
              <path
                d="M100 20 C120 50 120 80 100 100 C80 80 80 50 100 20 Z"
                fill={colors[`outer_${idx}`] || '#f8fafc'}
                stroke="#64748b"
                strokeWidth="1.5"
                onClick={() => handlePetalClick(`outer_${idx}`)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <path
                d="M100 40 C110 60 110 80 100 95 C90 80 90 60 100 40 Z"
                fill={colors[`inner_${idx}`] || '#f1f5f9'}
                stroke="#64748b"
                strokeWidth="1"
                onClick={() => handlePetalClick(`inner_${idx}`)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </g>
          ))}

          {/* Center Lotus Heart */}
          <circle
            cx="100"
            cy="100"
            r="20"
            fill={colors['center'] || '#fef08a'}
            stroke="#64748b"
            strokeWidth="2"
            onClick={() => handlePetalClick('center')}
            className="cursor-pointer hover:opacity-80"
          />
        </svg>
      </div>
    </div>
  );
};
