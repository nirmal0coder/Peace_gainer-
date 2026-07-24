import React, { useState } from 'react';
import { Heart, Sparkles, Sun, Wind, BookOpen, Volume2, Smile, BellRing } from 'lucide-react';
import { MoodTracker } from './SelfHelp/MoodTracker';
import { GratitudeJournal } from './SelfHelp/GratitudeJournal';
import { AffirmationCards } from './SelfHelp/AffirmationCards';
import { BreathingExercise } from './SelfHelp/BreathingExercise';
import { GuidedRelaxationTimer } from './SelfHelp/GuidedRelaxationTimer';
import { KindnessChallenge } from './SelfHelp/KindnessChallenge';
import { SoundMixer } from './SelfHelp/SoundMixer';

export const SelfHelpToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mood' | 'gratitude' | 'affirmations' | 'breathing' | 'guided' | 'kindness' | 'mixer'>('breathing');

  const tabs = [
    { id: 'breathing', label: 'Deep Breathing 🌬️', icon: <Wind className="w-4 h-4 text-[#3FCDA8]" /> },
    { id: 'mood', label: 'Mood Tracker 🌿', icon: <Smile className="w-4 h-4 text-[#F2A65A]" /> },
    { id: 'gratitude', label: 'Gratitude Journal 📔', icon: <Heart className="w-4 h-4 text-rose-400" /> },
    { id: 'affirmations', label: 'Affirmations ✨', icon: <Sparkles className="w-4 h-4 text-[#F2A65A]" /> },
    { id: 'guided', label: '5-Min Relaxation 🧘', icon: <Sun className="w-4 h-4 text-[#3FCDA8]" /> },
    { id: 'kindness', label: 'Kindness Challenge 🕊️', icon: <BellRing className="w-4 h-4 text-[#8B85C4]" /> },
    { id: 'mixer', label: 'Sound Mixer 🎧', icon: <Volume2 className="w-4 h-4 text-[#3FCDA8]" /> }
  ] as const;

  return (
    <section id="toolkit" className="py-16 sm:py-24 bg-gradient-to-b from-[#0B1F2A] via-[#0A1B25] to-[#081620] transition-colors relative overflow-hidden">
      
      {/* Radial Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3FCDA8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2836] text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F2A65A]" />
            <span>Interactive Wellness Suite 🕊️</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F3E9]">
            Interactive Self-Help Toolkit
          </h2>
          <p className="text-base sm:text-lg text-[#F7F3E9]/70">
            Gentle, scientifically grounded interactive exercises designed to calm your nervous system and lift your mood right now.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#3FCDA8] text-[#081620] font-bold shadow-lg scale-102'
                  : 'bg-[#0F2836] text-[#F7F3E9]/80 border border-[#3FCDA8]/20 hover:border-[#3FCDA8]/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active Tool View */}
        <div className="max-w-4xl mx-auto bg-[#0F2836] rounded-3xl p-6 sm:p-8 border border-[#3FCDA8]/30 shadow-2xl">
          {activeTab === 'breathing' && <BreathingExercise />}
          {activeTab === 'mood' && <MoodTracker />}
          {activeTab === 'gratitude' && <GratitudeJournal />}
          {activeTab === 'affirmations' && <AffirmationCards />}
          {activeTab === 'guided' && <GuidedRelaxationTimer />}
          {activeTab === 'kindness' && <KindnessChallenge />}
          {activeTab === 'mixer' && <SoundMixer />}
        </div>

      </div>
    </section>
  );
};
