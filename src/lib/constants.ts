export const BRAND_COLORS = {
  deepMaroon: "#1A0B0B",
  wineRed: "#3A1414",
  warmBrown: "#4A2C2C",
  champagneGold: "#C49A5A",
  lightBeige: "#F7EFE7",
} as const;

export const BRAND_INFO = {
  name: "70MM VISUAL MEDIA",
  shortName: "70MM",
  tagline: "From Script to Screen. From Vision to Final Delivery.",
  description:
    "A full-service advertising agency and cinematic production house based in Chennai, managing projects from creative script development to final delivery across India.",
  location: "Chennai, Tamil Nadu, India",
  reach: "Serving clients across India",
  contactEmail: "contact@70mmvisualmedia.com",
} as const;

export const PUBLIC_NAV_LINKS = [
  { label: "What We Do", href: "#services" },
  { label: "How We Work", href: "#approach" },
  { label: "Equipment", href: "#equipment" },
  { label: "Behind The Scenes", href: "#bts" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Homepage", href: "/admin#homepage", icon: "Home" },
  { label: "Portfolio", href: "/admin#portfolio", icon: "Film" },
  { label: "Media Library", href: "/admin#media", icon: "Image" },
  { label: "Services", href: "/admin#services", icon: "Layers" },
  { label: "Industries", href: "/admin#industries", icon: "Briefcase" },
  { label: "Equipment & Software", href: "/admin#equipment", icon: "Camera" },
  { label: "Process", href: "/admin#process", icon: "Workflow" },
  { label: "Testimonials", href: "/admin#testimonials", icon: "Quote" },
  { label: "Enquiries", href: "/admin#enquiries", icon: "Mail" },
  { label: "Website Settings", href: "/admin#settings", icon: "Settings" },
] as const;

export const SAMPLE_PROJECTS = [
  {
    id: "proj-1",
    title: "Apex Horizon — High Performance Automotive",
    client: "National Automotive Campaign (Demonstration Sample)",
    category: "commercial" as const,
    categoryLabel: "Commercial Advertisement",
    aspectRatio: "2.39:1" as const,
    duration: "01:30",
    year: 2025,
    coverImage: "/images/placeholders/work-commercial.jpg",
    description:
      "A high-velocity commercial captured on coastal mountain highways with anamorphic primes and dynamic camera tracking rigs.",
    equipment: ["ARRI Alexa Mini LF", "Hawk Anamorphic 50mm", "Russian Arm Rig"],
  },
  {
    id: "proj-2",
    title: "Master of Seconds — The Horologist Manifesto",
    client: "Luxury Artisan Brand Film (Demonstration Sample)",
    category: "brand_film" as const,
    categoryLabel: "Cinematic Brand Film",
    aspectRatio: "16:9" as const,
    duration: "03:45",
    year: 2025,
    coverImage: "/images/placeholders/work-brand-film.jpg",
    description:
      "Intimate observational documentary capturing the handcrafting of precision mechanical timepieces under poetic tungsten lighting.",
    equipment: ["RED V-Raptor 8K", "Cooke S4/i Prime Set", "Macro Probe Optic"],
  },
  {
    id: "proj-3",
    title: "Symphony of Lights — Live Philharmonic Gala",
    client: "National Cultural Foundation (Demonstration Sample)",
    category: "event_film" as const,
    categoryLabel: "Event & Experiential Film",
    aspectRatio: "2.39:1" as const,
    duration: "04:12",
    year: 2025,
    coverImage: "/images/placeholders/work-event-film.jpg",
    description:
      "Multi-camera live concert film capturing a 90-piece orchestra with cinematic lighting cues, motorized sliders, and immersive 5.1 surround mix.",
    equipment: ["Sony FX9 Multi-Cam", "Angénieux Optimo Zooms", "DJI Ronin 2"],
  },
];

export const BTS_GALLERY = [
  {
    id: "bts-1",
    title: "Director Wireless Monitoring & Color Verification",
    caption:
      "On-set wireless monitoring with false color and LUT verification during commercial studio photography.",
    image: "/images/hero/bts-director-monitor.jpg",
    tag: "STUDIO SET DISCIPLINE",
  },
  {
    id: "bts-2",
    title: "Dynamic Steadicam Movement on Set",
    caption:
      "Arm and vest stabilization system navigating intricate tracking shots across interior film stages.",
    image: "/images/hero/bts-gimbal-operator.jpg",
    tag: "CAMERA LANGUAGE",
  },
  {
    id: "bts-3",
    title: "70MM Large Format Camera Rigging & Track Dolly",
    caption:
      "Precision curved dolly tracks positioned for smooth anamorphic tracking shots with atmospheric haze.",
    image: "/images/hero/hero-film-set.jpg",
    tag: "PRINCIPAL PHOTOGRAPHY",
  },
];
