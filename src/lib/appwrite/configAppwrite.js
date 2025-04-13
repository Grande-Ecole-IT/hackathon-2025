import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import { APPWRITE_PROJECT_ID } from '../../config/env';

const client = new Client()
    .setProject(APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID, Query };