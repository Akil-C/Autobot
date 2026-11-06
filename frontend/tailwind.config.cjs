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
        signal: {
          DEFAULT: '#0055ff',
          hover: '#0047d6',
          muted: 'rgba(0, 85, 255, 0.15)',
          glow: 'rgba(0, 85, 255, 0.4)',
        },
        technical: {
          950: '#090a0c',
          900: '#0f1014',
          850: '#14161b',
          800: '#1a1d24',
          700: '#282c37',
          500: '#64748b',
          400: '#94a3b8',
          100: '#f4f4f6',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Archivo"', '"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'poster': '-0.06em',
        'technical': '0.12em',
        'meta': '0.18em',
      },
      borderWidth: {
        'hairline': '1px',
      }
    },
  },
  plugins: [],
};
