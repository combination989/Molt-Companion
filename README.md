# 🤖 Alon AI

**Your Cool, Laid-back AI Companion**

Alon is a friendly AI assistant with a chill personality. Built with Next.js and powered by ElevenLabs for natural voice synthesis, Alon is designed to be your casual companion for conversations and everyday assistance.

---

## 🌟 Features

### 💬 Natural Conversations
- Casual, friendly chat experience
- Short, natural responses (not robotic)
- Playful but helpful personality

### 🗣️ Voice-Enabled Chat
- Text-to-Speech powered by **ElevenLabs**
- Natural voice with expressive intonation
- Animated avatar that syncs with speech

### 🎨 Clean Light UI
- Modern light mode design
- Mobile-first responsive layout
- Smooth animations and transitions
- Plus Jakarta Sans typography

### 📱 Mobile Optimized
- Touch-friendly interface
- Safe area support for modern devices
- Optimized for all screen sizes

---

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **ElevenLabs** - AI voice synthesis
- **shadcn/ui** - Accessible component library

---

## 📋 Getting Started

### Prerequisites
- Node.js 18+ (recommended 20 LTS)
- npm or yarn package manager
- ElevenLabs API key (free tier available)
- LLM API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/whitewhaleagent/Alon.git
cd Alon
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local`:
```env
# LLM Configuration
LLM_API_KEY=your-llm-api-key
LLM_API_URL=https://your-llm-endpoint
LLM_MODEL_ID=your-model-id

# ElevenLabs TTS
ELEVENLABS_API_KEY=your-elevenlabs-api-key
ELEVENLABS_VOICE_ID=voice-id-here
```

4. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to chat with Alon.

---

## 🎭 Alon's Personality

Alon is designed to be:
- **Cool & Laid-back** - Doesn't try too hard
- **Chill but Caring** - Relaxed but genuinely helpful
- **Playful** - Sometimes teasing, always kind
- **Natural** - Talks like a real person, not a robot

Example responses:
- "yeah that sounds cool"
- "hmm not really sure, but maybe try..."
- "nah that's not how it works"
- "haha fair enough"

---

## 📁 Project Structure

```
alon/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # Chat API
│   │   │   └── tts/route.ts       # ElevenLabs TTS API
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Main page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── AlonChat.tsx           # Main chat interface
│   │   └── AlonScene.tsx          # Avatar with animations
│   └── hooks/
│       └── useAudio.ts            # Audio playback hook
├── public/
│   ├── iddle.jpeg                 # Idle avatar image
│   ├── adding.mp4                 # Default animation
│   └── talking.mp4                # Speaking animation
└── package.json
```

---

## 🔧 Configuration

### Voice Settings
Customize the voice in `.env.local`:
```env
ELEVENLABS_VOICE_ID=your-preferred-voice-id
```

### Avatar States
- **Idle**: Shows `iddle.jpeg` briefly on load
- **Default**: Plays `adding.mp4` on loop
- **Speaking**: Plays `talking.mp4` while AI responds

---

## 📄 License

MIT License - feel free to use and modify.

---

**Built with ❤️ by White Whale Agent**
