
import type { User as FirebaseUser } from 'firebase/auth';

// This is the user object from Firebase Authentication
export type User = FirebaseUser;

// This is our custom user profile stored in Firestore
export interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  picture?: string;
  plan: 'free' | 'starter' | 'pro';
  credits: number;
}

export enum IdeaMode {
  Random = 'Random',
  Custom = 'Custom',
  Presets = 'Presets',
}

export enum TattooStyle {
  BlackAndGrey = 'Black & Grey',
  Color = 'Color allowed',
}

export enum Intensity {
  Subtle = 'Subtle',
  Balanced = 'Balanced',
  Bold = 'Bold',
}

export interface GenerationResult {
  id: string;
  imageUrl: string;
}

export interface UploadedFile {
  file: File;
  preview: string;
  base64: string;
  mimeType: string;
}