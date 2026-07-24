import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface Item {
  id: number;
  x: number;
  y: number;
  type: 'stone' | 'leaf' | 'blossom';
}

export const ZenGarden: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [activeTool, setActiveTool] = useState<'rake' | 'stone' | 'leaf' | 'blossom'>('rake');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill sand background
    ctx.fillStyle = '#f5f0e6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw initial soft rake lines
    ctx.strokeStyle = '#e6dbc9';
    ctx.lineWidth = 3;
    for (let y = 20; y < canvas.height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'rake') {
      setIsDrawing(true);
      drawRake(x, y);
    } else {
      audioSynth.playBubblePop();
      setItems((prev) => [...prev, { id: Date.now(), x, y, type: activeTool }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool !== 'rake') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawRake(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawRake = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#c2b299';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.stroke();
  };

  const clearGarden = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#f5f0e6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#e6dbc9';
    ctx.lineWidth = 3;
    for (let y = 20; y < canvas.height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    setItems([]);
  };

  return (
    <div className="bg-gradient-to-br from-amber-100/80 via-orange-100/80 to-rose-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
            Digital Zen Sand Garden
          </h3>
          <p className="text-xs text-stone-600 dark:text-rose-200/80">
            Rake gentle lines in smooth sand, place pebbles, leaves, and cherry blossoms.
          </p>
        </div>
        <button
          onClick={clearGarden}
          className="px-4 py-2 rounded-2xl bg-white dark:bg-[#381420] shadow-sm text-xs font-bold text-orange-800 dark:text-rose-200 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Garden
        </button>
      </div>

      {/* Tool Selector */}
      <div className="flex items-center justify-center gap-2">
        {[
          { id: 'rake', label: 'Rake Sand 🧹' },
          { id: 'stone', label: 'Smooth Stone 🪨' },
          { id: 'leaf', label: 'Green Leaf 🍃' },
          { id: 'blossom', label: 'Cherry Blossom 🌸' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id as typeof activeTool)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTool === t.id
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white dark:bg-[#381420] text-stone-700 dark:text-rose-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sand Canvas */}
      <div className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-200 dark:border-rose-900/60">
        <canvas
          ref={canvasRef}
          width={500}
          height={320}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-[320px] cursor-crosshair touch-none"
        />

        {/* Placed Items */}
        {items.map((item) => (
          <div
            key={item.id}
            style={{ left: `${(item.x / 500) * 100}%`, top: `${(item.y / 320) * 100}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-2xl pointer-events-none"
          >
            {item.type === 'stone' && '🪨'}
            {item.type === 'leaf' && '🍃'}
            {item.type === 'blossom' && '🌸'}
          </div>
        ))}
      </div>
    </div>
  );
};
