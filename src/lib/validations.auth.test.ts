import { authSchema } from './validations';

describe('Auth Schema Validation', () => {
  describe('Valid inputs', () => {
    it('should accept valid email and password', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
        expect(result.data.password).toBe('password123');
      }
    });

    it('should accept email with subdomain', () => {
      const result = authSchema.safeParse({
        email: 'user@mail.example.com',
        password: 'securePass',
      });
      expect(result.success).toBe(true);
    });

    it('should accept email with plus sign', () => {
      const result = authSchema.safeParse({
        email: 'user+tag@example.com',
        password: 'password',
      });
      expect(result.success).toBe(true);
    });

    it('should accept password at max length (100 characters)', () => {
      const longPassword = 'a'.repeat(100);
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: longPassword,
      });
      expect(result.success).toBe(true);
    });

    it('should accept email at max length (100 characters)', () => {
      const longEmail = 'a'.repeat(88) + '@example.com'; // 100 chars total
      const result = authSchema.safeParse({
        email: longEmail,
        password: 'password',
      });
      expect(result.success).toBe(true);
    });

    it('should accept empty password (no minimum length required)', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: '',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid email inputs', () => {
    it('should reject missing email', () => {
      const result = authSchema.safeParse({
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format - no @', () => {
      const result = authSchema.safeParse({
        email: 'notanemail',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format - no domain', () => {
      const result = authSchema.safeParse({
        email: 'test@',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format - no local part', () => {
      const result = authSchema.safeParse({
        email: '@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject email exceeding max length', () => {
      const longEmail = 'a'.repeat(89) + '@example.com'; // 101 chars total
      const result = authSchema.safeParse({
        email: longEmail,
        password: 'password',
      });
      expect(result.success).toBe(false);
    });

    it('should reject email with spaces', () => {
      const result = authSchema.safeParse({
        email: 'test @example.com',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject null email', () => {
      const result = authSchema.safeParse({
        email: null,
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject number as email', () => {
      const result = authSchema.safeParse({
        email: 12345,
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Invalid password inputs', () => {
    it('should reject missing password', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(false);
    });

    it('should reject password exceeding max length', () => {
      const longPassword = 'a'.repeat(101);
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: longPassword,
      });
      expect(result.success).toBe(false);
    });

    it('should reject null password', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: null,
      });
      expect(result.success).toBe(false);
    });

    it('should reject number as password', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: 12345,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Missing both fields', () => {
    it('should reject empty object', () => {
      const result = authSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject undefined', () => {
      const result = authSchema.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it('should reject null', () => {
      const result = authSchema.safeParse(null);
      expect(result.success).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should accept extra fields (schema is not strict)', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        extraField: 'should be ignored',
      });
      expect(result.success).toBe(true);
    });

    it('should handle unicode in password', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: 'pässwörd123',
      });
      expect(result.success).toBe(true);
    });

    it('should handle special characters in password', () => {
      const result = authSchema.safeParse({
        email: 'test@example.com',
        password: '!@#$%^&*()_+-=[]{}|;:,.<>?',
      });
      expect(result.success).toBe(true);
    });
  });
});
