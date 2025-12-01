jest.mock('next-auth', () => {
  class MockAuthError extends Error {
    type: string;
    constructor(type: string) {
      super(type);
      this.type = type;
      this.name = 'AuthError';
    }
  }
  return {
    AuthError: MockAuthError,
  };
});

jest.mock('@/lib/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/lib/auth';
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

        expect(result).toEqual({ message: 'Invalid form data.' });
        expect(signIn).not.toHaveBeenCalled();
      });

      it('should return error for null input', async () => {
        const result = await logIn(undefined, null);

        expect(result).toEqual({ message: 'Invalid form data.' });
        expect(signIn).not.toHaveBeenCalled();
      });

      it('should return error for undefined input', async () => {
        const result = await logIn(undefined, undefined);

        expect(result).toEqual({ message: 'Invalid form data.' });
        expect(signIn).not.toHaveBeenCalled();
      });

      it('should return error for object input', async () => {
        const result = await logIn(undefined, { email: 'test@example.com', password: 'password' });

        expect(result).toEqual({ message: 'Invalid form data.' });
        expect(signIn).not.toHaveBeenCalled();
      });

      it('should return error for array input', async () => {
        const result = await logIn(undefined, ['test@example.com', 'password']);

        expect(result).toEqual({ message: 'Invalid form data.' });
        expect(signIn).not.toHaveBeenCalled();
      });
    });

    describe('Successful authentication', () => {
      it('should call signIn with correct parameters', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        (signIn as jest.Mock).mockResolvedValue(undefined);

        await logIn(undefined, formData);

        expect(signIn).toHaveBeenCalledWith('credentials', {
          email: 'test@example.com',
          password: 'password123',
          redirectTo: '/admin',
        });
      });

      it('should pass all form fields to signIn', async () => {
        const formData = new FormData();
        formData.append('email', 'user@domain.com');
        formData.append('password', 'securepass');
        formData.append('rememberMe', 'true');

        (signIn as jest.Mock).mockResolvedValue(undefined);

        await logIn(undefined, formData);

        expect(signIn).toHaveBeenCalledWith('credentials', {
          email: 'user@domain.com',
          password: 'securepass',
          rememberMe: 'true',
          redirectTo: '/admin',
        });
      });
    });

    describe('Authentication errors', () => {
      it('should return error message for CredentialsSignin error', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'wrongpassword');

        const authError = new AuthError('CredentialsSignin');
        (signIn as jest.Mock).mockRejectedValue(authError);

        const result = await logIn(undefined, formData);

        expect(result).toEqual({ message: 'Invalid credentials.' });
      });

      it('should return generic error message for other AuthError types', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        const authError = new AuthError('Configuration');
        (signIn as jest.Mock).mockRejectedValue(authError);

        const result = await logIn(undefined, formData);

        expect(result).toEqual({ message: 'Error. Could not sign in.' });
      });

      it('should return generic error for AccessDenied error', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        const authError = new AuthError('AccessDenied');
        (signIn as jest.Mock).mockRejectedValue(authError);

        const result = await logIn(undefined, formData);

        expect(result).toEqual({ message: 'Error. Could not sign in.' });
      });

      it('should rethrow non-AuthError errors (for redirects)', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        const redirectError = new Error('NEXT_REDIRECT');
        (signIn as jest.Mock).mockRejectedValue(redirectError);

        await expect(logIn(undefined, formData)).rejects.toThrow('NEXT_REDIRECT');
      });

      it('should rethrow redirect-like errors', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        // NextJS redirect throws a special error that should be rethrown
        const redirectError = { digest: 'NEXT_REDIRECT', message: 'redirect' };
        (signIn as jest.Mock).mockRejectedValue(redirectError);

        await expect(logIn(undefined, formData)).rejects.toEqual(redirectError);
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

        (signIn as jest.Mock).mockResolvedValue(undefined);

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

        (signIn as jest.Mock).mockResolvedValue(undefined);

        await logIn(undefined, formData);

        expect(sleep).not.toHaveBeenCalled();
      });
    });

    describe('Previous state handling', () => {
      it('should ignore previous state', async () => {
        const formData = new FormData();
        formData.append('email', 'test@example.com');
        formData.append('password', 'password123');

        (signIn as jest.Mock).mockResolvedValue(undefined);

        // prevState can be anything, it should be ignored
        await logIn({ message: 'previous error' }, formData);
        await logIn(null, formData);
        await logIn('some string', formData);

        expect(signIn).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('logOut', () => {
    it('should call signOut with redirect to home', async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await logOut();

      expect(signOut).toHaveBeenCalledWith({ redirectTo: '/' });
    });

    describe('Development mode behavior', () => {
      it('should call sleep in development mode', async () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
          value: 'development',
          writable: true,
        });

        (signOut as jest.Mock).mockResolvedValue(undefined);

        await logOut();

        expect(sleep).toHaveBeenCalledWith(1000);
      });

      it('should not call sleep in production mode', async () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
          value: 'production',
          writable: true,
        });

        (signOut as jest.Mock).mockResolvedValue(undefined);

        await logOut();

        expect(sleep).not.toHaveBeenCalled();
      });
    });
  });
});
