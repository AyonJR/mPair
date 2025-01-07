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
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],  // Use the light theme
  },
} satisfies Config;
