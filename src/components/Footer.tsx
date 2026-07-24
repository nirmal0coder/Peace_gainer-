import React, { useState } from 'react';
import { Heart, ShieldCheck, FileText, PhoneCall, X, Bot, Sparkles, Compass, ShieldAlert, Gamepad2, Brain, Activity } from 'lucide-react';
import { PeaceGainerLogo } from './PeaceGainerLogo';

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
    <footer className="bg-[#081620] text-[#F7F3E9] py-12 border-t border-[#3FCDA8]/20 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Quick Navigation Short Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#3FCDA8]/20">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="pt-1">
              <PeaceGainerLogo variant="horizontal" size={42} />
            </div>
            <p className="text-xs text-[#F7F3E9]/70 leading-relaxed">
              Your comprehensive, compassionate digital haven for emotional healing, stress reduction, and mental wellness.
            </p>
            <div className="pt-1">
              <button
                onClick={() => handleLinkClick('aichat')}
                className="px-4 py-2 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md flex items-center gap-2 transition-transform transform active:scale-95"
              >
                <Bot className="w-4 h-4 text-[#081620] animate-pulse" />
                <span>AI Companion Chatbot 🤖</span>
              </button>
            </div>
          </div>

          {/* Quick AI & Key Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F2A65A] uppercase tracking-wider flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#3FCDA8]" />
              <span>AI & Core Tools</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('aichat')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9] font-bold group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FCDA8] group-hover:scale-125 transition-transform" />
                  <span>Talk to Peace AI Bot 🤖</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-[#0F2836] border border-[#3FCDA8]/30 text-[10px] text-[#3FCDA8] font-mono font-bold">24/7 AI</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('yoga')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2A65A] group-hover:scale-125 transition-transform" />
                  <Activity className="w-3.5 h-3.5 text-[#F2A65A]" />
                  <span>Yoga for Depression 🧘</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-[#0F2836] border border-[#3FCDA8]/30 text-[10px] text-[#3FCDA8] font-mono font-bold">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('toolkit')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B85C4] group-hover:scale-125 transition-transform" />
                  <span>Self-Help Interactive Suite</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('games')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FCDA8] group-hover:scale-125 transition-transform" />
                  <Gamepad2 className="w-3.5 h-3.5 text-[#3FCDA8]" />
                  <span>Relaxing Games Arcade</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Education & Positivity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F2A65A] uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-[#3FCDA8]" />
              <span>Guides & Inspiration</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FCDA8]" />
                  <span>About Depression & Quiz</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('causes')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2A65A]" />
                  <span>Causes & Triggers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('solutions')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FCDA8]" />
                  <Compass className="w-3.5 h-3.5 text-[#3FCDA8]" />
                  <span>Solutions & Recovery Plans</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('positivity')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B85C4]" />
                  <Sparkles className="w-3.5 h-3.5 text-[#F2A65A]" />
                  <span>Daily Positivity & Hope Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Crisis & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F2A65A] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Crisis Support</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLinkClick('emergency')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#3FCDA8] font-bold"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>24/7 Crisis Support Center</span>
                </button>
              </li>
              <li>
                <a
                  href="tel:14416"
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F2A65A] font-bold"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#F2A65A] animate-pulse" />
                  <span>Tele-MANAS Helpline: 14416</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-[#3FCDA8] transition-colors flex items-center gap-2 text-[#F7F3E9]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3FCDA8]" />
                  <span>Contact & Feedback Desk</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Top Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-[#0F2836] border border-[#3FCDA8]/30 text-xs sm:text-sm text-[#F7F3E9]/80 leading-relaxed space-y-1 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-[#F2A65A]">
            <ShieldCheck className="w-4 h-4 text-[#3FCDA8]" />
            <span>Important Medical Disclaimer</span>
          </div>
          <p>
            Peace Gainer provides educational and self-help resources. It is not a substitute for professional medical diagnosis or treatment. If symptoms persist or you are in crisis, please contact a qualified mental health professional or the Tele-MANAS helpline immediately at 14416 or 1-800-89-14416.
          </p>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-[#3FCDA8]/20 text-xs">
          <div>
            <PeaceGainerLogo variant="horizontal" size={32} />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => handleLinkClick('aichat')}
              className="text-[#3FCDA8] font-bold hover:underline transition-colors flex items-center gap-1"
            >
              <Bot className="w-3.5 h-3.5 text-[#3FCDA8]" /> AI Bot Quick Link
            </button>
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-[#3FCDA8] text-[#F7F3E9]/70 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" /> Privacy Policy
            </button>
            <button
              onClick={() => setModalType('disclaimer')}
              className="hover:text-[#3FCDA8] text-[#F7F3E9]/70 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Full Disclaimer
            </button>
            <a
              href="tel:14416"
              className="text-[#F2A65A] font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Tele-MANAS 14416
            </a>
          </div>

          <div className="flex items-center gap-1 text-[#F7F3E9]/50 font-medium">
            <span>Copyright © Peace Gainer. Made with peace & hope</span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 inline mx-0.5 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Privacy / Disclaimer Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081620]/80 backdrop-blur-md">
          <div className="bg-[#0F2836] border border-[#3FCDA8]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 relative text-[#F7F3E9]">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#0B1F2A] text-[#F7F3E9]/70 hover:text-[#F7F3E9] border border-[#3FCDA8]/20"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#F7F3E9]">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Full Disclaimer'}
            </h3>

            {modalType === 'privacy' ? (
              <div className="space-y-3 text-xs sm:text-sm text-[#F7F3E9]/80 leading-relaxed max-h-80 overflow-y-auto">
                <p>
                  Peace Gainer deeply respects your privacy. All mood logs, gratitude notes, and activity progress are stored strictly locally in your browser using standard client-side storage.
                </p>
                <p>
                  No personal data or sensitive mental health entries are sent or stored on remote tracking servers.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-[#F7F3E9]/80 leading-relaxed max-h-80 overflow-y-auto">
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
              className="w-full py-3 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md"
            >
              I Understand 🕊️
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
