/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import UserDropdown from "./UserDropdown";

const Navbar = ({ afficherConnexion, afficherInscription }) => {
  const navigate = useNavigate();
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo avec symbole IA intégré */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            {/* Cerveau stylisé */}
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C8 4 4 8 4 12C4 16 8 20 12 20C16 20 20 16 20 12C20 8 16 4 12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L15 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Effet circuit intégré */}
            <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none" />
          </div>

          {/* Texte avec animation */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
              RAIsilience
            </span>
          </div>
        </Link>

        <UserDropdown />
      </div>
    </motion.nav>
  );
};

export default Navbar;
