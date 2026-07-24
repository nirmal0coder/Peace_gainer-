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
    <div className="bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-amber-100/80 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6 text-center">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
            Nature Memory Match
          </h3>
          <p className="text-xs text-stone-600 dark:text-rose-200/80">
            Match peaceful nature icons at your own calm pace.
          </p>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#381420] shadow-sm text-xs font-bold text-orange-700 dark:text-rose-200">
          Pairs Found: {matches} / {symbols.length}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-20 rounded-2xl text-2xl flex items-center justify-center font-bold shadow-md transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-white dark:bg-[#381420] border-2 border-orange-400 rotate-0'
                : 'bg-orange-500 dark:bg-rose-900 hover:bg-orange-600 text-white border-2 border-orange-300'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.symbol : '🌸'}
          </button>
        ))}
      </div>

      {matches === symbols.length && (
        <div className="p-4 rounded-2xl bg-orange-100 text-orange-950 text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-orange-600" />
          <span>Wonderful memory! You matched all serene pairs!</span>
        </div>
      )}

      <button
        onClick={initGame}
        className="px-5 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md inline-flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Restart Memory Game</span>
      </button>
    </div>
  );
};
