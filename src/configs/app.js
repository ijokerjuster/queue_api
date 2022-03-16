require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/queue',
    secret: process.env.SECRET || 'queuesecret',
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBmKetOV9pGLGTgBIdvowu80lW0qV-WtyU",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "queue-1b5ef.firebaseapp.com",
        projectId: process.env.FIREBASE_PROJECT_ID || "queue-1b5ef",
        databaseURL: process.env.FIREBASE_DATABASE_URL || "https://queue-1b5ef.firebaseio.com/",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "queue-1b5ef.appspot.com",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "392599882688",
        appId: process.env.APP_ID || "1:392599882688:web:46c8583de98fa9f5051625",
        measurementId: process.env.MEASUREMENT_ID || "G-7184G9LY0P",
        bucket: process.env.FIREBASE_BUCKET || 'gs://queue-1b5ef.appspot.com',
    },
}