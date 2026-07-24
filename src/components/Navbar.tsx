import React, { useState } from 'react';
import {
  Sun, Moon, Volume2, PhoneCall, Menu, X, Sparkles, Heart,
  Leaf, Cloud, Disc, EyeOff, ShieldAlert, Activity, Bot, Palette
} from 'lucide-react';
import { ThemeMode, BackgroundParticleType, GlobalThemeId } from '../types';
import { PeaceGainerLogo } from './PeaceGainerLogo';
import { GLOBAL_THEMES } from '../utils/themePalettes';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  globalTheme: GlobalThemeId;
  setGlobalTheme: (id: GlobalThemeId) => void;
  particleType: BackgroundParticleType;
  setParticleType: (type: BackgroundParticleType) => void;
  openSoundMixer: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  globalTheme,
  setGlobalTheme,
  particleType,
  setParticleType,
  openSoundMixer,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particleDropdownOpen, setParticleDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const globalThemesList = Object.values(GLOBAL_THEMES);
  const activeThemeConfig = GLOBAL_THEMES[globalTheme] || GLOBAL_THEMES.emerald;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'causes', label: 'Causes' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'yoga', label: 'Yoga & Mind' },
    { id: 'aichat', label: 'AI Companion' },
    { id: 'toolkit', label: 'Self Help' },
    { id: 'games', label: 'Relaxing Games' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'positivity', label: 'Daily Positivity' },
    { id: 'emergency', label: 'Emergency Help', highlight: true },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      window.location.hash = id;
    }
  };

  const particlesList: { id: BackgroundParticleType; label: string; icon: React.ReactNode }[] = [
    { id: 'leaves', label: 'Peace Leaves', icon: <Leaf className="w-4 h-4 text-[#3FCDA8]" /> },
    { id: 'butterflies', label: 'Aurora Butterflies', icon: <Sparkles className="w-4 h-4 text-[#F2A65A]" /> },
    { id: 'clouds', label: 'Breathing Clouds', icon: <Cloud className="w-4 h-4 text-[#8B85C4]" /> },
    { id: 'orbs', label: 'Stillness Orbs', icon: <Disc className="w-4 h-4 text-[#3FCDA8]" /> },
    { id: 'none', label: 'Clean Canvas', icon: <EyeOff className="w-4 h-4 text-stone-400" /> }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#F7F3E9]/90 dark:bg-[#0B1F2A]/90 border-b border-[#3FCDA8]/30 dark:border-[#3FCDA8]/20 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group hover:opacity-95 transition-opacity"
          >
            <PeaceGainerLogo variant="horizontal" size={44} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  link.highlight
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-900/80 border border-rose-300 dark:border-rose-800/80'
                    : activeSection === link.id
                    ? 'bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] font-bold border border-[#3FCDA8]/40 shadow-sm'
                    : 'text-[#1C2D37] dark:text-[#F7F3E9]/80 hover:text-[#0B1F2A] dark:hover:text-[#F7F3E9] hover:bg-[#EAE4D3] dark:hover:bg-[#0F2836]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">

            {/* Global Color Theme Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeDropdownOpen(!themeDropdownOpen);
                  setParticleDropdownOpen(false);
                }}
                title="Change Page & Color Theme"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] border border-[#3FCDA8]/40 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                <Palette className="w-4 h-4 text-[#3FCDA8]" />
                <span className="hidden md:inline">Theme</span>
                <span className="text-[11px] font-bold">{activeThemeConfig.icon}</span>
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0F2836] shadow-2xl border border-[#3FCDA8]/30 p-2 z-50">
                  <div className="text-[10px] font-bold text-[#169375] dark:text-[#3FCDA8] uppercase tracking-wider px-3 py-1 flex items-center justify-between">
                    <span>Page Color Theme</span>
                    <span className="text-xs">{activeThemeConfig.icon}</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {globalThemesList.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setGlobalTheme(t.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                          globalTheme === t.id
                            ? 'bg-[#3FCDA8] text-[#081620] font-bold shadow-sm'
                            : 'text-[#1C2D37] dark:text-[#F7F3E9]/80 hover:bg-[#EAE4D3] dark:hover:bg-[#143345] hover:text-[#0B1F2A] dark:hover:text-[#F7F3E9]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{t.icon}</span>
                          <div>
                            <div className="font-bold">{t.name}</div>
                            <div className="text-[10px] opacity-80 font-normal truncate max-w-[150px]">{t.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] border border-[#3FCDA8]/30 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-[#8B85C4]" />
                  <span className="hidden md:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#F2A65A]" />
                  <span className="hidden md:inline">Light</span>
                </>
              )}
            </button>
            
            {/* Sound Mixer */}
            <button
              onClick={openSoundMixer}
              title="Ambient Nature Sounds"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] border border-[#3FCDA8]/30 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8] animate-pulse" />
              <span className="hidden md:inline">Sounds</span>
            </button>

            {/* Particle Selector */}
            <div className="relative">
              <button
                onClick={() => setParticleDropdownOpen(!particleDropdownOpen)}
                title="Change Background Atmosphere"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] border border-[#F2A65A]/40 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#F2A65A]" />
                <span className="hidden md:inline">Atmosphere</span>
              </button>

              {particleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#0F2836] shadow-2xl border border-[#3FCDA8]/30 p-2 z-50">
                  <div className="text-[10px] font-bold text-[#F2A65A] uppercase tracking-wider px-3 py-1">
                    Atmosphere Background
                  </div>
                  {particlesList.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setParticleType(p.id);
                        setParticleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        particleType === p.id
                          ? 'bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] font-bold border border-[#3FCDA8]/30'
                          : 'text-[#1C2D37] dark:text-[#F7F3E9]/80 hover:bg-[#EAE4D3] dark:hover:bg-[#143345] hover:text-[#0B1F2A] dark:hover:text-[#F7F3E9]'
                      }`}
                    >
                      {p.icon}
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Helpline Urgent Call Button */}
            <a
              href="tel:14416"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F2A65A] to-[#3FCDA8] text-[#081620] font-bold text-xs shadow-md hover:brightness-110 transition-all transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Helpline 14416</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#0B1F2A] dark:text-[#F7F3E9] hover:bg-[#EAE4D3] dark:hover:bg-[#0F2836]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#3FCDA8]/20 bg-[#0B1F2A]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                link.highlight
                  ? 'bg-rose-950/80 text-rose-200 font-bold border border-rose-800 flex items-center justify-between'
                  : activeSection === link.id
                  ? 'bg-[#3FCDA8]/20 text-[#3FCDA8] font-bold border border-[#3FCDA8]/40'
                  : 'text-[#F7F3E9]/80 hover:bg-[#0F2836] hover:text-[#F7F3E9]'
              }`}
            >
              <span>{link.label}</span>
              {link.highlight && <ShieldAlert className="w-4 h-4 text-rose-400 inline" />}
            </button>
          ))}

          <div className="pt-2">
            <a
              href="tel:14416"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#F2A65A] to-[#3FCDA8] text-[#081620] font-bold text-sm shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Tele-MANAS (14416)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
