import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DeleteModal from '../delete-modal';

// Mock the Spinner component
jest.mock('@/components/primitives/spinner', () => ({
  Spinner: () => <div role="status" data-testid="spinner">Loading...</div>,
}));

describe('DeleteModal', () => {
  const defaultProps = {
    close: jest.fn(),
    isOpen: true,
    title: 'Delete Item',
    subtitle: 'Are you sure you want to delete this item?',
    deleteFile: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Allow any pending state updates to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  describe('Rendering', () => {
    it('should render the modal when isOpen is true', () => {
      render(<DeleteModal {...defaultProps} />);

      expect(screen.getByText('Delete Item')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    });

    it('should not render content when isOpen is false', () => {
      render(<DeleteModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Delete Item')).not.toBeInTheDocument();
    });

    it('should render Cancel button', () => {
      render(<DeleteModal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('should render Accept button', () => {
      render(<DeleteModal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument();
    });

    it('should display the provided title', () => {
      render(<DeleteModal {...defaultProps} title="Custom Title" />);

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should display the provided subtitle', () => {
      render(<DeleteModal {...defaultProps} subtitle="Custom subtitle text" />);

      expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call close when Cancel button is clicked', async () => {
      const user = userEvent.setup();
      render(<DeleteModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /cancel/i }));

      expect(defaultProps.close).toHaveBeenCalledTimes(1);
    });

    it('should call deleteFile and close when Accept is clicked', async () => {
      const user = userEvent.setup();
      const deleteFile = jest.fn().mockResolvedValue(undefined);
      const close = jest.fn();

      render(<DeleteModal {...defaultProps} deleteFile={deleteFile} close={close} />);

      await user.click(screen.getByRole('button', { name: /accept/i }));

      await waitFor(() => {
        expect(deleteFile).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(close).toHaveBeenCalledTimes(1);
      });
    });

    it('should show spinner while deletion is pending', async () => {
      const user = userEvent.setup();
      let resolveDelete: () => void;
      const deleteFile = jest.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
          resolveDelete = resolve;
        });
      });

      render(<DeleteModal {...defaultProps} deleteFile={deleteFile} />);

      await user.click(screen.getByRole('button', { name: /accept/i }));

      await waitFor(() => {
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
      });

      // Resolve the promise and wait for state updates
      await act(async () => {
        resolveDelete!();
      });
    });

    it('should not show Accept text while pending', async () => {
      const user = userEvent.setup();
      let resolveDelete: () => void;
      const deleteFile = jest.fn().mockImplementation(() => {
        return new Promise<void>((resolve) => {
          resolveDelete = resolve;
        });
      });

      render(<DeleteModal {...defaultProps} deleteFile={deleteFile} />);

      await user.click(screen.getByRole('button', { name: /accept/i }));

      await waitFor(() => {
        expect(screen.queryByText('Accept')).not.toBeInTheDocument();
      });

      // Resolve the promise and wait for state updates
      await act(async () => {
        resolveDelete!();
      });
    });
  });

  describe('Delete Flow', () => {
    it('should complete full delete flow: click accept -> deleteFile called -> close called', async () => {
      const user = userEvent.setup();
      const callOrder: string[] = [];
      const deleteFile = jest.fn().mockImplementation(async () => {
        callOrder.push('deleteFile');
      });
      const close = jest.fn().mockImplementation(() => {
        callOrder.push('close');
      });

      render(<DeleteModal {...defaultProps} deleteFile={deleteFile} close={close} />);

      await user.click(screen.getByRole('button', { name: /accept/i }));

      await waitFor(() => {
        expect(callOrder).toEqual(['deleteFile', 'close']);
      });
    });

    it('should call deleteFile when Accept is clicked even with async operation', async () => {
      const user = userEvent.setup();
      const deleteFile = jest.fn().mockResolvedValue(undefined);
      const close = jest.fn();

      render(<DeleteModal {...defaultProps} deleteFile={deleteFile} close={close} />);

      await user.click(screen.getByRole('button', { name: /accept/i }));

      await waitFor(() => {
        expect(deleteFile).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(close).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible dialog role', () => {
      render(<DeleteModal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have accessible title as heading', () => {
      render(<DeleteModal {...defaultProps} />);

      expect(screen.getByRole('heading', { name: 'Delete Item' })).toBeInTheDocument();
    });
  });
});
