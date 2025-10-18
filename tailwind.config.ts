import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navbarBg: "#ffffff",
        navbarText: "#000000",
        footerBg: "#f9f9f9",
        footerText: "#333333",
      },
    },
  },
  plugins: [],
};

export default config;
