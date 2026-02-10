# 🦞 Molt Companion Multi-Agent AI

![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Framework](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Language](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Styling](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![AI Soul](https://img.shields.io/badge/Powered_by-OpenSouls-FF4F00?style=flat-square)

**Your Intelligent, Soul-Powered Multi-Agent Ecosystem**
https://x.com/moltm732?s=21
**Molt Companion** isn't just a dashboard—it's a living, breathing AI ecosystem. Powered by the **OpenSouls Framework**, it combines specialized agents, deep cognitive skills, and a stunning retro-futuristic terminal interface into one powerful workflow engine.

---https://www.moltcompanion.tech/

## 🌟 Visual & Functional Highlights

### 🧠 Powered by OpenSouls Soul Engine
At the heart of Molt Companion lies a **digital soul**. Unlike effective but static bots, our agents possess:
- **Cognitive Continuity**: Remembering context and evolving through interactions.
- **Dynamic Personality**: The "Iddle" persona—confident, slightly mischievous, and helpful.
- **Adaptive Behavior**: Utilizing the **Soul Engine** to drive more natural, human-like engagement.

### 🖥️ Immersive Terminal Experience
- **Boot Sequence**: A cinematic, retro-futuristic entry with real-time logs and typing effects.
- **Hacker Aesthetic**: Deep blacks, vibrant red accents (`#DC2626`), and monospace typography.
- **Seamless Drift**: Transition smoothly from the command line to the full visual dashboard.

### 🧩 Multi-Agent Command Center
- **Unified Dashboard**: Manage **AI Skills**, **Agents**, and **Commands** from one central hub.
- **Categorized Intelligence**: Filter skills by specific domains—*DevOps*, *Research*, *Coding*, and more.
- **Visual Feedback**: Real-time status indicators and animated interactions.

### 🎨 Premium "Red & Black" UI
- **Beams Background**: A subtle, mesmerizing 3D background animation powered by `Three.js`.
- **Glassmorphism**: Translucent panels and blurred overlays for a modern, depth-rich feel.
- **Responsive Layout**: perfectly optimized for desktop command stations and mobile devices.

---

## 🚀 The Tech Stack

We leverage the bleeding edge of web and AI technology:

### Core Frameworks
- **[Next.js 15](https://nextjs.org/)** - App Router & Server Actions.
- **[OpenSouls Framework](https://opensouls.org/)** - The **Soul Engine** driving agent cognition and personality.
- **[TypeScript](https://www.typescriptlang.org/)** - For type-safe, robust logic.

### UI & Aesthetics
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling engine.
- **[shadcn/ui](https://ui.shadcn.com/)** - Accessible, beautiful component primitives.
- **[Three.js](https://threejs.org/) & [R3F](https://docs.pmnd.rs/react-three-fiber)** - Cinematic 3D background effects.
- **[Lucide React](https://lucide.dev/)** - Crisp, consistent iconography.

### Data & Logic
- **React Markdown** - Rich text rendering for agent outputs.
- **Socket.io** - Real-time communication channels.

---

## 📋 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm, yarn, or bun
- **Soul Engine** credentials (if working on the soul logic)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/combination989/Molt-Companion-AI.git
   cd Molt-Companion-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Initialize the Soul (Optional)**
   If you are developing the agent's personality:
   ```bash
   npm run soul:setup
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Launch**
   Visit [http://localhost:3000](http://localhost:3000) and watch the system boot up.

---

## 📁 Project Structure

```
molt-companion/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (Beams + Sidebar)
│   │   ├── page.tsx           # Terminal Landing Page
│   │   ├── molt-companion/    # Main Dashboard
│   │   ├── skills/            # Skills Library
│   │   └── globals.css        # Theme Variables (Red/Black)
│   ├── components/
│   │   ├── Chat.tsx           # OpenSouls Chat Interface
│   │   ├── Scene.tsx          # Avatar Animation Logic
│   │   ├── app-sidebar.tsx    # Navigation
│   │   ├── Beams.tsx          # 3D Background
│   │   └── ui/                # shadcn components
├── opensouls/                 # Soul Engine Logic & Blueprints
├── public/
│   ├── iddle.png              # Mascot
│   └── data.json              # Skill Data
└── package.json
```

---

## 🔧 Customization

### The Soul
Modify the agent's personality and cognitive paths in the `opensouls/` directory. Use `npm run soul:dev` to debug the soul's thought processes in real-time.

### Visual Theme
The `globals.css` file contains the master variables for the **Red & Black** theme.
- **Sidebar**: Explicitly mapped to solid black (`#000000`) for contrast.
- **Accents**: Defined as `#DC2626` (Red-600) for that signature Molt look.

---

## 📄 License

MIT License - Create, modify, and deploy freely.

---

<p align="center">
  <strong>Built with ❤️ by the Molt Companion AI Team</strong>
  <br>
  <em>Empowered by OpenSouls</em>
</p>
