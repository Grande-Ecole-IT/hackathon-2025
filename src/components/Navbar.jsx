import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected } = useAuth();

  return (
    <nav
      className="
      fixed top-0 left-0 right-0 z-30 py-2
     bg-transparent
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
          </div>

          {/* Boutons de connexion/déconnexion */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {!isConnected ? (
                <>
                  <Button>
                    <Link to="/login">Se connecter</Link>
                  </Button>
                  <Button color="dark">
                    <Link to="/register">S'inscrire</Link>
                  </Button>
                </>
              ) : (
                <UserDropdown />
              )}
            </div>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            {!isConnected ? (
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
            ) : (
              <UserDropdown />
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile ouvert (uniquement si non connecté) */}
      {mobileMenuOpen && !isConnected && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4 px-5">
              <Button>
                <Link to="/login">Se connecter</Link>
              </Button>
              <Button color="dark">
                <Link to="/register">S'inscrire</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
