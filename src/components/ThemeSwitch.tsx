import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "@hooks/useTheme.ts";

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-slate-600 dark:border-white border-opacity-40 bg-white bg-opacity-80 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105 dark:bg-zinc-900"
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun /> : <BsMoon style={{ color: "white" }} />}
    </button>
  );
};
ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };
