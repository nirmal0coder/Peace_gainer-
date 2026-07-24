import React, { useState } from 'react';
import { Sparkles, RefreshCw, Heart, BookOpen, Quote, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { INSPIRATIONAL_STORIES } from '../data/contentData';
import { InspirationalStory } from '../types';

export const DailyPositivity: React.FC = () => {
  const quotes = [
    { text: 'You don’t have to see the whole staircase, just take the first step.', author: 'Martin Luther King Jr.' },
    { text: 'There is a crack in everything, that’s how the light gets in.', author: 'Leonard Cohen' },
    { text: 'You are allowed to be both a masterpiece and a work in progress simultaneously.', author: 'Sophia Bush' },
    { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
    { text: 'Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.', author: 'Kahlil Gibran' }
  ];

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [activeStory, setActiveStory] = useState<InspirationalStory | null>(null);

  const currentQuote = quotes[quoteIdx];

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % quotes.length);
  };

  return (
    <section id="positivity" className="py-16 sm:py-24 bg-gradient-to-b from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] transition-colors relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#3FCDA8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F2A65A]" />
            <span>Daily Dose of Light 🕊️✨</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
            Daily Positivity & Stories of Hope 🌅
          </h2>
          <p className="text-base sm:text-lg text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Nourish your mind with inspirational thoughts, gratitude reminders, and uplifting journeys of healing 💖.
          </p>
        </div>

        {/* Top Grid: Quote + Thought + Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Motivational Quote */}
          <div className="bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] rounded-3xl p-6 sm:p-8 border border-[#3FCDA8]/30 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-[#3FCDA8]/10 rounded-full blur-xl" />
            <div className="space-y-3 relative z-10">
              <Quote className="w-8 h-8 text-[#169375] dark:text-[#3FCDA8]" />
              <p className="text-lg font-serif font-semibold leading-relaxed text-[#0B1F2A] dark:text-[#F7F3E9]">
                &ldquo;{currentQuote.text}&rdquo;
              </p>
              <p className="text-xs font-bold text-[#F2A65A]">— {currentQuote.author}</p>
            </div>

            <button
              onClick={nextQuote}
              className="px-4 py-2 rounded-xl bg-[#F7F3E9] dark:bg-[#0B1F2A] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] text-[#169375] dark:text-[#3FCDA8] border border-[#3FCDA8]/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors self-start relative z-10"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#169375] dark:text-[#3FCDA8]" />
              <span>New Quote ✨</span>
            </button>
          </div>

          {/* Thought of the Day */}
          <div className="bg-white dark:bg-[#0F2836] rounded-3xl p-6 sm:p-8 border border-[#3FCDA8]/30 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-[#169375] dark:text-[#3FCDA8] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#F2A65A]" />
              <span>Thought of the Day 🌱</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
              Be Gentle with Your Process
            </h3>
            <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 leading-relaxed">
              Trees don’t bloom all year round 🌲. It’s completely natural to have quiet seasons of rest before you bloom again 🌸.
            </p>
          </div>

          {/* Daily Challenge & Gratitude Reminder */}
          <div className="bg-white dark:bg-[#0F2836] rounded-3xl p-6 sm:p-8 border border-[#3FCDA8]/30 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-[#F2A65A] font-bold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Gratitude Reminder 💖</span>
            </div>
            <p className="text-xs sm:text-sm text-[#1C2D37]/90 dark:text-[#F7F3E9]/80 leading-relaxed font-medium">
              Take a 10-second pause right now 🧘. Name 1 soft thing in your environment you appreciate—a warm sweater 🧥, quiet air 🌬️, or a comfortable chair 🪑.
            </p>
          </div>

        </div>

        {/* Success Stories Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                Inspirational Stories of Recovery 🕊️
              </h3>
              <p className="text-xs text-[#1C2D37]/60 dark:text-[#F7F3E9]/60">
                (Fictional inspirational examples crafted to encourage hope, not medical claims)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSPIRATIONAL_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="group cursor-pointer bg-white dark:bg-[#0F2836] p-6 rounded-3xl border border-[#3FCDA8]/30 hover:border-[#3FCDA8]/60 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 text-[#169375] dark:text-[#3FCDA8] uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-lg font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9] group-hover:text-[#169375] dark:group-hover:text-[#3FCDA8] transition-colors">
                    {story.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80 line-clamp-3 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#3FCDA8]/20 flex items-center justify-between text-xs font-semibold text-[#169375] dark:text-[#3FCDA8]">
                  <span>Read Full Journey 📖</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081620]/80 backdrop-blur-md">
          <div className="bg-white dark:bg-[#0F2836] text-[#0B1F2A] dark:text-[#F7F3E9] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#3FCDA8]/40 relative space-y-6">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F7F3E9] dark:bg-[#0B1F2A] text-[#0B1F2A] dark:text-[#F7F3E9]/70 hover:opacity-80 border border-[#3FCDA8]/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#F2A65A] uppercase">
                {activeStory.author}, {activeStory.age} years old
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9]">
                {activeStory.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#1C2D37] dark:text-[#F7F3E9]/80 leading-relaxed bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/20 p-5 rounded-2xl">
              {activeStory.fullStory}
            </p>

            <div className="p-4 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 text-xs sm:text-sm text-[#0B1F2A] dark:text-[#F7F3E9] font-semibold flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-[#169375] dark:text-[#3FCDA8]">Key Takeaway ✨:</span>
                {activeStory.keyTakeaway}
              </div>
            </div>

            <p className="text-[10px] text-[#1C2D37]/50 dark:text-[#F7F3E9]/50 text-center italic">
              Note: Fictional inspirational story provided to foster hope and resilience.
            </p>

            <button
              onClick={() => setActiveStory(null)}
              className="w-full py-3 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-sm shadow-md"
            >
              Close Story 🕊️
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
