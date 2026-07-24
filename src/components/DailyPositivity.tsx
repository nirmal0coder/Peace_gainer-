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
    <section id="positivity" className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/40 via-amber-50/50 to-rose-50/40 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Daily Dose of Light</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            Daily Positivity & Stories of Hope
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Nourish your mind with inspirational thoughts, gratitude reminders, and uplifting journeys of healing.
          </p>
        </div>

        {/* Top Grid: Quote + Thought + Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Motivational Quote */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <Quote className="w-8 h-8 opacity-80" />
              <p className="text-lg font-serif font-semibold leading-relaxed">
                &ldquo;{currentQuote.text}&rdquo;
              </p>
              <p className="text-xs font-bold opacity-90">— {currentQuote.author}</p>
            </div>

            <button
              onClick={nextQuote}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors self-start"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Quote</span>
            </button>
          </div>

          {/* Thought of the Day */}
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-8 border border-orange-200 dark:border-stone-700 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Thought of the Day</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              Be Gentle with Your Process
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Trees don’t bloom all year round. It’s completely natural to have quiet seasons of rest before you bloom again.
            </p>
          </div>

          {/* Daily Challenge & Gratitude Reminder */}
          <div className="bg-amber-50 dark:bg-amber-950/50 rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-amber-800/80 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-amber-500" />
              <span>Gratitude Reminder</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-medium">
              Take a 10-second pause right now. Name 1 soft thing in your environment you appreciate—a warm sweater, quiet air, or a comfortable chair.
            </p>
          </div>

        </div>

        {/* Success Stories Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
                Inspirational Stories of Recovery
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                (Fictional inspirational examples crafted to encourage hope, not medical claims)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSPIRATIONAL_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="group cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                    {story.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Read Full Journey</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 relative space-y-6">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                {activeStory.author}, {activeStory.age} years old
              </span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-slate-100">
                {activeStory.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl">
              {activeStory.fullStory}
            </p>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 font-semibold flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold">Key Takeaway:</span>
                {activeStory.keyTakeaway}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center italic">
              Note: Fictional inspirational story provided to foster hope and resilience.
            </p>

            <button
              onClick={() => setActiveStory(null)}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-sm shadow-md"
            >
              Close Story
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
