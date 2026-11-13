/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens. Values live in src/index.css and swap per theme.
        paper: token("paper"), // page background
        card: token("card"), // card background
        fill: token("fill"), // quiet fill: tiles, hovers
        ink: token("ink"),
        muted: token("muted"),
        faint: token("faint"),
        accent: token("accent"), // vivid: fills and large type
        "accent-ink": token("accent-ink"), // readable accent for small text
        "accent-display": token("accent-display"), // accent for display-size type
        "on-accent": token("on-accent"), // text on an accent fill
        deep: token("deep"), // the dark closing section
        rule: "rgb(var(--ink) / var(--rule-alpha))",
      },
      fontFamily: {
        sans: ["'Geist'", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "monospace"],
        // Dot-matrix numerals for results.
        dot: ["'Doto'", "'Geist Mono'", "monospace"],
        // Reserved for the entry splash screen (CtosIntro).
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        lift: "var(--shadow-lift)",
        capsule: "var(--shadow-capsule)",
      },
    },
  },
  plugins: [],
};
