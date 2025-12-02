/* eslint-disable @next/next/no-img-element */
import React from 'react';

/**
 * Mock for next/link
 * Usage: jest.mock('next/link', () => require('@/__mocks__/test-utils').mockNextLink)
 */
export const mockNextLink = {
  __esModule: true,
  default: function MockLink(props: Record<string, unknown>) {
    const { children, href, passHref: _passHref, ...rest } = props;
    return (
      <a href={href as string} {...rest}>
        {children as React.ReactNode}
      </a>
    );
  },
};

/**
 * Mock for next/image
 * Usage: jest.mock('next/image', () => require('@/__mocks__/test-utils').mockNextImage)
 */
export const mockNextImage = {
  __esModule: true,
  default: function MockImage(props: Record<string, unknown>) {
    const { src, alt, priority: _priority, ...rest } = props;
    const imgSrc =
      typeof src === 'object' && src !== null && 'src' in src
        ? (src as { src: string }).src
        : (src as string);
    return <img src={imgSrc} alt={alt as string} {...rest} />;
  },
};

/**
 * Mock for next/navigation
 * Usage:
 *   const { mockRouter, mockNextNavigation } = require('@/__mocks__/test-utils');
 *   jest.mock('next/navigation', () => mockNextNavigation);
 *
 * To customize pathname: mockRouter.pathname = '/custom-path';
 */
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
};

export const mockNextNavigation = {
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(),
};

/**
 * Mock for sonner toast
 * Usage: jest.mock('sonner', () => require('@/__mocks__/test-utils').mockSonner)
 */
export const mockSonner = {
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
};

/**
 * Setup ResizeObserver mock
 * Call this at the top of test files that need it
 */
export function setupResizeObserverMock() {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.ResizeObserver = ResizeObserverMock;
}

/**
 * Setup window.matchMedia mock
 * Call this in beforeEach for tests that need it
 */
export function setupMatchMediaMock(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

/**
 * Setup window.scrollY mock
 * Usage: setupScrollYMock(100) // sets scrollY to 100
 */
export function setupScrollYMock(value = 0) {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    value,
  });
}
