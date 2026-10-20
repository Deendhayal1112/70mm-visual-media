"use client";

import { useRef } from "react";
import { PenTool, Calendar, Video, Scissors, Music, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useGsapContext } from "@/lib/motion";
import gsap from "gsap";

const workflowSteps = [
  {
    step: "01",
    phase: "Scripting",
    icon: PenTool,
    title: "Script & Creative Concept",
    desc: "Drafting compelling narrative treatments, screenplays, voiceover copy, and commercial hooks aligned with strategic brand goals.",
  },
  {
    step: "02",
    phase: "Planning",
    icon: Calendar,
    title: "Pre-Production & Logistics",
    desc: "Shot list generation, visual storyboards, casting actors, location scouting across India, schedule management, and technical logistics.",
  },
  {
    step: "03",
    phase: "Filming",
    icon: Video,
    title: "Principal Photography",
    desc: "Directing on-set with large format cinema cameras, anamorphic lenses, controlled lighting rigs, and professional crew coordination.",
  },
  {
    step: "04",
    phase: "Editing",
    icon: Scissors,
    title: "Editorial & Visual Grading",
    desc: "Pacing cuts, montage assembly, VFX cleanup, and color grading in DaVinci Resolve Studio to achieve distinct cinematic tonality.",
  },
  {
    step: "05",
    phase: "Sound & Music",
    icon: Music,
    title: "Sound Design & Original Score",
    desc: "Composing bespoke original scores, dialogue cleanup, foley effects, and acoustic balancing for theatrical and digital loudness standards.",
  },
  {
    step: "06",
    phase: "Final Delivery",
    icon: Send,
    title: "Master Delivery & Archival",
    desc: "Delivering color-accurate master packages formatted for TV broadcast, cinema DCP, OTT platforms, web, and vertical social ratios.",
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsGridRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!stepsGridRef.current) return;
    const items = stepsGridRef.current.children;

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsGridRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="approach"
      aria-label="How We Work"
      className="py-24 sm:py-32 bg-[#1A0B0B] text-[#F7EFE7] border-t border-[#3A1414] relative"
    >
      <Container size="default">
        <div className="space-y-16">
          {/* Section Header */}
          <SectionHeading
            eyebrow="How We Work"
            title="The Six-Stage Production Workflow"
            description="From initial scriptwriting to master delivery, our disciplined methodology ensures cinematic excellence and predictable timelines."
            align="left"
          />

          {/* Workflow Steps Grid */}
          <div
            ref={stepsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {workflowSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative p-8 rounded-sm bg-[#3A1414]/25 border border-[#4A2C2C] hover:border-[#C49A5A]/60 transition-all duration-300 space-y-5 group hover:bg-[#3A1414]/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-[#C49A5A]/30 group-hover:text-[#C49A5A] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-[#3A1414] border border-[#4A2C2C] flex items-center justify-center text-[#C49A5A] group-hover:border-[#C49A5A] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-[#C49A5A] uppercase tracking-[0.25em]">
                      STAGE {item.step} • {item.phase}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F7EFE7] group-hover:text-[#C49A5A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#A89587] font-sans leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
