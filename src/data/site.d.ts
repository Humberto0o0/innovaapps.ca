import type { LucideIcon } from "lucide-react";
import type { SiteApp } from "../types/site";

export interface NavLink {
  href: string;
  label: string;
  type: "route" | "section";
}

export interface HeroPill {
  Icon: LucideIcon;
  label: string;
}

export interface HeroCard {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  tone: string;
}

export interface GrowPhase {
  k: string;
  v: string;
}

export interface SiteContent {
  apps: {
    eyebrow: string;
    title: string;
    desc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaExplore: string;
  };
  appsList: SiteApp[];
  [key: string]: unknown;
}

export const siteContent: SiteContent;
export const navLinks: NavLink[];
export const heroPills: HeroPill[];
export const heroCards: HeroCard[];
export const marqueeWords: string[];
export const appTiles: SiteApp[];
export const workFeatures: string[];
export const growPhases: GrowPhase[];
