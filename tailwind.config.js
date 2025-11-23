/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green50: "#EDF3F0",
        green75: "#B5CFC2",
        green100: "#97BCA9",
        green200: "#6A9F83",
        green300: "#4B8B6A",
        green400: "#35614A",
        green500: "#2E5541",

        yellow50: "#FDF8EF",
        yellow75: "#F6E4BB",
        yellow100: "#F2D89F",
        yellow200: "#ECC776",
        yellow300: "#E8BC5A",
        yellow400: "#A2843F",
        yellow500: "#8E7337",

        red50: "#FCE9E9",
        red75: "#F1A6A6",
        red100: "#EB8181",
        red200: "#E24B4B",
        red300: "#DC2626",
        red400: "#9A1B1B",
        red500: "#861717",
      },

      fontFamily: {
        sans: ['"kkukkukk"', "sans-serif"],
        custom: ['"GmarketSansBold"', "sans-serif"],
      },

      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
};
