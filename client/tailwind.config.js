// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ✅ This is CRITICAL
  theme: {
    extend: {},
  },
  plugins: [],
}
