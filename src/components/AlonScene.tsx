"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

type AvatarState = "initial" | "idle" | "speaking";

interface AlonSceneProps {
  isSpeaking?: boolean;
}

export function AlonScene({ isSpeaking = false }: AlonSceneProps) {
  const [avatarState, setAvatarState] = useState<AvatarState>("initial");
  const [hasInitialized, setHasInitialized] = useState(false);
  const idleVideoRef = useRef<HTMLVideoElement>(null);
  const talkingVideoRef = useRef<HTMLVideoElement>(null);

  // Initial load: show image briefly then mark as initialized
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInitialized(true);
      // Only go to idle if not already speaking
      if (!isSpeaking) {
        setAvatarState("idle");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle speaking state changes - ONLY depend on isSpeaking
  useEffect(() => {
    // Don't change state during initial phase
    if (!hasInitialized) return;

    console.log("isSpeaking changed to:", isSpeaking);

    if (isSpeaking) {
      // Stop idle video
      if (idleVideoRef.current) {
        idleVideoRef.current.pause();
      }
      // Switch to speaking state
      setAvatarState("speaking");

      // Play talking video
      if (talkingVideoRef.current) {
        console.log("Playing talking video...");
        talkingVideoRef.current.currentTime = 0;
        talkingVideoRef.current.play().catch((err) => {
          console.error("Talking video play failed:", err);
        });
      }
    } else {
      // Stop talking video
      if (talkingVideoRef.current) {
        talkingVideoRef.current.pause();
        talkingVideoRef.current.currentTime = 0;
      }
      // Switch to idle state
      setAvatarState("idle");

      // Play idle video
      if (idleVideoRef.current) {
        console.log("Playing idle video...");
        idleVideoRef.current.currentTime = 0;
        idleVideoRef.current.play().catch((err) => {
          console.log("Idle video play failed:", err);
        });
      }
    }
  }, [isSpeaking, hasInitialized]);

  // Also play idle video when first initialized (and not speaking)
  useEffect(() => {
    if (hasInitialized && avatarState === "idle" && !isSpeaking && idleVideoRef.current) {
      idleVideoRef.current.play().catch((err) => {
        console.log("Initial idle video play failed:", err);
      });
    }
  }, [hasInitialized, avatarState, isSpeaking]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-background">
      {/* Pure Black Background - No Gradient */}

      <div className="relative z-10 p-8">
        {/* Initial State - Static Image (shown briefly on load) */}
        <div
          className={`relative transition-opacity duration-500 ${avatarState === "initial" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="animate-float-gentle">
            <Image
              src="/iddle.jpeg"
              alt="OpenClaw"
              width={640}
              height={800}
              className="object-contain rounded-2xl shadow-xl shadow-black/50 sm:w-[720px] sm:h-auto"
              priority
            />
          </div>
        </div>

        {/* Idle State - Adding Video (loop) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${avatarState === "idle" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <video
            ref={idleVideoRef}
            src="/adding.mp4"
            loop
            muted
            playsInline
            preload="auto"
            className="w-[640px] sm:w-[720px] h-auto object-contain rounded-2xl shadow-xl shadow-black/50"
          />
        </div>

        {/* Speaking State - Talking Video (loop) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${avatarState === "speaking" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <video
            ref={talkingVideoRef}
            src="/talking.mp4"
            loop
            muted
            playsInline
            preload="auto"
            className="w-[640px] sm:w-[720px] h-auto object-contain rounded-2xl shadow-xl shadow-black/50"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-gentle {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
