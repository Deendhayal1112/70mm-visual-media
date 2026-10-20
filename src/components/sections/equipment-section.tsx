"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, Cpu, Video, Sun } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useGsapContext } from "@/lib/motion";
import gsap from "gsap";

export function EquipmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="equipment"
      aria-label="Equipment & Technology"
      className="py-24 sm:py-32 bg-[#1A0B0B] text-[#F7EFE7] border-t border-[#3A1414] relative"
    >
      <Container size="default">
        <div className="space-y-16">
          {/* Section Header */}
          <SectionHeading
            eyebrow="Equipment & Technology"
            title="The Cinema Technology Arsenal"
            description="We deploy industry-standard cinema cameras, stabilized aerial drones, calibrated optics, and high-fidelity post suites to achieve uncompromised visual depth."
            align="left"
          />

          {/* Primary Featured Showcase: ARRI Alexa & DJI Mavic 4 Pro */}
          <div ref={featuredRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Principal Visual: ARRI Alexa */}
            <div className="group relative rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C] hover:border-[#C49A5A]/60 overflow-hidden flex flex-col transition-all duration-300">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <Image
                  src="/images/equipment/arri-alexa.jpg"
                  alt="ARRI Alexa Cinema Camera System"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0B] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#1A0B0B]/80 text-[#C49A5A] border border-[#C49A5A]/30 uppercase tracking-widest backdrop-blur-sm">
                    Principal Cinema System
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C49A5A]">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Large Format Cinema Sensor</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE7]">
                    ARRI Alexa Camera Systems
                  </h3>
                  <p className="text-sm text-[#A89587] font-sans leading-relaxed">
                    Celebrated for organic color rendition, legendary dynamic range,
                    and filmic skin tones. Paired with calibrated anamorphic and spherical
                    optics for brand films and national commercials.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#4A2C2C]/50 flex flex-wrap items-center gap-3 font-mono text-xs text-[#F7EFE7]/80">
                  <span className="px-2 py-0.5 rounded bg-[#1A0B0B] border border-[#4A2C2C]">
                    16-Bit Linear Recording
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1A0B0B] border border-[#4A2C2C]">
                    Native EI 800
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1A0B0B] border border-[#4A2C2C]">
                    Anamorphic Desqueeze
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Drone: DJI Mavic 4 Pro */}
            <div className="group relative rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C] hover:border-[#C49A5A]/60 overflow-hidden flex flex-col transition-all duration-300">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <Image
                  src="/images/equipment/dji-mavic.jpg"
                  alt="DJI Mavic 4 Pro Cinema Drone"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0B] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#1A0B0B]/80 text-[#C49A5A] border border-[#C49A5A]/30 uppercase tracking-widest backdrop-blur-sm">
                    Featured Aerial Platform
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C49A5A]">
                    <Video className="w-3.5 h-3.5" />
                    <span>Stabilized Aerial Cinematography</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE7]">
                    DJI Mavic 4 Pro Cinema Drone
                  </h3>
                  <p className="text-sm text-[#A89587] font-sans leading-relaxed">
                    Equipped with advanced camera sensors and omnidirectional
                    obstacle sensing. Captures fluid high-altitude establishing shots,
                    chase sequences, and dynamic architectural sweeps across varied terrains.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#4A2C2C]/50 flex flex-wrap items-center gap-3 font-mono text-xs text-[#F7EFE7]/80">
                  <span className="px-2 py-0.5 rounded bg-[#1A0B0B] border border-[#4A2C2C]">
                    10-Bit D-Log M
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1A0B0B] border border-[#4A2C2C]">
                    Tri-Camera Optical Zoom
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1A0B0B] border border-[#4A2C2C]">
                    Night Hyperlapse
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Arsenal: RED, Sony, Lighting, DaVinci & Final Cut Pro */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* RED Cinema Cameras */}
            <div className="p-6 rounded-sm bg-[#3A1414]/20 border border-[#4A2C2C] space-y-3 hover:border-[#C49A5A]/50 transition-colors">
              <div className="flex items-center gap-2 text-[#C49A5A]">
                <Camera className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Raw Acquisition
                </span>
              </div>
              <h4 className="font-serif text-xl text-[#F7EFE7]">
                RED Cinema Cameras
              </h4>
              <p className="text-xs text-[#A89587] font-sans leading-relaxed">
                High-resolution 6K/8K sensors capable of extreme high-speed slow motion
                for product explosions, fluid dynamics, and commercial stunts.
              </p>
            </div>

            {/* Sony Cinema Line */}
            <div className="p-6 rounded-sm bg-[#3A1414]/20 border border-[#4A2C2C] space-y-3 hover:border-[#C49A5A]/50 transition-colors">
              <div className="flex items-center gap-2 text-[#C49A5A]">
                <Video className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Agile Multi-Cam
                </span>
              </div>
              <h4 className="font-serif text-xl text-[#F7EFE7]">
                Sony Cinema Cameras
              </h4>
              <p className="text-xs text-[#A89587] font-sans leading-relaxed">
                Full-frame FX systems optimized for low-light sensitivity, dual base ISO,
                and agile multi-camera documentary and large event coverage.
              </p>
            </div>

            {/* Cinema Lighting & Grip */}
            <div className="p-6 rounded-sm bg-[#3A1414]/20 border border-[#4A2C2C] space-y-3 hover:border-[#C49A5A]/50 transition-colors">
              <div className="flex items-center gap-2 text-[#C49A5A]">
                <Sun className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Volumetric & Shaping
                </span>
              </div>
              <h4 className="font-serif text-xl text-[#F7EFE7]">
                Cinema Lighting & Grip
              </h4>
              <p className="text-xs text-[#A89587] font-sans leading-relaxed">
                High-output bi-color and full-color HMI & LED fixtures, motorized gimbals,
                diffusion textiles, and precision focus pull systems.
              </p>
            </div>

            {/* DaVinci Resolve & Final Cut Pro */}
            <div className="p-6 rounded-sm bg-[#3A1414]/20 border border-[#4A2C2C] space-y-3 hover:border-[#C49A5A]/50 transition-colors">
              <div className="flex items-center gap-2 text-[#C49A5A]">
                <Cpu className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Post Suite Pipeline
                </span>
              </div>
              <h4 className="font-serif text-xl text-[#F7EFE7]">
                DaVinci Resolve & Final Cut
              </h4>
              <p className="text-xs text-[#A89587] font-sans leading-relaxed">
                Industry-standard color grading workflows in DaVinci Resolve Studio and
                high-throughput offline editing suites in Final Cut Pro.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
