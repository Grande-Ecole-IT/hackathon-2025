// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  return (
    <div className="relative">
      {/* Bouton déclencheur */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-2 rounded-xl
          bg-white dark:bg-gray-800
          shadow-[5px_5px_10px_#d3d3d3,-5px_-5px_10px_#ffffff]
          dark:shadow-[5px_5px_10px_#0a0a0a,-5px_-5px_10px_#1e1e1e]
          hover:shadow-[2px_2px_5px_#d3d3d3,-2px_-2px_5px_#ffffff]
          dark:hover:shadow-[2px_2px_5px_#0a0a0a,-2px_-2px_5px_#1e1e1e]
          transition-all duration-200`}
      >
        {user?.picture ? (
          <img src={user.picture} alt="User" className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </div>
        )}

        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {user?.username || "Utilisateur"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-2 w-48 rounded-xl py-1
              bg-white dark:bg-gray-800
              shadow-[10px_10px_20px_#d3d3d3,-10px_-10px_20px_#ffffff]
              dark:shadow-[10px_10px_20px_#0a0a0a,-10px_-10px_20px_#1e1e1e]
              z-50`}
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {user?.username || "Utilisateur"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>

            <button
              className="w-full px-4 py-2 text-left text-sm flex items-center gap-2
              hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-300"
            >
              <Settings className="w-4 h-4" />
              Paramètres
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm flex items-center gap-2
              hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-300"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
