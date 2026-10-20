"use client";

import { useRef } from "react";
import { Clapperboard, Film, Tv, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useGsapContext } from "@/lib/motion";
import gsap from "gsap";

const services = [
  {
    icon: Tv,
    code: "01 / BROADCAST & DIGITAL",
    title: "Commercial Advertisements",
    summary:
      "High-impact commercials created for television broadcasting, OTT platforms, and viral digital rollouts.",
    deliverables: [
      "TVC & Digital Video Commercials (DVC)",
      "Product Reveal & Automotive Commercials",
      "Celebrity & Influencer Brand Campaigns",
      "Social-First High-Engagement Cutdowns",
    ],
  },
  {
    icon: Film,
    code: "02 / NARRATIVE BRANDING",
    title: "Cinematic Brand Films",
    summary:
      "Evocative documentary-style films, corporate manifestos, and emotional founder narratives that anchor brand identity.",
    deliverables: [
      "Brand Manifestos & Ethos Films",
      "Founder Journey & Documentary Profiles",
      "Investor & Corporate Vision Films",
      "Culture & Talent Acquisition Cinema",
    ],
  },
  {
    icon: Clapperboard,
    code: "03 / EXPERIENTIAL COVERAGE",
    title: "Event & Experiential Films",
    summary:
      "Grand-scale live capture of luxury product launches, music festivals, summits, and cinematic cultural galas.",
    deliverables: [
      "Luxury Product Launch Experiences",
      "Live Concert & Multi-Camera Galas",
      "Behind-the-Scenes & Sizzle Reels",
      "Same-Day Turnaround Editorial Highlights",
    ],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="What We Do"
      className="py-24 sm:py-32 bg-[#1A0B0B] text-[#F7EFE7] border-t border-[#3A1414] relative"
    >
      <Container size="default">
        <div className="space-y-16">
          {/* Section Header */}
          <SectionHeading
            eyebrow="What We Do"
            title="Commercials, Brand Narratives & Event Cinema"
            description="We engineer cinematic moving pictures that captivate audiences, elevate brands, and establish emotional resonance from Chennai to nationwide audiences."
            align="left"
          />

          {/* Core Service Pillar Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C] hover:border-[#C49A5A]/60 p-8 flex flex-col justify-between space-y-8 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:-translate-y-1"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-sm bg-[#3A1414] border border-[#C49A5A]/30 flex items-center justify-center text-[#C49A5A] group-hover:bg-[#C49A5A] group-hover:text-[#1A0B0B] transition-colors duration-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[10px] text-[#C49A5A]/80 tracking-widest uppercase">
                        {service.code}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE7] group-hover:text-[#C49A5A] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#A89587] font-sans leading-relaxed">
                        {service.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#4A2C2C]/50 space-y-2">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#C49A5A]">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1.5">
                        {service.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="text-xs text-[#F7EFE7]/80 flex items-center gap-2 font-sans"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#C49A5A]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#4A2C2C]/50 flex items-center justify-between text-xs font-mono text-[#C49A5A]">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
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
