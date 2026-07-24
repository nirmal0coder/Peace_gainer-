import React, { useState } from 'react';
import {
  Sun, Moon, Volume2, PhoneCall, Menu, X, Sparkles, Heart,
  Leaf, Cloud, Disc, EyeOff, ShieldAlert
} from 'lucide-react';
import { ThemeMode, BackgroundParticleType } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  particleType: BackgroundParticleType;
  setParticleType: (type: BackgroundParticleType) => void;
  openSoundMixer: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  particleType,
  setParticleType,
  openSoundMixer,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particleDropdownOpen, setParticleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Depression' },
    { id: 'causes', label: 'Causes' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'yoga', label: 'Yoga & Mind 🧘' },
    { id: 'aichat', label: 'AI Companion 🤖' },
    { id: 'toolkit', label: 'Self Help' },
    { id: 'games', label: 'Relaxing Games' },
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
    { id: 'leaves', label: 'Peach Blossom Leaves', icon: <Leaf className="w-4 h-4 text-orange-500" /> },
    { id: 'butterflies', label: 'Peace Butterflies', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'clouds', label: 'Soft Peach Clouds', icon: <Cloud className="w-4 h-4 text-orange-400" /> },
    { id: 'orbs', label: 'Glowing Warm Orbs', icon: <Disc className="w-4 h-4 text-rose-400" /> },
    { id: 'none', label: 'Clean Canvas', icon: <EyeOff className="w-4 h-4 text-stone-400" /> }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-[#290c16]/90 border-b border-orange-100 dark:border-rose-900/60 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-orange-400 via-rose-400 to-amber-400 p-0.5 shadow-md shadow-orange-100 dark:shadow-none group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-[#381420] rounded-[14px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-500 dark:text-rose-300 fill-rose-100 dark:fill-rose-950/40 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 dark:from-orange-300 dark:via-rose-300 dark:to-amber-300 bg-clip-text text-transparent font-serif tracking-tight">
                Peace Gainer
              </span>
              <p className="text-[10px] sm:text-xs text-stone-500 dark:text-rose-200/70 font-sans tracking-wide -mt-1 hidden sm:block">
                Your Peaceful Haven for Wellness
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  link.highlight
                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 border border-rose-300 dark:border-rose-800'
                    : activeSection === link.id
                    ? 'bg-orange-100/90 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200 font-bold border border-orange-200 dark:border-orange-800'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-orange-50 dark:hover:bg-stone-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Sound Mixer */}
            <button
              onClick={openSoundMixer}
              title="Ambient Nature Sounds"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-800 dark:text-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/60 border border-orange-200/80 dark:border-orange-800/50 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm"
            >
              <Volume2 className="w-4 h-4 text-orange-500 animate-pulse" />
              <span className="hidden md:inline">Sounds</span>
            </button>

            {/* Particle Selector */}
            <div className="relative">
              <button
                onClick={() => setParticleDropdownOpen(!particleDropdownOpen)}
                title="Change Background Atmosphere"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/80 dark:border-amber-800/50 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="hidden md:inline">Atmosphere</span>
              </button>

              {particleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-stone-800 shadow-xl border border-orange-100 dark:border-stone-700 p-1.5 z-50">
                  <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider px-3 py-1">
                    Floating Background
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
                          ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-950 dark:text-orange-200 font-bold'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-orange-50 dark:hover:bg-stone-700/50'
                      }`}
                    >
                      {p.icon}
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Helpline Urgent Call Button */}
            <a
              href="tel:14416"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-xs shadow-md shadow-orange-300/40 dark:shadow-none hover:from-orange-600 hover:to-rose-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>Helpline 14416</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-700 dark:text-rose-200 hover:bg-orange-100/80 dark:hover:bg-[#381420]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-orange-200 dark:border-rose-900/60 bg-[#fff5ee]/95 dark:bg-[#280c16]/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-1.5 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                link.highlight
                  ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 font-bold border border-rose-300 dark:border-rose-800 flex items-center justify-between'
                  : activeSection === link.id
                  ? 'bg-orange-100 dark:bg-rose-900/70 text-orange-950 dark:text-rose-100 font-bold border border-orange-200 dark:border-rose-700'
                  : 'text-stone-700 dark:text-rose-200 hover:bg-orange-50 dark:hover:bg-[#3d1623]'
              }`}
            >
              <span>{link.label}</span>
              {link.highlight && <ShieldAlert className="w-4 h-4 text-rose-500 inline" />}
            </button>
          ))}

          <div className="pt-2">
            <a
              href="tel:14416"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm shadow-md"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Call Tele-MANAS (14416)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
