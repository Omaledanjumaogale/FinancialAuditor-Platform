import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  PUBLIC_FIREBASE_API_KEY,
  PUBLIC_FIREBASE_AUTH_DOMAIN,
  PUBLIC_FIREBASE_PROJECT_ID,
  PUBLIC_FIREBASE_STORAGE_BUCKET,
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  PUBLIC_FIREBASE_APP_ID
} from "$env/static/public";

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID
};

import { browser } from '$app/environment';

// Singleton guard: prevents "Firebase app already exists" errors
// on hot-reload or multiple module evaluations on the edge runtime
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth ONLY on the client to avoid 
// crashing Cloudflare Edge SSR (which lacks DOM APIs like IndexedDB)
export const auth = browser ? getAuth(app) : null;
