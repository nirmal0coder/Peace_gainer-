import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight, ShieldAlert, Smile, Frown, Meh, Sun, Wind, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PeaceGainerLogo } from './PeaceGainerLogo';

interface HeroProps {
  onStartJourney: () => void;
  onNeedHelp: () => void;
  onMoodSelect: (mood: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney, onNeedHelp, onMoodSelect }) => {
  const [selectedQuickMood, setSelectedQuickMood] = useState<string | null>(null);

  const quickMoods = [
    { id: 'calm', label: 'Calm & Peaceful 🌿', icon: <Sun className="w-4 h-4 text-[#3FCDA8]" />, bg: 'bg-[#0F2836] hover:bg-[#143345] border-[#3FCDA8]/30 text-[#F7F3E9]' },
    { id: 'okay', label: 'Holding Up 🌬️', icon: <Meh className="w-4 h-4 text-[#8B85C4]" />, bg: 'bg-[#0F2836] hover:bg-[#143345] border-[#8B85C4]/30 text-[#F7F3E9]' },
    { id: 'anxious', label: 'Feeling Anxious ✨', icon: <Wind className="w-4 h-4 text-[#F2A65A]" />, bg: 'bg-[#0F2836] hover:bg-[#143345] border-[#F2A65A]/30 text-[#F7F3E9]' },
    { id: 'sad', label: 'Overwhelmed 🌙', icon: <Frown className="w-4 h-4 text-rose-300" />, bg: 'bg-[#0F2836] hover:bg-[#143345] border-rose-400/30 text-[#F7F3E9]' }
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
    <div className="relative overflow-hidden py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] border-b border-[#3FCDA8]/30 dark:border-[#3FCDA8]/20 transition-colors duration-300">
      
      {/* Soft Radial Glow Backdrop in Aurora Teal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3FCDA8]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#8B85C4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Encouraging Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-[#F2A65A]" />
              <span>A Compassionate Haven for Emotional Peace & Serenity 🕊️</span>
            </div>

            {/* Main Headline with Serif Font */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9] tracking-tight leading-tight">
              You Matter. <br className="hidden sm:inline" />
              Your Peace Matters. <br />
              <span className="text-[#169375] dark:text-[#3FCDA8]">
                Breathe · Return · Grow 🕊️
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-[#1C2D37]/80 dark:text-[#F7F3E9]/75 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Gentle steps every day lead to lasting emotional equilibrium. You are never alone.
              Explore self-guided breathing practices 🌬️, confidential AI voice notes ✨, yoga postures 🌿, and relaxing mini-games 🌙.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartJourney}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-base shadow-lg shadow-[#3FCDA8]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Begin Gentle Journey 🌿</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onNeedHelp}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-rose-100 dark:bg-[#0F2836] text-rose-800 dark:text-rose-200 font-bold text-base border border-rose-300 dark:border-rose-800/80 hover:bg-rose-200 dark:hover:bg-[#143345] shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>24/7 Emergency Support 🆘</span>
              </button>
            </div>

            {/* Quick Mood Check-In Bar */}
            <div className="pt-6 border-t border-[#3FCDA8]/20">
              <p className="text-xs sm:text-sm font-semibold text-[#0B1F2A]/90 dark:text-[#F7F3E9]/80 mb-3">
                How is your spirit feeling in this moment? ✨
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto lg:mx-0">
                {quickMoods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleQuickMoodClick(m.id)}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-medium transition-all ${
                      selectedQuickMood === m.id
                        ? 'border-[#3FCDA8] bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] font-bold shadow-md'
                        : `bg-white dark:bg-[#0F2836] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] border-[#3FCDA8]/30 text-[#0B1F2A] dark:text-[#F7F3E9]`
                    }`}
                  >
                    {m.icon}
                    <span className="truncate">{m.label}</span>
                  </button>
                ))}
              </div>
              {selectedQuickMood && (
                <div className="mt-3 p-3 rounded-2xl bg-white dark:bg-[#0F2836] border border-[#3FCDA8]/40 text-[#0B1F2A] dark:text-[#F7F3E9] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8] flex-shrink-0" />
                  <span>Thank you for honouring your feelings. Your self-help space is ready below 🌿</span>
                </div>
              )}
            </div>

          </div>

          {/* Hero Right Visual (Peace Gainer Logo Emblem) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#06131A] shadow-2xl border border-[#3FCDA8]/40 flex flex-col items-center justify-center text-center overflow-hidden group">
              <div className="py-2">
                <PeaceGainerLogo variant="badge" size={120} />
              </div>
              <p className="text-xs text-[#F7F3E9]/80 italic max-w-xs mt-2 font-serif">
                &ldquo;In quiet stillness, the mind returns home.&rdquo; 🌿
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
