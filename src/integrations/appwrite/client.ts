import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6757a9b5003bb69aa154');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export const DATABASE_ID = '6757aa1500212bb97123';
export const STORAGE_ID = '6757aa2c001ff3e7cdb0';

// Collection IDs
export const COLLECTIONS = {
    PROFILES: 'profiles',
    INTERVIEWS: 'interviews',
    INTERVIEW_SESSIONS: 'interview_sessions',
    CVS: 'cvs',
    NOTIFICATIONS: 'notifications',
};