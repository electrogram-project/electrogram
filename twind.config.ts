import { defineConfig, Preset } from "twind";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";
import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";
import presetTailwindForms from "https://esm.sh/@twind/preset-tailwind-forms@1.1.2";

export default {
  ...defineConfig({
    presets: [
      presetTailwind() as Preset,
      presetAutoprefix(),
      presetTailwindForms(),
    ],
    darkMode: "class",
  }),
  selfURL: import.meta.url,
};
