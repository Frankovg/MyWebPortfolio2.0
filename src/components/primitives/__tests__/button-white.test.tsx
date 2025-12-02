import { render, screen } from '@testing-library/react';

import ButtonWhite from '../button-white';

describe('ButtonWhite', () => {
  it('should render with text', () => {
    render(<ButtonWhite text="Submit" loading={false} />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should render spinner when loading', () => {
    render(<ButtonWhite text="Submit" loading={true} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('should not show spinner when not loading', () => {
    render(<ButtonWhite text="Submit" loading={false} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<ButtonWhite text="Submit" loading={false} disabled={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have type button by default', () => {
    render(<ButtonWhite text="Submit" loading={false} />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should accept type submit', () => {
    render(<ButtonWhite text="Submit" loading={false} type="submit" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should apply custom className', () => {
    render(<ButtonWhite text="Submit" loading={false} className="custom-class" />);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
