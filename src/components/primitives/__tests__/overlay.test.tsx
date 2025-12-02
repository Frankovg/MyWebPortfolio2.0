import { render, screen } from '@testing-library/react';

import Overlay from '../overlay';

describe('Overlay', () => {
  it('should render with message', () => {
    render(<Overlay message="Loading..." />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display different messages', () => {
    const { rerender } = render(<Overlay message="Good Bye!" />);
    expect(screen.getByText('Good Bye!')).toBeInTheDocument();

    rerender(<Overlay message="Welcome!" />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  it('should have full screen styling', () => {
    render(<Overlay message="Test" />);

    const overlay = screen.getByText('Test').closest('div')?.parentElement;
    expect(overlay).toHaveClass('w-screen', 'h-screen');
  });

  it('should have animation classes', () => {
    render(<Overlay message="Test" />);

    const overlay = screen.getByText('Test').closest('div')?.parentElement;
    expect(overlay).toHaveClass('animate-fadeIn');
  });
});
