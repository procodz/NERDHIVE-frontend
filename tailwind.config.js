/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nerdhive-blue': '#1E90FF',
        'nerdhive-orange': '#FF8C00',
        'nerdhive-green': '#32CD32',
        'dark-bg': '#121212',
        'dark-card': '#1E1E1E',
        'dark-surface': '#252526',
        'dark-border': '#333333',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'neon-blue': '0 0 5px #1E90FF, 0 0 10px #1E90FF',
        'neon-green': '0 0 5px #32CD32, 0 0 10px #32CD32',
        'neon-orange': '0 0 5px #FF8C00, 0 0 10px #FF8C00',
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#1E90FF",       // Bright Blue
          "secondary": "#FF8C00",     // Orange
          "accent": "#32CD32",        // Lime Green
          "neutral": "#2D2D2D",       // Dark Gray
          "base-100": "#121212",      // Very Dark Gray (main background)
          "base-200": "#1E1E1E",      // Slightly lighter dark gray
          "base-300": "#252526",      // Medium Dark Gray
          "info": "#1E90FF",          // Bright Blue
          "success": "#32CD32",       // Lime Green
          "warning": "#FF8C00",       // Orange
          "error": "#FF0000",         // Red
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
};