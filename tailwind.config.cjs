/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'mobile': { 'max': "600px" },
      },
      height:{
        navbar:"10vh",
      },
      colors: {
        primary: {
          100: "#8AADF9",
          200: "#3C77F6",
          300: "#155CF4",
          400: "hsl(221, 91%, 48%)",
          500: "#0B4BD5",
          600: "#0A44C2",
          700: "#08379B",
          800: "#062974",
          900: "#052261",
        },
      },
    },
  },
  plugins: [],
};
