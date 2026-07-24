import React, { useState, useEffect } from 'react';
import {
  MessageCircleHeart, Dumbbell, Sparkles, Sun, Moon, Apple, BookOpen,
  Trees, HeartHandshake, ShieldCheck, Heart, CheckCircle2, Plus, Clock, X
} from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/contentData';
import { SolutionItem } from '../types';
import confetti from 'canvas-confetti';

interface SolutionsSectionProps {
  onGoalAdded?: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onGoalAdded }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedGoals, setAddedGoals] = useState<string[]>([]);
  const [activeDetailSolution, setActiveDetailSolution] = useState<SolutionItem | null>(null);

  useEffect(() => {
    const savedGoals = localStorage.getItem('peace_gainer_user_goals');
    if (savedGoals) {
      try {
        setAddedGoals(JSON.parse(savedGoals));
      } catch {}
    }
  }, []);

  const toggleGoal = (solutionId: string) => {
    let updated: string[];
    if (addedGoals.includes(solutionId)) {
      updated = addedGoals.filter((id) => id !== solutionId);
    } else {
      updated = [...addedGoals, solutionId];
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 }
      });
      if (onGoalAdded) onGoalAdded();
    }
    setAddedGoals(updated);
    localStorage.setItem('peace_gainer_user_goals', JSON.stringify(updated));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircleHeart': return <MessageCircleHeart className="w-7 h-7 text-[#3FCDA8]" />;
      case 'Dumbbell': return <Dumbbell className="w-7 h-7 text-[#F2A65A]" />;
      case 'Sparkles': return <Sparkles className="w-7 h-7 text-[#3FCDA8]" />;
      case 'Sun': return <Sun className="w-7 h-7 text-[#F2A65A]" />;
      case 'Moon': return <Moon className="w-7 h-7 text-[#8B85C4]" />;
      case 'Apple': return <Apple className="w-7 h-7 text-[#3FCDA8]" />;
      case 'BookOpen': return <BookOpen className="w-7 h-7 text-[#8B85C4]" />;
      case 'Trees': return <Trees className="w-7 h-7 text-[#3FCDA8]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-7 h-7 text-[#F2A65A]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7 text-[#3FCDA8]" />;
      case 'Heart': return <Heart className="w-7 h-7 text-rose-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-7 h-7 text-[#3FCDA8]" />;
      default: return <Sparkles className="w-7 h-7 text-[#3FCDA8]" />;
    }
  };

  const filteredSolutions = SOLUTIONS_DATA.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="solutions" className="py-16 sm:py-24 bg-gradient-to-b from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] transition-colors relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#3FCDA8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" />
            <span>Pathways to Healing 🧭✨</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
            Practical Solutions to Feel Better 🌱
          </h2>
          <p className="text-base sm:text-lg text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Evidence-based daily habits and mindsets that gradually restore balance, energy, and joy 🕊️💖.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Solutions 🌟' },
            { id: 'mindfulness', label: 'Mindfulness & Mental 🧘' },
            { id: 'physical', label: 'Physical Wellness 🏃' },
            { id: 'lifestyle', label: 'Lifestyle & Sleep 🌙' },
            { id: 'social', label: 'Social & Professional 🤝' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#3FCDA8] text-[#081620] font-bold shadow-md'
                  : 'bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] border border-[#3FCDA8]/30 hover:bg-[#EAE4D3] dark:hover:bg-[#143345]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((item) => {
            const isAdded = addedGoals.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0F2836] rounded-3xl p-6 border border-[#3FCDA8]/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 shadow-sm">
                      {getIcon(item.iconName)}
                    </div>
                    {item.durationMinutes ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0B1F2A] dark:text-[#F2A65A] bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#F2A65A]/40 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-[#F2A65A]" />
                        {item.durationMinutes} mins ⏱️
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="p-3 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 text-[#1C2D37] dark:text-[#F7F3E9]/80 text-xs font-medium">
                    <span className="font-bold text-[#169375] dark:text-[#3FCDA8] block mb-0.5">Brain Science ✨:</span>
                    {item.scientificBenefits}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3FCDA8]/20 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveDetailSolution(item)}
                    className="text-xs font-bold text-[#169375] dark:text-[#3FCDA8] hover:underline"
                  >
                    View Guide 📖 →
                  </button>

                  <button
                    onClick={() => toggleGoal(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]'
                        : 'bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] shadow-sm'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#169375] dark:text-[#3FCDA8]" />
                        <span>In My Goals 🌿</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Goal 🎯</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {activeDetailSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081620]/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#3FCDA8]/40 relative space-y-6">
            
            <button
              onClick={() => setActiveDetailSolution(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F7F3E9] dark:bg-[#0B1F2A] text-[#0B1F2A] dark:text-[#F7F3E9]/70 hover:opacity-80 border border-[#3FCDA8]/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30">
                {getIcon(activeDetailSolution.iconName)}
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                  {activeDetailSolution.title}
                </h3>
                <span className="text-xs text-[#F2A65A] font-bold uppercase tracking-wider">
                  Step-By-Step Wellness Practice 🌿
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#0B1F2A] dark:text-[#F7F3E9]">
                How to Practice Today 📝:
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#1C2D37] dark:text-[#F7F3E9]/80">
                {activeDetailSolution.detailedGuide.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/20">
                    <span className="w-5 h-5 rounded-full bg-[#3FCDA8] text-[#081620] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveDetailSolution(null)}
              className="w-full py-3 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-sm shadow-md"
            >
              Close Guide 🌿
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
