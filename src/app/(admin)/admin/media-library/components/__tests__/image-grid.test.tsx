import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupMatchMediaMock } from '@/__mocks__/test-utils';

import ImageGrid from '../image-grid';

import type { MediaResource } from '../../types/types';

jest.mock('next/image', () => require('@/__mocks__/test-utils').mockNextImage);
jest.mock('sonner', () => require('@/__mocks__/test-utils').mockSonner);

jest.mock('@/components/primitives/spinner', () => ({
  Spinner: () => <div role="status" data-testid="spinner">Loading...</div>,
}));

const createResource = (id: string): MediaResource => ({
  public_id: `folder/${id}`,
  secure_url: `https://example.com/${id}.jpg`,
  format: 'jpg',
  width: 800,
  height: 600,
  bytes: 1024,
  created_at: '2026-01-01T00:00:00Z',
  resource_type: 'image',
});

describe('ImageGrid', () => {
  const defaultProps = {
    resources: [createResource('img1'), createResource('img2')],
    onDelete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Default: mobile viewport (matches = false for min-width: 1024px)
    setupMatchMediaMock(false);
  });

  describe('Empty State', () => {
    it('should render empty message when no resources', () => {
      render(<ImageGrid resources={[]} onDelete={jest.fn()} />);

      expect(screen.getByText('No images in this folder')).toBeInTheDocument();
    });

    it('should not render grid when no resources', () => {
      const { container } = render(<ImageGrid resources={[]} onDelete={jest.fn()} />);

      expect(container.querySelector('.grid')).not.toBeInTheDocument();
    });
  });

  describe('Rendering Resources', () => {
    it('should render an ImageCard for each resource', () => {
      render(<ImageGrid {...defaultProps} />);

      expect(screen.getByText('img1')).toBeInTheDocument();
      expect(screen.getByText('img2')).toBeInTheDocument();
    });

    it('should render the grid container', () => {
      const { container } = render(<ImageGrid {...defaultProps} />);

      expect(container.querySelector('.grid')).toBeInTheDocument();
    });
  });

  describe('Show Buttons Toggle', () => {
    it('should render switch on mobile viewport', () => {
      render(<ImageGrid {...defaultProps} />);

      expect(screen.getByRole('switch')).toBeInTheDocument();
      expect(screen.getByText('Show buttons')).toBeInTheDocument();
    });

    it('should default showButtons to true on mobile (matches=false)', () => {
      render(<ImageGrid {...defaultProps} />);

      const switchEl = screen.getByRole('switch');
      // On mobile (!matches), showButtons = !false = true
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
    });

    it('should default showButtons to false on desktop (matches=true)', () => {
      setupMatchMediaMock(true);
      render(<ImageGrid {...defaultProps} />);

      const switchEl = screen.getByRole('switch');
      // On desktop (matches), showButtons = !true = false
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    it('should toggle showButtons when switch is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageGrid {...defaultProps} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'true');

      await user.click(switchEl);

      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    it('should toggle showButtons when label text is clicked', async () => {
      const user = userEvent.setup();
      render(<ImageGrid {...defaultProps} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl).toHaveAttribute('aria-checked', 'true');

      await user.click(screen.getByText('Show buttons'));

      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });
});
