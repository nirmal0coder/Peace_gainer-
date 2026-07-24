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
    <div className="bg-[#fff3ec]/90 dark:bg-[#280c16]/90 backdrop-blur-md border-b border-orange-200/80 dark:border-rose-900/60 py-6 px-4 sm:px-6 lg:px-8 mb-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Breadcrumb Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-stone-500 dark:text-rose-200/70 font-medium">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 hover:text-orange-600 dark:hover:text-rose-300 transition-colors"
            >
              <Home className="w-4 h-4 text-orange-500" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 dark:text-rose-900" />
            <span className="text-orange-700 dark:text-rose-300 font-bold">{category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 dark:text-rose-900" />
            <span className="text-stone-800 dark:text-rose-100 font-extrabold">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('aichat')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                <span>AI Bot 🤖</span>
              </button>
            )}

            <button
              onClick={onGoHome}
              className="px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-[#381420] hover:bg-orange-100 dark:hover:bg-[#451928] text-stone-700 dark:text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-orange-200 dark:border-rose-800"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-600" />
              <span>Back to Home</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('emergency')}
                className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 hover:bg-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-300 dark:border-rose-800"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Crisis 14416</span>
              </button>
            )}
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="flex items-start sm:items-center gap-3">
          {icon && (
            <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-300 flex-shrink-0 shadow-inner border border-orange-200 dark:border-orange-800">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 dark:text-stone-100 tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
              {subtitle}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
