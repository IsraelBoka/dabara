/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: '"sans-serif", "  SF Pro Dispaly ", --apple-system, BlinkMacSystemFont, "Inter", "Segoe UI",  "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"',
        display: ['var(--font-roboto)'],
      },
      boxShadow: {
        primary: 'rgba(40 49 108 / 50%) 0px 1px 40px',
        secondary: 'rgba(654 848 551 / 50% ) 0px 1px 10px',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'none' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards',
      },
      colors: {
        'off-white ': '#f7f8f8',
        profile: '#1c1e2b',
        secondary: '#21232f',
        change: '#2b2d3c',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
