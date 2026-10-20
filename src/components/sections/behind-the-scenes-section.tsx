"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BTS_GALLERY } from "@/lib/constants";
import { useGsapContext } from "@/lib/motion";
import gsap from "gsap";

export function BehindTheScenesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!galleryRef.current) return;
    const cards = galleryRef.current.children;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="bts"
      aria-label="Behind the Scenes"
      className="py-24 sm:py-32 bg-[#1A0B0B] text-[#F7EFE7] border-t border-[#3A1414] relative"
    >
      <Container size="default">
        <div className="space-y-16">
          {/* Section Header */}
          <SectionHeading
            eyebrow="Behind the Scenes"
            title="Real Production Craft & Set Discipline"
            description="A visual journal documenting the technical choreography of our sets — lighting ratios, calibrated wireless monitoring, and specialized camera operations."
            align="left"
          />

          {/* BTS Visual Journal Cards */}
          <div
            ref={galleryRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {BTS_GALLERY.map((item, idx) => (
              <div
                key={item.id}
                className="group relative rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C] hover:border-[#C49A5A]/60 overflow-hidden flex flex-col transition-all duration-300"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0B] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#1A0B0B]/85 text-[#C49A5A] border border-[#C49A5A]/30 uppercase tracking-widest backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F7EFE7] group-hover:text-[#C49A5A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A89587] font-sans leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#4A2C2C]/50 flex items-center justify-between text-xs font-mono text-[#C49A5A]">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>On-Set Still #{idx + 1}</span>
                    </span>
                    <span>70MM ARCHIVE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
