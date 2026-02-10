"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAudio } from "@/hooks/useAudio";
import { AlonSceneComponent } from "./AlonSceneComponent";

interface Message {
  id: string;
  role: "user" | "molt-companion";
  content: string;
  timestamp: number;
}

function FloatingBubbles({
  messages,
  typingMessageId,
  typingProgress,
  avoidBottomPx,
}: {
  messages: Message[];
  typingMessageId: string | null;
  typingProgress: number;
  avoidBottomPx: number;
}) {
  const getDisplayText = (msg: Message) => {
    if (msg.id === typingMessageId && typingProgress < 1) {
      const len = Math.max(1, Math.floor(msg.content.length * typingProgress));
      return msg.content.slice(0, len) + "|";
    }
    return msg.content;
  };

  return (
    <div
      className="alon-bubble-layer"
      aria-hidden="true"
      style={{
        "--alon-bubble-avoid-bottom": `${Math.max(0, avoidBottomPx)}px`,
      } as React.CSSProperties}
    >
      <div className="alon-bubble-stack">
        {messages.slice(-3).map((msg) => (
          <div
            key={msg.id}
            className={`alon-bubble-item ${msg.role === "user"
              ? "alon-bubble-item--user"
              : "alon-bubble-item--alon"
              }`}
            style={{ opacity: 1 }}
          >
            <div className="alon-bubble">{getDisplayText(msg)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatInput({
  disabled,
  isLoading,
  onSend,
}: {
  disabled: boolean;
  isLoading: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const send = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || disabled || isLoading) return;
    onSend(trimmed);
    setText("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onSend, text, disabled, isLoading]);

  return (
    <div className="input-row">
      <input
        ref={inputRef}
        type="text"
        className="input-field"
        value={text}
        placeholder="Type a message..."
        disabled={disabled || isLoading}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          if (e.shiftKey) return;
          e.preventDefault();
          send();
        }}
      />
      <button
        className="send-button"
        disabled={disabled || isLoading || text.trim().length === 0}
        onClick={send}
        aria-label="Send message"
      >
        {isLoading ? "..." : "Send"}
      </button>
    </div>
  );
}

export function AlonChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "molt-companion",
      content: "Yo, I'm Molt companion, the Lobster Champion! What's cracking?",
      timestamp: Date.now(),
    },
  ]);
  const [isConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [typingProgress, setTypingProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlayHeight, setOverlayHeight] = useState(140);

  const { isPlaying, isLoading: isAudioLoading, speakText } = useAudio({
    onTimeUpdate: (currentTime, duration) => {
      if (duration > 0) {
        setTypingProgress(currentTime / duration);
      }
    },
    onError: (error) => {
      console.error("Audio error:", error);
    },
  });

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setOverlayHeight(Math.max(120, Math.round(rect.height + 10)));
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleSend = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const chatHistory = messages
          .slice(-10)
          .map((msg) => ({
            role: msg.role === "molt-companion" ? "assistant" : "user",
            content: msg.content,
          }));

        chatHistory.push({
          role: "user",
          content: text,
        });

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: chatHistory }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();
        const aiContent = data.content || "I'm sorry, I couldn't respond right now.";

        const messageId = `molt-companion-${Date.now()}`;

        setTypingMessageId(messageId);
        setTypingProgress(0);

        const aiMessage: Message = {
          id: messageId,
          role: "molt-companion",
          content: aiContent,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Start speaking animation immediately
        setIsSpeaking(true);

        try {
          await speakText(aiContent);
        } catch (ttsError) {
          console.error("TTS error:", ttsError);
          // Even if TTS fails, simulate speaking for a short duration
          await new Promise(resolve => setTimeout(resolve, 2000));
        } finally {
          // Ensure we stop speaking after TTS completes or fails
          setIsSpeaking(false);
          setTypingProgress(1);
          setTypingMessageId(null);
        }
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage: Message = {
          id: `molt-companion-${Date.now()}`,
          role: "molt-companion",
          content: "I'm sorry, something went wrong. Please try again.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, speakText]
  );

  const isBusy = isLoading || isPlaying || isAudioLoading;

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] overflow-hidden">


      {/* Alon Avatar Background */}
      <AlonSceneComponent isSpeaking={isSpeaking} />

      {/* Chat Interface Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <FloatingBubbles
          messages={messages}
          typingMessageId={typingMessageId}
          typingProgress={typingProgress}
          avoidBottomPx={overlayHeight}
        />

        <div
          ref={overlayRef}
          className="input-overlay"
          style={{ pointerEvents: "auto" }}
        >
          <div className="input-header">
            <div className="input-status">
              <span
                className={`input-status-dot ${!isConnected ? "input-status-dot--offline" : ""
                  }`}
              />
              {isLoading && (
                <span style={{ marginLeft: 6, fontSize: 13, color: "#BFDBFE", fontFamily: "'DM Sans', sans-serif" }}>
                  Processing...
                </span>
              )}
              {isPlaying && (
                <span style={{ marginLeft: 6, fontSize: 13, color: "#BFDBFE", fontFamily: "'DM Sans', sans-serif" }}>
                  Speaking...
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <a
                href="/molt-companion"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-200 text-white text-xs font-medium shadow-lg hover:shadow-xl hover:scale-105"
                style={{ textDecoration: "none" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                <span>Multi-Agent Dashboard</span>
              </a>
              <span className="input-brand text-xs tracking-wider uppercase opacity-60 hidden sm:block">Molt companion</span>
              <a
                href="https://x.com/moltm732?s=21"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:scale-110 transition-transform duration-200"
                style={{ color: "#ffffff", opacity: 0.7 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "#DC2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/combination989/Molt-Companion.git"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:scale-110 transition-transform duration-200"
                style={{ color: "#ffffff", opacity: 0.7 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "#DC2626";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <ChatInput disabled={isBusy} isLoading={isLoading} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
