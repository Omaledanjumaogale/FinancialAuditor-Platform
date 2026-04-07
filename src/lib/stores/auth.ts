import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';

export const user = writable<User | null>(null);
export const authLoading = writable(true);

if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
    authLoading.set(false);
  });
}
