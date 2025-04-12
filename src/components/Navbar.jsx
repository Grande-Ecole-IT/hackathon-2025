import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className="
      fixed top-0 left-0 right-0 z-30 py-2
      bg-white border-b border-gray-200
      dark:bg-gray-800 dark:border-gray-700
    "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et nom */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-gray-900 font-bold text-sm">
                  L
                </span>
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                Logo
              </span>
            </div>

            {/* Menu desktop - centre */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                <a
                  href="#"
                  className="
                  text-gray-900 dark:text-gray-300
                  hover:text-gray-700 dark:hover:text-white
                  px-3 py-2 rounded-md 
                "
                >
                  Accueil
                </a>
                <a
                  href="#"
                  className="
                  text-gray-500 dark:text-gray-400
                  hover:text-gray-700 dark:hover:text-white
                  px-3 py-2 rounded-md 
                "
                >
                  Services
                </a>
                <a
                  href="#"
                  className="
                  text-gray-500 dark:text-gray-400
                  hover:text-gray-700 dark:hover:text-white
                  px-3 py-2 rounded-md 
                "
                >
                  Produits
                </a>
                <a
                  href="#"
                  className="
                  text-gray-500 dark:text-gray-400
                  hover:text-gray-700 dark:hover:text-white
                  px-3 py-2 rounded-md 
                "
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Boutons droite */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />

              <Button>Se connecter</Button>
              <Button color="dark">S'inscrire</Button>
            </div>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="
                p-2 rounded-lg
                text-gray-500 hover:text-gray-900
                dark:text-gray-400 dark:hover:text-white
                hover:bg-gray-100 dark:hover:bg-gray-700
                mr-2
              "
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                p-2 rounded-lg
                text-gray-500 hover:text-gray-900
                dark:text-gray-400 dark:hover:text-white
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile ouvert */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="
              block px-3 py-2 rounded-md text-base font-medium
              text-gray-900 dark:text-white
              hover:bg-gray-100 dark:hover:bg-gray-700
            "
            >
              Accueil
            </a>
            <a
              href="#"
              className="
              block px-3 py-2 rounded-md text-base font-medium
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-white
              hover:bg-gray-100 dark:hover:bg-gray-700
            "
            >
              Services
            </a>
            <a
              href="#"
              className="
              block px-3 py-2 rounded-md text-base font-medium
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-white
              hover:bg-gray-100 dark:hover:bg-gray-700
            "
            >
              Produits
            </a>
            <a
              href="#"
              className="
              block px-3 py-2 rounded-md text-base font-medium
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-white
              hover:bg-gray-100 dark:hover:bg-gray-700
            "
            >
              Contact
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4 px-5">
                <Button>Se connecter</Button>
                <Button color="dark">S'inscrire</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
