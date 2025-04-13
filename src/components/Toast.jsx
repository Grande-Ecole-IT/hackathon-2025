/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const Toast = ({
  type = "success",
  message = "",
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const getToastClasses = () => {
    const baseClasses =
      "fixed bottom-6 right-6 p-4 pr-10 rounded-lg border shadow-lg max-w-xs z-50 flex items-start gap-3";

    if (type === "error") {
      return `${baseClasses} bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-700 text-red-800 dark:text-red-100`;
    }

    return `${baseClasses} bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-700 text-green-800 dark:text-green-100`;
  };

  const getIconClasses = () => {
    if (type === "error") {
      return "w-5 h-5 text-red-500 dark:text-red-300";
    }
    return "w-5 h-5 text-green-500 dark:text-green-300";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className={getToastClasses()}
        >
          {type === "error" ? (
            <svg
              className={getIconClasses()}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className={getIconClasses()}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}

          <div className="flex-1">
            <p className="font-medium">
              {type === "error" ? "Erreur" : "Succès"}
            </p>
            <p className="text-sm">{message}</p>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
