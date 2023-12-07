/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  mode: "jit",
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "500px": "500px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), plugin()],
};
export default config;
