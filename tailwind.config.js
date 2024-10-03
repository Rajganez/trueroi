/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: ["Poppins", "sans-serif"],
      fontWeight: 500,
      fontStyle: "normal",
    },
  },
  plugins: [],
};
