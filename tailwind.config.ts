import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      
        primaryBg: "#2397C8",
        customRed: "#F6DBDB",
        customGreen: "#E0F6DB",
        customYellow: "#F6EBDB",
        customRedText: "#FF5F5F",
        customGreenText: "#21DF10",
        customYellowText: "#E49700",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],  // Use the light theme
  },
} satisfies Config;
