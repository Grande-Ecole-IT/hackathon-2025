import { account, ID } from "../lib/appwrite/configAppwrite";

/**
 * Service d'authentification fournissant des méthodes pour gérer l'inscription,
 * la connexion, la déconnexion et la récupération de l'utilisateur courant.
 */
export const AuthService = {
    /**
     * Inscrit un nouvel utilisateur
     * @param {string} email - L'email de l'utilisateur
     * @param {string} password - Le mot de passe de l'utilisateur
     * @param {string} name - Le nom complet de l'utilisateur
     * @returns {Promise<Object>} Une promesse résolue avec les données de l'utilisateur créé
     * @throws {Error} Si l'inscription échoue
     * @example
     * await AuthService.signUp('user@example.com', 'password123', 'John Doe');
     */
    async signUp(email, password, name) {
        return await account.create(ID.unique(), email, password, name);
    },

    /**
     * Connecte un utilisateur existant
     * @param {string} email - L'email de l'utilisateur
     * @param {string} password - Le mot de passe de l'utilisateur
     * @returns {Promise<Object>} Une promesse résolue avec les données de la session
     * @throws {Error} Si la connexion échoue
     * @example
     * await AuthService.signIn('user@example.com', 'password123');
     */
    async signIn(email, password) {
        return await account.createEmailPasswordSession(email, password);
    },

    /**
     * Déconnecte l'utilisateur courant
     * @returns {Promise<Object>} Une promesse résolue lorsque la déconnexion est réussie
     * @throws {Error} Si la déconnexion échoue
     * @example
     * await AuthService.signOut();
     */
    async signOut() {
        return await account.deleteSession('current');
    },

    /**
     * Récupère les informations de l'utilisateur courant
     * @returns {Promise<Object|null>} Une promesse résolue avec les données de l'utilisateur ou null si non connecté
     * @example
     * const user = await AuthService.getCurrentUser();
     * if (user) {
     *   console.log('Connecté en tant que:', user.name);
     * } else {
     *   console.log('Non connecté');
     * }
     */
    async getCurrentUser() {
        try {
            return await account.get();
        } catch {
            return null;
        }
    },
};
