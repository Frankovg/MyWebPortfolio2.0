import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupMatchMediaMock } from '@/__mocks__/test-utils';
import {
  deleteMedia,
  getMediaLibraryData,
  searchMedia,
} from '@/actions/media-library-actions';

import MediaLibraryClient from '../media-library-client';

import type { MediaLibraryData } from '../../types/types';

const { mockRouter } = require('@/__mocks__/test-utils');

jest.mock('next/navigation', () => require('@/__mocks__/test-utils').mockNextNavigation);
jest.mock('next/image', () => require('@/__mocks__/test-utils').mockNextImage);
jest.mock('sonner', () => require('@/__mocks__/test-utils').mockSonner);

jest.mock('@/components/primitives/spinner', () => ({
  Spinner: () => <div role="status" data-testid="spinner">Loading...</div>,
}));

jest.mock('@/actions/media-library-actions', () => ({
  getMediaLibraryData: jest.fn(),
  searchMedia: jest.fn(),
  deleteMedia: jest.fn(),
  uploadMedia: jest.fn(),
  createFolder: jest.fn(),
  renameFolder: jest.fn(),
  deleteFolder: jest.fn(),
}));

jest.mock('@/utils/showErrorMessage', () => ({
  showErrorMessage: jest.fn(),
}));

// Mock URL APIs
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();


const mockGetData = getMediaLibraryData as jest.MockedFunction<typeof getMediaLibraryData>;
const mockSearchMedia = searchMedia as jest.MockedFunction<typeof searchMedia>;
const mockDeleteMedia = deleteMedia as jest.MockedFunction<typeof deleteMedia>;

const mockData: MediaLibraryData = {
  resources: [
    {
      public_id: 'folder/image1',
      secure_url: 'https://example.com/image1.jpg',
      format: 'jpg',
      width: 800,
      height: 600,
      bytes: 1024,
      created_at: '2026-01-01T00:00:00Z',
      resource_type: 'image',
    },
    {
      public_id: 'folder/image2',
      secure_url: 'https://example.com/image2.png',
      format: 'png',
      width: 400,
      height: 300,
      bytes: 2048,
      created_at: '2026-01-02T00:00:00Z',
      resource_type: 'image',
    },
  ],
  folders: [
    { name: 'subfolder', path: 'subfolder' },
  ],
  currentFolder: '',
};

describe('MediaLibraryClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    setupMatchMediaMock(false);
    mockGetData.mockResolvedValue(mockData);
    mockSearchMedia.mockResolvedValue({ resources: [] });
    mockDeleteMedia.mockResolvedValue(undefined);
  });

  afterEach(async () => {
    jest.useRealTimers();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  describe('Initial Load', () => {
    it('should show loading skeleton initially', () => {
      render(<MediaLibraryClient />);

      // Before data loads, skeleton should be visible
      // The component shows LoadingSkeleton when isLoading || !data
      expect(screen.queryByText('image1')).not.toBeInTheDocument();
    });

    it('should fetch and display data', async () => {
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalledWith('');
      });

      await waitFor(() => {
        expect(screen.getByText('image1')).toBeInTheDocument();
        expect(screen.getByText('image2')).toBeInTheDocument();
      });
    });

    it('should render search input', async () => {
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search images...')).toBeInTheDocument();
      });
    });

    it('should render Upload button', () => {
      render(<MediaLibraryClient />);

      expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
    });

    it('should render Add folder button', () => {
      render(<MediaLibraryClient />);

      expect(screen.getByRole('button', { name: /add folder/i })).toBeInTheDocument();
    });

    it('should show folder navigation after data loads', async () => {
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /root/i })).toBeInTheDocument();
      });
    });

    it('should show subfolder buttons', async () => {
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /subfolder/i })).toBeInTheDocument();
      });
    });
  });

  describe('Search', () => {
    it('should update search input value', async () => {
      jest.useRealTimers();
      const user = userEvent.setup();
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(screen.getByText('image1')).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText('Search images...');
      await user.type(input, 'test');

      expect(input).toHaveValue('test');
    });

    it('should call searchMedia after debounce', async () => {
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(screen.getByText('image1')).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText('Search images...');

      // Simulate typing by firing change event
      await act(async () => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        )!.set!;
        nativeInputValueSetter.call(input, 'search-term');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // Advance debounce timer
      await act(async () => {
        jest.advanceTimersByTime(300);
      });

      await waitFor(() => {
        expect(mockSearchMedia).toHaveBeenCalled();
      });
    });

    it('should fetch data when search is cleared', async () => {
      jest.useRealTimers();
      const user = userEvent.setup();
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(screen.getByText('image1')).toBeInTheDocument();
      });

      // Reset call count
      mockGetData.mockClear();

      const input = screen.getByPlaceholderText('Search images...');

      // Type something then clear with X button
      await user.type(input, 'test');

      // Click clear button (X) which calls onChange with empty value
      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);

      await waitFor(() => {
        expect(mockGetData).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should show error when data fetch fails', async () => {
      const { showErrorMessage } = require('@/utils/showErrorMessage');
      mockGetData.mockResolvedValue({ message: 'Failed to load' });

      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(showErrorMessage).toHaveBeenCalledWith({ message: 'Failed to load' });
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate when folder button is clicked', async () => {
      jest.useRealTimers();
      const user = userEvent.setup();
      render(<MediaLibraryClient />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /subfolder/i })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: /subfolder/i }));

      expect(mockRouter.push).toHaveBeenCalledWith(
        '/admin/media-library?folder=subfolder'
      );
    });
  });
});
