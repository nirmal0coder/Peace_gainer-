import React, { useState } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export const PuzzleGame: React.FC = () => {
  const correctOrder = ['🌸', '🍃', '☀️', '🦋', '🌊', '🌺', '🌲', '✨', '️🌿'];
  const [tiles, setTiles] = useState<string[]>(() =>
    [...correctOrder].sort(() => Math.random() - 0.5)
  );

  const handleTileClick = (index: number) => {
    audioSynth.playBubblePop();
    const newTiles = [...tiles];
    const nextIdx = (index + 1) % tiles.length;
    [newTiles[index], newTiles[nextIdx]] = [newTiles[nextIdx], newTiles[index]];
    setTiles(newTiles);

    if (JSON.stringify(newTiles) === JSON.stringify(correctOrder)) {
      audioSynth.playChimeSuccess();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }
  };

  const shuffle = () => {
    setTiles([...correctOrder].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
          Serene Nature Tile Swap 🧩
        </h3>
        <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
          Tap tiles to swap adjacent elements and arrange nature icons peacefully.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {tiles.map((tile, idx) => (
          <button
            key={idx}
            onClick={() => handleTileClick(idx)}
            className="h-20 bg-white dark:bg-[#0B1F2A] rounded-2xl border-2 border-[#3FCDA8]/40 hover:border-[#3FCDA8] text-3xl shadow-md flex items-center justify-center transform hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            {tile}
          </button>
        ))}
      </div>

      <button
        onClick={shuffle}
        className="px-5 py-2.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Shuffle Tiles</span>
      </button>
    </div>
  );
};

