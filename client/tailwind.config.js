/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Omogućuje dark mode
  theme: {
    extend: {
      colors: {
        text: "#333333",
        "text-dark": "#cccccc",
        background: "#f5f8ff",
        "background-dark": "#00030a",
        primary: "#2463eb",
        "primary-dark": "#1453db",
        secondary: "#adc7ff",
        "secondary-dark": "#001a52",
        accent: "#ff7b57",
        "accent-dark": "#a82400",
      },
    },
  },
  plugins: [],
};