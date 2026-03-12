import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { deleteFolder, renameFolder } from '@/actions/media-library-actions';

import EditFolderModal from '../edit-folder-modal';

jest.mock('sonner', () => require('@/__mocks__/test-utils').mockSonner);

jest.mock('@/components/primitives/spinner', () => ({
  Spinner: () => <div role="status" data-testid="spinner">Loading...</div>,
}));

jest.mock('@/actions/media-library-actions', () => ({
  renameFolder: jest.fn(),
  deleteFolder: jest.fn(),
}));

jest.mock('@/utils/showErrorMessage', () => ({
  showErrorMessage: jest.fn(),
}));


const mockRenameFolder = renameFolder as jest.MockedFunction<typeof renameFolder>;
const mockDeleteFolder = deleteFolder as jest.MockedFunction<typeof deleteFolder>;

describe('EditFolderModal', () => {
  const defaultProps = {
    currentFolder: 'projects/photos',
    onFolderUpdated: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockRenameFolder.mockResolvedValue({ success: true });
    mockDeleteFolder.mockResolvedValue(undefined);
  });

  afterEach(async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  describe('Trigger', () => {
    it('should render edit folder button', () => {
      render(<EditFolderModal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /edit folder/i })).toBeInTheDocument();
    });

    it('should open dialog on click', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));

      expect(screen.getByRole('heading', { name: 'Edit folder' })).toBeInTheDocument();
    });
  });

  describe('Dialog Content', () => {
    it('should show folder name in description', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));

      expect(screen.getByText(/photos/)).toBeInTheDocument();
    });

    it('should pre-fill input with current folder name', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));

      expect(screen.getByDisplayValue('photos')).toBeInTheDocument();
    });

    it('should disable Rename when name unchanged', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));

      expect(screen.getByRole('button', { name: /rename/i })).toBeDisabled();
    });

    it('should enable Rename when name changes', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));
      await user.type(screen.getByPlaceholderText('Folder name'), 'new-name');

      expect(screen.getByRole('button', { name: /rename/i })).not.toBeDisabled();
    });

    it('should disable Rename when input is empty', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));

      expect(screen.getByRole('button', { name: /rename/i })).toBeDisabled();
    });
  });

  describe('Rename Flow', () => {
    it('should call renameFolder with correct paths', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));
      await user.type(screen.getByPlaceholderText('Folder name'), 'images');
      await user.click(screen.getByRole('button', { name: /rename/i }));

      await waitFor(() => {
        expect(mockRenameFolder).toHaveBeenCalledWith(
          'projects/photos',
          'projects/images'
        );
      });
    });

    it('should call onFolderUpdated with new path on success', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));
      await user.type(screen.getByPlaceholderText('Folder name'), 'images');
      await user.click(screen.getByRole('button', { name: /rename/i }));

      await waitFor(() => {
        expect(defaultProps.onFolderUpdated).toHaveBeenCalledWith('projects/images');
      });
    });

    it('should rename on Enter key', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));
      await user.type(screen.getByPlaceholderText('Folder name'), 'renamed{Enter}');

      await waitFor(() => {
        expect(mockRenameFolder).toHaveBeenCalledWith(
          'projects/photos',
          'projects/renamed'
        );
      });
    });

    it('should handle root-level folder rename', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} currentFolder="photos" />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));
      await user.type(screen.getByPlaceholderText('Folder name'), 'images');
      await user.click(screen.getByRole('button', { name: /rename/i }));

      await waitFor(() => {
        expect(mockRenameFolder).toHaveBeenCalledWith('photos', 'images');
      });
    });

    it('should show error on rename failure', async () => {
      const { showErrorMessage } = require('@/utils/showErrorMessage');
      mockRenameFolder.mockResolvedValue({ message: 'Rename failed' });

      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));
      await user.type(screen.getByPlaceholderText('Folder name'), 'new');
      await user.click(screen.getByRole('button', { name: /rename/i }));

      await waitFor(() => {
        expect(showErrorMessage).toHaveBeenCalledWith({ message: 'Rename failed' });
      });
    });
  });

  describe('Delete Flow', () => {
    it('should show Delete folder button in edit dialog', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));

      expect(screen.getByRole('button', { name: /delete folder/i })).toBeInTheDocument();
    });

    it('should open delete confirmation modal', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.click(screen.getByRole('button', { name: /delete folder/i }));

      expect(screen.getByText(/Are you sure you want to delete "photos" and ALL its contents/)).toBeInTheDocument();
    });

    it('should call deleteFolder and onFolderUpdated on delete confirmation', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.click(screen.getByRole('button', { name: /delete folder/i }));
      await user.click(screen.getByRole('button', { name: /accept/i }));

      await waitFor(() => {
        expect(mockDeleteFolder).toHaveBeenCalledWith('projects/photos');
      });

      await waitFor(() => {
        expect(defaultProps.onFolderUpdated).toHaveBeenCalledWith();
      });
    });
  });

  describe('Cancel', () => {
    it('should close dialog and reset name on Cancel', async () => {
      const user = userEvent.setup();
      render(<EditFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      await user.clear(screen.getByDisplayValue('photos'));
      await user.type(screen.getByPlaceholderText('Folder name'), 'changed');
      await user.click(screen.getByRole('button', { name: /cancel/i }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });

      // Re-open to verify reset
      await user.click(screen.getByRole('button', { name: /edit folder/i }));
      expect(screen.getByDisplayValue('photos')).toBeInTheDocument();
    });
  });
});
