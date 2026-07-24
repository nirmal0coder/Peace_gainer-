import React from 'react';
import { ArrowLeft, Home, ChevronRight, ShieldAlert, Sparkles, Palette } from 'lucide-react';
import { GlobalThemeId } from '../types';
import { GLOBAL_THEMES } from '../utils/themePalettes';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  category: string;
  icon?: React.ReactNode;
  onGoHome: () => void;
  onNavigate?: (pageId: string) => void;
  currentTheme?: GlobalThemeId;
  onSelectTheme?: (themeId: GlobalThemeId) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  category,
  icon,
  onGoHome,
  onNavigate,
  currentTheme = 'emerald',
  onSelectTheme,
}) => {
  const themesList = Object.values(GLOBAL_THEMES);

  return (
    <div className="bg-white/80 dark:bg-[#0B1F2A]/90 backdrop-blur-lg border-b border-[#3FCDA8]/30 dark:border-[#3FCDA8]/20 py-6 px-4 sm:px-6 lg:px-8 mb-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Breadcrumb Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#1C2D37]/70 dark:text-[#F7F3E9]/70 font-medium">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 hover:text-[#169375] dark:hover:text-[#3FCDA8] transition-colors cursor-pointer"
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
                className="px-3 py-1.5 rounded-xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] text-xs font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#081620]" />
                <span>AI Bot</span>
              </button>
            )}

            <button
              onClick={onGoHome}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F2836] hover:bg-[#EAE4D3] dark:hover:bg-[#143345] text-[#0B1F2A] dark:text-[#F7F3E9] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#3FCDA8]/30 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#169375] dark:text-[#3FCDA8]" />
              <span>Back to Home</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('emergency')}
                className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-900 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-300 dark:border-rose-800 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 animate-pulse" />
                <span>Crisis 14416</span>
              </button>
            )}
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
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

          {/* Quick Page Theme Selector */}
          {onSelectTheme && (
            <div className="flex items-center gap-1.5 bg-white/70 dark:bg-[#0F2836]/70 p-1.5 rounded-2xl border border-[#3FCDA8]/30 self-start md:self-auto overflow-x-auto max-w-full">
              <span className="text-[11px] font-bold text-[#1C2D37]/70 dark:text-[#F7F3E9]/70 flex items-center gap-1 px-1.5 flex-shrink-0">
                <Palette className="w-3.5 h-3.5 text-[#3FCDA8]" />
                <span className="hidden sm:inline">Theme:</span>
              </span>
              {themesList.map((t) => {
                const isSelected = t.id === currentTheme;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    className={`px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all flex-shrink-0 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#3FCDA8] text-[#081620] border-[#3FCDA8] font-bold shadow-sm'
                        : 'bg-white dark:bg-[#0B1F2A] text-[#1C2D37] dark:text-[#F7F3E9]/80 border-transparent hover:border-[#3FCDA8]/30'
                    }`}
                    title={t.description}
                  >
                    <span>{t.icon}</span>
                    <span className="text-[10px] hidden sm:inline">{t.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

