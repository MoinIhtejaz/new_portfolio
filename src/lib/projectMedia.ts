// ============================================================================
//  AUTO-DETECTED PROJECT MEDIA
//
//  Drop a screenshot or screen recording into src/assets/media/ named after
//  the project's mediaKey and it appears on the site automatically:
//
//      volatility.mp4      → shows a looping video on the volatility project
//      optimiser.png       → shows an image on the optimiser project
//
//  Supported: png jpg jpeg webp gif svg (images) · mp4 webm mov m4v (videos)
//  No file present → the project renders text-only. No code changes needed.
// ============================================================================

const files = import.meta.glob("../assets/media/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|avif)$/i;

export type ResolvedMedia = { type: "image" | "video"; src: string };

export function getProjectMedia(key: string): ResolvedMedia | null {
  for (const [path, url] of Object.entries(files)) {
    const name = path.split("/").pop() ?? "";
    const base = name.replace(/\.[^.]+$/, "");
    if (base !== key) continue;
    if (VIDEO_EXT.test(name)) return { type: "video", src: url };
    if (IMAGE_EXT.test(name)) return { type: "image", src: url };
  }
  return null;
}
