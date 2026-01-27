// Site content mapping and constants.
import { Code2, Cpu, Layers, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import content from "../content/site.json";

export const siteContent = content;

export const navLinks = [
  { href: "/", label: "Studio", type: "route" },
  { href: "#work", label: "Work", type: "section" },
  { href: "#stack", label: "Stack", type: "section" },
  { href: "#apps", label: "Apps", type: "section" },
  { href: "/apps", label: "Directory", type: "route" },
  { href: "#contact", label: "Contact", type: "section" },
];

export const heroPills = [
  { Icon: Rocket, label: "InnovaApps.ca" },
  { Icon: Layers, label: "Plugins → products" },
  { Icon: ShieldCheck, label: "Scale-ready structure" },
];

export const heroCards = [
  {
    Icon: Cpu,
    title: "Plugins that extend your site",
    desc: "Purpose built plugins that add features, improve workflows, and upgrade your website capabilities.",
    tag: "Plugins",
    tone: "emerald",
  },
  {
    Icon: Layers,
    title: "Web products you can grow",
    desc: "Landing pages, onboarding, and scalable foundations that take an idea from MVP to a real product.",
    tag: "Web products",
    tone: "pink",
  },
  {
    Icon: Sparkles,
    title: "Apps with real utility",
    desc: "Polished apps with a clear purpose, designed to be reused, expanded, and monetized.",
    tag: "Apps",
    tone: "emerald",
  },
];

export const marqueeWords = [
  "Website plugins",
  "Web products",
  "Apps and tools",
  "Feature extensions",
  "Conversion focused",
  "Scalable structure",
  "Reusable components",
  "Production polish",
];


export const appTiles = content.appsList;

export const workFeatures = [
  "Landing + directory",
  "Shared components",
  "Docs + changelog",
  "Contact + intake",
];

export const growPhases = [
  { k: "Phase 1", v: "Single Stripe, rapid iteration" },
  { k: "Phase 2", v: "Separate domain + pipeline" },
  { k: "Phase 3", v: "Product-led scaling" },
];
