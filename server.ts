import express from 'express';
import path from 'path';
import { GoogleGenAI, Modality } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to instantiate GoogleGenAI safely with required User-Agent
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    console.warn('GEMINI_API_KEY environment variable is not set or default placeholder');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. AI Chat Counselor Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userGender, userTopic } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "Peace Buddy", a warm, gentle, empathetic, and highly supportive AI mental wellness counselor for Peace Gainer.
Your primary role is to listen with unconditional kindness, validate the user's emotional state, and provide practical, evidence-based self-help guidance on overcoming stress, burnout, anxiety, negative thoughts, and emotional exhaustion.

Guidelines for your responses:
- Tone: Extremely compassionate, comforting, reassuring, and hopeful. Speak like a caring friend and skilled mindfulness mentor.
- Structure: Keep responses clean, concise, easy to read on mobile, with gentle bullet points or short paragraphs.
- Practical Relief: Always offer 1 or 2 immediate actionable coping steps (e.g., deep breathing, grounding, gentle self-compassion exercise, reframing thoughts, taking a short break).
- Gender Context: The user identifies as ${userGender || 'unspecified'}. Adapt your language naturally without being awkward.
- Safety Disclaimer: You are a self-help AI buddy, not a clinical doctor. If the user mentions crisis or severe harm, gently suggest reaching out to Tele-MANAS helpline (14416 or 1-800-89-14416).`;

    // Map conversation history
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm listening. Take a soft breath. You are safe here—tell me more about what's causing you stress.";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error('API /api/chat error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate response' });
  }
});

// 2. AI Text-To-Speech (Lovely Voice Notes) Endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Text prompt is required for TTS' });
      return;
    }

    const ai = getGeminiClient();

    // Selected prebuilt voice:
    // Female voices: 'Kore', 'Zephyr'
    // Male voices: 'Puck', 'Fenrir', 'Charon'
    const voiceName = voice || 'Kore';

    // Soft prompt formatting for comforting voice notes
    const promptText = `Speak in a warm, lovely, soothing, comforting tone: ${text.slice(0, 350)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      res.json({ audio: base64Audio, voice: voiceName });
    } else {
      res.status(500).json({ error: 'No audio generated from TTS model' });
    }
  } catch (error: any) {
    console.error('API /api/tts error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate voice note' });
  }
});

// Start express server & Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
