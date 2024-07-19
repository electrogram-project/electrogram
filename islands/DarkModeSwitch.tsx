import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

type DarkModeProps = {
  prev: "light" | "dark" | "system";
};

export default function DarkMode(props: DarkModeProps) {
  const [mode, setMode] = useState("system");

  useEffect(
    () => {
      setMode(getMode());
      updateMode();
    },
    [mode],
  );

  function getMode(): "light" | "dark" | "system" {
    if (!IS_BROWSER) {
      return props.prev;
    }
    if (localStorage.theme === "dark") {
      return "dark";
    }
    if (localStorage.theme) {
      return "light";
    }
    return "system";
  }

  function updateMode() {
    const w = globalThis as unknown as { isDark: boolean };
    w.isDark = localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        globalThis.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[w.isDark ? "add" : "remove"]("dark");
  }

  const setDarkModeOn = () => {
    localStorage.theme = "dark";
    updateMode();
    setMode("dark");
  };

  const setDarkModeOff = () => {
    localStorage.theme = "light";
    updateMode();
    setMode("light");
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={mode === "dark" ? setDarkModeOff : setDarkModeOn}
        title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="relative w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full p-1 cursor-pointer"
      >
        <div
          className={`w-4 h-4 bg-slate-800 dark:bg-slate-100 rounded-full transform transition-transform ${
            mode === "dark" ? "translate-x-6" : ""
          }`}
        >
        </div>
      </button>
    </div>
  );
}
