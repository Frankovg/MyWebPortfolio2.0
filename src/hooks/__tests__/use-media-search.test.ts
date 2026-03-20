import { act, renderHook, waitFor } from '@testing-library/react';

import { searchMedia } from '@/actions/media-library-actions';

import { useMediaSearch } from '../use-media-search';

jest.mock('@/actions/media-library-actions', () => ({
  searchMedia: jest.fn(),
}));

const mockSearchMedia = searchMedia as jest.MockedFunction<typeof searchMedia>;

describe('useMediaSearch', () => {
  const defaultOptions = {
    currentFolder: '',
    fetchData: jest.fn(),
    setData: jest.fn(),
    onError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockSearchMedia.mockResolvedValue({ resources: [] });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with empty search query', () => {
    const { result } = renderHook(() => useMediaSearch(defaultOptions));

    expect(result.current.searchQuery).toBe('');
    expect(result.current.isSearching).toBe(false);
  });

  it('should update search query immediately on handleSearch', () => {
    const { result } = renderHook(() => useMediaSearch(defaultOptions));

    act(() => {
      result.current.handleSearch('test');
    });

    expect(result.current.searchQuery).toBe('test');
  });

  it('should call fetchData when search is cleared to empty string', () => {
    const fetchData = jest.fn();
    const { result } = renderHook(() =>
      useMediaSearch({ ...defaultOptions, fetchData })
    );

    act(() => {
      result.current.handleSearch('');
    });

    expect(fetchData).toHaveBeenCalledWith('');
  });

  it('should call fetchData with current folder when search is cleared', () => {
    const fetchData = jest.fn();
    const { result } = renderHook(() =>
      useMediaSearch({ ...defaultOptions, fetchData, currentFolder: 'my-folder' })
    );

    act(() => {
      result.current.handleSearch('   ');
    });

    expect(fetchData).toHaveBeenCalledWith('my-folder');
  });

  it('should debounce search and call searchMedia after 300ms', async () => {
    const { result } = renderHook(() => useMediaSearch(defaultOptions));

    act(() => {
      result.current.handleSearch('query');
    });

    // Not called yet before debounce
    expect(mockSearchMedia).not.toHaveBeenCalled();

    // Advance past debounce
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockSearchMedia).toHaveBeenCalledWith('query', '');
    });
  });

  it('should pass currentFolder to searchMedia', async () => {
    const { result } = renderHook(() =>
      useMediaSearch({ ...defaultOptions, currentFolder: 'photos' })
    );

    act(() => {
      result.current.handleSearch('sunset');
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockSearchMedia).toHaveBeenCalledWith('sunset', 'photos');
    });
  });

  it('should call onError when searchMedia returns an error', async () => {
    const onError = jest.fn();
    mockSearchMedia.mockResolvedValue({ message: 'Search failed' });

    const { result } = renderHook(() =>
      useMediaSearch({ ...defaultOptions, onError })
    );

    act(() => {
      result.current.handleSearch('fail');
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith({ message: 'Search failed' });
    });
  });

  it('should update data via setData on successful search', async () => {
    const setData = jest.fn();
    const searchResult = {
      resources: [
        {
          public_id: 'result1',
          secure_url: 'https://example.com/result1.jpg',
          format: 'jpg',
          width: 100,
          height: 100,
          bytes: 500,
          created_at: '2026-01-01',
          resource_type: 'image' as const,
        },
      ],
    };
    mockSearchMedia.mockResolvedValue(searchResult);

    const { result } = renderHook(() =>
      useMediaSearch({ ...defaultOptions, setData })
    );

    act(() => {
      result.current.handleSearch('result');
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(setData).toHaveBeenCalled();
    });
  });

  it('should cancel previous debounce when typing fast', async () => {
    const { result } = renderHook(() => useMediaSearch(defaultOptions));

    act(() => {
      result.current.handleSearch('a');
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current.handleSearch('ab');
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current.handleSearch('abc');
    });

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(mockSearchMedia).toHaveBeenCalledTimes(1);
      expect(mockSearchMedia).toHaveBeenCalledWith('abc', '');
    });
  });

  it('should clear search query and cancel debounce on clearSearch', () => {
    const { result } = renderHook(() => useMediaSearch(defaultOptions));

    act(() => {
      result.current.handleSearch('something');
    });

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchQuery).toBe('');

    // Advancing timer should not trigger search
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSearchMedia).not.toHaveBeenCalled();
  });
});
