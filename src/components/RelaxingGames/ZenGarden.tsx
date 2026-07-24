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
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Digital Zen Sand Garden 🪴
          </h3>
          <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Rake gentle lines in smooth sand, place pebbles, leaves, and cherry blossoms.
          </p>
        </div>
        <button
          onClick={clearGarden}
          className="px-4 py-2 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 shadow-sm text-xs font-bold text-[#169375] dark:text-[#3FCDA8] flex items-center gap-1.5 flex-shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Garden
        </button>
      </div>

      {/* Tool Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'rake', label: 'Rake Sand 🧹' },
          { id: 'stone', label: 'Smooth Stone 🪨' },
          { id: 'leaf', label: 'Green Leaf 🍃' },
          { id: 'blossom', label: 'Cherry Blossom 🌸' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id as typeof activeTool)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTool === t.id
                ? 'bg-[#3FCDA8] text-[#081620] shadow-md scale-102'
                : 'bg-white dark:bg-[#0B1F2A] text-[#0B1F2A] dark:text-[#F7F3E9] border border-[#3FCDA8]/30 hover:bg-[#EAE4D3] dark:hover:bg-[#143345]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sand Canvas */}
      <div className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#3FCDA8]/40">
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

