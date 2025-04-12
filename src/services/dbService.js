import { APPWRITE_DATABASE_ID } from '../config/env';
import { databases, ID } from '../lib/appwrite/configAppwrite';

const DATABASE_ID = APPWRITE_DATABASE_ID;

export const DBService = {
    async createDocument(COLLECTION_ID, data) {
        return await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            data
        );
    },

    async createDocumentWithId(COLLECTION_ID, id, data) {
        return await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            id,
            data
        );
    },

    async listDocuments(COLLECTION_ID, query = []) {
        return await databases.listDocuments(DATABASE_ID, COLLECTION_ID, query.length > 0 ? query : undefined);
    },

    async getDocument(COLLECTION_ID, id, query = []) {
        return await databases.getDocument(DATABASE_ID, COLLECTION_ID, id, query.length > 0 ? query : undefined);
    },

    async updateDocument(COLLECTION_ID, id, data) {
        return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, data);
    },

    async deleteDocument(COLLECTION_ID, id) {
        return await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    }
};