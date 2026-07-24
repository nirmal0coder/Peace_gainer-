import React, { useState } from 'react';
import {
  GraduationCap, Coins, Heart, UserX, ShieldAlert, Briefcase,
  Home, Activity, Stethoscope, Smartphone, Moon, ZapOff, Flower2,
  Sparkles, Search, Filter, X, Lightbulb, ChevronRight
} from 'lucide-react';
import { CAUSES_DATA } from '../data/contentData';
import { CauseItem } from '../types';

export const CausesGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalCause, setActiveModalCause] = useState<CauseItem | null>(null);

  const categories = ['All', 'Environment', 'Social', 'Life Circumstance', 'Physical', 'Internal', 'Digital'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-orange-500" />;
      case 'Coins': return <Coins className="w-6 h-6 text-amber-500" />;
      case 'HeartBreak': return <Heart className="w-6 h-6 text-rose-500" />;
      case 'UserX': return <UserX className="w-6 h-6 text-amber-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-orange-600" />;
      case 'Home': return <Home className="w-6 h-6 text-amber-500" />;
      case 'Activity': return <Activity className="w-6 h-6 text-rose-500" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-orange-500" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-rose-400" />;
      case 'Moon': return <Moon className="w-6 h-6 text-amber-600" />;
      case 'ZapOff': return <ZapOff className="w-6 h-6 text-orange-500" />;
      case 'Flower2': return <Flower2 className="w-6 h-6 text-rose-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      default: return <Sparkles className="w-6 h-6 text-orange-500" />;
    }
  };

  const filteredCauses = CAUSES_DATA.filter((cause) => {
    const matchesSearch =
      cause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cause.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cause.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="causes" className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/60 via-rose-50/50 to-amber-50/60 dark:from-[#2a0e17] dark:via-[#220a12] dark:to-[#1f070e] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-rose-950 text-orange-950 dark:text-rose-200 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-orange-500" />
            <span>Understanding Triggers & Roots</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-rose-100">
            Reasons Behind Depression
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-rose-200/80">
            Depression can stem from complex personal, environmental, or physiological pressures. Recognizing what you are facing empowers you to heal.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search triggers (e.g. sleep, work)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#351320] border border-orange-200 dark:border-rose-900/60 text-xs sm:text-sm text-stone-800 dark:text-rose-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-center md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white dark:bg-[#351320] text-stone-600 dark:text-rose-200 border border-orange-200 dark:border-rose-900/60 hover:bg-orange-50 dark:hover:bg-[#431826]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Cause Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCauses.map((cause) => (
            <div
              key={cause.id}
              onClick={() => setActiveModalCause(cause)}
              className="group cursor-pointer bg-white/90 dark:bg-[#2d101a]/90 rounded-3xl p-6 border border-orange-200/80 dark:border-rose-900/60 shadow-sm hover:shadow-xl hover:border-orange-400 dark:hover:border-rose-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-orange-50 dark:bg-[#3d1624] group-hover:scale-110 transition-transform">
                    {getIcon(cause.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-100 dark:bg-rose-950 text-orange-900 dark:text-rose-200 uppercase tracking-wider">
                    {cause.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-rose-100 group-hover:text-orange-600 dark:group-hover:text-rose-300 transition-colors">
                  {cause.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-rose-200/80 line-clamp-2 leading-relaxed">
                  {cause.shortDescription}
                </p>
              </div>

              {/* Positive Advice Snapshot */}
              <div className="mt-6 pt-4 border-t border-orange-100 dark:border-rose-900/40 flex items-center justify-between text-xs font-extrabold text-orange-600 dark:text-orange-400">
                <span>View Positive Advice</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredCauses.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-stone-800 rounded-3xl p-8 max-w-md mx-auto border border-orange-200 dark:border-stone-700">
            <Search className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 dark:text-stone-300 font-medium">
              No matching triggers found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Cause Detail Modal */}
      {activeModalCause && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f070e]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#2d101a] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-orange-200 dark:border-rose-900/80 relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalCause(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-[#3d1624] text-stone-500 hover:text-stone-800 dark:hover:text-rose-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-orange-100 dark:bg-rose-950/80 border border-orange-200 dark:border-rose-800">
                {getIcon(activeModalCause.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-orange-600 dark:text-rose-300 uppercase tracking-wider">
                  {activeModalCause.category} Trigger
                </span>
                <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-rose-100">
                  {activeModalCause.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#381422] text-stone-700 dark:text-rose-100 text-sm leading-relaxed">
                <span className="font-semibold block mb-1 text-stone-900 dark:text-rose-100">
                  Why It Affects Mood:
                </span>
                {activeModalCause.detailedExplanation}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-rose-950/70 border border-amber-200 dark:border-rose-800/80 text-amber-950 dark:text-rose-100 text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-rose-200">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Positive Compassionate Advice:</span>
                </div>
                <p>{activeModalCause.positiveAdvice}</p>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50 dark:bg-rose-900/50 border border-orange-200 dark:border-rose-800/80 text-orange-950 dark:text-rose-100 text-sm leading-relaxed space-y-1">
                <span className="font-bold block text-orange-900 dark:text-rose-200">
                  🌱 Gentle Action Step:
                </span>
                <p>{activeModalCause.copingTip}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModalCause(null)}
              className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              I Understand & Keep Going
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
