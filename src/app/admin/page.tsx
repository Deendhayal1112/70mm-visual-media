import Link from "next/link";
import {
  Film,
  Image as ImageIcon,
  Mail,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Layers,
  Camera,
  Briefcase,
  GitBranch,
  Quote,
  Settings,
  Home,
} from "lucide-react";

export default function AdminDashboardPage() {
  const managementSections = [
    {
      title: "Homepage Management",
      icon: Home,
      desc: "Configure hero video banners, headline typography, and featured section toggles.",
      status: "Phase 2 Integration",
    },
    {
      title: "Portfolio & Case Studies",
      icon: Film,
      desc: "Upload project media, define video aspect ratios, assign credits, and manage client showcases.",
      status: "Phase 3 Supabase Database",
    },
    {
      title: "Media Asset Library",
      icon: ImageIcon,
      desc: "Central repository for production stills, 4K film frames, and gear photography.",
      status: "Phase 3 Supabase Storage",
    },
    {
      title: "Services & Capabilities",
      icon: Layers,
      desc: "Manage commercial film packages, scriptwriting deliverables, and post-production scopes.",
      status: "Planned Schema",
    },
    {
      title: "Industries & Verticals",
      icon: Briefcase,
      desc: "Curate tailored landing reels for automotive, fashion, tech, real estate, and consumer brands.",
      status: "Planned Schema",
    },
    {
      title: "Equipment & Software",
      icon: Camera,
      desc: "Maintain inventory specifications for cinema camera packages, anamorphic lenses, and color suites.",
      status: "Planned Schema",
    },
    {
      title: "Production Process",
      icon: GitBranch,
      desc: "Document and update the six-stage Script-to-Screen methodology steps.",
      status: "Planned Schema",
    },
    {
      title: "Testimonials & Press",
      icon: Quote,
      desc: "Manage authorized client reviews, film festival selections, and press mentions.",
      status: "Planned Schema",
    },
    {
      title: "Client Enquiries",
      icon: Mail,
      desc: "Review incoming commercial production requests, project briefs, and budget estimates.",
      status: "Planned PostgreSQL Table",
    },
    {
      title: "Website Settings",
      icon: Settings,
      desc: "Update global metadata, Chennai studio address, direct contact email, and social profiles.",
      status: "Configuration Ready",
    },
  ];

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5D9CC]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C49A5A] font-semibold">
              Admin Workspace
            </span>
            <span className="text-[#A89587]">•</span>
            <span className="text-xs font-mono text-[#4A2C2C]">
              Phase 1 Architecture Foundation
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A0B0B] font-medium mt-1">
            70MM Content Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#4A2C2C] hover:text-[#C49A5A] bg-white border border-[#E5D9CC] rounded-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1A0B0B] bg-[#C49A5A] hover:bg-[#B58B4B] rounded-sm transition-colors shadow-sm"
          >
            <span>Auth Status</span>
          </Link>
        </div>
      </div>

      {/* Security & Development Notice Banner */}
      <div className="p-5 rounded-sm bg-white border-l-4 border-l-[#C49A5A] border border-[#E5D9CC] shadow-sm">
        <div className="flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-[#C49A5A] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-[#1A0B0B]">
              Phase 1 Development Prototype Notice
            </h2>
            <p className="text-xs text-[#4A2C2C] leading-relaxed">
              This dashboard is a foundational user interface placeholder. Full
              production authentication (Supabase Auth) and database persistence
              (Supabase PostgreSQL & Storage) will be connected in a later
              phase. No mock data is persisted to localStorage and no hardcoded
              credentials exist.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards (Placeholder summaries) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-sm bg-white border border-[#E5D9CC] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#C49A5A]">
            <Film className="w-5 h-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7EFE7] text-[#4A2C2C]">
              Planned Schema
            </span>
          </div>
          <div>
            <div className="text-2xl font-serif text-[#1A0B0B] font-semibold">
              --
            </div>
            <p className="text-xs font-medium text-[#4A2C2C] mt-0.5">
              Portfolio Projects
            </p>
            <p className="text-[11px] text-[#A89587] mt-1">
              Awaiting Supabase database integration
            </p>
          </div>
        </div>

        <div className="p-5 rounded-sm bg-white border border-[#E5D9CC] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#C49A5A]">
            <ImageIcon className="w-5 h-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7EFE7] text-[#4A2C2C]">
              Planned Storage
            </span>
          </div>
          <div>
            <div className="text-2xl font-serif text-[#1A0B0B] font-semibold">
              --
            </div>
            <p className="text-xs font-medium text-[#4A2C2C] mt-0.5">
              Media Library Assets
            </p>
            <p className="text-[11px] text-[#A89587] mt-1">
              Cinema stills, posters & raw footage
            </p>
          </div>
        </div>

        <div className="p-5 rounded-sm bg-white border border-[#E5D9CC] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#C49A5A]">
            <Mail className="w-5 h-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7EFE7] text-[#4A2C2C]">
              Planned Pipeline
            </span>
          </div>
          <div>
            <div className="text-2xl font-serif text-[#1A0B0B] font-semibold">
              --
            </div>
            <p className="text-xs font-medium text-[#4A2C2C] mt-0.5">
              Client Enquiries
            </p>
            <p className="text-[11px] text-[#A89587] mt-1">
              Direct briefs from website form
            </p>
          </div>
        </div>

        <div className="p-5 rounded-sm bg-white border border-[#E5D9CC] shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[#C49A5A]">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F7EFE7] text-[#4A2C2C]">
              Architecture
            </span>
          </div>
          <div>
            <div className="text-base font-serif text-[#1A0B0B] font-semibold">
              Ready for Phase 2
            </div>
            <p className="text-xs font-medium text-[#4A2C2C] mt-0.5">
              System Architecture
            </p>
            <p className="text-[11px] text-[#A89587] mt-1">
              Wine & Gold tokens configured
            </p>
          </div>
        </div>
      </div>

      {/* Content Management Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#1A0B0B] font-medium">
            Managed Content Modules
          </h2>
          <span className="text-xs font-mono text-[#A89587]">
            10 Administrative Modules Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {managementSections.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 rounded-sm bg-white border border-[#E5D9CC] hover:border-[#C49A5A] transition-all duration-200 shadow-sm flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-sm bg-[#F7EFE7] text-[#C49A5A] flex items-center justify-center group-hover:bg-[#3A1414] group-hover:text-[#C49A5A] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-[#A89587] uppercase tracking-wider">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-[#1A0B0B] group-hover:text-[#3A1414] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A2C2C] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F7EFE7] flex items-center justify-between text-xs font-mono text-[#C49A5A]">
                  <span>Module Spec Configured</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
