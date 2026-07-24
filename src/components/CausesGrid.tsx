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
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#3FCDA8]" />;
      case 'Coins': return <Coins className="w-6 h-6 text-[#F2A65A]" />;
      case 'HeartBreak': return <Heart className="w-6 h-6 text-rose-400" />;
      case 'UserX': return <UserX className="w-6 h-6 text-[#8B85C4]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#3FCDA8]" />;
      case 'Home': return <Home className="w-6 h-6 text-[#F2A65A]" />;
      case 'Activity': return <Activity className="w-6 h-6 text-[#3FCDA8]" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-[#3FCDA8]" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-[#8B85C4]" />;
      case 'Moon': return <Moon className="w-6 h-6 text-[#8B85C4]" />;
      case 'ZapOff': return <ZapOff className="w-6 h-6 text-[#F2A65A]" />;
      case 'Flower2': return <Flower2 className="w-6 h-6 text-[#3FCDA8]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#F2A65A]" />;
      default: return <Sparkles className="w-6 h-6 text-[#3FCDA8]" />;
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
    <section id="causes" className="py-16 sm:py-24 bg-gradient-to-b from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] transition-colors relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#3FCDA8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-[#F2A65A]" />
            <span>Understanding Triggers & Roots 🔍🌱</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
            Reasons Behind Emotional Strain 💡
          </h2>
          <p className="text-base sm:text-lg text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Depression can stem from complex personal, environmental, or physiological pressures. Recognizing what you face empowers you to gently heal 🌿🕊️.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#169375] dark:text-[#3FCDA8]/60" />
            <input
              type="text"
              placeholder="Search triggers (e.g. sleep, work)... 🔍"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0F2836] border border-[#3FCDA8]/30 text-xs sm:text-sm text-[#0B1F2A] dark:text-[#F7F3E9] placeholder-[#1C2D37]/40 dark:placeholder-[#F7F3E9]/40 focus:outline-none focus:ring-2 focus:ring-[#3FCDA8]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#1C2D37]/50 dark:text-[#F7F3E9]/50 hover:text-[#0B1F2A] dark:hover:text-[#F7F3E9]"
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
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#3FCDA8] text-[#081620] font-bold shadow-md'
                    : 'bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] border border-[#3FCDA8]/30 hover:bg-[#EAE4D3] dark:hover:bg-[#143345]'
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
              className="group cursor-pointer bg-white dark:bg-[#0F2836] hover:bg-[#F7F3E9] dark:hover:bg-[#143345] rounded-3xl p-6 border border-[#3FCDA8]/30 shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 group-hover:scale-110 transition-transform">
                    {getIcon(cause.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#3FCDA8]/20 text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 uppercase tracking-wider">
                    {cause.category}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9] group-hover:text-[#169375] dark:group-hover:text-[#3FCDA8] transition-colors">
                  {cause.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 line-clamp-2 leading-relaxed">
                  {cause.shortDescription}
                </p>
              </div>

              {/* Positive Advice Snapshot */}
              <div className="mt-6 pt-4 border-t border-[#3FCDA8]/20 flex items-center justify-between text-xs font-bold text-[#169375] dark:text-[#3FCDA8]">
                <span>View Gentle Insight 🌿</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredCauses.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#0F2836] rounded-3xl p-8 max-w-md mx-auto border border-[#3FCDA8]/30">
            <Search className="w-10 h-10 text-[#3FCDA8]/60 mx-auto mb-3" />
            <p className="text-[#0B1F2A] dark:text-[#F7F3E9]/80 font-medium">
              No matching triggers found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#3FCDA8] text-[#081620] text-xs font-bold"
            >
              Reset Filters 🔄
            </button>
          </div>
        )}

      </div>

      {/* Cause Detail Modal */}
      {activeModalCause && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081620]/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#3FCDA8]/40 relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalCause(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F7F3E9] dark:bg-[#0B1F2A] text-[#0B1F2A] dark:text-[#F7F3E9]/70 hover:opacity-80 border border-[#3FCDA8]/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30">
                {getIcon(activeModalCause.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#F2A65A] uppercase tracking-wider">
                  {activeModalCause.category} Trigger 🏷️
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                  {activeModalCause.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] text-[#1C2D37] dark:text-[#F7F3E9]/90 text-sm leading-relaxed border border-[#3FCDA8]/20">
                <span className="font-semibold block mb-1 text-[#0B1F2A] dark:text-[#F7F3E9]">
                  Why It Affects Mood 🧠:
                </span>
                {activeModalCause.detailedExplanation}
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#F2A65A]/40 text-[#1C2D37] dark:text-[#F7F3E9] text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#F2A65A]">
                  <Lightbulb className="w-4 h-4 text-[#F2A65A]" />
                  <span>Compassionate Guidance 🕊️:</span>
                </div>
                <p className="text-[#1C2D37]/90 dark:text-[#F7F3E9]/80">{activeModalCause.positiveAdvice}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/40 text-[#1C2D37] dark:text-[#F7F3E9] text-sm leading-relaxed space-y-1">
                <span className="font-bold block text-[#169375] dark:text-[#3FCDA8]">
                  🌱 Gentle Action Step:
                </span>
                <p className="text-[#1C2D37]/90 dark:text-[#F7F3E9]/80">{activeModalCause.copingTip}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModalCause(null)}
              className="w-full py-3 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-sm shadow-md transition-colors"
            >
              I Understand & Keep Going 🌿
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
