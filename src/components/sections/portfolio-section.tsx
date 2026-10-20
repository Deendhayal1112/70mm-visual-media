"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { SAMPLE_PROJECTS } from "@/lib/constants";
import { useGsapContext } from "@/lib/motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";

type FilterType = "all" | "commercial" | "brand_film" | "event_film";

const filters: { label: string; value: FilterType }[] = [
  { label: "All Repertoire", value: "all" },
  { label: "Commercials", value: "commercial" },
  { label: "Brand Films", value: "brand_film" },
  { label: "Event Films", value: "event_film" },
];

export function PortfolioSection() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [activeProject, setActiveProject] = useState<(typeof SAMPLE_PROJECTS)[0] | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    selectedFilter === "all"
      ? SAMPLE_PROJECTS
      : SAMPLE_PROJECTS.filter((p) => p.category === selectedFilter);

  // GSAP scroll entrance animation
  useGsapContext(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, sectionRef, [selectedFilter]);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        aria-label="Our Work"
        className="py-24 sm:py-32 bg-[#1A0B0B] text-[#F7EFE7] border-t border-[#3A1414] relative"
      >
        <Container size="default">
          <div className="space-y-16">
            {/* Section Heading & Category Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-4 border-b border-[#3A1414]">
              <SectionHeading
                eyebrow="Our Work"
                title="Commercials, Brand Films & Event Cinema"
                description="Explore our repertoire of high-production commercial advertisements, narrative brand manifestos, and multi-camera live experiences."
                align="left"
              />

              {/* Accessible Filter Pills */}
              <div
                role="group"
                aria-label="Filter portfolio by category"
                className="flex flex-wrap items-center gap-2 p-1.5 rounded-sm bg-[#3A1414]/40 border border-[#4A2C2C]"
              >
                {filters.map((f) => {
                  const isActive = selectedFilter === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedFilter(f.value)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A5A]",
                        isActive
                          ? "bg-[#C49A5A] text-[#1A0B0B] font-semibold shadow-sm"
                          : "text-[#A89587] hover:text-[#F7EFE7] hover:bg-[#3A1414]"
                      )}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Cards Grid */}
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="group relative rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C] hover:border-[#C49A5A]/60 overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                >
                  {/* Thumbnail Still with Aspect Ratio Framing */}
                  <div
                    className={cn(
                      "relative w-full overflow-hidden bg-black",
                      project.aspectRatio === "2.39:1"
                        ? "aspect-[2.39/1]"
                        : "aspect-video"
                    )}
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0B] via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#1A0B0B]/85 text-[#C49A5A] border border-[#C49A5A]/30 uppercase tracking-widest backdrop-blur-sm">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 font-mono text-[9px] px-2 py-0.5 rounded bg-[#1A0B0B]/85 text-[#A89587] border border-[#4A2C2C] uppercase tracking-wider backdrop-blur-sm">
                      {project.aspectRatio}
                    </div>

                    {/* Play Hover Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1A0B0B]/40 backdrop-blur-[2px]">
                      <div className="w-14 h-14 rounded-full bg-[#C49A5A] text-[#1A0B0B] flex items-center justify-center shadow-[0_0_24px_rgba(196,154,90,0.6)] transform group-hover:scale-105 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#A89587]">
                        <span>{project.client}</span>
                        <span>{project.duration}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#F7EFE7] group-hover:text-[#C49A5A] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#A89587] font-sans leading-relaxed pt-1">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#4A2C2C]/50 flex items-center justify-between text-xs font-mono text-[#C49A5A]">
                      <span className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Showcase</span>
                      </span>
                      <span className="text-[#A89587] text-[10px]">
                        {project.equipment[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Demonstration Transparency Notice */}
            <div className="p-4 rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A89587]">
              <span>
                Demonstration Portfolio Showcase • Authentic 70MM production reels will be populated via Supabase CMS in Phase 3.
              </span>
              <span className="text-[#C49A5A] uppercase tracking-wider whitespace-nowrap">
                Pan-India Production
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Project Video Lightbox */}
      {activeProject && (
        <VideoLightbox
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
          title={activeProject.title}
          category={activeProject.categoryLabel}
          aspectRatio={activeProject.aspectRatio}
        />
      )}
    </>
  );
}
