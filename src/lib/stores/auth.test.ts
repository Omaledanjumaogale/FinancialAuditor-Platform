/**
 * Integration tests — Auth Store
 * FA-Phase3 | Covers: constructor guard, all async auth methods
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── Mock Firebase auth before importing authState ─────────────────────────────
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, cb) => {
    cb(null); // simulate signed-out state
    return vi.fn(); // unsubscribe fn
  }),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn().mockImplementation(() => ({})),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('$lib/firebase', () => ({
  auth: {}, // simulate a non-null auth instance (browser context)
}));

describe('AuthState store', () => {
  let authState: Awaited<ReturnType<typeof import('$lib/stores/auth.svelte.js')['authState']['signIn']>> | undefined;
  let store: typeof import('$lib/stores/auth.svelte.js');

  beforeEach(async () => {
    store = await import('$lib/stores/auth.svelte.js');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initialises with user=null and loading=false when onAuthStateChanged fires', () => {
    expect(store.authState.user).toBeNull();
    expect(store.authState.loading).toBe(false);
  });

  it('signIn calls signInWithEmailAndPassword and returns user', async () => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const mockUser = { uid: 'abc', email: 'test@test.com' };
    (signInWithEmailAndPassword as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ user: mockUser });

    const user = await store.authState.signIn('test@test.com', 'password123');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@test.com', 'password123');
    expect(user).toEqual(mockUser);
  });

  it('signUp calls createUserWithEmailAndPassword and updateProfile', async () => {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const mockUser = { uid: 'xyz', email: 'newuser@test.com' };
    (createUserWithEmailAndPassword as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ user: mockUser });
    (updateProfile as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);

    const user = await store.authState.signUp('newuser@test.com', 'pass', 'John Doe');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'John Doe' });
    expect(user).toEqual(mockUser);
  });

  it('signUp does NOT call updateProfile when name is empty', async () => {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const mockUser = { uid: 'xyz2', email: 'anon@test.com' };
    (createUserWithEmailAndPassword as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ user: mockUser });

    await store.authState.signUp('anon@test.com', 'pass', '');
    expect(updateProfile).not.toHaveBeenCalled();
  });

  it('logout calls signOut', async () => {
    const { signOut } = await import('firebase/auth');
    (signOut as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
    await store.authState.logout();
    expect(signOut).toHaveBeenCalled();
  });

  it('throws a clear error when auth is null (SSR context)', async () => {
    vi.doMock('$lib/firebase', () => ({ auth: null }));
    const freshStore = await import('$lib/stores/auth.svelte.js?t=' + Date.now());
    await expect(freshStore.authState.signIn('x@x.com', 'pass')).rejects.toThrow(
      'Firebase Auth is not initialized.'
    );
    vi.doUnmock('$lib/firebase');
  });

  it('signInWithGoogle calls signInWithPopup with GoogleAuthProvider', async () => {
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    const mockUser = { uid: 'google-uid', email: 'g@gmail.com' };
    (signInWithPopup as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ user: mockUser });

    const user = await store.authState.signInWithGoogle();
    expect(signInWithPopup).toHaveBeenCalled();
    expect(user).toEqual(mockUser);
  });
});
