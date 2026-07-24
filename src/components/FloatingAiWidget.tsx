import React, { useState } from 'react';
import { Bot, Sparkles, X, MessageSquare, Heart } from 'lucide-react';

interface FloatingAiWidgetProps {
  onOpenAi: () => void;
  activePage: string;
}

export const FloatingAiWidget: React.FC<FloatingAiWidgetProps> = ({ onOpenAi, activePage }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  // If already on the AI chat page, hide the floating button to prevent clutter
  if (activePage === 'aichat') return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2 animate-fadeIn">
      
      {/* Tooltip Pill */}
      {showTooltip && (
        <div className="bg-white/95 dark:bg-[#34121d]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-orange-200 dark:border-rose-800 text-stone-800 dark:text-rose-100 text-xs font-semibold flex items-center gap-2 max-w-[220px] relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="p-0.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-rose-200 absolute -top-1 -right-1 bg-stone-100 dark:bg-rose-950 border border-stone-200 dark:border-rose-800"
            title="Dismiss tip"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <Bot className="w-3.5 h-3.5" />
          </div>
          
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-orange-600 dark:text-rose-300">Need someone to talk to?</p>
            <p className="text-[10px] text-stone-500 dark:text-rose-200/80">Peace AI Bot is active 24/7</p>
          </div>
        </div>
      )}

      {/* Floating Action AI Button */}
      <button
        onClick={onOpenAi}
        className="px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-2xl border-2 border-white dark:border-[#34121d] flex items-center gap-2.5 font-bold text-xs tracking-wide transform hover:scale-105 active:scale-95 transition-all group"
        title="Quick Launch Peace AI Bot"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white animate-ping" />
        </div>
        <span className="hidden sm:inline">Ask Peace AI Bot 🤖</span>
        <span className="sm:hidden">AI Bot 🤖</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
      </button>

    </div>
  );
};
