import {
  Inbox,
  LayoutDashboard,
  LogIn,
  Menu,
  ShoppingCart,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-lg
        text-gray-500 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-white
        bg-white hover:bg-gray-100
        dark:bg-gray-800 dark:hover:bg-gray-700
        border border-gray-200 dark:border-gray-600
        shadow-sm"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0
        bg-white border-r border-gray-200
        dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg
                text-gray-900 hover:bg-gray-100
                dark:text-white dark:hover:bg-gray-700"
              >
                <LayoutDashboard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Home</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg
                text-gray-900 hover:bg-gray-100
                dark:text-white dark:hover:bg-gray-700"
              >
                <Inbox className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Inbox</span>
                <span
                  className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm
                text-blue-800 bg-blue-100 rounded-full
                dark:text-blue-300 dark:bg-blue-900"
                >
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg
                text-gray-900 hover:bg-gray-100
                dark:text-white dark:hover:bg-gray-700"
              >
                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg
                text-gray-900 hover:bg-gray-100
                dark:text-white dark:hover:bg-gray-700"
              >
                <ShoppingCart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Products</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg
                text-gray-900 hover:bg-gray-100
                dark:text-white dark:hover:bg-gray-700"
              >
                <LogIn className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg
                text-gray-900 hover:bg-gray-100
                dark:text-white dark:hover:bg-gray-700"
              >
                <UserPlus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
