import { Client, Databases, ID } from 'node-appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const databases = new Databases(client);

async function setupDatabase() {
    try {
        // Create database
        const database = await databases.create(ID.unique(), 'Main Database');

        // Create Collections
        const collections = {
            profiles: {
                name: 'Profiles',
                attributes: [
                    { key: 'name', type: 'string', required: true },
                    { key: 'email', type: 'string', required: true },
                    { key: 'role', type: 'string', required: true },
                    { key: 'avatar', type: 'string', required: false },
                ]
            },
            cvs: {
                name: 'CVs',
                attributes: [
                    { key: 'title', type: 'string', required: true },
                    { key: 'content', type: 'string', required: true },
                    { key: 'user_id', type: 'string', required: true },
                ]
            },
            job_postings: {
                name: 'Job Postings',
                attributes: [
                    { key: 'title', type: 'string', required: true },
                    { key: 'description', type: 'string', required: true },
                    { key: 'location', type: 'string', required: true },
                    { key: 'requirements', type: 'string[]', required: true },
                    { key: 'salary_range', type: 'object', required: true },
                ]
            },
            interviews: {
                name: 'Interviews',
                attributes: [
                    { key: 'candidate_id', type: 'string', required: true },
                    { key: 'job_id', type: 'string', required: true },
                    { key: 'scheduled_at', type: 'datetime', required: true },
                    { key: 'status', type: 'string', required: true },
                ]
            },
            notifications: {
                name: 'Notifications',
                attributes: [
                    { key: 'user_id', type: 'string', required: true },
                    { key: 'message', type: 'string', required: true },
                    { key: 'type', type: 'string', required: true },
                    { key: 'read', type: 'boolean', required: true },
                ]
            }
        };

        for (const [key, value] of Object.entries(collections)) {
            const collection = await databases.createCollection(
                database.$id,
                ID.unique(),
                value.name
            );

            // Create attributes for each collection
            for (const attr of value.attributes) {
                await databases.createStringAttribute(
                    database.$id,
                    collection.$id,
                    attr.key,
                    attr.required
                );
            }

            console.log(`Created collection: ${value.name}`);
        }

        console.log('Database setup completed successfully!');
    } catch (error) {
        console.error('Error setting up database:', error);
    }
}

setupDatabase();