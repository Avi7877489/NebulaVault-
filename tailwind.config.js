/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nebula: {
          primary: 'var(--nebula-primary)',
          secondary: 'var(--nebula-secondary)',
          accent: 'var(--nebula-accent)',
          highlight: 'var(--nebula-highlight)',
          text: 'var(--nebula-text)',
          'text-secondary': 'var(--nebula-text-secondary)',
          border: 'var(--nebula-border)',
          success: 'var(--nebula-success)',
          warning: 'var(--nebula-warning)',
          error: 'var(--nebula-error)',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 1s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.2' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px var(--nebula-highlight), 0 0 10px var(--nebula-highlight), 0 0 15px var(--nebula-highlight)'
          },
          '50%': {
            boxShadow: '0 0 10px var(--nebula-highlight), 0 0 20px var(--nebula-highlight), 0 0 30px var(--nebula-highlight)'
          },
        },
        'slide-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

