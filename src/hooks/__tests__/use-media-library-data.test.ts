import { act, renderHook, waitFor } from '@testing-library/react';

import { getMediaLibraryData } from '@/actions/media-library-actions';

import { useMediaLibraryData } from '../use-media-library-data';

import type { MediaLibraryData } from '@/app/(admin)/admin/media-library/types/types';

jest.mock('@/actions/media-library-actions', () => ({
  getMediaLibraryData: jest.fn(),
}));

const mockGetData = getMediaLibraryData as jest.MockedFunction<typeof getMediaLibraryData>;

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
  ],
  folders: [{ name: 'subfolder', path: 'subfolder' }],
  currentFolder: '',
};

describe('useMediaLibraryData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetData.mockResolvedValue(mockData);
  });

  it('should initialize with null data and not loading', () => {
    const { result } = renderHook(() => useMediaLibraryData());

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should fetch data and update state on success', async () => {
    const { result } = renderHook(() => useMediaLibraryData());

    act(() => {
      result.current.fetchData('');
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(mockGetData).toHaveBeenCalledWith('');
  });

  it('should fetch data for a specific folder', async () => {
    const folderData = { ...mockData, currentFolder: 'subfolder' };
    mockGetData.mockResolvedValue(folderData);

    const { result } = renderHook(() => useMediaLibraryData());

    act(() => {
      result.current.fetchData('subfolder');
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(folderData);
    });

    expect(mockGetData).toHaveBeenCalledWith('subfolder');
  });

  it('should call onError when fetch returns an error', async () => {
    const onError = jest.fn();
    mockGetData.mockResolvedValue({ message: 'Failed to load' });

    const { result } = renderHook(() => useMediaLibraryData({ onError }));

    act(() => {
      result.current.fetchData('');
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith({ message: 'Failed to load' });
    });

    expect(result.current.data).toBeNull();
  });

  it('should not call onError when none is provided', async () => {
    mockGetData.mockResolvedValue({ message: 'Failed' });

    const { result } = renderHook(() => useMediaLibraryData());

    act(() => {
      result.current.fetchData('');
    });

    await waitFor(() => {
      expect(mockGetData).toHaveBeenCalled();
    });

    // Should not throw
    expect(result.current.data).toBeNull();
  });

  it('should expose setData for external state updates', async () => {
    const { result } = renderHook(() => useMediaLibraryData());

    act(() => {
      result.current.fetchData('');
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    const updatedData = { ...mockData, currentFolder: 'updated' };
    act(() => {
      result.current.setData(updatedData);
    });

    expect(result.current.data).toEqual(updatedData);
  });
});
