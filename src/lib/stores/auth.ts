import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase';

export const user = writable<User | null>(null);
export const authLoading = writable(true);

if (typeof window !== 'undefined' && auth) {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
    authLoading.set(false);
  });
} else if (typeof window !== 'undefined') {
  authLoading.set(false);
}
