export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        app: {
          background: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          'surface-soft': 'var(--bg-surface-soft)',
          text: 'var(--text)',
          muted: 'var(--text-muted)',
          primary: 'var(--primary)',
          'primary-hover': 'var(--primary-hover)',
          border: 'var(--border)',
          navbar: 'var(--navbar)',
        },
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
};
