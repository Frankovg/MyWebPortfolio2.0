import { render, screen } from '@testing-library/react';

import { CustomGlobalError } from '../custom-global-error';

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  },
}));

describe('CustomGlobalError', () => {
  const defaultProps = {
    description: 'Something went wrong',
    href: '/dashboard',
    label: 'Go to Dashboard',
  };

  it('should render description', () => {
    render(<CustomGlobalError {...defaultProps} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render link with correct href', () => {
    render(<CustomGlobalError {...defaultProps} />);

    const link = screen.getByRole('link', { name: 'Go to Dashboard' });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('should render custom label on link', () => {
    render(<CustomGlobalError {...defaultProps} label="Return Home" />);

    expect(screen.getByRole('link', { name: 'Return Home' })).toBeInTheDocument();
  });

  it('should render explanation text', () => {
    render(<CustomGlobalError {...defaultProps} />);

    expect(screen.getByText('The link might be corrupted.')).toBeInTheDocument();
    expect(screen.getByText('or the page may have been removed')).toBeInTheDocument();
  });

  it('should render warning icon', () => {
    render(<CustomGlobalError {...defaultProps} />);

    const container = screen.getByText('Something went wrong').parentElement;
    expect(container?.querySelector('svg')).toBeInTheDocument();
  });

  it('should render with different props', () => {
    render(
      <CustomGlobalError
        description="Page not available"
        href="/login"
        label="Sign In"
      />
    );

    expect(screen.getByText('Page not available')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/login');
  });
});
