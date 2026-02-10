export interface SiteApp {
  name: string;
  slug: string;
  status: string;
  blurb: string;
  tagline?: string;
  description: string;
  features?: string[];
  url?: string;
}
