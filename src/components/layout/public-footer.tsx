import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { BRAND_INFO, PUBLIC_NAV_LINKS } from "@/lib/constants";

export function PublicFooter() {
  const currentYear = 2026;

  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-[#1A0B0B] border-t border-[#C49A5A]/20 text-[#F7EFE7] pt-16 pb-12"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#3A1414]">
          {/* Brand & Overview */}
          <div className="md:col-span-5 space-y-4">
            <BrandMark size="lg" variant="light" href="/" />
            <p className="text-sm text-[#A89587] leading-relaxed max-w-sm font-sans pt-2">
              Full-service advertising agency and cinematic production house.
              We shape narratives from script development and creative direction to
              cinematic production and final post-production delivery.
            </p>
            <div className="inline-flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A5A] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#C49A5A]">
                {BRAND_INFO.location}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#C49A5A] font-semibold">
              Explore
            </h3>
            <ul className="space-y-2.5 font-sans text-sm">
              {PUBLIC_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#F7EFE7]/80 hover:text-[#C49A5A] transition-colors inline-block py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A5A]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach & Operations */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#C49A5A] font-semibold">
              Operations & Reach
            </h3>
            <p className="text-sm text-[#A89587] leading-relaxed">
              Headquartered in Chennai with on-location production capabilities
              across India. Available for commercial campaigns, brand narratives,
              and cinematic productions.
            </p>
            <div className="pt-2">
              <span className="block font-mono text-xs text-[#A89587] uppercase tracking-wider">
                Production Reach
              </span>
              <span className="text-sm font-medium text-[#F7EFE7]">
                Pan-India Client Engagements
              </span>
            </div>
            <div className="pt-2">
              <Link
                href="/admin"
                className="font-mono text-xs text-[#C49A5A]/80 hover:text-[#C49A5A] underline tracking-wider"
              >
                Access Admin Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A89587]">
          <p>
            © {currentYear} {BRAND_INFO.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-wider text-[#C49A5A]/90">
            CINEMATIC PRODUCTION & ADVERTISING HOUSE
          </p>
        </div>
      </Container>
    </footer>
  );
}
