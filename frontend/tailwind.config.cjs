/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        autobot: {
          dark: "#090a0f",
          card: "#12141c",
          elevated: "#181a24",
          border: "#262938",
          accent: "#f59e0b",
          accentHover: "#d97706",
          gold: "#eab308",
          silver: "#94a3b8",
          platinum: "#e2e8f0",
          cyan: "#06b6d4"
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'metallic-shine': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'glow': '0 0 35px -5px rgba(245, 158, 11, 0.3)',
        'cyan-glow': '0 0 35px -5px rgba(6, 182, 212, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
};
