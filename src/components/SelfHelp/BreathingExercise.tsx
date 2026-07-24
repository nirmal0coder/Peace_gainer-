import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Palette } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import { applyGlobalTheme } from '../../utils/themePalettes';
import { GlobalThemeId } from '../../types';

export type BreathingThemeId = 'emerald' | 'ocean' | 'lavender' | 'sunset' | 'cosmic' | 'zen';

export interface BreathingThemeConfig {
  id: BreathingThemeId;
  name: string;
  icon: string;
  cardBg: string;
  borderColor: string;
  glowColor: string;
  ringBg: string;
  sphereGradient: string;
  sphereShadow: string;
  accentText: string;
  btnPrimary: string;
  badgeClass: string;
  boxActiveBorder: string;
}

export const BREATHING_THEMES: Record<BreathingThemeId, BreathingThemeConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Sanctuary',
    icon: '🌿',
    cardBg: 'bg-gradient-to-b from-[#0B1F2A] via-[#0F2836] to-[#0A1B25]',
    borderColor: 'border-[#3FCDA8]/40',
    glowColor: 'shadow-[0_0_50px_rgba(63,205,168,0.2)]',
    ringBg: 'bg-[#3FCDA8]/20 border border-[#3FCDA8]/30',
    sphereGradient: 'bg-gradient-to-tr from-[#169375] via-[#3FCDA8] to-[#38BDF8]',
    sphereShadow: 'shadow-[0_0_45px_rgba(63,205,168,0.45)]',
    accentText: 'text-[#3FCDA8]',
    btnPrimary: 'bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620]',
    badgeClass: 'bg-[#3FCDA8]/15 text-[#3FCDA8] border-[#3FCDA8]/40',
    boxActiveBorder: 'border-[#3FCDA8] bg-[#3FCDA8]/20 text-[#3FCDA8]',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Breeze',
    icon: '🌊',
    cardBg: 'bg-gradient-to-b from-sky-950 via-slate-900 to-cyan-950',
    borderColor: 'border-sky-400/40',
    glowColor: 'shadow-[0_0_50px_rgba(56,189,248,0.2)]',
    ringBg: 'bg-sky-400/20 border border-sky-400/30',
    sphereGradient: 'bg-gradient-to-tr from-cyan-600 via-sky-400 to-indigo-400',
    sphereShadow: 'shadow-[0_0_45px_rgba(56,189,248,0.45)]',
    accentText: 'text-sky-300',
    btnPrimary: 'bg-sky-400 hover:bg-sky-500 text-slate-950',
    badgeClass: 'bg-sky-400/15 text-sky-300 border-sky-400/40',
    boxActiveBorder: 'border-sky-400 bg-sky-400/20 text-sky-300',
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender Twilight',
    icon: '🪻',
    cardBg: 'bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950',
    borderColor: 'border-purple-400/40',
    glowColor: 'shadow-[0_0_50px_rgba(168,85,247,0.2)]',
    ringBg: 'bg-purple-400/20 border border-purple-400/30',
    sphereGradient: 'bg-gradient-to-tr from-purple-600 via-indigo-400 to-pink-400',
    sphereShadow: 'shadow-[0_0_45px_rgba(168,85,247,0.45)]',
    accentText: 'text-purple-300',
    btnPrimary: 'bg-purple-400 hover:bg-purple-500 text-slate-950',
    badgeClass: 'bg-purple-400/15 text-purple-300 border-purple-400/40',
    boxActiveBorder: 'border-purple-400 bg-purple-400/20 text-purple-300',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Glow',
    icon: '🌅',
    cardBg: 'bg-gradient-to-b from-amber-950/90 via-stone-900 to-rose-950/90',
    borderColor: 'border-amber-400/40',
    glowColor: 'shadow-[0_0_50px_rgba(242,166,90,0.2)]',
    ringBg: 'bg-amber-400/20 border border-amber-400/30',
    sphereGradient: 'bg-gradient-to-tr from-amber-600 via-orange-400 to-rose-400',
    sphereShadow: 'shadow-[0_0_45px_rgba(242,166,90,0.45)]',
    accentText: 'text-amber-300',
    btnPrimary: 'bg-amber-400 hover:bg-amber-500 text-slate-950',
    badgeClass: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
    boxActiveBorder: 'border-amber-400 bg-amber-400/20 text-amber-300',
  },
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic Stillness',
    icon: '🌙',
    cardBg: 'bg-gradient-to-b from-slate-950 via-indigo-950/90 to-slate-900',
    borderColor: 'border-indigo-400/40',
    glowColor: 'shadow-[0_0_50px_rgba(129,140,248,0.2)]',
    ringBg: 'bg-indigo-400/20 border border-indigo-400/30',
    sphereGradient: 'bg-gradient-to-tr from-indigo-600 via-blue-500 to-teal-300',
    sphereShadow: 'shadow-[0_0_45px_rgba(129,140,248,0.45)]',
    accentText: 'text-indigo-300',
    btnPrimary: 'bg-indigo-400 hover:bg-indigo-500 text-slate-950',
    badgeClass: 'bg-indigo-400/15 text-indigo-300 border-indigo-400/40',
    boxActiveBorder: 'border-indigo-400 bg-indigo-400/20 text-indigo-300',
  },
  zen: {
    id: 'zen',
    name: 'Zen Garden',
    icon: '🪴',
    cardBg: 'bg-gradient-to-b from-emerald-950/80 via-stone-900 to-teal-950/80',
    borderColor: 'border-emerald-400/40',
    glowColor: 'shadow-[0_0_50px_rgba(52,211,153,0.2)]',
    ringBg: 'bg-emerald-400/20 border border-emerald-400/30',
    sphereGradient: 'bg-gradient-to-tr from-emerald-600 via-teal-400 to-lime-300',
    sphereShadow: 'shadow-[0_0_45px_rgba(52,211,153,0.45)]',
    accentText: 'text-emerald-300',
    btnPrimary: 'bg-emerald-400 hover:bg-emerald-500 text-slate-950',
    badgeClass: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/40',
    boxActiveBorder: 'border-emerald-400 bg-emerald-400/20 text-emerald-300',
  },
};

type BoxPhase = 'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)';

export const BreathingExercise: React.FC = () => {
  const [themeId, setThemeId] = useState<BreathingThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('peace_gainer_global_theme');
      if (saved && BREATHING_THEMES[saved as BreathingThemeId]) {
        return saved as BreathingThemeId;
      }
    }
    return 'emerald';
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newThemeId = customEvent.detail?.themeId as BreathingThemeId;
      if (newThemeId && BREATHING_THEMES[newThemeId]) {
        setThemeId(newThemeId);
      }
    };
    window.addEventListener('peace_gainer_theme_changed', handleThemeChange);
    return () => {
      window.removeEventListener('peace_gainer_theme_changed', handleThemeChange);
    };
  }, []);

  const handleSelectTheme = (id: BreathingThemeId) => {
    setThemeId(id);
    const isDark = document.documentElement.classList.contains('dark');
    applyGlobalTheme(id as GlobalThemeId, isDark ? 'dark' : 'light');
  };
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BoxPhase>('Inhale');
  const [counter, setCounter] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);

  const currentTheme = BREATHING_THEMES[themeId];

  useEffect(() => {
    let timer: number;
    if (isActive) {
      timer = window.setInterval(() => {
        setCounter((prev) => {
          if (prev > 1) return prev - 1;

          // Transition through standard 4-phase Box Breathing loop
          if (phase === 'Inhale') {
            setPhase('Hold (Full)');
            if (soundEnabled) audioSynth.playZenBowl(432);
            return 4;
          } else if (phase === 'Hold (Full)') {
            setPhase('Exhale');
            if (soundEnabled) audioSynth.playZenBowl(380);
            return 4;
          } else if (phase === 'Exhale') {
            setPhase('Hold (Empty)');
            if (soundEnabled) audioSynth.playZenBowl(320);
            return 4;
          } else {
            setPhase('Inhale');
            setCompletedCycles((c) => c + 1);
            if (soundEnabled) audioSynth.playZenBowl(528);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase, soundEnabled]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('Inhale');
    setCounter(4);
    if (soundEnabled) audioSynth.playZenBowl(528);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCounter(4);
    setCompletedCycles(0);
  };

  // Phase index for box side indicator (0: Inhale, 1: Hold (Full), 2: Exhale, 3: Hold (Empty))
  const getPhaseIndex = () => {
    switch (phase) {
      case 'Inhale': return 0;
      case 'Hold (Full)': return 1;
      case 'Exhale': return 2;
      case 'Hold (Empty)': return 3;
    }
  };

  const phaseIndex = getPhaseIndex();

  return (
    <div className={`max-w-xl mx-auto text-center space-y-8 p-6 sm:p-10 rounded-3xl border ${currentTheme.cardBg} ${currentTheme.borderColor} ${currentTheme.glowColor} transition-all duration-700 shadow-2xl relative overflow-hidden`}>
      
      {/* Background Subtle Radial Effect */}
      <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />

      {/* Header & Description */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${currentTheme.badgeClass}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Box Breathing (4-4-4-4)</span>
          </div>

          {completedCycles > 0 && (
            <div className="text-xs font-mono font-semibold text-[#F7F3E9]/80 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Completed Loops: <span className={currentTheme.accentText}>{completedCycles}</span> 🕊️
            </div>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F7F3E9]">
          Box Breathing Exercise
        </h3>
        <p className="text-xs sm:text-sm text-[#F7F3E9]/80 max-w-lg mx-auto leading-relaxed">
          Four equal steps of 4 seconds each. Used by Navy SEALs, yoga practitioners, and therapists to instantly calm panic, lower heart rate, and rebalance focus.
        </p>
      </div>

      {/* Theme Selector Bar */}
      <div className="space-y-2 relative z-10 bg-white/5 p-3.5 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between text-xs font-bold text-[#F7F3E9]/90 px-1">
          <span className="flex items-center gap-1.5">
            <Palette className={`w-3.5 h-3.5 ${currentTheme.accentText}`} />
            <span>Select Breathing Theme Ambiance</span>
          </span>
          <span className={`text-[11px] font-mono ${currentTheme.accentText}`}>
            {currentTheme.name}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
          {(Object.keys(BREATHING_THEMES) as BreathingThemeId[]).map((id) => {
            const t = BREATHING_THEMES[id];
            const isSelected = id === themeId;
            return (
              <button
                key={id}
                onClick={() => handleSelectTheme(id)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer border ${
                  isSelected
                    ? `${t.btnPrimary} border-transparent shadow-lg scale-105`
                    : 'bg-white/5 hover:bg-white/10 text-[#F7F3E9]/80 border-white/10'
                }`}
                title={t.name}
              >
                <span className="text-base">{t.icon}</span>
                <span className="text-[10px] truncate max-w-full font-medium">{t.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-Sided Box Progress Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10 text-xs font-bold">
        {[
          { label: '1. Inhale', time: '4s', idx: 0 },
          { label: '2. Hold', time: '4s', idx: 1 },
          { label: '3. Exhale', time: '4s', idx: 2 },
          { label: '4. Hold', time: '4s', idx: 3 },
        ].map((step) => {
          const isCurrent = isActive && phaseIndex === step.idx;
          return (
            <div
              key={step.idx}
              className={`py-2 px-3 rounded-xl border transition-all duration-300 text-center ${
                isCurrent
                  ? `${currentTheme.boxActiveBorder} shadow-md scale-102`
                  : 'bg-white/5 border-white/10 text-[#F7F3E9]/60'
              }`}
            >
              <div className="text-[11px]">{step.label}</div>
              <div className="text-[10px] font-mono opacity-80">{step.time}</div>
            </div>
          );
        })}
      </div>

      {/* Animated Expanding Breathing Sphere */}
      <div className="relative w-60 h-60 mx-auto flex items-center justify-center relative z-10 my-4">
        
        {/* Outer Pulsing Aura Ring */}
        <div
          className={`absolute inset-0 rounded-full ${currentTheme.ringBg} transition-all duration-1000 ease-in-out ${
            isActive && phase === 'Inhale'
              ? 'scale-125 opacity-100'
              : isActive && (phase === 'Hold (Full)' || phase === 'Hold (Empty)')
              ? 'scale-110 opacity-80 animate-pulse'
              : isActive && phase === 'Exhale'
              ? 'scale-85 opacity-50'
              : 'scale-100 opacity-60'
          }`}
        />

        {/* Second Outer Glow Ring */}
        <div
          className={`absolute inset-4 rounded-full border border-white/20 transition-all duration-1000 ease-in-out ${
            isActive && phase === 'Inhale'
              ? 'scale-115 opacity-90'
              : isActive && phase === 'Exhale'
              ? 'scale-90 opacity-40'
              : 'scale-100 opacity-60'
          }`}
        />

        {/* Central Breathing Orb */}
        <div
          className={`w-44 h-44 rounded-full ${currentTheme.sphereGradient} ${currentTheme.sphereShadow} flex flex-col items-center justify-center text-[#081620] transition-transform duration-1000 ease-in-out cursor-pointer select-none ${
            isActive && phase === 'Inhale'
              ? 'scale-115'
              : isActive && phase === 'Hold (Full)'
              ? 'scale-110'
              : isActive && phase === 'Exhale'
              ? 'scale-85'
              : isActive && phase === 'Hold (Empty)'
              ? 'scale-80'
              : 'scale-100 hover:scale-105'
          }`}
          onClick={isActive ? handlePause : handleStart}
        >
          <span className="text-xs font-black uppercase tracking-widest opacity-95">
            {isActive ? phase : 'Ready'}
          </span>
          <span className="text-5xl font-extrabold font-mono mt-1 tracking-tight">
            {isActive ? counter : '4-4-4-4'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 mt-1">
            {isActive ? 'Keep Steady' : 'Click to Start'}
          </span>
        </div>

      </div>

      {/* Instructions Guidance Prompt */}
      <div className="h-8 flex items-center justify-center relative z-10">
        <p className={`text-sm sm:text-base font-bold transition-all ${currentTheme.accentText}`}>
          {isActive
            ? phase === 'Inhale'
              ? '🌬️ Breathe in deeply through your nose...'
              : phase === 'Hold (Full)'
              ? '🛑 Hold your breath gently with lungs full...'
              : phase === 'Exhale'
              ? '😮‍💨 Exhale smoothly through your mouth...'
              : '⏸️ Hold gently at empty rest...'
            : '✨ Select your preferred theme above & press Start to begin.'}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3 relative z-10 pt-2">
        {!isActive ? (
          <button
            onClick={handleStart}
            className={`px-7 py-3.5 rounded-2xl ${currentTheme.btnPrimary} font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Box Breathing</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Pause className="w-4 h-4 fill-current" />
            <span>Pause Exercise</span>
          </button>
        )}

        <button
          onClick={handleReset}
          className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F7F3E9] border border-white/20 transition-all cursor-pointer"
          title="Reset Breathing Loop"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            soundEnabled
              ? 'bg-white/15 text-[#F7F3E9] border-white/30 shadow-sm'
              : 'bg-white/5 text-white/40 border-white/10'
          }`}
          title={soundEnabled ? 'Chime Sounds Enabled' : 'Chime Sounds Muted'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
