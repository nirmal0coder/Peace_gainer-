import React, { useState } from 'react';
import { CloudRain, Waves, Trees, Bell, Play, Square, Volume2 } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const SoundMixer: React.FC = () => {
  const [rainVol, setRainVol] = useState(0);
  const [oceanVol, setOceanVol] = useState(0);
  const [forestVol, setForestVol] = useState(0);

  const handleRainChange = (val: number) => {
    setRainVol(val);
    if (val > 0) {
      audioSynth.startRain(val);
    } else {
      audioSynth.stopRain();
    }
  };

  const handleOceanChange = (val: number) => {
    setOceanVol(val);
    if (val > 0) {
      audioSynth.startOcean(val);
    } else {
      audioSynth.stopOcean();
    }
  };

  const handleForestChange = (val: number) => {
    setForestVol(val);
    if (val > 0) {
      audioSynth.startForest(val);
    } else {
      audioSynth.stopForest();
    }
  };

  const stopAll = () => {
    setRainVol(0);
    setOceanVol(0);
    setForestVol(0);
    audioSynth.stopRain();
    audioSynth.stopOcean();
    audioSynth.stopForest();
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 dark:from-[#34121d] dark:via-[#2b0c16] dark:to-[#220a12] p-6 sm:p-8 rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-orange-500 animate-pulse" />
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-rose-100">
            Ambient Nature Sound Mixer
          </h3>
        </div>
        <button
          onClick={stopAll}
          className="px-3 py-1.5 rounded-xl bg-orange-100 dark:bg-rose-950 text-orange-900 dark:text-rose-200 text-xs font-semibold hover:bg-orange-200 transition-colors"
        >
          Stop All Sounds
        </button>
      </div>

      <p className="text-xs text-stone-600 dark:text-rose-200/80">
        Mix gentle procedural ambient soundscapes to customize your personal calming backdrop.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Rain */}
        <div className="bg-white/80 dark:bg-[#381420]/80 p-5 rounded-2xl border border-orange-100 dark:border-rose-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-xs sm:text-sm text-stone-800 dark:text-rose-100">Gentle Rain</span>
            </div>
            <span className="text-xs font-mono text-stone-500 dark:text-rose-300">{Math.round(rainVol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={rainVol}
            onChange={(e) => handleRainChange(parseFloat(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        {/* Ocean */}
        <div className="bg-white/80 dark:bg-[#381420]/80 p-5 rounded-2xl border border-orange-100 dark:border-rose-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-xs sm:text-sm text-stone-800 dark:text-rose-100">Ocean Waves</span>
            </div>
            <span className="text-xs font-mono text-stone-500 dark:text-rose-300">{Math.round(oceanVol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={oceanVol}
            onChange={(e) => handleOceanChange(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        {/* Forest */}
        <div className="bg-white/80 dark:bg-[#381420]/80 p-5 rounded-2xl border border-orange-100 dark:border-rose-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-rose-500" />
              <span className="font-bold text-xs sm:text-sm text-stone-800 dark:text-rose-100">Forest Birds</span>
            </div>
            <span className="text-xs font-mono text-stone-500 dark:text-rose-300">{Math.round(forestVol * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={forestVol}
            onChange={(e) => handleForestChange(parseFloat(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>

      </div>

      {/* Zen Singing Bowl Chime */}
      <div className="pt-2 flex items-center justify-center">
        <button
          onClick={() => audioSynth.playZenBowl(432)}
          className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md flex items-center gap-2 transition-all"
        >
          <Bell className="w-4 h-4" />
          <span>Strike Zen Singing Bowl (432Hz)</span>
        </button>
      </div>

    </div>
  );
};
