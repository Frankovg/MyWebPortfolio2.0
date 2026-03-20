import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ImageCard from '../image-card';

import type { MediaResource } from '@/lib/types';


jest.mock('next/image', () => require('@/__mocks__/test-utils').mockNextImage);
jest.mock('sonner', () => require('@/__mocks__/test-utils').mockSonner);

jest.mock('@/components/primitives/spinner', () => ({
  Spinner: () => <div role="status" data-testid="spinner">Loading...</div>,
}));


const mockResource: MediaResource = {
  public_id: 'folder/test-image',
  secure_url: 'https://res.cloudinary.com/test/image/upload/folder/test-image.jpg',
  format: 'jpg',
  width: 800,
  height: 600,
  bytes: 102400,
  created_at: '2026-01-01T00:00:00Z',
  resource_type: 'image',
};

const mockPdfResource: MediaResource = {
  ...mockResource,
  public_id: 'folder/document',
  format: 'pdf',
  resource_type: 'image',
};

describe('ImageCard', () => {
  const defaultProps = {
    resource: mockResource,
    onDelete: jest.fn().mockResolvedValue(undefined),
    showButtons: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  describe('Rendering', () => {
    it('should render the image with correct alt text', () => {
      render(<ImageCard {...defaultProps} />);

      expect(screen.getByAltText('test-image')).toBeInTheDocument();
    });

    it('should display the filename extracted from public_id', () => {
      render(<ImageCard {...defaultProps} />);

      expect(screen.getByText('test-image')).toBeInTheDocument();
    });

    it('should display the format badge', () => {
      render(<ImageCard {...defaultProps} />);

      expect(screen.getByText('jpg')).toBeInTheDocument();
    });

    it('should render PdfCard for pdf resources', () => {
      render(<ImageCard {...defaultProps} resource={mockPdfResource} />);

      // Should not render an img element for PDFs
      expect(screen.queryByAltText('document')).not.toBeInTheDocument();
      expect(screen.getByText('pdf')).toBeInTheDocument();
    });

    it('should render external link pointing to secure_url', () => {
      render(<ImageCard {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', mockResource.secure_url);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('Action Buttons', () => {
    it('should render three action buttons', () => {
      render(<ImageCard {...defaultProps} showButtons />);

      // External link (as anchor), copy, delete
      const buttons = screen.getAllByRole('button');
      // 2 buttons (copy + delete) + 1 link
      expect(buttons.length).toBeGreaterThanOrEqual(2);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should copy URL and show success toast on copy click', async () => {
      const { mockSonner } = require('@/__mocks__/test-utils');
      const user = userEvent.setup();
      render(<ImageCard {...defaultProps} showButtons />);

      const buttons = screen.getAllByRole('button');
      await user.click(buttons[0]);

      // Toast fires only after await navigator.clipboard.writeText succeeds
      await waitFor(() => {
        expect(mockSonner.toast.success).toHaveBeenCalledWith('URL copied to clipboard');
      });
    });
  });

  describe('Delete Flow', () => {
    it('should open delete modal when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageCard {...defaultProps} showButtons />);

      const buttons = screen.getAllByRole('button');
      const deleteButton = buttons[buttons.length - 1]; // Last button is delete
      await user.click(deleteButton);

      expect(screen.getByText('Delete image')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete "test-image"/)).toBeInTheDocument();
    });

    it('should call onDelete with public_id when deletion is confirmed', async () => {
      const user = userEvent.setup();
      const onDelete = jest.fn().mockResolvedValue(undefined);
      render(<ImageCard {...defaultProps} onDelete={onDelete} showButtons />);

      // Open delete modal
      const buttons = screen.getAllByRole('button');
      await user.click(buttons[buttons.length - 1]);

      // Click Accept
      await user.click(screen.getByRole('button', { name: /accept/i }));

      await waitFor(() => {
        expect(onDelete).toHaveBeenCalledWith('folder/test-image');
      });
    });

    it('should close delete modal when Cancel is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageCard {...defaultProps} showButtons />);

      // Open delete modal
      const buttons = screen.getAllByRole('button');
      await user.click(buttons[buttons.length - 1]);

      expect(screen.getByText('Delete image')).toBeInTheDocument();

      // Click Cancel
      await user.click(screen.getByRole('button', { name: /cancel/i }));

      await waitFor(() => {
        expect(screen.queryByText('Delete image')).not.toBeInTheDocument();
      });
    });
  });
});
