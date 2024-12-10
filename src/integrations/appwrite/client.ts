import { Client, Account, Databases, Storage, Functions, ID, Models } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const STORAGE_ID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

// Collection IDs
export const COLLECTIONS = {
    PROFILES: 'profiles',
    INTERVIEWS: 'interviews',
    INTERVIEW_SESSIONS: 'interview_sessions',
    CVS: 'cvs',
    NOTIFICATIONS: 'notifications',
    JOB_POSTINGS: 'job_postings',
    INTERVIEW_INVITATIONS: 'interview_invitations'
} as const;

// Define attribute types
interface AttributeBase {
    name: string;
    required: boolean;
}

interface StringAttribute extends AttributeBase {
    type: 'string';
    default?: string;
    array?: boolean;
}

interface IntegerAttribute extends AttributeBase {
    type: 'integer';
    min?: number;
    max?: number;
    default?: number;
}

interface BooleanAttribute extends AttributeBase {
    type: 'boolean';
    default?: boolean;
}

type SchemaAttribute = StringAttribute | IntegerAttribute | BooleanAttribute;

interface CollectionConfig {
    name: string;
    permissions: string[];
    schema: SchemaAttribute[];
}

// Permissions and schema for collections
export const COLLECTION_CONFIGS: Record<keyof typeof COLLECTIONS, CollectionConfig> = {
    PROFILES: {
        name: 'Profiles',
        permissions: ['read("users")', 'write("users")'],
        schema: [
            { name: 'full_name', type: 'string', required: true },
            { name: 'avatar_url', type: 'string', required: false },
            { name: 'role', type: 'string', required: true, default: 'candidate' },
            { name: 'industry', type: 'string', required: false },
            { name: 'location', type: 'string', required: false },
            { name: 'job_title', type: 'string', required: false }
        ]
    },
    CVS: {
        name: 'CVs',
        permissions: ['read("users")', 'write("users")'],
        schema: [
            { name: 'title', type: 'string', required: true },
            { name: 'content', type: 'string', required: true },
            { name: 'user_id', type: 'string', required: true },
            { name: 'template', type: 'string', required: false },
            { name: 'is_ats_optimized', type: 'boolean', required: false }
        ]
    },
    INTERVIEWS: {
        name: 'Interviews',
        permissions: ['read("users")', 'write("users")'],
        schema: [
            { name: 'user_id', type: 'string', required: true },
            { name: 'cv_id', type: 'string', required: true },
            { name: 'interview_type', type: 'string', required: true },
            { name: 'status', type: 'string', required: true },
            { name: 'completion_status', type: 'integer', required: false, min: 0, max: 100 },
            { name: 'scheduled_at', type: 'string', required: true }
        ]
    },
    INTERVIEW_SESSIONS: {
        name: 'Interview Sessions',
        permissions: ['read("users")', 'write("users")'],
        schema: [
            { name: 'interview_id', type: 'string', required: true },
            { name: 'session_type', type: 'string', required: true },
            { name: 'sentiment_scores', type: 'string', required: false },
            { name: 'transcription', type: 'string', required: false },
            { name: 'media_url', type: 'string', required: false },
            { name: 'model_type', type: 'string', required: true },
            { name: 'model_name', type: 'string', required: true }
        ]
    },
    JOB_POSTINGS: {
        name: 'Job Postings',
        permissions: ['read("users")', 'write("users")'],
        schema: [
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'string', required: true },
            { name: 'location', type: 'string', required: false },
            { name: 'requirements', type: 'string', array: true, required: true },
            { name: 'salary_range', type: 'string', required: false },
            { name: 'status', type: 'string', required: true, default: 'active' },
            { name: 'recruiter_id', type: 'string', required: true }
        ]
    },
    NOTIFICATIONS: {
        name: 'Notifications',
        permissions: ['read("users")', 'write("users")'],
        schema: [
            { name: 'user_id', type: 'string', required: true },
            { name: 'title', type: 'string', required: true },
            { name: 'message', type: 'string', required: true },
            { name: 'type', type: 'string', required: true },
            { name: 'read', type: 'boolean', required: true, default: false },
            { name: 'link', type: 'string', required: false }
        ]
    },
    INTERVIEW_INVITATIONS: {
        name: 'Interview Invitations',
        permissions: ['read("users")', 'write("users")'],
        schema: [
            { name: 'recruiter_id', type: 'string', required: true },
            { name: 'job_posting_id', type: 'string', required: true },
            { name: 'candidate_email', type: 'string', required: true },
            { name: 'candidate_name', type: 'string', required: true },
            { name: 'job_title', type: 'string', required: true },
            { name: 'status', type: 'string', required: true, default: 'pending' },
            { name: 'scheduled_date', type: 'string', required: false },
            { name: 'notes', type: 'string', required: false }
        ]
    }
};

// Initialize collections if they don't exist
export const initializeCollections = async () => {
    try {
        // Create database if it doesn't exist
        try {
            await databases.listCollections(DATABASE_ID);
        } catch {
            // If database doesn't exist, create it
            await databases.create(DATABASE_ID, 'HiresHub Database');
        }

        // Create collections if they don't exist
        for (const [key, config] of Object.entries(COLLECTION_CONFIGS)) {
            try {
                const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
                await databases.createCollection(
                    DATABASE_ID,
                    collectionId,
                    config.name,
                    config.permissions
                );

                // Create attributes for the collection
                for (const attr of config.schema) {
                    try {
                        switch (attr.type) {
                            case 'string':
                                await databases.createAttribute(
                                    DATABASE_ID,
                                    collectionId,
                                    'string',
                                    attr.name,
                                    attr.required,
                                    attr.default,
                                    attr.array
                                );
                                break;
                            case 'integer':
                                await databases.createAttribute(
                                    DATABASE_ID,
                                    collectionId,
                                    'integer',
                                    attr.name,
                                    attr.required,
                                    attr.min,
                                    attr.max,
                                    attr.default
                                );
                                break;
                            case 'boolean':
                                await databases.createAttribute(
                                    DATABASE_ID,
                                    collectionId,
                                    'boolean',
                                    attr.name,
                                    attr.required,
                                    attr.default
                                );
                                break;
                        }
                    } catch (error) {
                        console.log(`Attribute ${attr.name} might already exist:`, error);
                    }
                }
            } catch (error) {
                console.log(`Collection ${key} might already exist:`, error);
            }
        }
    } catch (error) {
        console.error('Error initializing collections:', error);
    }
};