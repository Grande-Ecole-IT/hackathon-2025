const Button = ({ children, color = "light", className = "", ...props }) => {
  const baseClasses = `
    rounded-full
    py-2.5 px-5
    transition-all duration-300
    cursor-pointer
    shadow-lg hover:shadow-xl
    active:shadow-inner
    flex items-center justify-center gap-2
    transform hover:-translate-y-0.5 active:translate-y-0
    border
    ${className}
  `;

  const colorClasses =
    color === "light"
      ? `bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-600 active:text-gray-600 dark:active:text-gray-300`
      : `bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-900 border-gray-700 dark:border-gray-400 active:text-gray-300 dark:active:text-gray-700`;

  return (
    <button {...props} className={`${baseClasses} ${colorClasses}`}>
      {children}
    </button>
  );
};

export default Button;
