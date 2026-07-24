import React, { useState, useEffect } from 'react';
import { Flower2, Sun, Trees, Heart, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryMatch: React.FC = () => {
  const symbols = ['🌸', '🍃', '☀️', '🌺', '🌊', '🦋'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  const initGame = () => {
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, idx) => ({
        id: idx,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    setCards(deck);
    setFlippedCards([]);
    setMatches(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    audioSynth.playBubblePop();

    const updated = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updated);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = cards.find((c) => c.id === newFlipped[0]);
      const second = cards.find((c) => c.id === newFlipped[1]);

      if (first && second && first.symbol === second.symbol) {
        audioSynth.playChimeSuccess();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setMatches((m) => {
            const newM = m + 1;
            if (newM === symbols.length) {
              confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
            }
            return newM;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === newFlipped[0] || c.id === newFlipped[1] ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0EAD9] dark:from-[#0B1F2A] dark:via-[#0A1B25] dark:to-[#081620] p-6 sm:p-8 rounded-3xl border border-[#3FCDA8]/30 shadow-xl space-y-6 text-center text-[#0B1F2A] dark:text-[#F7F3E9] transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B1F2A] dark:text-[#F7F3E9]">
            Nature Memory Match 🌸
          </h3>
          <p className="text-xs sm:text-sm text-[#1C2D37]/80 dark:text-[#F7F3E9]/80">
            Match peaceful nature icons at your own calm, unhurried pace.
          </p>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-[#F7F3E9] dark:bg-[#0B1F2A] border border-[#3FCDA8]/30 shadow-sm text-xs font-bold text-[#169375] dark:text-[#3FCDA8] flex-shrink-0">
          Pairs Found: {matches} / {symbols.length}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-20 sm:h-24 rounded-2xl border-2 text-2xl sm:text-3xl flex items-center justify-center transition-all duration-300 transform cursor-pointer ${
              card.isFlipped || card.isMatched
                ? 'bg-white dark:bg-[#0B1F2A] border-[#3FCDA8] shadow-md scale-102'
                : 'bg-[#0B1F2A] dark:bg-white text-transparent border-[#3FCDA8]/30 hover:scale-105'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.symbol : '🌿'}
          </button>
        ))}
      </div>

      {matches === symbols.length && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Wonderful memory harmony! All nature pairs matched. ✨</span>
        </div>
      )}

      <button
        onClick={initGame}
        className="px-5 py-2.5 rounded-2xl bg-[#3FCDA8] hover:bg-[#33b895] text-[#081620] font-bold text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Restart Match</span>
      </button>
    </div>
  );
};

