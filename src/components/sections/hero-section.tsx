"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { useGsapContext } from "@/lib/motion";
import gsap from "gsap";

export function HeroSection() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  // Reusable GSAP Context Entrance Reveal
  useGsapContext(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageFrameRef.current,
      { opacity: 0, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 1.4 }
    )
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.9"
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.5"
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.6"
      )
      .fromTo(
        ctasRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        metadataRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      );
  }, heroRef);

  return (
    <>
      <section
        ref={heroRef}
        aria-label="Introduction"
        className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#1A0B0B] text-[#F7EFE7] overflow-hidden py-16 sm:py-24"
      >
        {/* Background Cinematic Image with Controlled Contrast Overlays */}
        <div
          ref={imageFrameRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          <Image
            src="/images/hero/hero-film-set.jpg"
            alt="70MM Visual Media Cinematic Set"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.38] contrast-[1.12]"
          />
          {/* Dual Multi-Stop Gradient Overlays in Deep Maroon & Wine Red */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0B] via-[#1A0B0B]/75 to-[#1A0B0B]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B0B] via-transparent to-[#1A0B0B]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,20,20,0.4)_0%,rgba(26,11,11,0.95)_80%)]" />
        </div>

        {/* 70MM Viewfinder Film Frame Markers */}
        <div
          className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-6 border border-[#C49A5A]/20 pointer-events-none z-10 hidden sm:block"
          aria-hidden="true"
        >
          {/* Top Edge Markers */}
          <div className="absolute top-2.5 left-4 flex items-center gap-3 font-mono text-[10px] text-[#C49A5A]/70 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A5A] animate-pulse" />
            <span>[ 70MM REEL • ASPECT 2.39:1 ]</span>
          </div>
          <div className="absolute top-2.5 right-4 font-mono text-[10px] text-[#C49A5A]/70 uppercase tracking-widest">
            CHENNAI • PAN-INDIA PRODUCTION
          </div>

          {/* Bottom Edge Markers */}
          <div className="absolute bottom-2.5 left-4 font-mono text-[10px] text-[#C49A5A]/70 uppercase tracking-widest">
            CAM: ARRI ALEXA LF • MASTER ANAMORPHIC
          </div>
          <div className="absolute bottom-2.5 right-4 font-mono text-[10px] text-[#C49A5A]/70 uppercase tracking-widest">
            FPS: 24.000 • SHUTTER: 180°
          </div>

          {/* Subtle Corner Reticles */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C49A5A]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C49A5A]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C49A5A]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C49A5A]" />
        </div>

        {/* Hero Main Content */}
        <Container size="default" className="relative z-20 text-center">
          <div className="max-w-4xl mx-auto space-y-7">
            {/* Eyebrow Label */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A1414]/90 border border-[#C49A5A]/40 backdrop-blur-md shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C49A5A]" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C49A5A]">
                Full-Service Advertising & Cinematic Production House
              </span>
            </div>

            {/* Preserved Editorial Headline */}
            <h1
              ref={headingRef}
              className="font-serif font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.08] tracking-tight text-[#F7EFE7]"
            >
              From Script to Screen.{" "}
              <span className="italic block mt-1.5 text-[#C49A5A] drop-shadow-[0_2px_18px_rgba(196,154,90,0.3)]">
                From Vision to Final Delivery.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              ref={textRef}
              className="font-sans text-base sm:text-lg md:text-xl text-[#F7EFE7]/80 max-w-2xl mx-auto leading-relaxed font-light"
            >
              70MM VISUAL MEDIA is a full-service advertising and film production
              house creating commercial advertisements, brand films, and event
              films through creative planning, cinematic production, and
              professional post-production.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div
              ref={ctasRef}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto min-w-[210px] group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="w-full sm:w-auto min-w-[210px] inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A5A] text-sm px-7 py-3.5 rounded-sm gap-2.5 tracking-widest bg-[#3A1414]/90 text-[#C49A5A] border border-[#C49A5A] hover:bg-[#C49A5A] hover:text-[#1A0B0B] shadow-[0_4px_16px_rgba(0,0,0,0.4)] group"
              >
                <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                <span>Watch Showreel</span>
              </button>
            </div>

            {/* Technical Verification Badges */}
            <div
              ref={metadataRef}
              className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#A89587] font-mono text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A5A]" />
                <span>Chennai Headquarters</span>
              </div>
              <span className="text-[#3A1414] hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A5A]" />
                <span>Commercials & Brand Films</span>
              </div>
              <span className="text-[#3A1414] hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A5A]" />
                <span>Pan-India Production</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Showreel Lightbox Modal */}
      <VideoLightbox
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        title="70MM Visual Media — Cinematic Showreel"
        category="Agency Repertoire"
        aspectRatio="2.39:1"
      />
    </>
  );
}
