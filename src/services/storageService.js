import { APPWRITE_BUCKET_ID } from '../config/env';
import { ID, storage } from '../lib/appwrite/configAppwrite';

const BUCKET_ID = APPWRITE_BUCKET_ID;

/**
 * Service de stockage fournissant des méthodes pour gérer les fichiers dans Appwrite.
 * Ce service est conçu pour être utilisé avec React (hooks, composants, etc.).
 */
export const StorageService = {
    /**
     * Téléverse un fichier dans le stockage
     * @param {File} file - Le fichier à téléverser (peut provenir d'un input file React)
     * @returns {Promise<Object>} Une promesse résolue avec les métadonnées du fichier téléversé
     * @throws {Error} Si le téléversement échoue
     * @example
     * // Dans un composant React avec un input file
     * const handleUpload = async (e) => {
     *   const file = e.target.files[0];
     *   try {
     *     const uploadedFile = await StorageService.uploadFile(file);
     *     console.log('Fichier téléversé:', uploadedFile);
     *   } catch (error) {
     *     console.error('Erreur de téléversement:', error);
     *   }
     * }
     */
    async uploadFile(file) {
        return await storage.createFile(BUCKET_ID, ID.unique(), file);
    },

    /**
     * Supprime un fichier du stockage
     * @param {string} fileId - L'ID du fichier à supprimer
     * @returns {Promise<Object>} Une promesse résolue lorsque la suppression est réussie
     * @throws {Error} Si la suppression échoue
     * @example
     * // Dans un composant React
     * const handleDelete = async (fileId) => {
     *   try {
     *     await StorageService.deleteFile(fileId);
     *     setFiles(files.filter(f => f.$id !== fileId));
     *   } catch (error) {
     *     console.error('Erreur de suppression:', error);
     *   }
     * }
     */
    async deleteFile(fileId) {
        return await storage.deleteFile(BUCKET_ID, fileId);
    },

    /**
     * Récupère l'URL de visualisation d'un fichier
     * @param {string} fileId - L'ID du fichier
     * @returns {string} L'URL pour visualiser le fichier
     * @example
     * // Dans un composant React pour afficher une image
     * const [imageUrl, setImageUrl] = useState('');
     * 
     * useEffect(() => {
     *   const url = StorageService.getFileView(fileId);
     *   setImageUrl(url);
     * }, [fileId]);
     * 
     * return <img src={imageUrl} alt="Fichier" />;
     */
    getFileView(fileId) {
        return storage.getFileView(BUCKET_ID, fileId);
    },

    /**
     * Liste tous les fichiers du bucket
     * @returns {Promise<Array>} Une promesse résolue avec la liste des fichiers
     * @throws {Error} Si la récupération échoue
     * @example
     * // Dans un composant React avec useEffect
     * const [files, setFiles] = useState([]);
     * 
     * useEffect(() => {
     *   const fetchFiles = async () => {
     *     try {
     *       const filesList = await StorageService.listFiles();
     *       setFiles(filesList.files);
     *     } catch (error) {
     *       console.error('Erreur de récupération:', error);
     *     }
     *   };
     *   
     *   fetchFiles();
     * }, []);
     */
    async listFiles() {
        return await storage.listFiles(BUCKET_ID);
    }
};
