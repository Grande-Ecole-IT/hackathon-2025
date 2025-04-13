/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-8"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            rotate: {
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          className="w-32 h-32 rounded-full flex items-center justify-center 
          bg-gray-100 dark:bg-gray-800
          shadow-[10px_10px_20px_#d3d3d3,-10px_-10px_20px_#ffffff] 
          dark:shadow-[10px_10px_20px_#1a1a1a,-10px_-10px_20px_#2d2d2d]
          relative"
        >
          <motion.div className="absolute top-2 w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md" />

          <div
            className="w-24 h-24 rounded-full 
          bg-gray-100 dark:bg-gray-800
          shadow-[inset_5px_5px_10px_#d3d3d3,inset_-5px_-5px_10px_#ffffff] 
          dark:shadow-[inset_5px_5px_10px_#1a1a1a,inset_-5px_-5px_10px_#2d2d2d]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageLoader;
