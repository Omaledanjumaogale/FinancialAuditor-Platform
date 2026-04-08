import { onAuthStateChanged, type User } from 'firebase/auth';
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
}

export const authState = new AuthState();
