// ============================================================================
//  AUTO-DETECTED COMPETITION LOGOS
//
//  Drop an organiser's logo into src/assets/logos/ named after the
//  competition's logoKey and it appears on the site automatically:
//
//      susquehanna.avif   → shows on the entry with logoKey "susquehanna"
//      imc.png            → shows on the entry with logoKey "imc"
//
//  Supported: png jpg jpeg webp gif svg avif
//  No file present → the entry renders without a logo. No code changes needed.
// ============================================================================

const files = import.meta.glob("../assets/logos/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function getCompetitionLogo(key: string): string | null {
  for (const [path, url] of Object.entries(files)) {
    const name = path.split("/").pop() ?? "";
    if (name.replace(/\.[^.]+$/, "") === key) return url;
  }
  return null;
}
