import firebase from 'firebase'

const config = {
    apiKey: process.env.MIX_FIREBASE_API_KEY,
    authDomain: process.env.MIX_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.MIX_FIREBASE_DATABASE_URL,
    storageBucket: process.env.MIX_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.MIX_FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.MIX_FIREBASE_PROJECT_ID
};

firebase.initializeApp(config);

const storage =  firebase.storage();
const database = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();
export {
    database,
    storage,
    auth,
    firestore
}