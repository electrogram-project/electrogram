import { type Config } from "tailwindcss";
import tailwindform from "tailwindcss/forms";

export default {
  content: ["{routes,islands,components}/**/*.{ts,tsx}"],
  plugins: [tailwindform],
} satisfies Config;
