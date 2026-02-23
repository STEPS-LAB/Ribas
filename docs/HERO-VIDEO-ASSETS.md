# Hero video assets (Web Performance)

To get the hero background video and LCP poster working, add these files:

| File | Purpose |
|------|--------|
| `public/video/hero-video.mp4` | Main video (all browsers). Export from your source (e.g. YouTube download → re-encode). |
| `public/video/hero-video.webm` | Optional: smaller size for Chrome/Firefox. Same content as MP4. |
| `public/images/hero-poster.webp` | First frame or key frame as WebP (LCP image, preloaded). |

**Recommendations:**

- **Poster:** One frame from the video, WebP, reasonable size (e.g. 1920×1080 or match your video). Keeps LCP fast.
- **Video:** Compress for web (e.g. H.264 for MP4, VP9 for WebM). Short loop (30–60 s) is enough.
- **YouTube:** If you take the video from YouTube “Ribas Karpaty”, re-encode to MP4/WebM and place as above. Do not embed the iframe for performance and privacy.

After adding the files, the hero will show the poster immediately, then fade in the local video when it’s ready (no third-party requests, better Core Web Vitals).
