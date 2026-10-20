"use client";

import { useState } from "react";
import { Mail, MapPin, CheckCircle, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BRAND_INFO } from "@/lib/constants";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate inquiry submission for Phase 2 client demonstration
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-24 sm:py-32 bg-[#1A0B0B] text-[#F7EFE7] border-t border-[#3A1414] relative overflow-hidden"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Direct Agency Information */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              eyebrow="Initiate Project"
              title="Let's Frame Your Narrative"
              description="Whether you have an established creative brief or an early concept, our production team is ready to collaborate from script development to final screen delivery."
              align="left"
            />

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-5 rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C]">
                <MapPin className="w-5 h-5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#C49A5A]">
                    Production Headquarters
                  </h4>
                  <p className="text-sm text-[#F7EFE7] font-medium">
                    {BRAND_INFO.location}
                  </p>
                  <p className="text-xs text-[#A89587]">
                    {BRAND_INFO.reach}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-sm bg-[#3A1414]/30 border border-[#4A2C2C]">
                <Mail className="w-5 h-5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#C49A5A]">
                    Direct Brief Submissions
                  </h4>
                  <a
                    href={`mailto:${BRAND_INFO.contactEmail}`}
                    className="text-sm text-[#F7EFE7] hover:text-[#C49A5A] font-medium transition-colors"
                  >
                    {BRAND_INFO.contactEmail}
                  </a>
                  <p className="text-xs text-[#A89587]">
                    Commercials, Brand Films & Event Productions
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-sm border border-[#C49A5A]/30 bg-[#3A1414]/25 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C49A5A]" />
                <p className="font-mono text-xs text-[#C49A5A] uppercase tracking-wider font-semibold">
                  Pan-India Directing & Filming
                </p>
              </div>
              <p className="text-xs text-[#A89587] leading-relaxed">
                We handle location permits, travel logistics, cinema equipment
                consignments, and on-location production units across major Indian
                cities and remote outdoor landscapes.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form UI */}
          <div className="lg:col-span-7 bg-[#3A1414]/40 border border-[#4A2C2C] p-6 sm:p-10 rounded-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#C49A5A]/15 border border-[#C49A5A] flex items-center justify-center text-[#C49A5A]">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-3xl text-[#F7EFE7]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-[#A89587] max-w-md mx-auto leading-relaxed">
                  Thank you for sharing your project brief. A 70MM executive producer
                  will review your requirements and respond within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        projectType: "",
                        budget: "",
                        message: "",
                      });
                    }}
                    className="text-xs font-mono uppercase tracking-wider text-[#C49A5A] underline hover:text-[#F7EFE7]"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EFE7]">
                    Project Inquiry Brief
                  </h3>
                  <p className="text-xs text-[#A89587] font-sans">
                    Share your vision, production timeline, and narrative goals.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  aria-label="Project Inquiry Form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Arvind Raman"
                        className="w-full px-4 py-3 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] placeholder-[#A89587]/40 text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-company"
                        className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
                      >
                        Brand / Company
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Company or agency name"
                        className="w-full px-4 py-3 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] placeholder-[#A89587]/40 text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="arvind@brand.com"
                        className="w-full px-4 py-3 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] placeholder-[#A89587]/40 text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-phone"
                        className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] placeholder-[#A89587]/40 text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-project-type"
                        className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
                      >
                        Project Type *
                      </label>
                      <select
                        id="contact-project-type"
                        required
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
                      >
                        <option value="" disabled className="bg-[#1A0B0B] text-[#A89587]">
                          Select category
                        </option>
                        <option value="commercial" className="bg-[#1A0B0B]">
                          Commercial Advertisement (TVC/DVC)
                        </option>
                        <option value="brand_film" className="bg-[#1A0B0B]">
                          Cinematic Brand Film
                        </option>
                        <option value="event_film" className="bg-[#1A0B0B]">
                          Event & Experiential Film
                        </option>
                        <option value="post_production" className="bg-[#1A0B0B]">
                          Editorial & Color Grading Only
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-budget"
                        className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
                      >
                        Estimated Budget Scale
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
                      >
                        <option value="" className="bg-[#1A0B0B] text-[#A89587]">
                          Select budget tier
                        </option>
                        <option value="tier_1" className="bg-[#1A0B0B]">
                          Standard Commercial Scale
                        </option>
                        <option value="tier_2" className="bg-[#1A0B0B]">
                          National Campaign Scale
                        </option>
                        <option value="tier_3" className="bg-[#1A0B0B]">
                          High-End Multi-City Cinematic
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs uppercase tracking-wider text-[#A89587]"
                    >
                      Project Brief & Creative Vision *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share details regarding timeline, key deliverables, narrative objectives, and target audience..."
                      className="w-full px-4 py-3 bg-[#1A0B0B] border border-[#4A2C2C] rounded-sm text-[#F7EFE7] placeholder-[#A89587]/40 text-sm focus-visible:outline-none focus-visible:border-[#C49A5A] focus-visible:ring-1 focus-visible:ring-[#C49A5A] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center group"
                  >
                    <span>Submit Project Brief</span>
                    <Send className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
