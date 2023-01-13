/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"SF Pro Dispaly ", --apple-system, BlinkMacSystemFont, "Inter", "Segoe UI",  "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"',
      },
      boxShadow: {
        "primary": "rgba(40 49 108 / 50%) 0px 1px 40px",
        "secondary": "rgba(654 848 551 / 50% ) 0px 1px 40px",
      },
    },
  },
  plugins: [],
};
