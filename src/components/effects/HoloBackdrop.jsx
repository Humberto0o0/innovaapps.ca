// Effect: holographic grid backdrop.
export default function HoloBackdrop({ vignette = true }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0 holo-grid animate-holo" />
      <div className="absolute inset-0 holo-scanlines" />
      {vignette ? <div className="absolute inset-0 holo-vignette" /> : null}
    </div>
  );
}
