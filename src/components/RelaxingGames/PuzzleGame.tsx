import React, { useState } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export const PuzzleGame: React.FC = () => {
  const correctOrder = ['🌸', '🍃', '☀️', '🦋', '🌊', '🌺', '🌲', '✨', '️'];
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
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div>
        <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
          Serene Nature Tile Swap
        </h3>
        <p className="text-xs text-stone-600 dark:text-rose-200/80">
          Tap tiles to swap adjacent elements and arrange nature icons peacefully.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {tiles.map((tile, idx) => (
          <button
            key={idx}
            onClick={() => handleTileClick(idx)}
            className="h-20 bg-white dark:bg-[#381420] rounded-2xl border-2 border-orange-200 dark:border-rose-900/60 text-3xl shadow-md flex items-center justify-center transform hover:scale-105 transition-transform"
          >
            {tile}
          </button>
        ))}
      </div>

      <button
        onClick={shuffle}
        className="px-5 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md inline-flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Shuffle Tiles</span>
      </button>
    </div>
  );
};
