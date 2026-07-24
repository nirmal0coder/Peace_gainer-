import React from 'react';
import { ArrowLeft, Home, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  category: string;
  icon?: React.ReactNode;
  onGoHome: () => void;
  onNavigate?: (pageId: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  category,
  icon,
  onGoHome,
  onNavigate,
}) => {
  return (
    <div className="bg-white/80 dark:bg-[#0B1F2A]/90 backdrop-blur-lg border-b border-[#3FCDA8]/30 dark:border-[#3FCDA8]/20 py-6 px-4 sm:px-6 lg:px-8 mb-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Breadcrumb Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#1C2D37]/70 dark:text-[#F7F3E9]/70 font-medium">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 hover:text-[#169375] dark:hover:text-[#3FCDA8] transition-colors"
            >
              <Home className="w-4 h-4 text-[#169375] dark:text-[#3FCDA8]" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#3FCDA8]/40" />
            <span className="text-[#F2A65A] font-semibold">{category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#3FCDA8]/40" />
            <span className="text-[#0B1F2A] dark:text-[#F7F3E9] font-bold">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('aichat')}
                className="px-3 py-1.5 rounded-xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] text-xs font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#081620]" />
                <span>AI Bot 🤖</span>
              </button>
            )}

            <button
              onClick={onGoHome}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F2836] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] text-[#0B1F2A] dark:text-[#F7F3E9] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#3FCDA8]/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#169375] dark:text-[#3FCDA8]" />
              <span>Back to Home</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('emergency')}
                className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-900 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-300 dark:border-rose-800"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 animate-pulse" />
                <span>Crisis 14416</span>
              </button>
            )}
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="flex items-start sm:items-center gap-3">
          {icon && (
            <div className="p-3 rounded-2xl bg-white dark:bg-[#0F2836] text-[#169375] dark:text-[#3FCDA8] flex-shrink-0 border border-[#3FCDA8]/30 shadow-inner">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9] tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#1C2D37]/70 dark:text-[#F7F3E9]/70 mt-1">
              {subtitle}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
