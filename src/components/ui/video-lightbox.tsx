"use client";

import { useEffect, useRef } from "react";
import { X, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title: string;
  category?: string;
  aspectRatio?: "16:9" | "2.39:1";
}

export function VideoLightbox({
  isOpen,
  onClose,
  videoSrc,
  title,
  category,
  aspectRatio = "16:9",
}: VideoLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Focus management & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  // Pause video on close
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isAnamorphic = aspectRatio === "2.39:1";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#1A0B0B]/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#1A0B0B] border border-[#C49A5A]/30 rounded-sm shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A1414] bg-[#1A0B0B]">
          <div className="space-y-0.5">
            {category && (
              <span className="font-mono text-[10px] text-[#C49A5A] uppercase tracking-[0.25em]">
                {category} • {isAnamorphic ? "2.39:1 Anamorphic" : "16:9 Cinematic"}
              </span>
            )}
            <h3
              id="lightbox-title"
              className="font-serif text-xl sm:text-2xl text-[#F7EFE7]"
            >
              {title}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-[#A89587] hover:text-[#C49A5A] hover:bg-[#3A1414] rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A5A]"
            aria-label="Close video showreel"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Container */}
        <div
          className={cn(
            "relative w-full bg-black flex items-center justify-center overflow-hidden",
            isAnamorphic ? "aspect-[2.39/1]" : "aspect-video"
          )}
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            />
          ) : (
            // Cinematic Simulated Showreel Demo Canvas
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-[#3A1414]/80 via-[#1A0B0B] to-black">
              {/* Background ambient framing markers */}
              <div className="absolute inset-4 border border-[#C49A5A]/20 pointer-events-none flex flex-col justify-between p-3 font-mono text-[10px] text-[#C49A5A]/50">
                <div className="flex justify-between">
                  <span>70MM MASTER SHOWREEL</span>
                  <span>TIME: 00:00:00:00</span>
                </div>
                <div className="flex justify-between">
                  <span>AUDIO: 5.1 SURROUND READY</span>
                  <span>SAMPLE SHOWREEL PREVIEW</span>
                </div>
              </div>

              <div className="relative z-10 max-w-md space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#C49A5A]/10 border border-[#C49A5A] flex items-center justify-center text-[#C49A5A] shadow-[0_0_30px_rgba(196,154,90,0.3)]">
                  <Play className="w-7 h-7 ml-1" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-2xl text-[#F7EFE7]">
                    70MM Agency Showreel Preview
                  </p>
                  <p className="text-xs text-[#A89587] font-sans leading-relaxed">
                    High-bitrate 4K showreel footage will stream directly from
                    Supabase Storage once production reels are synced.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3A1414] border border-[#4A2C2C] text-[11px] font-mono text-[#C49A5A]">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Playback calibrated with audio muted by default</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#1A0B0B] border-t border-[#3A1414] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#A89587]">
          <span>70MM VISUAL MEDIA • CHENNAI PRODUCTION HOUSE</span>
          <span className="text-[#C49A5A]/80">Press ESC or click outside to close</span>
        </div>
      </div>
    </div>
  );
}
