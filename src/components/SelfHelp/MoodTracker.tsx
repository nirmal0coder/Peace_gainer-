import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Sun, Wind, Heart, Calendar, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { MoodEntry } from '../../types';
import confetti from 'canvas-confetti';

export const MoodTracker: React.FC = () => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood']>('calm');
  const [note, setNote] = useState('');
  const [savedToday, setSavedToday] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('peace_gainer_mood_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMoodHistory(parsed);
        const todayStr = new Date().toISOString().split('T')[0];
        if (parsed.some((e: MoodEntry) => e.date === todayStr)) {
          setSavedToday(true);
        }
      } catch {}
    }
  }, []);

  const moodsList = [
    { id: 'ecstatic', label: 'Peaceful / Joyful', icon: <Sun className="w-6 h-6 text-amber-500" />, bg: 'bg-amber-100/80 dark:bg-amber-950/60' },
    { id: 'calm', label: 'Calm & Centered', icon: <Heart className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-100/80 dark:bg-orange-950/60' },
    { id: 'okay', label: 'Doing Okay', icon: <Meh className="w-6 h-6 text-amber-600" />, bg: 'bg-amber-100/80 dark:bg-amber-950/60' },
    { id: 'anxious', label: 'Anxious / Restless', icon: <Wind className="w-6 h-6 text-orange-600" />, bg: 'bg-orange-100/80 dark:bg-orange-950/60' },
    { id: 'sad', label: 'Feeling Low', icon: <Frown className="w-6 h-6 text-rose-500" />, bg: 'bg-rose-100/80 dark:bg-rose-950/60' },
    { id: 'overwhelmed', label: 'Overwhelmed', icon: <Smile className="w-6 h-6 text-rose-600" />, bg: 'bg-rose-100/80 dark:bg-rose-950/60' }
  ] as const;

  const handleSaveMood = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: todayStr,
      time: timeStr,
      mood: selectedMood,
      note: note.trim()
    };

    const updated = [newEntry, ...moodHistory];
    setMoodHistory(updated);
    localStorage.setItem('peace_gainer_mood_history', JSON.stringify(updated));
    setSavedToday(true);
    setNote('');

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Log Current Mood */}
      <div className="bg-gradient-to-br from-orange-50/70 via-amber-50/60 to-rose-50/60 dark:from-stone-800 dark:via-stone-800/90 dark:to-stone-900 p-6 sm:p-8 rounded-3xl border border-orange-200 dark:border-stone-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              How are you feeling right now?
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Log your emotion safely. Tracking feelings without judgment brings awareness and peace.
            </p>
          </div>
          {savedToday && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-orange-500" /> Logged Today
            </span>
          )}
        </div>

        {/* Mood Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {moodsList.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m.id)}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                selectedMood === m.id
                  ? 'border-orange-500 ring-2 ring-orange-400 bg-white dark:bg-stone-700 shadow-md scale-105'
                  : `${m.bg} border-orange-100/60 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:scale-102`
              }`}
            >
              {m.icon}
              <span className="text-xs font-semibold">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Optional Note */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
            Optional Note or Thought:
          </label>
          <input
            type="text"
            placeholder="e.g., Felt calm after a 10-minute morning walk..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-800 border border-orange-200 dark:border-stone-700 text-xs sm:text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          onClick={handleSaveMood}
          className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Save Today&apos;s Mood</span>
        </button>
      </div>

      {/* Mood History Log */}
      {moodHistory.length > 0 && (
        <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl border border-orange-200 dark:border-stone-700 space-y-4">
          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            Your Mood Journal History ({moodHistory.length} entries)
          </h4>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {moodHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-700/50 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 font-bold uppercase text-[10px]">
                    {entry.mood}
                  </span>
                  <span className="text-stone-600 dark:text-stone-300">
                    {entry.note || 'Logged feeling'}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 font-medium">
                  {entry.date} at {entry.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
