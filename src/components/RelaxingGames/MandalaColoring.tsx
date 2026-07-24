import React, { useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const MandalaColoring: React.FC = () => {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [selectedPalette, setSelectedPalette] = useState('#3FCDA8');

  const palette = [
    '#3FCDA8', '#F2A65A', '#8B85C4', '#F472B6', '#38BDF8',
    '#34D399', '#FB7185', '#FBBF24', '#A78BFA', '#818CF8'
  ];

  const handlePetalClick = (petalId: string) => {
    audioSynth.playBubblePop();
    setColors((prev) => ({ ...prev, [petalId]: selectedPalette }));
  };

  const resetColoring = () => {
    setColors({});
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Mandala Pastel Coloring 💫
          </h3>
          <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Select a soothing color below and tap any petal to paint your peaceful mandala.
          </p>
        </div>
        <button
          onClick={resetColoring}
          className="px-4 py-2 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 shadow-sm text-xs font-bold text-[#169375] dark:text-[#3FCDA8] flex items-center gap-1.5 flex-shrink-0"
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
            className={`w-9 h-9 rounded-full shadow-md border-2 transition-transform cursor-pointer ${
              selectedPalette === c ? 'border-[#0B1F2A] dark:border-white scale-125' : 'border-white/80'
            }`}
          />
        ))}
      </div>

      {/* Interactive SVG Mandala */}
      <div className="w-64 h-64 sm:w-72 sm:h-72 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          <circle cx="100" cy="100" r="95" fill={colors['bg'] || '#ffffff'} stroke="#3FCDA8" strokeWidth="2" onClick={() => handlePetalClick('bg')} className="cursor-pointer" />
          
          {/* 8 Outer Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
            <g key={idx} transform={`rotate(${deg} 100 100)`}>
              <path
                d="M100 20 C120 50 120 80 100 100 C80 80 80 50 100 20 Z"
                fill={colors[`outer_${idx}`] || '#f8fafc'}
                stroke="#0B1F2A"
                strokeWidth="1.5"
                onClick={() => handlePetalClick(`outer_${idx}`)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <path
                d="M100 40 C110 60 110 80 100 95 C90 80 90 60 100 40 Z"
                fill={colors[`inner_${idx}`] || '#f1f5f9'}
                stroke="#0B1F2A"
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
            stroke="#0B1F2A"
            strokeWidth="2"
            onClick={() => handlePetalClick('center')}
            className="cursor-pointer hover:opacity-80"
          />
        </svg>
      </div>
    </div>
  );
};

