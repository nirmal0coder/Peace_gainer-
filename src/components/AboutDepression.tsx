import React, { useState } from 'react';
import { HelpCircle, HeartHandshake, AlertCircle, Sparkles, CheckCircle2, Info, ArrowRight } from 'lucide-react';

export const AboutDepression: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'what' | 'difference' | 'symptoms' | 'why'>('what');

  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/30 via-white to-amber-50/30 dark:bg-[#220a13]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-rose-950 text-orange-950 dark:text-rose-200 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <span>Understanding Mental Health</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-rose-100">
            About Depression: Gentle, Honest Clarity
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-rose-200/80">
            Depression is a medical condition, not a personal weakness or flaw. Understanding it is the first step toward compassion and recovery.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'what', label: 'What is Depression?' },
            { id: 'difference', label: 'Sadness vs. Depression' },
            { id: 'symptoms', label: 'Common Symptoms' },
            { id: 'why', label: 'Why It Matters' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white shadow-md shadow-rose-200 dark:shadow-none'
                  : 'bg-rose-100/60 dark:bg-[#381420] text-stone-700 dark:text-rose-200 hover:bg-orange-100 dark:hover:bg-[#431826]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div className="max-w-4xl mx-auto">
          
          {/* 1. What is Depression */}
          {activeTab === 'what' && (
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-[#3a1421] dark:via-[#300f1a] dark:to-[#260a14] p-8 sm:p-10 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-200 dark:bg-orange-900/60 flex items-center justify-center text-orange-800 dark:text-orange-200 flex-shrink-0">
                  <Info className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                    Depression Explained Simply
                  </h3>
                  <p className="text-xs text-orange-800 dark:text-orange-300 font-bold uppercase tracking-wider">
                    A Treatable Biological & Psychological Condition
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-stone-700 dark:text-stone-200 text-base leading-relaxed">
                <p>
                  Depression (Major Depressive Disorder) is a common and serious mood condition that negatively affects how you feel, the way you think, and how you handle daily activities.
                </p>
                <p>
                  It alters chemical messengers in the brain (like serotonin, dopamine, and norepinephrine). Just like diabetes affects insulin levels or asthma affects lungs, depression affects brain chemistry and emotional regulation.
                </p>
                <p className="font-semibold text-orange-900 dark:text-orange-200 bg-orange-100/80 dark:bg-orange-950/80 p-4 rounded-2xl border border-orange-200 dark:border-orange-800">
                  🧡 Crucial Truth: Depression is NEVER a choice, a sign of laziness, or a lack of willpower. It is treatable, and millions of people fully recover.
                </p>
              </div>
            </div>
          )}

          {/* 2. Difference Between Sadness and Depression */}
          {activeTab === 'difference' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Everyday Sadness */}
              <div className="bg-amber-50/90 dark:bg-amber-950/40 p-8 rounded-3xl border border-amber-200 dark:border-amber-900/50 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 text-xs font-bold uppercase">
                  Everyday Sadness
                </div>
                <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                  Temporary Reaction
                </h4>
                <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Triggered by a specific sad event (like bad news or loss).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Comes in waves; you can still laugh at a joke or enjoy a meal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Fades away naturally as time passes or circumstances change.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Does not strip away your fundamental sense of self-worth.</span>
                  </li>
                </ul>
              </div>

              {/* Clinical Depression */}
              <div className="bg-rose-50/90 dark:bg-rose-950/40 p-8 rounded-3xl border border-rose-200 dark:border-rose-900/50 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-950 dark:text-rose-200 text-xs font-bold uppercase">
                  Clinical Depression
                </div>
                <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
                  Persistent State
                </h4>
                <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Persists for 2+ weeks continuously, often without a clear reason.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Causes &ldquo;anhedonia&rdquo; — complete loss of joy in all activities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Accompanied by physical fatigue, sleep changes, and brain fog.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Instills harsh feelings of worthlessness or irrational guilt.</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

          {/* 3. Common Symptoms */}
          {activeTab === 'symptoms' && (
            <div className="bg-white dark:bg-[#32121e] p-8 sm:p-10 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-8">
              <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-rose-100 text-center">
                Recognizing the Signs
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Emotional */}
                <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 space-y-3">
                  <h4 className="font-bold text-rose-900 dark:text-rose-300 text-base">
                    Emotional Signs
                  </h4>
                  <ul className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-2">
                    <li>• Persistent emptiness or numbness</li>
                    <li>• Unprovoked crying or irritability</li>
                    <li>• Hopelessness about the future</li>
                    <li>• Feeling like a burden</li>
                  </ul>
                </div>

                {/* Physical */}
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 space-y-3">
                  <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base">
                    Physical Signs
                  </h4>
                  <ul className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-2">
                    <li>• Heavy physical exhaustion</li>
                    <li>• Changes in appetite or weight</li>
                    <li>• Insomnia or sleeping too much</li>
                    <li>• Unexplained body aches</li>
                  </ul>
                </div>

                {/* Cognitive */}
                <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/40 space-y-3">
                  <h4 className="font-bold text-orange-900 dark:text-orange-300 text-base">
                    Cognitive Signs
                  </h4>
                  <ul className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 space-y-2">
                    <li>• Difficulty concentrating or deciding</li>
                    <li>• Memory brain fog</li>
                    <li>• Slowed speech or movements</li>
                    <li>• Intrusive negative thoughts</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* 4. Why It Should Never Be Ignored */}
          {activeTab === 'why' && (
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-[#3a1421] dark:via-[#300f1a] dark:to-[#260a14] p-8 sm:p-10 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-200 dark:bg-rose-900/60 flex items-center justify-center text-orange-900 dark:text-rose-200 flex-shrink-0">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-rose-100">
                    Why Depression Should Never Be Ignored
                  </h3>
                  <p className="text-xs text-orange-800 dark:text-rose-300 font-bold uppercase tracking-wider">
                    Early Support Saves Lives & Restores Joy
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-700 dark:text-rose-100">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#381422]/80 border border-orange-200/60 dark:border-rose-800/60">
                  <span className="font-bold text-stone-900 dark:text-rose-100 block mb-1">
                    1. It Prevents Escalation
                  </span>
                  Addressing symptoms early stops mild depression from worsening into severe crises.
                </div>
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#381422]/80 border border-orange-200/60 dark:border-rose-800/60">
                  <span className="font-bold text-stone-900 dark:text-rose-100 block mb-1">
                    2. Physical Health Protection
                  </span>
                  Untreated depression increases risks of heart strain, lowered immunity, and metabolic issues.
                </div>
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#381422]/80 border border-orange-200/60 dark:border-rose-800/60">
                  <span className="font-bold text-stone-900 dark:text-rose-100 block mb-1">
                    3. Restores Relationships
                  </span>
                  Getting support helps rebuild bonds with friends and family who care deeply about you.
                </div>
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#381422]/80 border border-orange-200/60 dark:border-rose-800/60">
                  <span className="font-bold text-stone-900 dark:text-rose-100 block mb-1">
                    4. Reclaims Your Future
                  </span>
                  You deserve a life full of color, laughter, and purpose. Seeking help is the highest form of courage.
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
