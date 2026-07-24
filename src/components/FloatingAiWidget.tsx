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
        <div className="bg-white dark:bg-[#0F2836] backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-2xl border border-[#3FCDA8]/40 text-[#0B1F2A] dark:text-[#F7F3E9] text-xs font-semibold flex items-center gap-2 max-w-[230px] relative transition-colors">
          <button
            onClick={() => setShowTooltip(false)}
            className="p-0.5 rounded-full text-[#1C2D37]/50 dark:text-[#F7F3E9]/50 hover:text-[#0B1F2A] dark:hover:text-[#F7F3E9] absolute -top-1 -right-1 bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30"
            title="Dismiss tip"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="w-7 h-7 rounded-full bg-[#3FCDA8] flex items-center justify-center text-[#081620] flex-shrink-0 shadow-md font-bold text-xs">
            🤖
          </div>
          
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-[#169375] dark:text-[#3FCDA8]">Need someone to talk to?</p>
            <p className="text-[10px] text-[#1C2D37]/70 dark:text-[#F7F3E9]/70">Peace AI Bot is online 24/7 🕊️</p>
          </div>
        </div>
      )}

      {/* Floating Action AI Button */}
      <button
        onClick={onOpenAi}
        className="px-4 py-3 rounded-full bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] shadow-2xl border-2 border-[#0B1F2A] flex items-center gap-2.5 font-bold text-xs tracking-wide transform hover:scale-105 active:scale-95 transition-all group"
        title="Quick Launch Peace AI Bot"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-[#081620] group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F2A65A] border border-[#081620] animate-ping" />
        </div>
        <span className="hidden sm:inline">Ask Peace AI Bot 🤖</span>
        <span className="sm:hidden">AI Bot 🤖</span>
        <Sparkles className="w-3.5 h-3.5 text-[#081620] animate-pulse" />
      </button>

    </div>
  );
};
