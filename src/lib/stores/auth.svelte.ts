import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, updateProfile, type User } from 'firebase/auth';
import { auth } from '$lib/firebase';

class AuthState {
  user = $state<User | null>(null);
  loading = $state(true);

  constructor() {
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
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    return cred.user;
  }

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}

export const authState = new AuthState();
