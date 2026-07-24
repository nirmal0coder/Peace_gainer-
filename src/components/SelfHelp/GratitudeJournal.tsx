import React, { useState, useEffect } from 'react';
import { Heart, Plus, Sparkles, Tag, Trash2 } from 'lucide-react';
import { GratitudeEntry } from '../../types';
import confetti from 'canvas-confetti';

export const GratitudeJournal: React.FC = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [text, setText] = useState('');
  const [selectedTag, setSelectedTag] = useState<GratitudeEntry['tag']>('general');

  useEffect(() => {
    const saved = localStorage.getItem('peace_gainer_gratitude_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleAddGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      content: text.trim(),
      tag: selectedTag
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('peace_gainer_gratitude_entries', JSON.stringify(updated));
    setText('');

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter((item) => item.id !== id);
    setEntries(updated);
    localStorage.setItem('peace_gainer_gratitude_entries', JSON.stringify(updated));
  };

  const tagList: { id: GratitudeEntry['tag']; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'person', label: 'A Person' },
    { id: 'experience', label: 'An Experience' },
    { id: 'self', label: 'Self Appreciation' },
    { id: 'nature', label: 'Nature' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Input Box */}
      <form onSubmit={handleAddGratitude} className="bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-sky-50/60 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900 p-6 sm:p-8 rounded-3xl border border-pink-100 dark:border-slate-700 space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-200" />
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100">
            What are you grateful for today?
          </h3>
        </div>

        <textarea
          rows={3}
          placeholder="e.g., I am grateful for the warm cup of tea I had this morning and the sunshine on my face..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 mr-1">Category:</span>
            {tagList.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTag(t.id)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  selectedTag === t.id
                    ? 'bg-pink-500 text-white font-semibold'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Gratitude</span>
          </button>
        </div>
      </form>

      {/* Gratitude Notes List */}
      <div className="space-y-3">
        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">
          Your Saved Moments of Gratitude ({entries.length})
        </h4>

        {entries.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            No gratitude entries saved yet. Add one above to brighten your day!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 uppercase">
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
