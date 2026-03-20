import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { uploadMedia } from '@/actions/media-library-actions';

import UploadModal from '../upload-modal';

jest.mock('next/image', () => require('@/__mocks__/test-utils').mockNextImage);
jest.mock('sonner', () => require('@/__mocks__/test-utils').mockSonner);

jest.mock('@/components/primitives/spinner', () => ({
  Spinner: () => <div role="status" data-testid="spinner">Loading...</div>,
}));

jest.mock('@/actions/media-library-actions', () => ({
  uploadMedia: jest.fn(),
}));

jest.mock('@/utils/showErrorMessage', () => ({
  showErrorMessage: jest.fn(),
}));

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();


const mockUploadMedia = uploadMedia as jest.MockedFunction<typeof uploadMedia>;

describe('UploadModal', () => {
  const defaultProps = {
    currentFolder: '',
    onUploadComplete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadMedia.mockResolvedValue({
      success: true,
      resource: {
        public_id: 'test/uploaded',
        secure_url: 'https://example.com/uploaded.jpg',
        format: 'jpg',
        width: 800,
        height: 600,
        bytes: 1024,
        created_at: '2026-01-01T00:00:00Z',
        resource_type: 'image',
      },
    });
  });

  afterEach(async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  describe('Trigger', () => {
    it('should render upload trigger button', () => {
      render(<UploadModal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
    });

    it('should open dialog on click', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      expect(screen.getByText('Upload images')).toBeInTheDocument();
    });
  });

  describe('Dialog Content', () => {
    it('should show root folder description when at root', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      expect(screen.getByText('Upload to root folder')).toBeInTheDocument();
    });

    it('should show folder path in description', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} currentFolder="projects" />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      expect(screen.getByText('Upload to projects/')).toBeInTheDocument();
    });

    it('should disable upload button when no files selected', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      // Find upload button in footer (not the trigger)
      const buttons = screen.getAllByRole('button');
      const uploadButton = buttons.find(
        (btn) => btn.textContent?.includes('Upload') && btn !== screen.getByRole('button', { name: /cancel/i })
      );
      expect(uploadButton).toBeDisabled();
    });
  });

  describe('Upload Flow', () => {
    it('should call uploadMedia for each file', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      // Open dialog
      await user.click(screen.getByRole('button', { name: /upload/i }));

      // Add a file via input
      const input = screen.getByRole('dialog').querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'photo.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 });
      await user.upload(input, file);

      // Click the upload button in footer
      const uploadBtn = screen.getAllByRole('button').find(
        (btn) => btn.textContent?.match(/Upload \d/)
      );
      expect(uploadBtn).toBeDefined();
      await user.click(uploadBtn!);

      await waitFor(() => {
        expect(mockUploadMedia).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onUploadComplete with uploaded resources', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      const input = screen.getByRole('dialog').querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'photo.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 });
      await user.upload(input, file);

      const uploadBtn = screen.getAllByRole('button').find(
        (btn) => btn.textContent?.match(/Upload \d/)
      );
      await user.click(uploadBtn!);

      await waitFor(() => {
        expect(defaultProps.onUploadComplete).toHaveBeenCalledWith([
          expect.objectContaining({ public_id: 'test/uploaded' }),
        ]);
      });
    });

    it('should show success toast after upload', async () => {
      const { mockSonner } = require('@/__mocks__/test-utils');
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      const input = screen.getByRole('dialog').querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'photo.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 });
      await user.upload(input, file);

      const uploadBtn = screen.getAllByRole('button').find(
        (btn) => btn.textContent?.match(/Upload \d/)
      );
      await user.click(uploadBtn!);

      await waitFor(() => {
        expect(mockSonner.toast.success).toHaveBeenCalledWith('1 image uploaded');
      });
    });

    it('should show error when upload fails', async () => {
      const { showErrorMessage } = require('@/utils/showErrorMessage');
      mockUploadMedia.mockResolvedValue({ message: 'Upload failed' });

      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      const input = screen.getByRole('dialog').querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'photo.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 });
      await user.upload(input, file);

      const uploadBtn = screen.getAllByRole('button').find(
        (btn) => btn.textContent?.match(/Upload \d/)
      );
      await user.click(uploadBtn!);

      await waitFor(() => {
        expect(showErrorMessage).toHaveBeenCalledWith({ message: 'Upload failed' });
      });
    });
  });

  describe('Cancel', () => {
    it('should close dialog on Cancel click', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));
      expect(screen.getByText('Upload images')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /cancel/i }));

      await waitFor(() => {
        expect(screen.queryByText('Upload images')).not.toBeInTheDocument();
      });
    });

    it('should revoke object URLs on close', async () => {
      const user = userEvent.setup();
      render(<UploadModal {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /upload/i }));

      // Add file
      const input = screen.getByRole('dialog').querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'photo.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 });
      await user.upload(input, file);

      // Cancel
      await user.click(screen.getByRole('button', { name: /cancel/i }));

      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });
  });
});
