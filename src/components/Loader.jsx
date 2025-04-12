/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="relative w-8 h-8">
      <div
        className="
        absolute inset-0 rounded-full
        bg-white dark:bg-gray-700
        shadow-lg dark:shadow-gray-800
        border border-gray-200 dark:border-gray-600
      "
      ></div>

      <motion.div
        className="
          absolute inset-1 rounded-full
          bg-white dark:bg-gray-700
          shadow-inner
          border border-gray-200 dark:border-gray-600
          flex items-center justify-center
        "
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="
          w-3/4 h-3/4 rounded-full
          border-2 border-transparent
          border-t-gray-400 dark:border-t-gray-300
          border-r-gray-400 dark:border-r-gray-300
        "
        ></div>
      </motion.div>
    </div>
  );
};

export default Loader;
