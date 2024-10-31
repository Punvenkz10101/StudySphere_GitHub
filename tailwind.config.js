// tailwind.config.js
module.exports = {
  content: [
    "./index.html",              // The main HTML file in the root of the project
    "./src/**/*.{js,jsx,ts,tsx}", // All JS, JSX, TS, and TSX files in `src` folder and subfolders
  ],
  theme: {
    extend: {
      colors: {
        CardGray: '#1C1C1C',
        FeatureGray:'#2A2A2A',
        IconEffect:'#00CCCC',
      },
    },
  },
  plugins: [],
};

