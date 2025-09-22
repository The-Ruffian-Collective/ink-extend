// FIX: Use namespace import for firestore to resolve module resolution issues and prefix all calls accordingly.
import * as firestore from 'firebase/firestore';
import { db } from '../firebase';
import type { User, UserProfile } from '../types';
import { FREE_DAILY_LIMIT } from '../constants';

/**
 * Fetches a user's profile from Firestore.
 * @param uid The user's unique ID from Firebase Auth.
 * @returns The user profile object or null if not found.
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const userDocRef = firestore.doc(db, 'users', uid);
    const userDocSnap = await firestore.getDoc(userDocRef);

    if (userDocSnap.exists()) {
        return userDocSnap.data() as UserProfile;
    } else {
        return null;
    }
};

/**
 * Creates a new user profile in Firestore. Typically called on first sign-up.
 * @param user The user object from Firebase Auth.
 * @returns The newly created user profile object.
 */
export const createUserProfile = async (user: User): Promise<UserProfile> => {
    const userDocRef = firestore.doc(db, 'users', user.uid);
    const newUserProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL || undefined,
        plan: 'free',
        credits: FREE_DAILY_LIMIT,
    };
    await firestore.setDoc(userDocRef, newUserProfile);
    return newUserProfile;
};

/**
 * Decrements a user's credit count by one.
 * @param uid The user's unique ID.
 */
export const useCredit = async (uid: string): Promise<void> => {
    const userDocRef = firestore.doc(db, 'users', uid);
    await firestore.updateDoc(userDocRef, {
        credits: firestore.increment(-1),
    });
};

/**
 * Saves the results of a generation to a subcollection for the user.
 * @param uid The user's unique ID.
 * @param prompt The prompt used for the generation.
 * @param imageUrls An array of URLs for the generated images.
 */
export const saveGeneration = async (uid: string, prompt: string, imageUrls: string[]): Promise<void> => {
    const generationsColRef = firestore.collection(db, 'users', uid, 'generations');
    await firestore.addDoc(generationsColRef, {
        prompt,
        imageUrls,
        createdAt: firestore.serverTimestamp(),
    });
};