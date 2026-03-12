import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createFolder } from '@/actions/media-library-actions';

import AddFolderModal from '../add-folder-modal';

jest.mock('sonner', () => require('@/__mocks__/test-utils').mockSonner);

jest.mock('@/components/primitives/spinner', () => ({
  Spinner: () => <div role="status" data-testid="spinner">Loading...</div>,
}));

jest.mock('@/actions/media-library-actions', () => ({
  createFolder: jest.fn(),
}));

jest.mock('@/utils/showErrorMessage', () => ({
  showErrorMessage: jest.fn(),
}));


const mockCreateFolder = createFolder as jest.MockedFunction<typeof createFolder>;

describe('AddFolderModal', () => {
  const defaultProps = {
    currentFolder: '',
    onFolderCreated: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateFolder.mockResolvedValue({ success: true });
  });

  afterEach(async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  describe('Trigger', () => {
    it('should render trigger button', () => {
      render(<AddFolderModal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /add folder/i })).toBeInTheDocument();
    });

    it('should open dialog when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));

      expect(screen.getByText('Create folder')).toBeInTheDocument();
    });
  });

  describe('Dialog Content', () => {
    it('should show root folder description when at root', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));

      expect(screen.getByText('Create a new root folder')).toBeInTheDocument();
    });

    it('should show subfolder description when in a folder', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} currentFolder="projects" />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));

      expect(screen.getByText('Create a subfolder inside projects/')).toBeInTheDocument();
    });

    it('should render folder name input', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));

      expect(screen.getByPlaceholderText('Folder name')).toBeInTheDocument();
    });

    it('should disable Create button when input is empty', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));

      expect(screen.getByRole('button', { name: /create/i })).toBeDisabled();
    });

    it('should enable Create button when input has text', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'new-folder');

      expect(screen.getByRole('button', { name: /create/i })).not.toBeDisabled();
    });
  });

  describe('Create Flow', () => {
    it('should call createFolder with correct path at root', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'new-folder');
      await user.click(screen.getByRole('button', { name: /create/i }));

      await waitFor(() => {
        expect(mockCreateFolder).toHaveBeenCalledWith('new-folder');
      });
    });

    it('should call createFolder with nested path inside folder', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} currentFolder="projects" />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'subfolder');
      await user.click(screen.getByRole('button', { name: /create/i }));

      await waitFor(() => {
        expect(mockCreateFolder).toHaveBeenCalledWith('projects/subfolder');
      });
    });

    it('should call onFolderCreated on success', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'new-folder');
      await user.click(screen.getByRole('button', { name: /create/i }));

      await waitFor(() => {
        expect(defaultProps.onFolderCreated).toHaveBeenCalled();
      });
    });

    it('should show success toast on creation', async () => {
      const { mockSonner } = require('@/__mocks__/test-utils');
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'new-folder');
      await user.click(screen.getByRole('button', { name: /create/i }));

      await waitFor(() => {
        expect(mockSonner.toast.success).toHaveBeenCalledWith('Folder "new-folder" created');
      });
    });

    it('should create folder on Enter key press', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'new-folder{Enter}');

      await waitFor(() => {
        expect(mockCreateFolder).toHaveBeenCalledWith('new-folder');
      });
    });

    it('should show error when createFolder fails', async () => {
      const { showErrorMessage } = require('@/utils/showErrorMessage');
      mockCreateFolder.mockResolvedValue({ message: 'Folder already exists' });

      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'existing');
      await user.click(screen.getByRole('button', { name: /create/i }));

      await waitFor(() => {
        expect(showErrorMessage).toHaveBeenCalledWith({ message: 'Folder already exists' });
      });
    });
  });

  describe('Cancel', () => {
    it('should close dialog and reset input on Cancel', async () => {
      const user = userEvent.setup();
      render(<AddFolderModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /add folder/i }));
      await user.type(screen.getByPlaceholderText('Folder name'), 'test');
      await user.click(screen.getByRole('button', { name: /cancel/i }));

      // Dialog should be closed
      await waitFor(() => {
        expect(screen.queryByText('Create folder')).not.toBeInTheDocument();
      });
    });
  });
});
