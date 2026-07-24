import React, { useState } from 'react';
import { Gamepad2, Sparkles, Smile, Flower2, Palette, Sun, Heart, Volume2, ShieldCheck, Eye, Droplets, Layers } from 'lucide-react';
import { BubblePop } from './RelaxingGames/BubblePop';
import { MemoryMatch } from './RelaxingGames/MemoryMatch';
import { ColorMatching } from './RelaxingGames/ColorMatching';
import { ZenGarden } from './RelaxingGames/ZenGarden';
import { MandalaColoring } from './RelaxingGames/MandalaColoring';
import { StressBall } from './RelaxingGames/StressBall';
import { BreathingBubble } from './RelaxingGames/BreathingBubble';
import { PuzzleGame } from './RelaxingGames/PuzzleGame';
import { FocusChallenge } from './RelaxingGames/FocusChallenge';
import { PopItFidget } from './RelaxingGames/PopItFidget';
import { WaterRipples } from './RelaxingGames/WaterRipples';
import { PetalPlucker } from './RelaxingGames/PetalPlucker';
import { SoundMixer } from './SelfHelp/SoundMixer';

export const RelaxingGamesSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<
    'bubble' | 'popit' | 'water' | 'petals' | 'color' | 'memory' | 'zen' | 'mandala' | 'stress' | 'breathing' | 'puzzle' | 'focus' | 'mixer'
  >('bubble');

  const games = [
    { id: 'bubble', label: 'Bubble Pop', icon: <Smile className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" /> },
    { id: 'popit', label: 'Pop-It Fidget', icon: <Layers className="w-4 h-4 text-[#F2A65A]" /> },
    { id: 'water', label: 'Water Ripples', icon: <Droplets className="w-4 h-4 text-[#38BDF8]" /> },
    { id: 'petals', label: 'Lotus Plucker', icon: <Flower2 className="w-4 h-4 text-[#F472B6]" /> },
    { id: 'color', label: 'Color Matching', icon: <Palette className="w-4 h-4 text-[#8B85C4]" /> },
    { id: 'memory', label: 'Memory Match', icon: <Flower2 className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" /> },
    { id: 'zen', label: 'Zen Garden', icon: <Sun className="w-4 h-4 text-[#F2A65A]" /> },
    { id: 'mandala', label: 'Mandala', icon: <Sparkles className="w-4 h-4 text-[#8B85C4]" /> },
    { id: 'stress', label: 'Stress Sphere', icon: <Heart className="w-4 h-4 text-rose-500" /> },
    { id: 'breathing', label: 'Breathing Bubble', icon: <ShieldCheck className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" /> },
    { id: 'puzzle', label: 'Tile Puzzle', icon: <Gamepad2 className="w-4 h-4 text-[#8B85C4]" /> },
    { id: 'focus', label: 'Focus Challenge', icon: <Eye className="w-4 h-4 text-[#F2A65A]" /> },
    { id: 'mixer', label: 'Soundboard', icon: <Volume2 className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" /> }
  ] as const;

  return (
    <section id="games" className="py-16 sm:py-24 bg-gradient-to-b from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] transition-colors relative overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#3FCDA8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" />
            <span>Stress-Reduction Arcade</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
            Soothing Relaxing Games
          </h2>
          <p className="text-base sm:text-lg text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Gentle browser games designed with soothing visuals, soft audio feedback, and zero score pressure.
          </p>
        </div>

        {/* Game Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGame(g.id as typeof activeGame)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeGame === g.id
                  ? 'bg-[#3FCDA8] text-[#081620] font-bold shadow-md scale-102'
                  : 'bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] border border-[#3FCDA8]/30 hover:bg-[#EAE4D3] dark:hover:bg-[#143345]'
              }`}
            >
              {g.icon}
              <span>{g.label}</span>
            </button>
          ))}
        </div>

        {/* Active Game Display */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] rounded-3xl p-6 sm:p-8 border border-[#3FCDA8]/30 shadow-2xl transition-colors">
          {activeGame === 'bubble' && <BubblePop />}
          {activeGame === 'popit' && <PopItFidget />}
          {activeGame === 'water' && <WaterRipples />}
          {activeGame === 'petals' && <PetalPlucker />}
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

