import { Client, Storage, ID } from 'node-appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const storage = new Storage(client);

async function setupStorage() {
    try {
        // Create buckets for different types of files
        const buckets = [
            {
                name: 'User Avatars',
                allowedFileExtensions: ['jpg', 'jpeg', 'png'],
                maximumFileSize: 5242880, // 5MB
                permissions: ['read("any")', 'write("user")']
            },
            {
                name: 'CV Attachments',
                allowedFileExtensions: ['pdf', 'doc', 'docx'],
                maximumFileSize: 10485760, // 10MB
                permissions: ['read("any")', 'write("user")']
            },
            {
                name: 'Interview Recordings',
                allowedFileExtensions: ['mp4', 'webm'],
                maximumFileSize: 104857600, // 100MB
                permissions: ['read("any")', 'write("user")']
            }
        ];

        for (const bucket of buckets) {
            await storage.createBucket(
                ID.unique(),
                bucket.name,
                bucket.permissions,
                {
                    allowedFileExtensions: bucket.allowedFileExtensions,
                    maximumFileSize: bucket.maximumFileSize,
                }
            );
            console.log(`Created bucket: ${bucket.name}`);
        }

        console.log('Storage setup completed successfully!');
    } catch (error) {
        console.error('Error setting up storage:', error);
    }
}

setupStorage();