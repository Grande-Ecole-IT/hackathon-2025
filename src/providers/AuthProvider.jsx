import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext"
import { AuthService } from "../services/authService";
import { DBService } from "../services/dbService";

/**
 * AuthProvider component that provides authentication context to the application.
 * @param {React.ReactNode} children - The child components that will have access to the AuthContext.
 */
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [initLoading, setInitLoading] = useState(false);

    const register = async ({ username, email, password }) => {
        const user = await AuthService.signUp(email, password, username);
        await DBService.createDocumentWithId("users", user.$id, { username, email });
        setUser(user);
    };

    const login = async ({ email, password }) => {
        const session = await AuthService.signIn(email, password);
        const user = await DBService.getDocument("users", session.$id);
        setUser(user);
    };


    const logout = async () => {
        await AuthService.signOut();
    }

    const init = async () => {
        try {
            setInitLoading(true);
            const session = await AuthService.getCurrentUser();
            if (session) {
                const user = await DBService.getDocument("users", session.$id);
                setUser(user);
            } else setUser(null);
        } finally {
            setInitLoading(false)
        }

    }

    useEffect(() => {
        init();
    }, [])

    const value = {
        user,
        initLoading,
        register,
        login,
        logout,
        isConnected: !!user,
    }

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider;