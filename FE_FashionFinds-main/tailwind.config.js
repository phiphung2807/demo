/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "Sans-serif"],
      },
      colors: {
        primary: "#11006f",
        secondary: "#ffc107",
        textSecondary: "#ced2e2",
      },
    },
  },
  plugins: [],
};
