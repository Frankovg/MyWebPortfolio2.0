import { render, screen } from '@testing-library/react';

import { Spinner } from '../spinner';

describe('Spinner', () => {
  it('should render with default medium size', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-6', 'h-6');
  });

  it('should render with small size', () => {
    render(<Spinner size="sm" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-4', 'h-4');
  });

  it('should render with large size', () => {
    render(<Spinner size="lg" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('should have accessible loading text for screen readers', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  it('should apply custom className', () => {
    render(<Spinner className="text-primary" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('text-primary');
  });

  it('should have spinning animation class', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('animate-spin');
  });
});
