/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router";

const Navbar = ({ afficherConnexion, afficherInscription }) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">R</span>
          </div>
          <span className="text-xl font-bold text-gray-800">REBOOT</span>
        </Link>

        <div className="flex gap-4">
          <button
            onClick={afficherConnexion}
            className="px-6 py-2 text-gray-700 hover:text-violet-600 transition-colors"
          >
            Connexion
          </button>
          <button
            onClick={afficherInscription}
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-violet-500 text-white rounded-lg hover:from-blue-500 hover:to-violet-600 transition-all shadow-md"
          >
            Inscription
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
