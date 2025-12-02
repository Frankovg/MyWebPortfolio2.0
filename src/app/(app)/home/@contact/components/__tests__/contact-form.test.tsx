import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from '../contact-form';

class ResizeObserverMock {
  observe() { }
  unobserve() { }
  disconnect() { }
}
global.ResizeObserver = ResizeObserverMock;

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  },
}));

let mockSearchParams = new URLSearchParams();
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}));

jest.mock('@/actions/index', () => ({
  sendMail: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('should render submit button with Send text', () => {
      render(<ContactForm />);

      expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    });

    it('should render privacy policy checkbox', () => {
      render(<ContactForm />);

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should have link to privacy policy page', () => {
      render(<ContactForm />);

      const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
      expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
    });

    it('should show input placeholders', () => {
      render(<ContactForm />);

      expect(screen.getByPlaceholderText('John')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+34 608 222 555')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('john.doe@email.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type your message here.')).toBeInTheDocument();
    });

    it('should show Spanish message hint', () => {
      render(<ContactForm />);

      expect(screen.getByText(/también puedes escribirme en español/i)).toBeInTheDocument();
    });
  });

  describe('Form fields', () => {
    it('should allow typing in first name field', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.type(firstNameInput, 'John');

      expect(firstNameInput).toHaveValue('John');
    });

    it('should allow typing in last name field', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const lastNameInput = screen.getByLabelText(/last name/i);
      await user.type(lastNameInput, 'Doe');

      expect(lastNameInput).toHaveValue('Doe');
    });

    it('should allow typing in email field', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'john@example.com');

      expect(emailInput).toHaveValue('john@example.com');
    });

    it('should allow typing in phone field', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const phoneInput = screen.getByLabelText(/phone number/i);
      await user.type(phoneInput, '+34 608 222 555');

      expect(phoneInput).toHaveValue('+34 608 222 555');
    });

    it('should allow typing in message field', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'Hello, this is a test message');

      expect(messageInput).toHaveValue('Hello, this is a test message');
    });

    it('should toggle privacy policy checkbox', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const checkbox = screen.getByRole('checkbox');

      // Initially unchecked (aria-checked="false")
      expect(checkbox).toHaveAttribute('aria-checked', 'false');

      await user.click(checkbox);

      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Demo account request', () => {
    it('should show request message when request-demo-account param is present', () => {
      mockSearchParams = new URLSearchParams('request-demo-account=true');
      render(<ContactForm />);

      expect(screen.getByText(/request a demo account/i)).toBeInTheDocument();
    });

    it('should not show request message when param is not present', () => {
      mockSearchParams = new URLSearchParams();
      render(<ContactForm />);

      expect(screen.queryByText(/request a demo account/i)).not.toBeInTheDocument();
    });

    it('should pre-fill message with account request text when param is present', () => {
      mockSearchParams = new URLSearchParams('request-demo-account=true');
      render(<ContactForm />);

      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
      // The message should contain account request related text
      expect(messageInput.value).toContain('demo account');
    });
  });

  describe('Required fields', () => {
    it('should mark first name as required', () => {
      render(<ContactForm />);

      const label = screen.getByText(/first name/i);
      expect(label.parentElement?.textContent).toContain('*');
    });

    it('should mark last name as required', () => {
      render(<ContactForm />);

      const label = screen.getByText(/last name/i);
      expect(label.parentElement?.textContent).toContain('*');
    });

    it('should mark email as required', () => {
      render(<ContactForm />);

      const label = screen.getByText(/^email$/i);
      expect(label.parentElement?.textContent).toContain('*');
    });

    it('should mark message as required', () => {
      render(<ContactForm />);

      const label = screen.getByText(/^message$/i);
      expect(label.parentElement?.textContent).toContain('*');
    });

    it('should not mark phone as required', () => {
      render(<ContactForm />);

      const phoneLabel = screen.getByText(/phone number/i);
      expect(phoneLabel.textContent).not.toContain('*');
    });
  });

  describe('Submit button', () => {
    it('should have type submit', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});
