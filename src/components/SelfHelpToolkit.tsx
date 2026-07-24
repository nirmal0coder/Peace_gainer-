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
    { id: 'breathing', label: 'Deep Breathing', icon: <Wind className="w-4 h-4 text-orange-500" /> },
    { id: 'mood', label: 'Mood Tracker', icon: <Smile className="w-4 h-4 text-amber-500" /> },
    { id: 'gratitude', label: 'Gratitude Journal', icon: <Heart className="w-4 h-4 text-rose-500" /> },
    { id: 'affirmations', label: 'Affirmations', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'guided', label: '5-Min Relaxation', icon: <Sun className="w-4 h-4 text-orange-500" /> },
    { id: 'kindness', label: 'Kindness Challenge', icon: <BellRing className="w-4 h-4 text-rose-500" /> },
    { id: 'mixer', label: 'Sound Mixer', icon: <Volume2 className="w-4 h-4 text-orange-600" /> }
  ] as const;

  return (
    <section id="toolkit" className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/30 via-amber-50/40 to-rose-50/30 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Interactive Wellness Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            Interactive Self-Help Toolkit
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Gentle, scientifically grounded interactive exercises designed to calm your nervous system and lift your mood right now.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-md scale-102'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-orange-50 dark:hover:bg-stone-700 border border-orange-200/80 dark:border-stone-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active Tool View */}
        <div className="max-w-4xl mx-auto">
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
