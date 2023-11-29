/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'faded-gray': '#757575',
        'royal-purple': '#A445ED',
      },
      backgroundImage: {
        'play-button': "url('/assets/icon-play.svg')",
      },
    },
  },
  plugins: [],
};
