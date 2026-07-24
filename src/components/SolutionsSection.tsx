import React, { useState, useEffect } from 'react';
import {
  MessageCircleHeart, Dumbbell, Sparkles, Sun, Moon, Apple, BookOpen,
  Trees, HeartHandshake, ShieldCheck, Heart, CheckCircle2, Plus, Clock
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
      case 'MessageCircleHeart': return <MessageCircleHeart className="w-7 h-7 text-rose-500" />;
      case 'Dumbbell': return <Dumbbell className="w-7 h-7 text-orange-500" />;
      case 'Sparkles': return <Sparkles className="w-7 h-7 text-amber-500" />;
      case 'Sun': return <Sun className="w-7 h-7 text-amber-500" />;
      case 'Moon': return <Moon className="w-7 h-7 text-amber-600" />;
      case 'Apple': return <Apple className="w-7 h-7 text-rose-500" />;
      case 'BookOpen': return <BookOpen className="w-7 h-7 text-orange-600" />;
      case 'Trees': return <Trees className="w-7 h-7 text-orange-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-7 h-7 text-amber-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7 text-orange-500" />;
      case 'Heart': return <Heart className="w-7 h-7 text-rose-500" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-7 h-7 text-orange-500" />;
      default: return <Sparkles className="w-7 h-7 text-orange-500" />;
    }
  };

  const filteredSolutions = SOLUTIONS_DATA.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="solutions" className="py-16 sm:py-24 bg-white/80 dark:bg-[#250d15]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-rose-950 text-orange-950 dark:text-rose-200 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-orange-500" />
            <span>Pathways to Healing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-rose-100">
            Practical Solutions to Feel Better
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-rose-200/80">
            Evidence-based daily habits and mindsets that gradually restore balance, energy, and joy.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Solutions' },
            { id: 'mindfulness', label: 'Mindfulness & Mental' },
            { id: 'physical', label: 'Physical Wellness' },
            { id: 'lifestyle', label: 'Lifestyle & Sleep' },
            { id: 'social', label: 'Social & Professional' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === tab.id
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-[#381422] text-stone-600 dark:text-rose-200 hover:bg-orange-100 dark:hover:bg-[#451928]'
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
                className="bg-gradient-to-br from-stone-50 via-white to-orange-50/40 dark:from-[#32121e] dark:via-[#2e0e1a] dark:to-[#260a14] rounded-3xl p-6 border border-orange-200/80 dark:border-rose-900/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#3d1624] shadow-sm">
                      {getIcon(item.iconName)}
                    </div>
                    {item.durationMinutes ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 dark:text-rose-200/70 bg-stone-100 dark:bg-rose-950/80 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-stone-400 dark:text-rose-300" />
                        {item.durationMinutes} mins
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-rose-200/80 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="p-3 rounded-2xl bg-orange-100/70 dark:bg-rose-950/70 text-orange-950 dark:text-rose-100 text-xs font-medium">
                    <span className="font-bold block mb-0.5">Brain Science:</span>
                    {item.scientificBenefits}
                  </div>
                </div>

                <div className="pt-4 border-t border-orange-100 dark:border-stone-700/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveDetailSolution(item)}
                    className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    View Guide →
                  </button>

                  <button
                    onClick={() => toggleGoal(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isAdded
                        ? 'bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 border border-orange-300'
                        : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                        <span>In My Goals</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Goal</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-200 dark:border-stone-700 relative space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950">
                {getIcon(activeDetailSolution.iconName)}
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  {activeDetailSolution.title}
                </h3>
                <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                  Step-By-Step Wellness Practice
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                How to Practice Today:
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {activeDetailSolution.detailedGuide.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-700/50">
                    <span className="w-5 h-5 rounded-full bg-orange-200 dark:bg-orange-900 text-orange-900 dark:text-orange-200 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveDetailSolution(null)}
              className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
