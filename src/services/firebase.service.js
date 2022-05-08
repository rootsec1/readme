import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authInstance = getAuth();
const databaseInstance = getDatabase();

async function signInWithGoogleUsingFirebase() {
    try {
        const googleAuthProvider = new GoogleAuthProvider();
        await signInWithPopup(authInstance, googleAuthProvider);
    } catch (error) {
        alert(error.message.toString());
    }
};

export const logOut = async () => {
    try {
        await authInstance.signOut();
    } catch (error) {
        alert(error.message.toString());
    }
}

export const auth = authInstance;
export const database = databaseInstance;
export const analytics = getAnalytics(app);
export const signInWithGoogle = signInWithGoogleUsingFirebase;
