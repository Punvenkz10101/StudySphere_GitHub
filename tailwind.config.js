
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path as per your project structure
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
      spacing: {
        // Custom spacing values
        13: '3.25rem',  // 52px
        14: '3.5rem',   // 56px
        15: '3.75rem',  // 60px
        16: '4rem',     // 64px
        17: '4.25rem',  // 68px
        18: '4.5rem',   // 72px
        19: '4.75rem',  // 76px
        20: '5rem',     // 80px
        // Add more as needed
      },
    },
  },
  plugins: [],
};

