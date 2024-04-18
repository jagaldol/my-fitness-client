import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#131623",
        "main-theme": "#4064F6",
        "content-box": "#1E2637",
        "input-box": "#1C1E2C",
        text: "#ffffff",
        "text-gray": "#8D8E92",
      },
    },
    fontFamily: {
      GmarketSansMedium: ["GmarketSansMedium", "Arial", "Helvetica", "sans-serif"],
      SUITRegular: ["SUIT-Regular", "Arial", "Helvetica", "sans-serif"],
    },
  },
  plugins: [],
}
export default config
