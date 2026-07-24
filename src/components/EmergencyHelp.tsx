import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Heart, LifeBuoy, CheckCircle2, Eye, Hand, Ear, Sparkles } from 'lucide-react';

export const EmergencyHelp: React.FC = () => {
  const [activeGroundingStep, setActiveGroundingStep] = useState(0);

  const groundingSteps = [
    { count: '5', title: '5 Things You Can SEE', desc: 'Look around you right now. Notice 5 objects, colors, or shapes in your room.', icon: <Eye className="w-5 h-5 text-orange-500" /> },
    { count: '4', title: '4 Things You Can TOUCH', desc: 'Feel the fabric of your clothes, the smooth table, or your feet on the ground.', icon: <Hand className="w-5 h-5 text-amber-500" /> },
    { count: '3', title: '3 Things You Can HEAR', desc: 'Listen softly for distant sounds: wind, fan humming, or ambient birds.', icon: <Ear className="w-5 h-5 text-rose-500" /> },
    { count: '2', title: '2 Things You Can SMELL', desc: 'Notice scent in the air, soap, tea, or take a deep breath in through your nose.', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    { count: '1', title: '1 Good Thing About YOU', desc: 'Acknowledge 1 strength: "I am taking steps to care for myself today."', icon: <Heart className="w-5 h-5 text-rose-500" /> }
  ];

  return (
    <section id="emergency" className="py-16 sm:py-24 bg-gradient-to-b from-rose-50/80 via-orange-50/60 to-amber-50/80 dark:from-[#2a0e17] dark:via-[#220a12] dark:to-[#1f070e] border-y-2 border-rose-200 dark:border-rose-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Highlighted Emergency Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-rose-600 via-orange-600 to-amber-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Glowing background aura */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldAlert className="w-4 h-4 text-rose-200 animate-pulse" />
              <span>Immediate Support Available 24/7</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
              &ldquo;If you&apos;re feeling overwhelmed or having thoughts of self-harm, please seek immediate help. You don&apos;t have to face this alone.&rdquo;
            </h2>

            <p className="text-sm sm:text-base opacity-95 max-w-2xl font-sans">
              Free, confidential, and compassionate mental health support is available at any time of day or night.
            </p>
          </div>

          {/* Helpline Numbers Box */}
          <div className="bg-white/15 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-100">
                  Government of India Tele-MANAS Helpline
                </span>
                <div className="text-2xl sm:text-4xl font-extrabold font-mono tracking-wider mt-1">
                  ☎️ 14416 <span className="text-sm font-sans font-normal opacity-90">or</span> 1-800-89-14416
                </div>
                <p className="text-xs opacity-90 mt-1">
                  Free 24/7 tele-mental health services in multiple regional languages across India.
                </p>
              </div>

              {/* Call Now Button */}
              <a
                href="tel:14416"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 font-bold text-base shadow-xl flex items-center justify-center gap-2.5 transition-transform transform hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <PhoneCall className="w-5 h-5 text-rose-600 animate-bounce" />
                <span>Call Now (14416)</span>
              </a>
            </div>
          </div>

        </div>

        {/* 5-4-3-2-1 Grounding Technique */}
        <div className="mt-16 max-w-3xl mx-auto bg-white dark:bg-[#32121e] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-rose-950 text-orange-950 dark:text-rose-200 text-xs font-bold">
              <LifeBuoy className="w-4 h-4 text-orange-500" />
              <span>Instant Panic & Anxiety Grounding</span>
            </div>
            <h3 className="text-2xl font-bold font-serif text-stone-900 dark:text-rose-100">
              5-4-3-2-1 Grounding Technique
            </h3>
            <p className="text-xs text-stone-600 dark:text-rose-200/80">
              When panic or heavy anxiety strikes, anchor your awareness back into the safety of the present moment.
            </p>
          </div>

          <div className="space-y-3">
            {groundingSteps.map((step, idx) => (
              <div
                key={step.count}
                onClick={() => setActiveGroundingStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeGroundingStep === idx
                    ? 'border-orange-500 bg-orange-50/80 dark:bg-rose-950/80 shadow-md'
                    : 'border-stone-200 dark:border-rose-900/40 bg-stone-50 dark:bg-[#3d1624]/60 hover:bg-orange-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#200a12] flex items-center justify-center font-bold text-lg font-mono text-orange-600 dark:text-rose-300 shadow-sm">
                    {step.count}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 dark:text-rose-100 flex items-center gap-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {activeGroundingStep === idx && (
                  <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
