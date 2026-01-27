/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#38bdf8",
          blue: "#3b82f6",
          fuchsia: "#d946ef",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(56, 189, 248, 0.25)",
        glowStrong: "0 0 45px rgba(56, 189, 248, 0.4)",
      },
    },
  },
  plugins: [],
}
