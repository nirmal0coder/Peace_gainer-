import React, { useState } from 'react';
import { Gamepad2, Sparkles, Smile, Flower2, Palette, Sun, Heart, Volume2, ShieldCheck, Eye } from 'lucide-react';
import { BubblePop } from './RelaxingGames/BubblePop';
import { MemoryMatch } from './RelaxingGames/MemoryMatch';
import { ColorMatching } from './RelaxingGames/ColorMatching';
import { ZenGarden } from './RelaxingGames/ZenGarden';
import { MandalaColoring } from './RelaxingGames/MandalaColoring';
import { StressBall } from './RelaxingGames/StressBall';
import { BreathingBubble } from './RelaxingGames/BreathingBubble';
import { PuzzleGame } from './RelaxingGames/PuzzleGame';
import { FocusChallenge } from './RelaxingGames/FocusChallenge';
import { SoundMixer } from './SelfHelp/SoundMixer';

export const RelaxingGamesSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'bubble' | 'memory' | 'color' | 'zen' | 'mandala' | 'stress' | 'breathing' | 'puzzle' | 'focus' | 'mixer'>('bubble');

  const games = [
    { id: 'bubble', label: 'Bubble Pop', icon: <Smile className="w-4 h-4 text-orange-500" /> },
    { id: 'memory', label: 'Memory Match', icon: <Flower2 className="w-4 h-4 text-amber-500" /> },
    { id: 'color', label: 'Color Matching', icon: <Palette className="w-4 h-4 text-rose-500" /> },
    { id: 'zen', label: 'Zen Garden', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { id: 'mandala', label: 'Mandala Coloring', icon: <Sparkles className="w-4 h-4 text-orange-500" /> },
    { id: 'stress', label: 'Stress Sphere', icon: <Heart className="w-4 h-4 text-rose-500" /> },
    { id: 'breathing', label: 'Breathing Bubble', icon: <ShieldCheck className="w-4 h-4 text-amber-600" /> },
    { id: 'puzzle', label: 'Tile Puzzle', icon: <Gamepad2 className="w-4 h-4 text-orange-600" /> },
    { id: 'focus', label: 'Focus Challenge', icon: <Eye className="w-4 h-4 text-rose-600" /> },
    { id: 'mixer', label: 'Soundboard', icon: <Volume2 className="w-4 h-4 text-amber-600" /> }
  ] as const;

  return (
    <section id="games" className="py-16 sm:py-24 bg-white/70 dark:bg-[#280c16]/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-rose-950 text-orange-900 dark:text-rose-200 text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-orange-500" />
            <span>Stress-Reduction Arcade</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-rose-100">
            Soothing Relaxing Games
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-rose-200/80">
            Gentle browser games designed with soothing pastels, soft sound feedback, and zero score pressure.
          </p>
        </div>

        {/* Game Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGame(g.id as typeof activeGame)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                activeGame === g.id
                  ? 'bg-orange-600 text-white shadow-md scale-102'
                  : 'bg-stone-100 dark:bg-[#34121d] text-stone-700 dark:text-rose-200 hover:bg-orange-100 dark:hover:bg-[#421827]'
              }`}
            >
              {g.icon}
              <span>{g.label}</span>
            </button>
          ))}
        </div>

        {/* Active Game Display */}
        <div className="max-w-3xl mx-auto">
          {activeGame === 'bubble' && <BubblePop />}
          {activeGame === 'memory' && <MemoryMatch />}
          {activeGame === 'color' && <ColorMatching />}
          {activeGame === 'zen' && <ZenGarden />}
          {activeGame === 'mandala' && <MandalaColoring />}
          {activeGame === 'stress' && <StressBall />}
          {activeGame === 'breathing' && <BreathingBubble />}
          {activeGame === 'puzzle' && <PuzzleGame />}
          {activeGame === 'focus' && <FocusChallenge />}
          {activeGame === 'mixer' && <SoundMixer />}
        </div>

      </div>
    </section>
  );
};
