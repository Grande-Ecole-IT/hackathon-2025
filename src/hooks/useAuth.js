import { useContext } from "react";
import { AuthContext } from "../context/authContext";

/**
 * Custom hook to access authentication context
 * @returns {{
 *   user: {
 *     $id: string,
 *     username: string,
 *     email: string
 *   } | null,
 *   isConnected: boolean,
 *   initLoading: boolean,
 *   register: ({username: string, email: string, password: string}) => Promise<void>,
 *   login: ({email: string, password: string}) => Promise<void>,
 *   logout: () => Promise<void>
 * }} Authentication context with user data and methods
 */
export const useAuth = () => useContext(AuthContext);
