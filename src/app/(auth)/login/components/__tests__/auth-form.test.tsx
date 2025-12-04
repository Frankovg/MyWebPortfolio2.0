import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthForm from '../auth-form';

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className} data-testid="demo-link">
        {children}
      </a>
    );
  };
});

const mockLogIn = jest.fn();
let mockIsPending = false;
let mockError: { message: string } | undefined = undefined;

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useActionState: () => [mockError, mockLogIn, mockIsPending],
  };
});

jest.mock('@/actions/index', () => ({
  logIn: jest.fn(),
}));

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsPending = false;
    mockError = undefined;
  });

  describe('Rendering', () => {
    it('should render the form', () => {
      render(<AuthForm />);

      const form = screen.getByLabelText('Email').closest('form');
      expect(form).toBeInTheDocument();
    });

    it('should render email input', () => {
      render(<AuthForm />);

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('should render password input', () => {
      render(<AuthForm />);

      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<AuthForm />);

      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('should render demo account link', () => {
      render(<AuthForm />);

      const link = screen.getByTestId('demo-link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/contact?request-demo-account=true');
      expect(link).toHaveTextContent('Request a demo account');
    });

    it('should render inputs with correct attributes', () => {
      render(<AuthForm />);

      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('maxLength', '100');

      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveAttribute('name', 'password');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('maxLength', '100');
    });
  });

  describe('Form interaction', () => {
    it('should allow typing in email field', async () => {
      const user = userEvent.setup();
      render(<AuthForm />);

      const emailInput = screen.getByLabelText('Email');
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('should allow typing in password field', async () => {
      const user = userEvent.setup();
      render(<AuthForm />);

      const passwordInput = screen.getByLabelText('Password');
      await user.type(passwordInput, 'mypassword');

      expect(passwordInput).toHaveValue('mypassword');
    });
  });

  describe('Error display', () => {
    it('should not display error message when there is no error', () => {
      mockError = undefined;
      render(<AuthForm />);

      expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
    });

    it('should display error message when login fails', () => {
      mockError = { message: 'Invalid credentials.' };
      render(<AuthForm />);

      expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
    });

    it('should display generic error message', () => {
      mockError = { message: 'Error. Could not sign in.' };
      render(<AuthForm />);

      expect(screen.getByText('Error. Could not sign in.')).toBeInTheDocument();
    });

    it('should apply error styling to error message', () => {
      mockError = { message: 'Invalid credentials.' };
      render(<AuthForm />);

      const errorElement = screen.getByText('Invalid credentials.');
      expect(errorElement).toHaveClass('text-red-500');
    });
  });

  describe('Pending state', () => {
    it('should show spinner when pending', () => {
      mockIsPending = true;
      render(<AuthForm />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should disable button when pending', () => {
      mockIsPending = true;
      render(<AuthForm />);

      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();
    });

    it('should not show login text when pending', () => {
      mockIsPending = true;
      render(<AuthForm />);

      expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    });
  });

  describe('Form submission', () => {
    it('should have form with action handler', () => {
      render(<AuthForm />);

      const form = screen.getByLabelText('Email').closest('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have associated labels for inputs', () => {
      render(<AuthForm />);

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('should have required attribute on inputs', () => {
      render(<AuthForm />);

      expect(screen.getByLabelText('Email')).toHaveAttribute('required');
      expect(screen.getByLabelText('Password')).toHaveAttribute('required');
    });
  });
});
