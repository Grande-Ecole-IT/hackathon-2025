import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
      p-2 rounded-full
      text-gray-500 hover:text-gray-900
      dark:text-gray-400 dark:hover:text-white
      hover:bg-gray-100 dark:hover:bg-gray-700
      transition-colors duration-300
    "
      aria-label={
        theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
      }
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
