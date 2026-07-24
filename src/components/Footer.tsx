import React, { useState } from 'react';
import { Heart, ShieldCheck, FileText, PhoneCall, X, Bot, Sparkles, Compass, ShieldAlert, Gamepad2, Brain, Activity } from 'lucide-react';

interface FooterProps {
  onNavigate?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalType, setModalType] = useState<'privacy' | 'disclaimer' | null>(null);

  const handleLinkClick = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    } else if (typeof window !== 'undefined') {
      window.location.hash = pageId;
    }
  };

  return (
    <footer className="bg-gradient-to-b from-amber-50/90 via-orange-50/60 to-rose-100/70 dark:bg-[#1c080f] text-stone-800 dark:text-rose-200/90 py-12 border-t border-orange-200/80 dark:border-rose-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Quick Navigation Short Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-orange-200/80 dark:border-rose-950/80">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 via-rose-400 to-amber-400 flex items-center justify-center text-white shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold font-serif text-stone-900 dark:text-white tracking-wide">
                Peace Gainer
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-rose-200/70 leading-relaxed">
              Your comprehensive, compassionate digital haven for emotional healing, stress reduction, and mental wellness.
            </p>
            <div className="pt-1">
              <button
                onClick={() => handleLinkClick('aichat')}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-transform transform active:scale-95"
              >
                <Bot className="w-4 h-4 text-amber-200 animate-pulse" />
                <span>AI Companion Chatbot</span>
              </button>
            </div>
          </div>

          {/* Quick AI & Key Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-orange-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-orange-500" />
              <span>AI & Core Tools</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('aichat')}
                  className="hover:text-orange-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-900 dark:text-rose-100 font-bold group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-125 transition-transform" />
                  <span>Talk to Peace AI Bot 🤖</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-orange-100 dark:bg-rose-900/60 text-[10px] text-orange-900 dark:text-amber-300 font-mono font-bold">24/7 AI</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('yoga')}
                  className="hover:text-rose-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
                  <Activity className="w-3.5 h-3.5 text-rose-500" />
                  <span>Yoga for Depression 🧘</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/60 text-[10px] text-rose-900 dark:text-emerald-300 font-mono font-bold">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('toolkit')}
                  className="hover:text-orange-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
                  <span>Self-Help Interactive Suite</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('games')}
                  className="hover:text-indigo-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                  <Gamepad2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Relaxing Games Arcade</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Education & Positivity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-orange-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-orange-500" />
              <span>Guides & Inspiration</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-orange-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>About Depression & Quiz</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('causes')}
                  className="hover:text-rose-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Causes & Triggers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('solutions')}
                  className="hover:text-teal-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <Compass className="w-3.5 h-3.5 text-teal-500" />
                  <span>Solutions & Recovery Plans</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('positivity')}
                  className="hover:text-pink-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>Daily Positivity & Hope Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Crisis & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-rose-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Crisis Support</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('emergency')}
                  className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors flex items-center gap-2 text-rose-600 dark:text-rose-300 font-bold"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  <span>24/7 Crisis Support Center</span>
                </button>
              </li>
              <li>
                <a
                  href="tel:14416"
                  className="hover:text-orange-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-orange-700 dark:text-amber-300 font-bold"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                  <span>Tele-MANAS Helpline: 14416</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-orange-600 dark:hover:text-orange-300 transition-colors flex items-center gap-2 text-stone-700 dark:text-rose-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span>Contact & Feedback Desk</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Top Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#2d0e18]/90 border border-orange-200 dark:border-rose-900/60 text-xs sm:text-sm text-stone-700 dark:text-rose-200/90 leading-relaxed space-y-1 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-orange-800 dark:text-amber-300">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>Important Medical Disclaimer</span>
          </div>
          <p>
            Peace Gainer provides educational and self-help resources. It is not a substitute for professional medical diagnosis or treatment. If symptoms persist or you are in crisis, please contact a qualified mental health professional or the Tele-MANAS helpline immediately at 14416 or 1-800-89-14416.
          </p>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-orange-200/80 dark:border-rose-950 text-xs">
          <div>
            <span className="text-lg font-bold font-serif text-stone-900 dark:text-white tracking-wide">
              Peace Gainer
            </span>
            <p className="text-stone-600 dark:text-rose-200/70 mt-0.5">
              Your Peaceful Haven for Mental Wellness & Hope
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => handleLinkClick('aichat')}
              className="text-orange-700 dark:text-amber-300 font-bold hover:text-orange-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Bot className="w-3.5 h-3.5 text-orange-500" /> AI Bot Quick Link
            </button>
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-orange-600 dark:hover:text-orange-400 text-stone-600 dark:text-rose-200 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" /> Privacy Policy
            </button>
            <button
              onClick={() => setModalType('disclaimer')}
              className="hover:text-orange-600 dark:hover:text-orange-400 text-stone-600 dark:text-rose-200 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Full Disclaimer
            </button>
            <a
              href="tel:14416"
              className="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Tele-MANAS 14416
            </a>
          </div>

          <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400 font-medium">
            <span>Copyright © Peace Gainer. Made with peace & hope</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline mx-0.5 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Privacy / Disclaimer Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f070e]/80 backdrop-blur-sm">
          <div className="bg-[#2a0e17] border border-rose-900/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 relative text-rose-100">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#381420] text-rose-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-white">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Full Disclaimer'}
            </h3>

            {modalType === 'privacy' ? (
              <div className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed max-h-80 overflow-y-auto">
                <p>
                  Peace Gainer deeply respects your privacy. All mood logs, gratitude notes, and activity progress are stored strictly locally in your browser using standard client-side storage.
                </p>
                <p>
                  No personal data or sensitive mental health entries are sent or stored on remote tracking servers.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed max-h-80 overflow-y-auto">
                <p>
                  Peace Gainer is an educational and self-help website. Content provided here is meant to foster emotional resilience, stress reduction, and mental health awareness.
                </p>
                <p>
                  It does NOT constitute professional psychiatric or medical treatment. If you are experiencing suicidal thoughts or severe distress, please contact emergency services or the Tele-MANAS helpline at 14416 immediately.
                </p>
              </div>
            )}

            <button
              onClick={() => setModalType(null)}
              className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
