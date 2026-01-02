import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewPasswordSection } from '../sections/new-password-section';

// Mock react-hook-form
const mockRegister = jest.fn().mockReturnValue({});
const mockTrigger = jest.fn();
const mockGetValues = jest.fn();
const mockWatch = jest.fn();

let mockErrors: Record<string, { message: string }> = {};
let mockIsPending = false;
const mockOnSubmit = jest.fn();

jest.mock('@/stores/use-change-password-store', () => ({
  useChangePasswordStore: () => ({
    register: mockRegister,
    errors: mockErrors,
    isPending: mockIsPending,
    onSubmit: mockOnSubmit,
    trigger: mockTrigger,
    getValues: mockGetValues,
    watch: mockWatch,
    control: {},
  }),
}));

describe('ChangePasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockErrors = {};
    mockIsPending = false;
  });

  describe('NewPasswordSection', () => {
    describe('Rendering', () => {
      it('should render current password input', () => {
        render(<NewPasswordSection />);

        expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
      });

      it('should render new password input', () => {
        render(<NewPasswordSection />);

        expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
      });

      it('should render confirm password input', () => {
        render(<NewPasswordSection />);

        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      });

      it('should render all password fields as type password', () => {
        render(<NewPasswordSection />);

        const currentPassword = screen.getByLabelText(/current password/i);
        const newPassword = screen.getByLabelText(/new password/i);
        const confirmPassword = screen.getByLabelText(/confirm password/i);

        expect(currentPassword).toHaveAttribute('type', 'password');
        expect(newPassword).toHaveAttribute('type', 'password');
        expect(confirmPassword).toHaveAttribute('type', 'password');
      });

      it('should register all password fields with react-hook-form', () => {
        render(<NewPasswordSection />);

        expect(mockRegister).toHaveBeenCalledWith('currentPassword');
        expect(mockRegister).toHaveBeenCalledWith('password');
        expect(mockRegister).toHaveBeenCalledWith('confirmPassword');
      });
    });

    describe('Error Display', () => {
      it('should display error message for currentPassword when error exists', () => {
        mockErrors = {
          currentPassword: { message: 'Current password is required' },
        };

        render(<NewPasswordSection />);

        expect(screen.getByText('Current password is required')).toBeInTheDocument();
      });

      it('should display error message for password when error exists', () => {
        mockErrors = {
          password: { message: 'Password must be at least 8 characters' },
        };

        render(<NewPasswordSection />);

        expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
      });

      it('should display error message for confirmPassword when error exists', () => {
        mockErrors = {
          confirmPassword: { message: 'Passwords do not match' },
        };

        render(<NewPasswordSection />);

        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      });

      it('should display multiple errors simultaneously', () => {
        mockErrors = {
          currentPassword: { message: 'Current password is required' },
          password: { message: 'Password too short' },
          confirmPassword: { message: 'Passwords do not match' },
        };

        render(<NewPasswordSection />);

        expect(screen.getByText('Current password is required')).toBeInTheDocument();
        expect(screen.getByText('Password too short')).toBeInTheDocument();
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      });

      it('should not display error messages when there are no errors', () => {
        mockErrors = {};

        render(<NewPasswordSection />);

        expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/do not match/i)).not.toBeInTheDocument();
      });
    });

    describe('Form Interaction', () => {
      it('should allow typing in current password field', async () => {
        const user = userEvent.setup();

        // Need to mock register to actually return input props
        mockRegister.mockImplementation((name: string) => ({
          name,
          onChange: jest.fn(),
          onBlur: jest.fn(),
          ref: jest.fn(),
        }));

        render(<NewPasswordSection />);

        const currentPasswordInput = screen.getByLabelText(/current password/i);
        await user.type(currentPasswordInput, 'oldpassword123');

        expect(currentPasswordInput).toHaveValue('oldpassword123');
      });

      it('should allow typing in new password field', async () => {
        const user = userEvent.setup();

        mockRegister.mockImplementation((name: string) => ({
          name,
          onChange: jest.fn(),
          onBlur: jest.fn(),
          ref: jest.fn(),
        }));

        render(<NewPasswordSection />);

        const newPasswordInput = screen.getByLabelText(/new password/i);
        await user.type(newPasswordInput, 'newpassword456');

        expect(newPasswordInput).toHaveValue('newpassword456');
      });

      it('should allow typing in confirm password field', async () => {
        const user = userEvent.setup();

        mockRegister.mockImplementation((name: string) => ({
          name,
          onChange: jest.fn(),
          onBlur: jest.fn(),
          ref: jest.fn(),
        }));

        render(<NewPasswordSection />);

        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        await user.type(confirmPasswordInput, 'newpassword456');

        expect(confirmPasswordInput).toHaveValue('newpassword456');
      });
    });

    describe('Accessibility', () => {
      it('should have associated labels for all inputs', () => {
        render(<NewPasswordSection />);

        expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      });

      it('should have proper id attributes for inputs', () => {
        render(<NewPasswordSection />);

        expect(screen.getByLabelText(/current password/i)).toHaveAttribute('id', 'currentPassword');
        expect(screen.getByLabelText(/new password/i)).toHaveAttribute('id', 'password');
        expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('id', 'confirmPassword');
      });
    });
  });
});
