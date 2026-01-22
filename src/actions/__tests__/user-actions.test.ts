const mockSignInEmail = jest.fn();
const mockSignOut = jest.fn();

jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      signInEmail: (...args: unknown[]) => mockSignInEmail(...args),
      signOut: (...args: unknown[]) => mockSignOut(...args),
    },
  },
}));

jest.mock('@/lib/utils', () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('next/headers', () => ({
  headers: jest.fn().mockResolvedValue(new Headers()),
}));

const mockRedirect = jest.fn();

jest.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
}));

import { sleep } from '@/lib/utils';

import { logIn, logOut } from '../user-actions';

describe('User Actions', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
    });
  });

  describe('logIn', () => {
    describe('Input validation', () => {
      it('should return error for non-FormData input', async () => {
        const result = await logIn(undefined, 'not-form-data');

        expect(result).toEqual({ message: 'Invalid form data.', email: '' });
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });

      it('should return error for null input', async () => {
        const result = await logIn(undefined, null);

        expect(result).toEqual({ message: 'Invalid form data.', email: '' });
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });

      it('should return error for undefined input', async () => {
        const result = await logIn(undefined, undefined);

        expect(result).toEqual({ message: 'Invalid form data.', email: '' });
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });

      it('should return error for object input', async () => {
        const result = await logIn(undefined, { email: 'test@example.com', password: 'password' });

        expect(result).toEqual({ message: 'Invalid form data.', email: '' });
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });

      it('should return error for array input', async () => {
        const result = await logIn(undefined, ['test@example.com', 'password']);

        expect(result).toEqual({ message: 'Invalid form data.', email: '' });
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });

      it('should return error for missing email', async () => {
        const formData = new FormData();
        formData.append('password', 'password123');

        const result = await logIn(undefined, formData);

        expect(result).toEqual({ message: 'Email and password are required.', email: '' });
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });

      it('should return error for missing password', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');

        const result = await logIn(undefined, formData);

        expect(result).toEqual({ message: 'Email and password are required.', email: 'test@example.com' });
        expect(mockSignInEmail).not.toHaveBeenCalled();
      });
    });

    describe('Successful authentication', () => {
      it('should call signInEmail with correct parameters and redirect', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        mockSignInEmail.mockResolvedValue({ user: { id: '1' } });

        await logIn(undefined, formData);

        expect(mockSignInEmail).toHaveBeenCalledWith(
          expect.objectContaining({
            body: {
              email: 'test@example.com',
              password: 'password123',
            },
          })
        );
        expect(mockRedirect).toHaveBeenCalledWith('/admin');
      });
    });

    describe('Authentication errors', () => {
      it('should return error message when signInEmail returns null', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'wrongpassword');

        mockSignInEmail.mockResolvedValue(null);

        const result = await logIn(undefined, formData);

        expect(result).toEqual({ message: 'Invalid credentials.', email: 'test@example.com' });
      });

      it('should return error message when signInEmail throws', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        mockSignInEmail.mockRejectedValue(new Error('Auth failed'));

        const result = await logIn(undefined, formData);

        expect(result).toEqual({ message: 'Invalid credentials.', email: 'test@example.com' });
        expect(consoleErrorSpy).toHaveBeenCalledWith('Login error:', expect.any(Error));

        consoleErrorSpy.mockRestore();
      });
    });

    describe('Development mode behavior', () => {
      it('should call sleep in development mode', async () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
          value: 'development',
          writable: true,
        });

        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        mockSignInEmail.mockResolvedValue({ user: { id: '1' } });

        await logIn(undefined, formData);

        expect(sleep).toHaveBeenCalledWith(1000);
      });

      it('should not call sleep in production mode', async () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
          value: 'production',
          writable: true,
        });

        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        mockSignInEmail.mockResolvedValue({ user: { id: '1' } });

        await logIn(undefined, formData);

        expect(sleep).not.toHaveBeenCalled();
      });
    });

    describe('Previous state handling', () => {
      it('should ignore previous state', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        mockSignInEmail.mockResolvedValue({ user: { id: '1' } });

        // prevState can be anything, it should be ignored
        await logIn({ message: 'previous error' }, formData);
        await logIn(null, formData);
        await logIn('some string', formData);

        expect(mockSignInEmail).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('logOut', () => {
    it('should call signOut and redirect to home', async () => {
      mockSignOut.mockResolvedValue(undefined);

      await logOut();

      expect(mockSignOut).toHaveBeenCalled();
      expect(mockRedirect).toHaveBeenCalledWith('/');
    });

    describe('Development mode behavior', () => {
      it('should call sleep in development mode', async () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
          value: 'development',
          writable: true,
        });

        mockSignOut.mockResolvedValue(undefined);

        await logOut();

        expect(sleep).toHaveBeenCalledWith(1000);
      });

      it('should not call sleep in production mode', async () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
          value: 'production',
          writable: true,
        });

        mockSignOut.mockResolvedValue(undefined);

        await logOut();

        expect(sleep).not.toHaveBeenCalled();
      });
    });
  });
});
