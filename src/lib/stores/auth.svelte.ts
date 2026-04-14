import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '$lib/firebase';

class AuthState {
  user = $state<User | null>(null);
  loading = $state(true);

  constructor() {
    // Only subscribe to auth state changes in the browser.
    // `auth` is null during Edge SSR (see firebase.ts).
    if (typeof window !== 'undefined' && auth) {
      onAuthStateChanged(auth, (firebaseUser) => {
        this.user = firebaseUser;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  async signIn(email: string, password: string): Promise<User> {
    if (!auth) throw new Error('Firebase Auth is not initialized.');
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    if (!auth) throw new Error('Firebase Auth is not initialized.');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    return cred.user;
  }

  async signInWithGoogle(): Promise<User> {
    if (!auth) throw new Error('Firebase Auth is not initialized.');
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  }

  async logout(): Promise<void> {
    if (!auth) return;
    await signOut(auth);
  }
}

export const authState = new AuthState();
