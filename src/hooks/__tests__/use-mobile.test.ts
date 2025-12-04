import { renderHook, act } from '@testing-library/react';

import { useIsMobile } from '../use-mobile';

const MOBILE_BREAKPOINT = 768;

describe('useIsMobile', () => {
  let matchMediaListeners: Map<string, (e: MediaQueryListEvent) => void>;
  let mockMatchMedia: jest.Mock;

  beforeEach(() => {
    matchMediaListeners = new Map();

    mockMatchMedia = jest.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          matchMediaListeners.set(query, listener);
        }
      }),
      removeEventListener: jest.fn((event: string) => {
        if (event === 'change') {
          matchMediaListeners.delete(query);
        }
      }),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    matchMediaListeners.clear();
  });

  describe('initial state', () => {
    it('should return false when window width is greater than or equal to mobile breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT,
      });

      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(false);
    });

    it('should return true when window width is less than mobile breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT - 1,
      });

      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(true);
    });
  });

  describe('responsive behavior', () => {
    it('should update to true when window resizes to mobile width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);

      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: MOBILE_BREAKPOINT - 1,
        });

        const listener = matchMediaListeners.get(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        if (listener) {
          listener({ matches: true } as MediaQueryListEvent);
        }
      });

      expect(result.current).toBe(true);
    });

    it('should update to false when window resizes to desktop width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT - 1,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);

      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: MOBILE_BREAKPOINT,
        });

        const listener = matchMediaListeners.get(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        if (listener) {
          listener({ matches: false } as MediaQueryListEvent);
        }
      });

      expect(result.current).toBe(false);
    });
  });

  describe('matchMedia setup', () => {
    it('should call matchMedia with correct query', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT,
      });

      renderHook(() => useIsMobile());

      expect(mockMatchMedia).toHaveBeenCalledWith(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    });

    it('should add event listener on mount', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT,
      });

      renderHook(() => useIsMobile());

      expect(matchMediaListeners.has(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)).toBe(true);
    });

    it('should remove event listener on unmount', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT,
      });

      const { unmount } = renderHook(() => useIsMobile());

      unmount();

      expect(matchMediaListeners.has(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return false for undefined initial state (coerced by !!)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT,
      });

      const { result } = renderHook(() => useIsMobile());

      expect(typeof result.current).toBe('boolean');
    });

    it('should handle width exactly at breakpoint boundary', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: MOBILE_BREAKPOINT - 1,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);

      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: MOBILE_BREAKPOINT,
        });

        const listener = matchMediaListeners.get(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        if (listener) {
          listener({ matches: false } as MediaQueryListEvent);
        }
      });

      expect(result.current).toBe(false);
    });
  });
});
