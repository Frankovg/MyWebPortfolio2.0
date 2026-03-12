import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import UploadModalContent from '../upload-modal-content';

import type { FilePreview } from '../../types/types';

jest.mock('next/image', () => require('@/__mocks__/test-utils').mockNextImage);

// Mock URL.createObjectURL and revokeObjectURL
const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = jest.fn();
global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

describe('UploadModalContent', () => {
  const defaultProps = {
    files: [] as FilePreview[],
    setFiles: jest.fn(),
    setSizeError: jest.fn(),
    inputRef: createRef<HTMLInputElement>(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render file input', () => {
      const { container } = render(<UploadModalContent {...defaultProps} />);

      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('accept', 'image/png, image/webp, .pdf');
      expect(input).toHaveAttribute('multiple');
    });

    it('should not render preview grid when no files', () => {
      const { container } = render(<UploadModalContent {...defaultProps} />);

      expect(container.querySelector('.grid')).not.toBeInTheDocument();
    });

    it('should not render size error when not present', () => {
      render(<UploadModalContent {...defaultProps} />);

      expect(screen.queryByText(/exceeded/)).not.toBeInTheDocument();
    });
  });

  describe('Size Error', () => {
    it('should display size error message', () => {
      render(
        <UploadModalContent
          {...defaultProps}
          sizeError="large-file.png exceeded 4.5MB limit"
        />
      );

      expect(screen.getByText('large-file.png exceeded 4.5MB limit')).toBeInTheDocument();
    });

    it('should render error in danger color', () => {
      render(
        <UploadModalContent
          {...defaultProps}
          sizeError="file.png exceeded 4.5MB limit"
        />
      );

      const errorEl = screen.getByText('file.png exceeded 4.5MB limit');
      expect(errorEl).toHaveClass('text-danger');
    });
  });

  describe('File Selection', () => {
    it('should call setFiles with valid files on selection', async () => {
      const user = userEvent.setup();
      const setFiles = jest.fn();
      const { container } = render(
        <UploadModalContent {...defaultProps} setFiles={setFiles} />
      );

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'photo.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 });

      await user.upload(input, file);

      expect(setFiles).toHaveBeenCalled();
      expect(defaultProps.setSizeError).toHaveBeenCalledWith(null);
    });

    it('should set size error for files exceeding 4.5MB', async () => {
      const user = userEvent.setup();
      const setSizeError = jest.fn();
      const { container } = render(
        <UploadModalContent {...defaultProps} setSizeError={setSizeError} />
      );

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['content'], 'huge.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 5 * 1024 * 1024 }); // 5MB

      await user.upload(input, file);

      expect(setSizeError).toHaveBeenCalledWith('huge.png exceeded 4.5MB limit');
    });
  });

  describe('File Previews', () => {
    const filesWithPreviews: FilePreview[] = [
      {
        file: new File(['content'], 'photo1.png', { type: 'image/png' }),
        previewUrl: 'blob:photo1-url',
      },
      {
        file: new File(['content'], 'doc.pdf', { type: 'application/pdf' }),
        previewUrl: 'blob:doc-url',
      },
    ];

    it('should render preview grid when files exist', () => {
      const { container } = render(
        <UploadModalContent {...defaultProps} files={filesWithPreviews} />
      );

      expect(container.querySelector('.grid')).toBeInTheDocument();
    });

    it('should render image preview for image files', () => {
      render(
        <UploadModalContent {...defaultProps} files={[filesWithPreviews[0]]} />
      );

      expect(screen.getByAltText('photo1.png')).toBeInTheDocument();
    });

    it('should render remove button for each preview', () => {
      render(
        <UploadModalContent {...defaultProps} files={filesWithPreviews} />
      );

      const removeButtons = screen.getAllByRole('button');
      expect(removeButtons).toHaveLength(2);
    });

    it('should call setFiles to remove file when X is clicked', async () => {
      const user = userEvent.setup();
      const setFiles = jest.fn();
      render(
        <UploadModalContent
          {...defaultProps}
          files={filesWithPreviews}
          setFiles={setFiles}
        />
      );

      const removeButtons = screen.getAllByRole('button');
      await user.click(removeButtons[0]);

      expect(setFiles).toHaveBeenCalled();
    });
  });
});
