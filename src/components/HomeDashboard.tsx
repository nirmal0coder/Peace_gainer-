import React from 'react';
import {
  Bot, Brain, Search, Compass, Wrench, Gamepad2, Sparkles,
  ShieldAlert, Mail, Heart, ArrowRight, Activity, Smile,
  Volume2, ShieldCheck, CheckCircle2, UserCheck, Flame
} from 'lucide-react';
import { Hero } from './Hero';

interface HomeDashboardProps {
  onNavigate: (pageId: string) => void;
  openSoundMixer: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate, openSoundMixer }) => {
  const featureTasks = [
    {
      id: 'aichat',
      title: 'AI Companion & Voice Notes',
      tagline: 'Gentle AI Counselor',
      description: 'Confidential AI counselor that listens with empathy and speaks in soothing voice notes tailored to your gender preference.',
      icon: <Bot className="w-6 h-6 text-orange-500" />,
      color: 'from-orange-500/10 to-amber-500/10 border-orange-200 dark:border-orange-800',
      badge: 'Interactive AI & TTS Voice',
      badgeColor: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200',
      buttonText: 'Talk to Peace AI',
    },
    {
      id: 'yoga',
      title: 'Yoga for Depression 🧘',
      tagline: 'Mind-Body Healing',
      description: 'Scientifically backed yoga poses with illustrations, step-by-step procedures, benefits, breathing patterns, and pose timers.',
      icon: <Activity className="w-6 h-6 text-rose-500" />,
      color: 'from-rose-500/10 to-orange-500/10 border-rose-200 dark:border-rose-800',
      badge: '8 Poses + Step-by-Step Pics',
      badgeColor: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 font-bold',
      buttonText: 'Explore Yoga Poses',
    },
    {
      id: 'about',
      title: 'Understanding Depression',
      tagline: 'Mental Health Guide',
      description: 'Learn about clinical symptoms, dismantle common societal myths, and evaluate your emotional state with interactive checkers.',
      icon: <Brain className="w-6 h-6 text-amber-600" />,
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-800',
      badge: 'Myths vs Facts & Quiz',
      badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
      buttonText: 'Learn About Symptoms',
    },
    {
      id: 'causes',
      title: 'Causes & Triggers Explorer',
      tagline: 'Identify Root Factors',
      description: 'Discover biological, psychological, environmental, and life factors that contribute to mental burnout and stress.',
      icon: <Search className="w-6 h-6 text-rose-500" />,
      color: 'from-rose-500/10 to-orange-500/10 border-rose-200 dark:border-rose-800',
      badge: 'Interactive Trigger Logger',
      badgeColor: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200',
      buttonText: 'Explore Triggers',
    },
    {
      id: 'solutions',
      title: 'Solutions & Recovery Goals',
      tagline: 'Evidence-Based Paths',
      description: 'Structured coping techniques, CBT exercises, lifestyle adjustments, and an interactive goal tracker for small wins.',
      icon: <Compass className="w-6 h-6 text-orange-600" />,
      color: 'from-orange-500/10 to-rose-500/10 border-orange-200 dark:border-orange-800',
      badge: 'Actionable Goal Setter',
      badgeColor: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200',
      buttonText: 'View Recovery Plans',
    },
    {
      id: 'toolkit',
      title: 'Self-Help Interactive Suite',
      tagline: 'Daily Wellness Tools',
      description: 'Breathing timer, Mood Tracker with weekly analytics, Gratitude Journal, Affirmation Cards, and Nature Sound Mixer.',
      icon: <Wrench className="w-6 h-6 text-amber-500" />,
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-800',
      badge: '7 Wellness Tools in 1',
      badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
      buttonText: 'Open Self Help Suite',
    },
    {
      id: 'games',
      title: 'Relaxing Games Arcade',
      tagline: 'Instant Anxiety Relief',
      description: '10 soothing mini-games including Bubble Pop, Zen Sand Garden, Memory Match, Color Harmony, and Mandala Coloring.',
      icon: <Gamepad2 className="w-6 h-6 text-rose-500" />,
      color: 'from-rose-500/10 to-amber-500/10 border-rose-200 dark:border-rose-800',
      badge: '10 Soothing Arcade Games',
      badgeColor: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200',
      buttonText: 'Play Relaxing Games',
    },
    {
      id: 'positivity',
      title: 'Daily Positivity & Stories',
      tagline: 'Uplifting Hope Hub',
      description: 'Randomized quote generator, inspiring personal recovery stories, daily gratitude prompts, and uplifting thoughts.',
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      color: 'from-orange-500/10 to-amber-500/10 border-orange-200 dark:border-orange-800',
      badge: 'Quotes & Testimonials',
      badgeColor: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200',
      buttonText: 'Read Uplifting Stories',
    },
    {
      id: 'emergency',
      title: '24/7 Emergency Crisis Support',
      tagline: 'Immediate Helpline & Safety',
      description: 'Direct call link to Tele-MANAS (14416), 5-4-3-2-1 Grounding exercise, emergency contact builder, and safety plans.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
      color: 'from-rose-500/10 to-red-500/10 border-rose-200 dark:border-rose-800',
      badge: 'Tele-MANAS 14416 Hotline',
      badgeColor: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 font-bold',
      buttonText: 'Get Emergency Support',
    },
    {
      id: 'contact',
      title: 'Contact & Feedback Center',
      tagline: 'Support & Community',
      description: 'Send feedback, reach out to our team, review user testimonials, and access verified helpline references.',
      icon: <Mail className="w-6 h-6 text-stone-600 dark:text-stone-300" />,
      color: 'from-stone-500/10 to-orange-500/10 border-stone-200 dark:border-stone-800',
      badge: 'User Reviews & Contact',
      badgeColor: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200',
      buttonText: 'Contact Support Desk',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <Hero
        onStartJourney={() => onNavigate('toolkit')}
        onNeedHelp={() => onNavigate('emergency')}
        onMoodSelect={() => onNavigate('toolkit')}
      />

      {/* Main Task / Page Selector Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 text-orange-500" />
            <span>Multi-Page Peach Wellness Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            Dedicated Wellness Modules & Peaceful Tasks
          </h2>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Select any dedicated task page below to access specialized tools, interactive guides, AI counseling, and relaxing games.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featureTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onNavigate(task.id)}
              className={`group bg-white dark:bg-[#2e101a] rounded-3xl p-6 sm:p-7 border bg-gradient-to-br ${task.color} shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden`}
            >
              {/* Header Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#3d1623] shadow-md group-hover:scale-110 transition-transform">
                    {task.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${task.badgeColor}`}>
                    {task.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-rose-200/60 block mb-1">
                    {task.tagline}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100 group-hover:text-orange-600 dark:group-hover:text-rose-300 transition-colors">
                    {task.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-rose-200/80 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-orange-100 dark:border-rose-900/50 flex items-center justify-between">
                <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  {task.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </span>

                <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Quick Calming Nature Sound Bar Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Ambient Peaceful Nature Audio</span>
            </div>
            <h3 className="text-2xl font-bold font-serif">Need Quick Peaceful Relaxation Right Now?</h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
              Listen to gentle rain, ocean waves, forest birds, or white noise in our integrated nature sound mixer.
            </p>
          </div>

          <button
            onClick={openSoundMixer}
            className="px-6 py-3.5 rounded-2xl bg-white text-orange-950 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-orange-50 transition-transform active:scale-95 flex items-center gap-2 flex-shrink-0"
          >
            <Volume2 className="w-4 h-4 text-orange-600" />
            <span>Open Ambient Sound Mixer</span>
          </button>
        </div>
      </section>

    </div>
  );
};
