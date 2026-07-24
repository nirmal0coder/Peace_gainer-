import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Send, Bot, User, Volume2, VolumeX, RefreshCw,
  Heart, ShieldAlert, Copy, Check, MessageSquare, Mic, MicOff,
  UserCheck, Play, Square, Settings2
} from 'lucide-react';
import { ChatMessage, UserGender, VoiceOption } from '../types';
import { playBase64Audio, playBrowserSpeech, stopVoiceNote } from '../utils/audioPlayer';
import confetti from 'canvas-confetti';

export const AIChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: "Hello, my dear friend. I'm Peace Buddy, your personal AI stress-relief companion. I'm here to listen without any judgment and help you find calm. How are you feeling right now?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [input, setInput] = useState('');
  const [userGender, setUserGender] = useState<UserGender>('male');
  const [preferredVoice, setPreferredVoice] = useState<VoiceOption>('Kore'); // Default female voice for male user
  const [autoPlayVoice, setAutoPlayVoice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Automatically update opposite gender voice when gender changes
  useEffect(() => {
    if (userGender === 'male') {
      setPreferredVoice('Kore'); // Soothing Female Voice
    } else if (userGender === 'female') {
      setPreferredVoice('Puck'); // Soothing Male Voice
    } else {
      setPreferredVoice('Zephyr');
    }
  }, [userGender]);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend /api/chat
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, text: m.text })),
          userGender,
        }),
      });

      const data = await res.json();
      const aiReplyText = data.text || "Take a deep breath in... and let it out softly. I'm here right beside you. Tell me what's on your mind.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        voiceName: preferredVoice,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);

      // Optionally generate & fetch lovely voice note audio
      if (autoPlayVoice) {
        handlePlayVoiceNote(aiMsg.id, aiReplyText);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I am right here with you. Take a slow, comforting breath. Remember that you are safe and supported.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        voiceName: preferredVoice,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setIsLoading(false);
      if (autoPlayVoice) {
        playBrowserSpeech(fallbackMsg.text, userGender, preferredVoice);
      }
    }
  };

  const handlePlayVoiceNote = async (msgId: string, text: string) => {
    if (currentlyPlayingId === msgId) {
      stopVoiceNote();
      setCurrentlyPlayingId(null);
      return;
    }

    stopVoiceNote();
    setCurrentlyPlayingId(msgId);

    try {
      // Request TTS from server endpoint /api/tts
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          voice: preferredVoice,
        }),
      });

      const data = await res.json();
      if (data.audio) {
        const played = await playBase64Audio(data.audio);
        if (!played) {
          playBrowserSpeech(text, userGender, preferredVoice);
        }
      } else {
        playBrowserSpeech(text, userGender, preferredVoice);
      }
    } catch (err) {
      console.warn('TTS server request failed, playing browser speech fallback:', err);
      playBrowserSpeech(text, userGender, preferredVoice);
    }

    // Auto reset playing state after estimated reading time
    const durationEstimate = Math.max(3000, (text.length / 15) * 1000);
    setTimeout(() => {
      setCurrentlyPlayingId((prev) => (prev === msgId ? null : prev));
    }, durationEstimate);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Browser speech recognition for voice input
  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser version. You can type your message!');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const quickPrompts = [
    { text: "I feel overwhelmed by my workload 😫", label: "Work Overwhelm" },
    { text: "How do I calm racing thoughts before sleep? 🌙", label: "Racing Thoughts" },
    { text: "I feel sudden panic and chest tightness 🫁", label: "Panic Relief" },
    { text: "Give me a 2-minute positivity exercise ✨", label: "2-Min Exercise" },
    { text: "I'm feeling lonely and unmotivated today 🌧️", label: "Feeling Down" }
  ];

  return (
    <section id="aichat" className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/60 via-amber-50/50 to-rose-50/60 dark:from-[#2a0e17] dark:via-[#220a12] dark:to-[#1f070e] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-rose-950 text-orange-900 dark:text-rose-200 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>AI Mental Wellness Companion</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 dark:text-rose-100">
            Talk to Peace AI Companion
          </h2>

          <p className="text-base sm:text-lg text-stone-600 dark:text-rose-200/80">
            Share what&apos;s stressing you in a safe, confidential space. Experience soothing AI voice notes voiced in lovely tones.
          </p>
        </div>

        {/* Gender & Voice Personalization Bar */}
        <div className="bg-white dark:bg-[#34121d] rounded-3xl p-5 sm:p-6 border border-orange-200 dark:border-rose-900/60 shadow-xl mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-orange-100 dark:border-rose-900/40">
            
            {/* User Gender Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-rose-200 flex items-center gap-1.5 uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-orange-500" />
                <span>Your Gender (Sets Opposite AI Voice Note):</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'male', label: '👨 Male (Opposite Voice: Lovely Female)', voice: 'Kore (Female)' },
                  { id: 'female', label: '👩 Female (Opposite Voice: Lovely Male)', voice: 'Puck (Male)' },
                  { id: 'non-binary', label: '🌈 Non-Binary / Custom Voice', voice: 'Zephyr (Soothing)' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setUserGender(g.id as UserGender)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                      userGender === g.id
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-stone-100 dark:bg-[#401726] text-stone-700 dark:text-rose-200 hover:bg-orange-100 dark:hover:bg-[#4d1c2e]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Voice Selection Override */}
            <div className="space-y-1.5 self-stretch md:self-auto">
              <label className="text-xs font-bold text-stone-700 dark:text-rose-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Settings2 className="w-4 h-4 text-amber-500" />
                <span>AI Voice Note Voice:</span>
              </label>

              <select
                value={preferredVoice}
                onChange={(e) => setPreferredVoice(e.target.value as VoiceOption)}
                className="w-full md:w-auto px-3.5 py-2 rounded-2xl bg-orange-50 dark:bg-[#401726] text-stone-800 dark:text-rose-100 text-xs font-bold border border-orange-200 dark:border-rose-800 focus:outline-none"
              >
                <option value="Kore">🌸 Kore (Soothing Female)</option>
                <option value="Zephyr">✨ Zephyr (Warm Female)</option>
                <option value="Puck">🍀 Puck (Gentle Male)</option>
                <option value="Fenrir">🌊 Fenrir (Calm Male)</option>
                <option value="Charon">🌿 Charon (Soft Male)</option>
              </select>
            </div>

          </div>

          {/* Active Voice Badge & Auto-Play Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 font-bold">
              <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>
                Active Voice Note: {preferredVoice} ({preferredVoice === 'Kore' || preferredVoice === 'Zephyr' ? 'Female' : 'Male'} Voice)
              </span>
            </div>

            <label className="flex items-center gap-2 font-semibold text-stone-600 dark:text-rose-200/90 cursor-pointer">
              <input
                type="checkbox"
                checked={autoPlayVoice}
                onChange={(e) => setAutoPlayVoice(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-400"
              />
              <span>Auto-play voice note on reply</span>
            </label>
          </div>
        </div>

        {/* Quick Stress Prompt Chips */}
        <div className="mb-6 space-y-2">
          <span className="text-xs font-bold text-stone-500 dark:text-rose-200/70 uppercase tracking-wider block">
            Tap to ask Peace AI immediately:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.text)}
                className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#34121d] border border-orange-200/80 dark:border-rose-900/60 text-xs font-semibold text-stone-700 dark:text-rose-100 hover:bg-orange-50 dark:hover:bg-[#421827] hover:border-orange-300 transition-all shadow-sm"
              >
                {qp.text}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Box Container */}
        <div className="bg-white dark:bg-[#2b0c16] rounded-3xl border border-orange-200 dark:border-rose-900/60 shadow-2xl overflow-hidden flex flex-col h-[520px]">
          
          {/* Chat Messages List */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-3xl ${
                  m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md ${
                    m.role === 'user'
                      ? 'bg-gradient-to-tr from-orange-500 via-rose-500 to-amber-500'
                      : 'bg-gradient-to-tr from-rose-500 to-orange-500'
                  }`}
                >
                  {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2 max-w-xl">
                  <div
                    className={`p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white rounded-tr-none'
                        : 'bg-orange-50/80 dark:bg-[#381420] text-stone-800 dark:text-rose-100 rounded-tl-none border border-orange-200/60 dark:border-rose-900/60'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>

                  {/* Actions Bar for AI Messages */}
                  {m.role === 'assistant' && (
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-stone-500 dark:text-rose-200/80 pl-1">
                      
                      {/* Play Voice Note Button */}
                      <button
                        onClick={() => handlePlayVoiceNote(m.id, m.text)}
                        className={`px-3 py-1 rounded-xl flex items-center gap-1.5 transition-colors ${
                          currentlyPlayingId === m.id
                            ? 'bg-orange-500 text-white animate-pulse'
                            : 'bg-orange-100 dark:bg-rose-950 text-orange-800 dark:text-rose-200 hover:bg-orange-200'
                        }`}
                      >
                        {currentlyPlayingId === m.id ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-white" />
                            <span>Stop Voice Note</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-orange-600 dark:text-rose-300" />
                            <span>Play Lovely Voice Note 🎧</span>
                          </>
                        )}
                      </button>

                      {/* Copy Text */}
                      <button
                        onClick={() => copyToClipboard(m.text, m.id)}
                        className="hover:text-stone-800 dark:hover:text-rose-100 flex items-center gap-1"
                      >
                        {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-orange-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                      </button>

                      <span className="text-[10px] opacity-70 ml-auto">{m.timestamp}</span>
                    </div>
                  )}

                  {m.role === 'user' && (
                    <span className="text-[10px] text-stone-400 dark:text-rose-300/60 block text-right pr-1">{m.timestamp}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 mr-auto items-center">
                <div className="w-9 h-9 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 animate-bounce" />
                </div>
                <div className="p-4 rounded-3xl bg-orange-50 dark:bg-[#381420] text-xs font-semibold text-stone-600 dark:text-rose-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
                  <span>Peace Buddy is crafting a soothing response...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-orange-50/50 dark:bg-[#230912] border-t border-orange-200/60 dark:border-rose-900/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Input Button */}
              <button
                type="button"
                onClick={toggleVoiceInput}
                title="Speak your prompt"
                className={`p-3 rounded-2xl transition-colors ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-white dark:bg-[#381420] text-stone-600 dark:text-rose-200 hover:bg-orange-100'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-orange-600" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type how you are feeling, or ask for stress advice..."
                className="flex-1 px-4 py-3.5 rounded-2xl bg-white dark:bg-[#34121d] border border-orange-200 dark:border-rose-900/60 text-xs sm:text-sm text-stone-800 dark:text-rose-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-transform transform active:scale-95"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 text-center text-[10px] text-stone-400 dark:text-rose-300/60">
              Peace AI is a supportive self-help tool. For medical emergency, call Tele-MANAS helpline at <strong>14416</strong>.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
