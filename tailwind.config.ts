import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlue: "#2D3A96",
        accentGreen: "#2AC144",
        grayTon3: "#A0ABC0",
        grayTon1: "#3C404B",
        grayTon2: "#6C768A",
        grayTon4: "#B8BFCC",
        secondaryShade1: "#12ECFA",
        accentOrange: "#F84800",
        accentYellow: "#D2AB20",
        accentLightGreen: "#DDFBE2",
        secondaryColor: "#FE9261",
        primaryShade1: "#5438CD"
      },
    },
  },
  plugins: [],
};
export default config;
