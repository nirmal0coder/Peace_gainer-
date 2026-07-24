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
      title: 'AI Companion & Voice Notes 🤖',
      tagline: 'Gentle Empathy Companion',
      description: 'Confidential AI counselor that listens with empathy and speaks in soothing voice notes tailored to your preference.',
      icon: <Bot className="w-6 h-6 text-[#3FCDA8]" />,
      badge: 'Interactive AI & Voice ✨',
      badgeColor: 'bg-[#3FCDA8]/20 text-[#3FCDA8] border border-[#3FCDA8]/40',
      buttonText: 'Talk to Peace AI 🤖',
    },
    {
      id: 'yoga',
      title: 'Yoga for Depression 🧘',
      tagline: 'Mind-Body Healing',
      description: 'Scientifically backed postures, step-by-step procedures with illustrations, breathing patterns, and hold timers.',
      icon: <Activity className="w-6 h-6 text-[#3FCDA8]" />,
      badge: '8 Poses + Hold Timers 🫁',
      badgeColor: 'bg-[#3FCDA8]/20 text-[#3FCDA8] border border-[#3FCDA8]/40',
      buttonText: 'Explore Yoga Poses 🧘',
    },
    {
      id: 'about',
      title: 'Understanding Depression 🧠',
      tagline: 'Mental Health Guide',
      description: 'Learn about clinical symptoms, dismantle societal myths, and evaluate your emotional state with gentle self-checkers.',
      icon: <Brain className="w-6 h-6 text-[#8B85C4]" />,
      badge: 'Myths vs Facts & Quiz 🌿',
      badgeColor: 'bg-[#8B85C4]/20 text-[#8B85C4] border border-[#8B85C4]/40',
      buttonText: 'Learn About Symptoms 🧠',
    },
    {
      id: 'causes',
      title: 'Causes & Triggers Explorer 🔍',
      tagline: 'Identify Root Factors',
      description: 'Discover biological, psychological, environmental, and stress factors that contribute to emotional burnout.',
      icon: <Search className="w-6 h-6 text-[#F2A65A]" />,
      badge: 'Trigger Logger 🌿',
      badgeColor: 'bg-[#F2A65A]/20 text-[#F2A65A] border border-[#F2A65A]/40',
      buttonText: 'Explore Triggers 🔍',
    },
    {
      id: 'solutions',
      title: 'Solutions & Recovery Goals 🧭',
      tagline: 'Evidence-Based Paths',
      description: 'Structured coping techniques, positive mindset exercises, lifestyle adjustments, and an interactive goal tracker for small wins.',
      icon: <Compass className="w-6 h-6 text-[#3FCDA8]" />,
      badge: 'Action Goal Setter ✨',
      badgeColor: 'bg-[#3FCDA8]/20 text-[#3FCDA8] border border-[#3FCDA8]/40',
      buttonText: 'View Recovery Plans 🧭',
    },
    {
      id: 'toolkit',
      title: 'Self-Help Interactive Suite 🛠️',
      tagline: 'Daily Wellness Suite',
      description: 'Breathing timer 🌬️, Mood Tracker with weekly analytics, Gratitude Journal, Affirmation Cards, and Nature Sound Mixer.',
      icon: <Wrench className="w-6 h-6 text-[#F2A65A]" />,
      badge: '7 Wellness Tools 🌿',
      badgeColor: 'bg-[#F2A65A]/20 text-[#F2A65A] border border-[#F2A65A]/40',
      buttonText: 'Open Self Help Suite 🛠️',
    },
    {
      id: 'games',
      title: 'Relaxing Games Arcade 🎮',
      tagline: 'Instant Anxiety Relief',
      description: '10 soothing mini-games including Bubble Pop, Zen Sand Garden, Memory Match, Color Harmony, and Mandala Coloring.',
      icon: <Gamepad2 className="w-6 h-6 text-[#8B85C4]" />,
      badge: '10 Soothing Games 🌙',
      badgeColor: 'bg-[#8B85C4]/20 text-[#8B85C4] border border-[#8B85C4]/40',
      buttonText: 'Play Relaxing Games 🎮',
    },
    {
      id: 'positivity',
      title: 'Daily Positivity & Stories 🌟',
      tagline: 'Uplifting Hope Hub',
      description: 'Inspirational quotes generator, personal recovery stories, daily gratitude prompts, and uplifting reflections.',
      icon: <Sparkles className="w-6 h-6 text-[#F2A65A]" />,
      badge: 'Quotes & Hope 🌿',
      badgeColor: 'bg-[#F2A65A]/20 text-[#F2A65A] border border-[#F2A65A]/40',
      buttonText: 'Read Uplifting Stories 🌟',
    },
    {
      id: 'emergency',
      title: '24/7 Crisis & Emergency Support 🛡️',
      tagline: 'Immediate Helpline & Safety',
      description: 'Direct call link to Tele-MANAS (14416), 5-4-3-2-1 Grounding exercise, emergency contacts, and safety plan builder.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      badge: 'Tele-MANAS 14416 Helpline 🆘',
      badgeColor: 'bg-rose-950 text-rose-200 border border-rose-800 font-bold',
      buttonText: 'Get Emergency Support 🛡️',
    },
    {
      id: 'contact',
      title: 'Contact & Feedback Desk ✉️',
      tagline: 'Support & Community',
      description: 'Send feedback, reach out to our team, review user testimonials, and access verified helpline references.',
      icon: <Mail className="w-6 h-6 text-[#8B85C4]" />,
      badge: 'Support Desk ✨',
      badgeColor: 'bg-[#8B85C4]/20 text-[#8B85C4] border border-[#8B85C4]/40',
      buttonText: 'Contact Support Desk ✉️',
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" />
            <span>Peace Gainer Wellness Sanctuary 🕊️</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
            Dedicated Wellness Modules & Gentle Practice
          </h2>

          <p className="text-base sm:text-lg text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Select any dedicated task page below to access specialized tools, interactive guides, AI counseling, and relaxing games.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featureTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onNavigate(task.id)}
              className="group bg-white dark:bg-[#0F2836] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] rounded-3xl p-6 sm:p-7 border border-[#3FCDA8]/30 hover:border-[#3FCDA8]/60 shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden"
            >
              {/* Header Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-3.5 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 shadow-md group-hover:scale-110 transition-transform">
                    {task.icon}
                  </div>
                  <span className={`text-[11px] font-medium px-3 py-1 rounded-full ${task.badgeColor}`}>
                    {task.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#F2A65A] block mb-1">
                    {task.tagline}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9] group-hover:text-[#169375] dark:group-hover:text-[#3FCDA8] transition-colors">
                    {task.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-[#3FCDA8]/20 flex items-center justify-between">
                <span className="text-xs font-bold text-[#169375] dark:text-[#3FCDA8] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  {task.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </span>

                <div className="w-8 h-8 rounded-full bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Quick Calming Nature Sound Bar Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0F2836] border border-[#3FCDA8]/30 rounded-3xl p-6 sm:p-8 text-[#0B1F2A] dark:text-[#F7F3E9] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transition-colors">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#3FCDA8]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] text-xs font-bold">
              <Volume2 className="w-4 h-4 animate-pulse text-[#169375] dark:text-[#3FCDA8]" />
              <span>Ambient Nature Audio 🌬️</span>
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">Need Quick Peaceful Relaxation Right Now?</h3>
            <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 max-w-xl">
              Listen to gentle rain, ocean waves, forest birds, or white noise in our integrated nature sound mixer.
            </p>
          </div>

          <button
            onClick={openSoundMixer}
            className="px-6 py-3.5 rounded-2xl bg-[#3FCDA8] text-[#081620] font-bold text-xs sm:text-sm shadow-lg hover:bg-[#33b895] transition-transform active:scale-95 flex items-center gap-2 flex-shrink-0 relative z-10"
          >
            <Volume2 className="w-4 h-4 text-[#081620]" />
            <span>Open Ambient Sound Mixer 🌬️</span>
          </button>
        </div>
      </section>

    </div>
  );
};
