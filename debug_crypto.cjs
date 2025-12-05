const crypto = require('crypto');

const ENCRYPTION_KEY_BYTES = new Uint8Array([
    132, 41, 242, 153, 104, 87, 23, 190,
    54, 187, 224, 176, 15, 198, 167, 249,
    89, 120, 78, 45, 12, 201, 156, 34,
    165, 43, 98, 133, 251, 49, 176, 88
]);

async function decryptText(encryptedText) {
    try {
        const combined = Buffer.from(encryptedText, 'base64');

        // Split IV and data
        const iv = combined.slice(0, 12);
        const encryptedData = combined.slice(12);

        // In Node.js, GCM expects the auth tag to be set separately.
        // Usually the tag is appended at the end.
        // Assuming 16 bytes tag length (default for Web Crypto AES-GCM)
        const authTagLength = 16;
        const authTag = encryptedData.slice(encryptedData.length - authTagLength);
        const ciphertext = encryptedData.slice(0, encryptedData.length - authTagLength);

        const decipher = crypto.createDecipheriv('aes-256-gcm', ENCRYPTION_KEY_BYTES, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(ciphertext);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString('utf8');
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
}

const input = "Bjcedof2bU0QOQt3hldUklL2R4kUbGLqwzWvyFhWbhM=";
decryptText(input).then(console.log).catch(console.error);
