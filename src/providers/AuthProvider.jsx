import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext"
import { AuthService } from "../services/authService";
import { DBService } from "../services/dbService";
import { StorageService } from '../services/storageService';

/**
 * AuthProvider component that provides authentication context to the application.
 * @param {React.ReactNode} children - The child components that will have access to the AuthContext.
 */
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userCompetences, setUserCompetences] = useState([]);
    const [initLoading, setInitLoading] = useState(false);

    const register = async ({ username, email, password,competences, profilePhoto }) => {
        const user = await AuthService.signUp(email, password, username);
        await StorageService.uploadFile(profilePhoto, user.$id);
        const picture = StorageService.getFileView(user.$id);
        competences.map(async (value) => {
            await DBService.createDocument("competences", {
                value,
                userId: user.$id
            });
        }
        )
        await DBService.createDocumentWithId("users", user.$id, { username, email, picture });
        await login({ email, password });
    };

    const login = async ({ email, password }) => {
        await AuthService.signIn(email, password);
        const userAuth = await AuthService.getCurrentUser();
        const user = await DBService.getDocument("users", userAuth.$id);
        setUser(user);
    };


    const logout = async () => {
        await AuthService.signOut();
    }

    const init = useCallback(async () => {
        try {
            setInitLoading(true);
            const session = await AuthService.getCurrentUser();
            if (session) {
                const user = await DBService.getDocument("users", session.$id);
                const competences = await DBService.listUserDocuments("competences", user.$id);
                setUserCompetences(competences.documents);
                setUser(user);
            } else setUser(null);
        } finally {
            setInitLoading(false)
        }

    }, []);

    useEffect(() => {
        init();
    }, [init])

    const value = {
        user,
        userCompetences,
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