// tailwind.config.js
module.exports = {
  content: [
    "./index.html",              
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        navyBlue: '#002244',
        darkCyan: '#005577',
        mutedTeal: '#0088AA',

        // Supporting Neutrals
        darkGray: '#1A1A1A',
        midGray: '#4C4C4C',
        lightGray: '#CCCCCC',
        offWhite: '#F2F2F2',

        // Complementary Colors
        brightCyan: '#00CCCC',
        mutedGold: '#FFCC33',

        // Background Shades
        darkenedBlue: '#001122',
        overlayBlue: 'rgba(0, 34, 68, 0.8)',
      },
    },
  },
  plugins: [],
};
