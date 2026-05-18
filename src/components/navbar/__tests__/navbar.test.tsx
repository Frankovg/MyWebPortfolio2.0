import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockNextImage,
  mockNextLink,
  setupMatchMediaMock,
  setupScrollYMock,
} from '@/__mocks__/test-utils';
import { ROUTES, SOCIAL_ICONS } from '@/lib/constants';

import Navbar from '../navbar';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/home',
}));

jest.mock('next/image', () => mockNextImage);
jest.mock('next/link', () => mockNextLink);

const mockUseSession = jest.fn();
jest.mock('@/lib/auth-client', () => ({
  useSession: () => mockUseSession(),
  authClient: {
    useSession: () => mockUseSession(),
  },
}));

jest.mock('@/stores/use-downloads-store', () => ({
  useDownloadsStore: (selector?: (state: unknown) => unknown) => {
    const state = {
      downloads: [
        {
          id: '1',
          name: 'CV',
          description: 'My resume',
          fileHref: 'https://example.com/cv.pdf',
          imageUrl: '/images/cv.png',
          isActive: true,
          language: 'en',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      addNewFile: jest.fn(),
      handleDeleteFile: jest.fn(),
      handleEditFile: jest.fn(),
    };
    return selector ? selector(state) : state;
  },
}));

jest.mock('@/actions/user-actions', () => ({
  logOut: jest.fn(),
}));

describe('Navbar', () => {
  const adminSessionData = {
    session: {
      id: 'session-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
      expiresAt: new Date('2099-12-31'),
      token: 'mock-token',
    },
    user: {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true,
      isActive: true,
      image: null,
    },
  };

  const nonAdminSessionData = {
    session: {
      id: 'session-2',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '2',
      expiresAt: new Date('2099-12-31'),
      token: 'mock-token-2',
    },
    user: {
      id: '2',
      email: 'demo@example.com',
      name: 'Demo User',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
      isActive: true,
      image: null,
    },
  };

  const mockAnonymous = () =>
    mockUseSession.mockReturnValue({ data: null, isPending: false });
  const mockAdmin = () =>
    mockUseSession.mockReturnValue({ data: adminSessionData, isPending: false });
  const mockNonAdmin = () =>
    mockUseSession.mockReturnValue({ data: nonAdminSessionData, isPending: false });

  beforeEach(() => {
    jest.clearAllMocks();
    setupMatchMediaMock();
    setupScrollYMock(0);
    mockAnonymous();
  });

  describe('Rendering', () => {
    it('should render the navbar', () => {
      render(<Navbar />);

      const navElements = screen.getAllByRole('navigation');
      expect(navElements.length).toBeGreaterThanOrEqual(1);
      expect(navElements[0]).toBeInTheDocument();
    });

    it('should render the logo', () => {
      render(<Navbar />);

      const logo = screen.getByAltText('Franco Amoroso Web Portfolio logo');
      expect(logo).toBeInTheDocument();
    });

    it('should render navigation links from ROUTES (except last one)', () => {
      render(<Navbar />);

      const routesToShow = ROUTES.slice(0, -1);
      routesToShow.forEach((route) => {
        expect(screen.getByText(route.label)).toBeInTheDocument();
      });
    });

    it('should render Downloads menu link', () => {
      render(<Navbar />);

      expect(screen.getByText('Downloads')).toBeInTheDocument();
    });

    it('should render About me link', () => {
      render(<Navbar />);

      const aboutMeLinks = screen.getAllByText('About me');
      expect(aboutMeLinks.length).toBeGreaterThan(0);
    });

    it('should render social links', () => {
      render(<Navbar />);

      SOCIAL_ICONS.forEach((social) => {
        if (social.href) {
          const socialLink = screen.getByRole('link', { name: social.name });
          expect(socialLink).toHaveAttribute('href', social.href);
        }
      });
    });

    it("should render Let's Connect link", () => {
      render(<Navbar />);

      expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    });

    it('should render mobile menu button', () => {
      render(<Navbar />);

      const mobileMenuButton = screen.getByRole('button', { name: /navigation menu/i });
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe('User session - Not logged in', () => {
    it('should render login link when not logged in', () => {
      render(<Navbar />);

      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should not render admin link when not logged in', () => {
      render(<Navbar />);

      expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    });

    it('should not render logout button when not logged in', () => {
      render(<Navbar />);

      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('User session - Logged in as admin', () => {
    beforeEach(() => {
      mockAdmin();
    });

    it('should render admin link when logged in as admin', () => {
      render(<Navbar />);

      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('should render logout button when logged in', () => {
      render(<Navbar />);

      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should not render login link when logged in', () => {
      render(<Navbar />);

      expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('should display admin access message for admin users', () => {
      render(<Navbar />);

      const messageElement = screen.getByText((_, element) => {
        return element?.getAttribute('data-desktop') === 'Welcome back! You have admin access.';
      });
      expect(messageElement).toBeInTheDocument();
    });
  });

  describe('User session - Logged in as non-admin', () => {
    beforeEach(() => {
      mockNonAdmin();
    });

    it('should display demo account message for non-admin users', () => {
      render(<Navbar />);

      const messageElement = screen.getByText((_, element) => {
        return element?.getAttribute('data-desktop') === 'Welcome! This is a demo account with restricted access.';
      });
      expect(messageElement).toBeInTheDocument();
    });
  });

  describe('Scroll behavior', () => {
    it('should have transparent background initially', () => {
      render(<Navbar />);

      const navElements = screen.getAllByRole('navigation');
      const mainNav = navElements[0];
      expect(mainNav).toHaveClass('bg-transparent');
      expect(mainNav).toHaveClass('py-8');
    });

    it('should change background when scrolled past 50px', () => {
      render(<Navbar />);

      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 100,
      });
      fireEvent.scroll(window);

      const navElements = screen.getAllByRole('navigation');
      const mainNav = navElements[0];
      expect(mainNav).toHaveClass('bg-background');
      expect(mainNav).toHaveClass('py-5');
    });

    it('should revert to transparent when scrolled back to top', () => {
      render(<Navbar />);

      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 100,
      });
      fireEvent.scroll(window);

      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 0,
      });
      fireEvent.scroll(window);

      const navElements = screen.getAllByRole('navigation');
      const mainNav = navElements[0];
      expect(mainNav).toHaveClass('bg-transparent');
    });
  });

  describe('Mobile menu interaction', () => {
    it('should open mobile menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const mobileMenuButton = screen.getByRole('button', { name: /navigation menu/i });
      await user.click(mobileMenuButton);

      // The Sheet component should now be open - check for Sheet content
      // MobileMenu renders a Sheet with navigation links
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should close mobile menu when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<Navbar />);

      const mobileMenuButton = screen.getByRole('button', { name: /navigation menu/i });
      await user.click(mobileMenuButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Navigation links', () => {
    it('should have correct href for logo link', () => {
      render(<Navbar />);

      const logoLink = screen.getByAltText('Franco Amoroso Web Portfolio logo').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it("should have correct href for Let's Connect link", () => {
      render(<Navbar />);

      const connectLink = screen.getByText("Let's Connect").closest('a');
      expect(connectLink).toHaveAttribute('href', '/contact');
    });

    it('should have correct href for About me link', () => {
      render(<Navbar />);

      const aboutMeLinks = screen.getAllByText('About me');
      const standaloneAboutMe = aboutMeLinks.find(
        (link) => link.closest('a')?.getAttribute('href') === '/about-me'
      );
      expect(standaloneAboutMe).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have navigation landmark', () => {
      render(<Navbar />);

      const navElements = screen.getAllByRole('navigation');
      expect(navElements.length).toBeGreaterThanOrEqual(1);
    });

    it('should have accessible mobile menu button', () => {
      render(<Navbar />);

      const mobileMenuButton = screen.getByRole('button', { name: /navigation menu/i });
      expect(mobileMenuButton).toHaveAttribute('type', 'button');
      expect(mobileMenuButton).toHaveAttribute('aria-label', 'Navigation menu');
    });

    it('should have accessible social links with target blank', () => {
      render(<Navbar />);

      SOCIAL_ICONS.forEach((social) => {
        if (social.href) {
          const links = screen.getAllByRole('link');
          const socialLink = links.find(
            (link) => link.getAttribute('href') === social.href
          );
          if (socialLink) {
            expect(socialLink).toHaveAttribute('target', '_blank');
            expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
          }
        }
      });
    });
  });

  describe('Cleanup', () => {
    it('should remove scroll event listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = render(<Navbar />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
