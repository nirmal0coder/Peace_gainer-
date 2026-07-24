import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight, ShieldAlert, Smile, Frown, Meh, Sun, Wind, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onStartJourney: () => void;
  onNeedHelp: () => void;
  onMoodSelect: (mood: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onNeedHelp, onMoodSelect }) => {
  const [selectedQuickMood, setSelectedQuickMood] = useState<string | null>(null);

  const quickMoods = [
    { id: 'calm', label: 'Calm & Peaceful', icon: <Sun className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40' },
    { id: 'okay', label: 'Holding Up', icon: <Meh className="w-5 h-5 text-sky-500" />, bg: 'bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40' },
    { id: 'anxious', label: 'Feeling Anxious', icon: <Wind className="w-5 h-5 text-indigo-500" />, bg: 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40' },
    { id: 'sad', label: 'Overwhelmed', icon: <Frown className="w-5 h-5 text-purple-500" />, bg: 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40' }
  ];

  const handleQuickMoodClick = (id: string) => {
    setSelectedQuickMood(id);
    onMoodSelect(id);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="relative overflow-hidden py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-orange-50/80 via-amber-50/40 to-white dark:from-[#2d0e17] dark:via-[#250c14] dark:to-[#1e070e] border-b border-orange-100 dark:border-rose-900/60">
      
      {/* Background Soft Peach & Rose Pastel Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-orange-300/40 dark:bg-rose-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-rose-300/40 dark:bg-orange-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Encouraging Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/90 dark:bg-orange-950/80 text-orange-900 dark:text-orange-200 border border-orange-200 dark:border-orange-800 text-xs sm:text-sm font-bold shadow-sm animate-pulse">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>A Compassionate Space Built for Peace & Serenity</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-stone-900 dark:text-stone-100 tracking-tight leading-tight sm:leading-none">
              You Matter. <br className="hidden sm:inline" />
              Your Life Matters. <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 dark:from-orange-400 dark:via-amber-300 dark:to-rose-300 bg-clip-text text-transparent">
                Peace Begins Here.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Small steps every day lead to a calmer, happier tomorrow. You&apos;re not alone.
              Explore supported tools, AI companion voice notes, and relaxing games in a warm peach sanctuary.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartJourney}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-base shadow-lg shadow-orange-200/80 dark:shadow-none flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onNeedHelp}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-[#381420] text-rose-600 dark:text-rose-300 font-bold text-base border-2 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-[#451a28] shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <span>Need Immediate Help?</span>
              </button>
            </div>

            {/* Quick Mood Check-In Bar */}
            <div className="pt-6 border-t border-orange-200/60 dark:border-rose-900/50">
              <p className="text-xs sm:text-sm font-semibold text-stone-500 dark:text-rose-200/80 mb-3">
                How are you feeling right this moment?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto lg:mx-0">
                {quickMoods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleQuickMoodClick(m.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                      selectedQuickMood === m.id
                        ? 'border-orange-500 bg-orange-100 dark:bg-rose-950 text-orange-950 dark:text-rose-100 ring-2 ring-orange-300'
                        : `${m.bg} border-orange-100 dark:border-rose-900/40 text-stone-700 dark:text-rose-100`
                    }`}
                  >
                    {m.icon}
                    <span className="truncate">{m.label}</span>
                  </button>
                ))}
              </div>
              {selectedQuickMood && (
                <div className="mt-3 p-3 rounded-2xl bg-orange-50 dark:bg-rose-950/70 border border-orange-200 dark:border-rose-800 text-orange-900 dark:text-rose-100 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>Thank you for checking in with yourself. We&apos;ve customized your self-help tools below!</span>
                </div>
              )}
            </div>

          </div>

          {/* Hero Right Visual (Calming Peach Lotus Illustration) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-orange-100/80 via-amber-100/60 to-rose-100/80 dark:from-[#3a1420] dark:via-[#33111b] dark:to-[#2b0c16] p-6 shadow-2xl border border-white/80 dark:border-rose-800/50 flex flex-col items-center justify-center text-center">
              
              {/* Floating SVG Illustration */}
              <svg className="w-56 h-56 sm:w-64 sm:h-64 animate-pulse" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" fill="url(#peachGlow)" opacity="0.6" />
                
                {/* Peach Blossom Lotus */}
                <path d="M100 50 C120 75 140 100 100 135 C60 100 80 75 100 50 Z" fill="#FB923C" opacity="0.85" />
                <path d="M70 75 C90 90 110 110 100 135 C60 120 50 95 70 75 Z" fill="#F472B6" opacity="0.75" />
                <path d="M130 75 C110 90 90 110 100 135 C140 120 150 95 130 75 Z" fill="#FBBF24" opacity="0.75" />
                
                <circle cx="100" cy="100" r="14" fill="#F43F5E" />
                <path d="M96 98 C96 95 98 94 100 96 C102 94 104 95 104 98 C104 101 100 104 100 104 C100 104 96 101 96 98 Z" fill="white" />
                
                <circle cx="100" cy="135" r="25" stroke="#FB923C" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <circle cx="100" cy="135" r="45" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />

                <defs>
                  <radialGradient id="peachGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(80)">
                    <stop stopColor="#FB923C" stopOpacity="0.5" />
                    <stop offset="0.6" stopColor="#F472B6" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#FBBF24" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              <div className="mt-4 space-y-1">
                <span className="text-xs font-bold tracking-wider text-orange-700 dark:text-orange-400 uppercase">
                  Breath & Peach Serenity
                </span>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-200 italic">
                  &ldquo;Peace is not the absence of trouble, but the presence of grace.&rdquo;
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
