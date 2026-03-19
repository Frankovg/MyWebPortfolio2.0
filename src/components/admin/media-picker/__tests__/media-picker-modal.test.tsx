import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MediaPickerModal from '../media-picker-modal';

import type { MediaLibraryData } from '@/app/(admin)/admin/media-library/types/types';

jest.mock('next/image', () => require('@/__mocks__/test-utils').mockNextImage);

const mockFetchData = jest.fn();
const mockClearSearch = jest.fn();
const mockHandleSearch = jest.fn();
const mockSetData = jest.fn();

const mockData: MediaLibraryData = {
  resources: [
    {
      public_id: 'folder/photo1',
      secure_url: 'https://example.com/photo1.jpg',
      format: 'jpg',
      width: 800,
      height: 600,
      bytes: 1024,
      created_at: '2026-01-01T00:00:00Z',
      resource_type: 'image',
    },
    {
      public_id: 'folder/photo2',
      secure_url: 'https://example.com/photo2.png',
      format: 'png',
      width: 400,
      height: 300,
      bytes: 2048,
      created_at: '2026-01-02T00:00:00Z',
      resource_type: 'image',
    },
    {
      public_id: 'folder/document',
      secure_url: 'https://example.com/document.pdf',
      format: 'pdf',
      width: 0,
      height: 0,
      bytes: 5000,
      created_at: '2026-01-03T00:00:00Z',
      resource_type: 'image',
    },
  ],
  folders: [],
  currentFolder: '',
};

jest.mock('@/hooks/use-media-library-data', () => ({
  useMediaLibraryData: () => ({
    data: mockData,
    setData: mockSetData,
    isLoading: false,
    fetchData: mockFetchData,
  }),
}));

jest.mock('@/hooks/use-media-search', () => ({
  useMediaSearch: () => ({
    searchQuery: '',
    handleSearch: mockHandleSearch,
    clearSearch: mockClearSearch,
    isSearching: false,
  }),
}));

jest.mock('@/utils/showErrorMessage', () => ({
  showErrorMessage: jest.fn(),
}));

describe('MediaPickerModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Trigger button', () => {
    it('should render default image trigger button', () => {
      render(<MediaPickerModal onSelect={jest.fn()} />);

      expect(screen.getByRole('button', { name: 'Browse media library' })).toBeInTheDocument();
    });

    it('should render custom trigger when provided', () => {
      render(
        <MediaPickerModal
          onSelect={jest.fn()}
          trigger={<button>Custom trigger</button>}
        />
      );

      expect(screen.getByRole('button', { name: 'Custom trigger' })).toBeInTheDocument();
      expect(screen.queryByLabelText('Browse media library')).not.toBeInTheDocument();
    });
  });

  describe('Dialog opening', () => {
    it('should open dialog and fetch data on trigger click', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal onSelect={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByText('Media Library')).toBeInTheDocument();
      });

      expect(mockFetchData).toHaveBeenCalledWith('');
      expect(mockClearSearch).toHaveBeenCalled();
    });

    it('should show Cancel and Select buttons in dialog', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal onSelect={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();
      });
    });

    it('should have Select button disabled when nothing is selected', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal onSelect={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Select' })).toBeDisabled();
      });
    });
  });

  describe('File filtering', () => {
    it('should show only images by default (exclude PDFs)', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal onSelect={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
        expect(screen.getByAltText('photo2')).toBeInTheDocument();
        expect(screen.queryByText('document')).not.toBeInTheDocument();
      });
    });

    it('should show only PDFs when fileFilter is "pdf"', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal onSelect={jest.fn()} fileFilter="pdf" />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.queryByAltText('photo1')).not.toBeInTheDocument();
        expect(screen.queryByAltText('photo2')).not.toBeInTheDocument();
        expect(screen.getByText('document')).toBeInTheDocument();
      });
    });
  });

  describe('Single selection mode', () => {
    it('should select an image on click', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal onSelect={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      // Click to select first image
      const imageButton = screen.getByAltText('photo1').closest('button')!;
      await user.click(imageButton);

      // Select button should be enabled
      expect(screen.getByRole('button', { name: 'Select' })).toBeEnabled();
    });

    it('should deselect when clicking the same image again', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal onSelect={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      const imageButton = screen.getByAltText('photo1').closest('button')!;

      // Select then deselect
      await user.click(imageButton);
      await user.click(imageButton);

      expect(screen.getByRole('button', { name: 'Select' })).toBeDisabled();
    });

    it('should replace selection when clicking a different image in single mode', async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();
      render(<MediaPickerModal onSelect={onSelect} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      // Select first image
      await user.click(screen.getByAltText('photo1').closest('button')!);
      // Select second image (should replace)
      await user.click(screen.getByAltText('photo2').closest('button')!);

      // Confirm selection
      await user.click(screen.getByRole('button', { name: 'Select' }));

      expect(onSelect).toHaveBeenCalledWith('https://example.com/photo2.png');
    });

    it('should call onSelect with the selected URL on confirm', async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();
      render(<MediaPickerModal onSelect={onSelect} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      await user.click(screen.getByAltText('photo1').closest('button')!);
      await user.click(screen.getByRole('button', { name: 'Select' }));

      expect(onSelect).toHaveBeenCalledWith('https://example.com/photo1.jpg');
    });
  });

  describe('Multiple selection mode', () => {
    it('should allow selecting multiple images', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal multiple onSelectMultiple={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      await user.click(screen.getByAltText('photo1').closest('button')!);
      await user.click(screen.getByAltText('photo2').closest('button')!);

      // Button should show count
      expect(screen.getByRole('button', { name: 'Select (2)' })).toBeEnabled();
    });

    it('should toggle off a selected image in multiple mode', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal multiple onSelectMultiple={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      // Select both
      await user.click(screen.getByAltText('photo1').closest('button')!);
      await user.click(screen.getByAltText('photo2').closest('button')!);
      expect(screen.getByRole('button', { name: 'Select (2)' })).toBeInTheDocument();

      // Deselect one
      await user.click(screen.getByAltText('photo1').closest('button')!);
      expect(screen.getByRole('button', { name: 'Select (1)' })).toBeInTheDocument();
    });

    it('should call onSelectMultiple with all selected URLs', async () => {
      const user = userEvent.setup();
      const onSelectMultiple = jest.fn();
      render(<MediaPickerModal multiple onSelectMultiple={onSelectMultiple} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      await user.click(screen.getByAltText('photo1').closest('button')!);
      await user.click(screen.getByAltText('photo2').closest('button')!);
      await user.click(screen.getByRole('button', { name: 'Select (2)' }));

      expect(onSelectMultiple).toHaveBeenCalledWith(
        expect.arrayContaining([
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.png',
        ])
      );
      expect(onSelectMultiple.mock.calls[0][0]).toHaveLength(2);
    });

    it('should show "Select" without count when nothing is selected in multiple mode', async () => {
      const user = userEvent.setup();
      render(<MediaPickerModal multiple onSelectMultiple={jest.fn()} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Select' })).toBeDisabled();
      });
    });
  });

  describe('Cancel behavior', () => {
    it('should close dialog and clear selection on cancel', async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();
      render(<MediaPickerModal onSelect={onSelect} />);

      await user.click(screen.getByRole('button', { name: 'Browse media library' }));

      await waitFor(() => {
        expect(screen.getByAltText('photo1')).toBeInTheDocument();
      });

      // Select something then cancel
      await user.click(screen.getByAltText('photo1').closest('button')!);
      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(onSelect).not.toHaveBeenCalled();

      await waitFor(() => {
        expect(screen.queryByText('Media Library')).not.toBeInTheDocument();
      });
    });
  });
});
