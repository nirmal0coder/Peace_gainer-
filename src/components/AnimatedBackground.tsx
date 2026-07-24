import React, { useEffect, useRef } from 'react';
import { BackgroundParticleType, ThemeMode } from '../types';

interface Props {
  type: BackgroundParticleType;
  theme: ThemeMode;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
}

export const AnimatedBackground: React.FC<Props> = ({ type, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (type === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palettes based on particle type and theme
    const isDark = theme === 'dark';
    const leafColors = isDark
      ? ['rgba(251, 146, 60, 0.45)', 'rgba(244, 114, 182, 0.35)', 'rgba(252, 211, 77, 0.35)']
      : ['rgba(251, 146, 60, 0.6)', 'rgba(244, 114, 182, 0.5)', 'rgba(253, 186, 116, 0.7)'];

    const butterflyColors = isDark
      ? ['rgba(251, 146, 60, 0.5)', 'rgba(244, 114, 182, 0.45)', 'rgba(251, 191, 36, 0.45)']
      : ['rgba(251, 146, 60, 0.7)', 'rgba(244, 114, 182, 0.65)', 'rgba(252, 211, 77, 0.6)'];

    const cloudColors = isDark
      ? ['rgba(255, 247, 237, 0.08)', 'rgba(254, 215, 170, 0.06)']
      : ['rgba(255, 247, 237, 0.75)', 'rgba(254, 215, 170, 0.55)'];

    const orbColors = isDark
      ? ['rgba(251, 146, 60, 0.35)', 'rgba(244, 114, 182, 0.3)', 'rgba(252, 211, 77, 0.3)']
      : ['rgba(253, 186, 116, 0.55)', 'rgba(251, 146, 60, 0.45)', 'rgba(252, 165, 165, 0.5)'];

    const particles: Particle[] = [];
    const particleCount = type === 'clouds' ? 8 : type === 'orbs' ? 25 : 30;

    const getPalette = () => {
      switch (type) {
        case 'leaves': return leafColors;
        case 'butterflies': return butterflyColors;
        case 'clouds': return cloudColors;
        case 'orbs': return orbColors;
        default: return orbColors;
      }
    };

    const palette = getPalette();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'clouds' ? Math.random() * 80 + 60 : type === 'orbs' ? Math.random() * 15 + 8 : Math.random() * 12 + 8,
        speedX: type === 'clouds' ? Math.random() * 0.3 + 0.1 : (Math.random() - 0.5) * 0.8,
        speedY: type === 'leaves' ? Math.random() * 0.8 + 0.3 : (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.3,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }

    const drawLeaf = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size, -p.size / 2, p.size / 2, p.size);
      ctx.quadraticCurveTo(0, p.size / 2, -p.size / 2, p.size);
      ctx.quadraticCurveTo(-p.size, -p.size / 2, 0, -p.size);
      ctx.fill();
      ctx.restore();
    };

    const drawButterfly = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      const wingFlap = Math.sin(Date.now() * 0.008 + p.x) * 0.4 + 0.6;
      ctx.scale(wingFlap, 1);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      // Left wing
      ctx.beginPath();
      ctx.ellipse(-p.size / 2, 0, p.size, p.size * 0.6, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.ellipse(p.size / 2, 0, p.size, p.size * 0.6, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 0.6)';
      ctx.fillRect(-1, -p.size * 0.5, 2, p.size);

      ctx.restore();
    };

    const drawCloud = (p: Particle) => {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      ctx.arc(p.x + p.size * 0.35, p.y - p.size * 0.2, p.size * 0.4, 0, Math.PI * 2);
      ctx.arc(p.x + p.size * 0.7, p.y, p.size * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawOrb = (p: Particle) => {
      ctx.save();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.x < -100) p.x = width + 100;
        if (p.x > width + 100) p.x = -100;
        if (p.y < -100) p.y = height + 100;
        if (p.y > height + 100) p.y = -100;

        switch (type) {
          case 'leaves': drawLeaf(p); break;
          case 'butterflies': drawButterfly(p); break;
          case 'clouds': drawCloud(p); break;
          case 'orbs': drawOrb(p); break;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, theme]);

  if (type === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
