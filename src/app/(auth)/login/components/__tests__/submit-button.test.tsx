import { render, screen } from '@testing-library/react';

import { SubmitButton } from '../submit-button';

describe('SubmitButton', () => {
  describe('when not pending', () => {
    it('should render the login text', () => {
      render(<SubmitButton isPending={false} />);

      expect(screen.getByText('Log in')).toBeInTheDocument();
    });

    it('should not be disabled', () => {
      render(<SubmitButton isPending={false} />);

      const button = screen.getByRole('button', { name: /log in/i });
      expect(button).not.toBeDisabled();
    });

    it('should have type submit', () => {
      render(<SubmitButton isPending={false} />);

      const button = screen.getByRole('button', { name: /log in/i });
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('when pending', () => {
    it('should show spinner when loading', () => {
      render(<SubmitButton isPending={true} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should be disabled', () => {
      render(<SubmitButton isPending={true} />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should not show login text when loading', () => {
      render(<SubmitButton isPending={true} />);

      expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should be focusable when not pending', () => {
      render(<SubmitButton isPending={false} />);

      const button = screen.getByRole('button', { name: /log in/i });
      button.focus();
      expect(button).toHaveFocus();
    });
  });
});
