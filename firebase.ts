import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// FIX: Use namespace import for firestore to resolve potential module resolution issues.
import * as firestore from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = firestore.getFirestore(app);

// Initialize Google Auth provider
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };