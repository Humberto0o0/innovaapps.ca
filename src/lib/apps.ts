import { appTiles } from "../data/site";
import type { SiteApp } from "../types/site";

const apps: SiteApp[] = appTiles;

export function getAppBySlug(slug?: string): SiteApp | undefined {
  if (!slug) return undefined;
  return apps.find((item) => item.slug === slug);
}

export function getApps(): SiteApp[] {
  return apps;
}
