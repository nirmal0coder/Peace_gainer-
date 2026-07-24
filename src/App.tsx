import React, { useState, useEffect } from 'react';
import { ThemeMode, BackgroundParticleType } from './types';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { PageHeader } from './components/PageHeader';
import { AboutDepression } from './components/AboutDepression';
import { CausesGrid } from './components/CausesGrid';
import { SolutionsSection } from './components/SolutionsSection';
import { AIChatBot } from './components/AIChatBot';
import { SelfHelpToolkit } from './components/SelfHelpToolkit';
import { RelaxingGamesSection } from './components/RelaxingGamesSection';
import { DailyPositivity } from './components/DailyPositivity';
import { EmergencyHelp } from './components/EmergencyHelp';
import { ContactSection } from './components/ContactSection';
import { YogaDepression } from './components/YogaDepression';
import { ReviewSection } from './components/ReviewSection';
import { ExitReviewModal } from './components/ExitReviewModal';
import { Footer } from './components/Footer';
import { Mascot } from './components/Mascot';
import { FloatingAiWidget } from './components/FloatingAiWidget';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SoundMixer } from './components/SelfHelp/SoundMixer';
import {
  ShieldCheck, X, Bot, Brain, Search, Compass,
  Wrench, Gamepad2, Sparkles, ShieldAlert, Mail, Activity
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [particleType, setParticleType] = useState<BackgroundParticleType>('leaves');
  const [isSoundMixerOpen, setIsSoundMixerOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>('home');
  const [disclaimerBannerVisible, setDisclaimerBannerVisible] = useState(true);

  // Read URL Hash on mount & listen for hash changes (e.g. browser back button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'about', 'causes', 'solutions', 'yoga', 'aichat', 'toolkit', 'games', 'reviews', 'positivity', 'emergency', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync theme with document HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const navigateToPage = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      window.location.hash = pageId;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] dark:bg-[#0B1F2A] text-[#1C2D37] dark:text-[#F7F3E9]/85 font-sans transition-colors duration-300 relative selection:bg-[#3FCDA8]/30 selection:text-[#0B1F2A]">
      
      {/* Floating Canvas Animated Background */}
      <AnimatedBackground type={particleType} theme={theme} />

      {/* Top Persistent Medical Disclaimer Alert Banner */}
      {disclaimerBannerVisible && (
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white text-[11px] sm:text-xs py-2 px-4 flex items-center justify-between gap-2 shadow-md relative z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-orange-100" />
            <span>
              <strong>Medical Disclaimer:</strong> Peace Gainer offers self-help resources. For immediate crisis or severe symptoms, call the Tele-MANAS helpline at <strong>14416</strong>.
            </span>
          </div>
          <button
            onClick={() => setDisclaimerBannerVisible(false)}
            className="p-1 text-white/80 hover:text-white"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        particleType={particleType}
        setParticleType={setParticleType}
        openSoundMixer={() => setIsSoundMixerOpen(true)}
        activeSection={activePage}
        setActiveSection={navigateToPage}
      />

      {/* Dedicated Page View Container */}
      <main className="relative z-10 min-h-[calc(100vh-220px)]">
        
        {/* PAGE 1: HOME DASHBOARD HUB */}
        {activePage === 'home' && (
          <HomeDashboard
            onNavigate={navigateToPage}
            openSoundMixer={() => setIsSoundMixerOpen(true)}
          />
        )}

        {/* PAGE 2: AI COMPANION & VOICE NOTES */}
        {activePage === 'aichat' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Peace AI Companion & Voice Notes"
              subtitle="Confidential AI companion that listens with empathy and speaks in soothing voice notes tailored to your gender preference."
              category="AI Counseling"
              icon={<Bot className="w-6 h-6 text-emerald-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <AIChatBot />
          </div>
        )}

        {/* PAGE 3: ABOUT DEPRESSION */}
        {activePage === 'about' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Understanding Depression & Symptoms"
              subtitle="Educational breakdown of clinical depression signs, myths vs facts, and emotional self-assessment quiz."
              category="Mental Health Guide"
              icon={<Brain className="w-6 h-6 text-sky-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <AboutDepression />
          </div>
        )}

        {/* PAGE 4: CAUSES & TRIGGERS */}
        {activePage === 'causes' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Causes & Triggers Explorer"
              subtitle="Discover biological, psychological, environmental, and stress factors contributing to emotional exhaustion."
              category="Root Cause Analysis"
              icon={<Search className="w-6 h-6 text-purple-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <CausesGrid />
          </div>
        )}

        {/* PAGE 5: SOLUTIONS & RECOVERY */}
        {activePage === 'solutions' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Solutions & Recovery Pathway"
              subtitle="Evidence-based coping practices, positive mindset strategies, lifestyle shifts, and goal setter for personal progress."
              category="Recovery Plans"
              icon={<Compass className="w-6 h-6 text-teal-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <SolutionsSection onGoalAdded={() => navigateToPage('toolkit')} />
          </div>
        )}

        {/* PAGE 6: YOGA FOR DEPRESSION */}
        {activePage === 'yoga' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Yoga for Overcoming Depression"
              subtitle="Scientifically backed postures, step-by-step procedures with pictures, benefits, breathing patterns, and hold timers to restore peace."
              category="Mind-Body Yoga Therapy"
              icon={<Activity className="w-6 h-6 text-rose-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <YogaDepression />
          </div>
        )}

        {/* PAGE 7: SELF-HELP TOOLKIT */}
        {activePage === 'toolkit' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Self-Help Interactive Suite"
              subtitle="Breathing timer, Mood Tracker with weekly analytics, Gratitude Journal, Affirmation Cards, Guided Meditations & Nature Sound Mixer."
              category="Self-Help Tools"
              icon={<Wrench className="w-6 h-6 text-amber-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <SelfHelpToolkit />
          </div>
        )}

        {/* PAGE 7: RELAXING GAMES ARCADE */}
        {activePage === 'games' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Relaxing Games Arcade"
              subtitle="10 soothing stress-relief mini-games including Bubble Pop, Zen Sand Garden, Memory Match, and Mandala Coloring."
              category="Stress Relief Arcade"
              icon={<Gamepad2 className="w-6 h-6 text-indigo-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <RelaxingGamesSection />
          </div>
        )}

        {/* PAGE 8: DAILY POSITIVITY & STORIES */}
        {activePage === 'positivity' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Daily Positivity & Hope Hub"
              subtitle="Inspirational quotes generator, personal recovery stories, daily affirmations, and uplifting reflections."
              category="Daily Inspiration"
              icon={<Sparkles className="w-6 h-6 text-pink-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <DailyPositivity />
          </div>
        )}

        {/* PAGE 9: EMERGENCY CRISIS SUPPORT */}
        {activePage === 'emergency' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="24/7 Emergency Crisis Support"
              subtitle="Immediate helpline links (Tele-MANAS 14416), 5-4-3-2-1 Grounding exercise, emergency contacts, and personal safety plan builder."
              category="Crisis Center"
              icon={<ShieldAlert className="w-6 h-6 text-rose-500" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <EmergencyHelp />
          </div>
        )}

        {/* PAGE 10: REVIEWS & COMMUNITY FEEDBACK */}
        {activePage === 'reviews' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Community Reviews & Member Ratings"
              subtitle="Honest reflections, star ratings, and feedback from members finding solace and strength with Peace Gainer."
              category="Community Feedback"
              icon={<Sparkles className="w-6 h-6 text-[#3FCDA8]" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <ReviewSection />
          </div>
        )}

        {/* PAGE 11: CONTACT & FEEDBACK */}
        {activePage === 'contact' && (
          <div className="pb-16 animate-fadeIn">
            <PageHeader
              title="Contact & Feedback Support Center"
              subtitle="Send us your questions, submit user feedback, view testimonials, and access helpline directory."
              category="Support Desk"
              icon={<Mail className="w-6 h-6 text-slate-600 dark:text-slate-300" />}
              onGoHome={() => navigateToPage('home')}
              onNavigate={navigateToPage}
            />
            <ContactSection />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={navigateToPage} />

      {/* Interactive Mascot */}
      <Mascot />

      {/* Omnipresent Floating AI Bot Launcher */}
      <FloatingAiWidget onOpenAi={() => navigateToPage('aichat')} activePage={activePage} />

      {/* Exit Intent Review Modal */}
      <ExitReviewModal />

      {/* Ambient Sound Mixer Drawer/Modal */}
      {isSoundMixerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f070e]/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setIsSoundMixerOpen(false)}
              className="absolute -top-4 -right-4 p-2.5 rounded-full bg-white dark:bg-[#381420] text-stone-700 dark:text-rose-200 shadow-xl z-50 hover:bg-orange-50 dark:hover:bg-[#431927]"
            >
              <X className="w-5 h-5" />
            </button>
            <SoundMixer />
          </div>
        </div>
      )}

    </div>
  );
}
