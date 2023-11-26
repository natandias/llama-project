import type { Config } from 'tailwindcss'
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "page": "94vh",
        "page-mobile": "88vh",
      },
      minWidth: {
        "1/2": "50%",
        "1/4": "25%",
      },
      maxWidth: {
        "screen-limit": "1280px",
      },
      colors: {
        primary: "#67d2b3",
        primary_hover: "#29ce92",
        secondary: colors.white,
      },
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config
