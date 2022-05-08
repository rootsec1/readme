import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

async function signInWithGoogleUsingFirebase() {
    try {
        const googleAuthProvider = new GoogleAuthProvider();
        const signInResult = await signInWithPopup(authInstance, googleAuthProvider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(signInResult);
        const token = credential.accessToken;
        // The signed-in user info.
        const firebaseUser = signInResult.user;
        console.log(token);
        console.log(firebaseUser.email);
        console.log(firebaseUser.displayName);
    } catch (error) {
        console.log('ERROR = ' + error.message.toString());
    }
};

export const auth = authInstance;
export const analytics = getAnalytics(app);
export const signInWithGoogle = signInWithGoogleUsingFirebase;
