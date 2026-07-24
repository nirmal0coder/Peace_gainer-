import React, { useState } from 'react';
import { Sparkles, Volume2, RefreshCw, Heart, Bookmark, Check } from 'lucide-react';
import { AFFIRMATIONS } from '../../data/contentData';

export const AffirmationCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [savedAffirmations, setSavedAffirmations] = useState<string[]>([]);

  const current = AFFIRMATIONS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(current.text);
    utterance.rate = 0.85; // Slightly slower, soothing speed
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleSave = () => {
    if (savedAffirmations.includes(current.id)) {
      setSavedAffirmations(savedAffirmations.filter((id) => id !== current.id));
    } else {
      setSavedAffirmations([...savedAffirmations, current.id]);
    }
  };

  const isSaved = savedAffirmations.includes(current.id);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* Main Affirmation Card */}
      <div className="relative bg-gradient-to-tr from-sky-100 via-indigo-100 to-purple-100 dark:from-slate-800 dark:via-indigo-950 dark:to-slate-900 rounded-3xl p-8 sm:p-12 border border-indigo-200/60 dark:border-indigo-800/60 shadow-xl text-center space-y-6">
        
        <span className="inline-block px-3 py-1 rounded-full bg-white/80 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          {current.category}
        </span>

        <p className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-slate-100 leading-relaxed">
          &ldquo;{current.text}&rdquo;
        </p>

        <div className="flex items-center justify-center gap-3 pt-4">
          
          {/* Read Aloud Button */}
          <button
            onClick={handleSpeak}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isSpeaking
                ? 'bg-indigo-600 text-white animate-pulse'
                : 'bg-white dark:bg-slate-700 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-50'
            }`}
          >
            <Volume2 className="w-4 h-4 text-indigo-500" />
            <span>{isSpeaking ? 'Listening...' : 'Listen Aloud'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={toggleSave}
            className={`p-2.5 rounded-2xl transition-all ${
              isSaved
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
            }`}
            title="Save Affirmation"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          {/* Shuffle / Next Card */}
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Affirmation</span>
          </button>

        </div>

        <div className="text-[11px] text-slate-500 font-medium">
          Card {currentIndex + 1} of {AFFIRMATIONS.length}
        </div>

      </div>

    </div>
  );
};
