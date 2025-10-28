import DataTreeArt from './DataTreeArt'

export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      {/* Site-wide Aurora Flow ribbons (canvas) */}
      <div className="absolute inset-0 opacity-80">
        <DataTreeArt />
      </div>

      {/* Soft gradient wash to harmonize brand colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(251,191,36,0.10),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(244,63,94,0.10),transparent_35%)]" />

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(2,6,23,0.85))]" />

      {/* Film grain for texture */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>\")",
        }}
      />
    </div>
  )
}
