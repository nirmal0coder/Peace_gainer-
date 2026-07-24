import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Droplets } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface Ripple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const WaterRipples: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const [theme, setTheme] = useState<'teal' | 'ocean' | 'twilight' | 'emerald'>('teal');

  const themeGradients = {
    teal: { bg1: '#0B1F2A', bg2: '#0F2836', ripple: '#3FCDA8' },
    ocean: { bg1: '#0C2A4A', bg2: '#081D33', ripple: '#38BDF8' },
    twilight: { bg1: '#1E1233', bg2: '#120A21', ripple: '#8B85C4' },
    emerald: { bg1: '#0A271D', bg2: '#051812', ripple: '#34D399' }
  };

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentTheme = themeGradients[theme];

      // Draw Water Background Gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, currentTheme.bg1);
      grad.addColorStop(1, currentTheme.bg2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle water surface light
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 140, 0, Math.PI * 2);
      ctx.fill();

      // Update and Draw Ripples
      ripplesRef.current = ripplesRef.current
        .map((r) => ({
          ...r,
          radius: r.radius + 1.8,
          opacity: r.opacity - 0.012
        }))
        .filter((r) => r.opacity > 0 && r.radius < r.maxRadius);

      ripplesRef.current.forEach((r) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = currentTheme.ripple;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = Math.max(0, r.opacity);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius - 12), 0, Math.PI * 2);
        ctx.strokeStyle = currentTheme.ripple;
        ctx.lineWidth = 1;
        ctx.globalAlpha = Math.max(0, r.opacity * 0.6);
        ctx.stroke();

        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    audioSynth.playBubblePop();

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      radius: 4,
      maxRadius: 100 + Math.random() * 40,
      opacity: 0.9
    };

    ripplesRef.current.push(newRipple);
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Kinetic Water Ripples 🌊
          </h3>
          <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Tap or click anywhere on the serene water canvas to expand soothing glowing ripples.
          </p>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-1.5 bg-[#F7F3E9] dark:bg-[#0B1F2A] p-1.5 rounded-2xl border border-[#3FCDA8]/30">
          {(['teal', 'ocean', 'twilight', 'emerald'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                theme === t
                  ? 'bg-[#3FCDA8] text-[#081620] shadow-sm'
                  : 'text-[#0B1F2A] dark:text-[#F7F3E9] hover:opacity-80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Water Surface Canvas */}
      <div className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#3FCDA8]/40">
        <canvas
          ref={canvasRef}
          width={500}
          height={320}
          onClick={handleCanvasClick}
          className="w-full h-[320px] cursor-pointer touch-none"
        />

        {/* Floating Water Lily Decorations */}
        <div className="absolute top-8 left-12 text-3xl pointer-events-none opacity-80 animate-bounce duration-3000">
          🪷
        </div>
        <div className="absolute bottom-10 right-16 text-3xl pointer-events-none opacity-80 animate-pulse">
          🪷
        </div>
        <div className="absolute top-20 right-28 text-2xl pointer-events-none opacity-70">
          🍃
        </div>
      </div>
    </div>
  );
};
