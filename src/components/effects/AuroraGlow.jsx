// AuroraGlow: animated aurora-style glow behind the hero.
// Outer wrapper: full-screen overlay with reduced opacity and no pointer events.
// Inner orb: large blurred conic-gradient that slowly rotates via animate-aurora.
export default function AuroraGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-70"
      aria-hidden
    >
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(56,189,248,0.35),rgba(59,130,246,0.2),rgba(217,70,239,0.25),rgba(56,189,248,0.35))] blur-[120px] animate-aurora" />
    </div>
  );
}
