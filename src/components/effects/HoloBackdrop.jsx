// Effect: holographic grid backdrop.
export default function HoloBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0 holo-grid animate-holo" />
      <div className="absolute inset-0 holo-scanlines" />
      <div className="absolute inset-0 holo-vignette" />
    </div>
  );
}
