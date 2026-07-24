export type GlobalThemeId = 'emerald' | 'ocean' | 'lavender' | 'sunset' | 'cosmic' | 'zen';

export interface GlobalThemeConfig {
  id: GlobalThemeId;
  name: string;
  icon: string;
  primaryHex: string;
  hoverHex: string;
  secondaryHex: string;
  accentBgLight: string;
  accentBgDark: string;
  description: string;
  badgeClass: string;
  btnPrimary: string;
  accentText: string;
  borderColor: string;
  glowColor: string;
  heroGradientLight: string;
  heroGradientDark: string;
  activeTabClass: string;
}

export const GLOBAL_THEMES: Record<GlobalThemeId, GlobalThemeConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Sanctuary',
    icon: '🌿',
    primaryHex: '#3FCDA8',
    hoverHex: '#33b895',
    secondaryHex: '#F2A65A',
    accentBgLight: 'bg-[#3FCDA8]/20 text-[#169375]',
    accentBgDark: 'dark:bg-[#3FCDA8]/20 dark:text-[#3FCDA8]',
    description: 'Serene mint & deep forest tones for grounded peace',
    badgeClass: 'bg-emerald-100 text-[#169375] dark:bg-[#0F2836] dark:text-[#3FCDA8] border border-emerald-300 dark:border-[#3FCDA8]/40',
    btnPrimary: 'bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620]',
    accentText: 'text-[#169375] dark:text-[#3FCDA8]',
    borderColor: 'border-[#3FCDA8]/30 dark:border-[#3FCDA8]/20',
    glowColor: 'rgba(63, 205, 168, 0.25)',
    heroGradientLight: 'from-emerald-50/80 via-teal-50/60 to-amber-50/50',
    heroGradientDark: 'from-[#0B1F2A] via-[#0F2836] to-[#0A1B25]',
    activeTabClass: 'bg-[#3FCDA8] text-[#081620] font-bold shadow-md',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Breeze',
    icon: '🌊',
    primaryHex: '#38BDF8',
    hoverHex: '#0284C7',
    secondaryHex: '#34D399',
    accentBgLight: 'bg-sky-400/20 text-sky-700',
    accentBgDark: 'dark:bg-sky-400/20 dark:text-sky-300',
    description: 'Refreshing coastal azure for mental clarity & calm',
    badgeClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-700/50',
    btnPrimary: 'bg-sky-400 hover:bg-sky-500 text-slate-950',
    accentText: 'text-sky-700 dark:text-sky-300',
    borderColor: 'border-sky-400/30 dark:border-sky-500/20',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    heroGradientLight: 'from-sky-50/80 via-cyan-50/60 to-emerald-50/50',
    heroGradientDark: 'from-sky-950 via-slate-900 to-cyan-950',
    activeTabClass: 'bg-sky-400 text-slate-950 font-bold shadow-md',
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender Twilight',
    icon: '🪻',
    primaryHex: '#C084FC',
    hoverHex: '#A855F7',
    secondaryHex: '#38BDF8',
    accentBgLight: 'bg-purple-400/20 text-purple-700',
    accentBgDark: 'dark:bg-purple-400/20 dark:text-purple-300',
    description: 'Soothing amethyst & lilac for evening tranquility',
    badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50',
    btnPrimary: 'bg-purple-400 hover:bg-purple-500 text-slate-950',
    accentText: 'text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-400/30 dark:border-purple-500/20',
    glowColor: 'rgba(192, 132, 252, 0.25)',
    heroGradientLight: 'from-purple-50/80 via-fuchsia-50/60 to-sky-50/50',
    heroGradientDark: 'from-purple-950 via-slate-900 to-indigo-950',
    activeTabClass: 'bg-purple-400 text-slate-950 font-bold shadow-md',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Glow',
    icon: '🌅',
    primaryHex: '#F2A65A',
    hoverHex: '#EA580C',
    secondaryHex: '#F43F5E',
    accentBgLight: 'bg-amber-400/20 text-amber-800',
    accentBgDark: 'dark:bg-amber-400/20 dark:text-amber-300',
    description: 'Warm golden amber & coral comfort for heart warmth',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50',
    btnPrimary: 'bg-amber-400 hover:bg-amber-500 text-slate-950',
    accentText: 'text-amber-800 dark:text-amber-300',
    borderColor: 'border-amber-400/30 dark:border-amber-500/20',
    glowColor: 'rgba(242, 166, 90, 0.25)',
    heroGradientLight: 'from-amber-50/80 via-orange-50/60 to-rose-50/50',
    heroGradientDark: 'from-amber-950/90 via-stone-900 to-rose-950/90',
    activeTabClass: 'bg-amber-400 text-slate-950 font-bold shadow-md',
  },
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic Night',
    icon: '🌙',
    primaryHex: '#818CF8',
    hoverHex: '#6366F1',
    secondaryHex: '#F472B6',
    accentBgLight: 'bg-indigo-400/20 text-indigo-800',
    accentBgDark: 'dark:bg-indigo-400/20 dark:text-indigo-300',
    description: 'Deep sapphire & starry violet for deep quiet stillness',
    badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/50',
    btnPrimary: 'bg-indigo-400 hover:bg-indigo-500 text-slate-950',
    accentText: 'text-indigo-800 dark:text-indigo-300',
    borderColor: 'border-indigo-400/30 dark:border-indigo-500/20',
    glowColor: 'rgba(129, 140, 248, 0.25)',
    heroGradientLight: 'from-indigo-50/80 via-blue-50/60 to-pink-50/50',
    heroGradientDark: 'from-slate-950 via-indigo-950/90 to-slate-900',
    activeTabClass: 'bg-indigo-400 text-slate-950 font-bold shadow-md',
  },
  zen: {
    id: 'zen',
    name: 'Zen Garden',
    icon: '🪴',
    primaryHex: '#34D399',
    hoverHex: '#059669',
    secondaryHex: '#FBBF24',
    accentBgLight: 'bg-teal-400/20 text-teal-800',
    accentBgDark: 'dark:bg-teal-400/20 dark:text-teal-300',
    description: 'Peaceful tea leaf & sage green for natural harmony',
    badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-700/50',
    btnPrimary: 'bg-teal-400 hover:bg-teal-500 text-slate-950',
    accentText: 'text-teal-800 dark:text-teal-300',
    borderColor: 'border-teal-400/30 dark:border-teal-500/20',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    heroGradientLight: 'from-teal-50/80 via-emerald-50/60 to-amber-50/50',
    heroGradientDark: 'from-emerald-950/80 via-stone-900 to-teal-950/80',
    activeTabClass: 'bg-teal-400 text-slate-950 font-bold shadow-md',
  },
};

export function applyGlobalTheme(themeId: GlobalThemeId, mode: 'light' | 'dark') {
  const t = GLOBAL_THEMES[themeId] || GLOBAL_THEMES.emerald;
  const root = document.documentElement;

  root.style.setProperty('--color-aurora-teal', t.primaryHex);
  root.style.setProperty('--color-warm-gold', t.secondaryHex);
  root.style.setProperty('--theme-primary', t.primaryHex);
  root.style.setProperty('--theme-primary-hover', t.hoverHex);
  root.style.setProperty('--theme-secondary', t.secondaryHex);

  // Apply custom background radial gradient based on active theme
  if (mode === 'dark') {
    document.body.style.backgroundImage = `
      radial-gradient(circle at 50% 20%, ${t.primaryHex}28 0%, rgba(11, 31, 42, 0) 65%),
      radial-gradient(circle at 80% 70%, ${t.secondaryHex}1E 0%, rgba(8, 22, 32, 0) 50%)
    `;
  } else {
    document.body.style.backgroundImage = `
      radial-gradient(circle at 50% 20%, ${t.primaryHex}35 0%, rgba(247, 243, 233, 0) 65%),
      radial-gradient(circle at 80% 70%, ${t.secondaryHex}25 0%, rgba(247, 243, 233, 0) 50%)
    `;
  }

  // Dispatch custom window event so all components react instantly
  if (typeof window !== 'undefined') {
    localStorage.setItem('peace_gainer_global_theme', themeId);
    window.dispatchEvent(new CustomEvent('peace_gainer_theme_changed', {
      detail: { themeId, mode }
    }));
  }
}

