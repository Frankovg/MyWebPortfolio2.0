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
  const mockSessionWithUser = {
    user: {
      email: 'test@example.com',
      isAdmin: true,
      id: '1',
    },
    expires: '2099-12-31',
  };

  const mockSessionWithoutUser = null;

  beforeEach(() => {
    jest.clearAllMocks();
    setupMatchMediaMock();
    setupScrollYMock(0);
  });

  describe('Rendering', () => {
    it('should render the navbar', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const navElements = screen.getAllByRole('navigation');
      expect(navElements.length).toBeGreaterThanOrEqual(1);
      expect(navElements[0]).toBeInTheDocument();
    });

    it('should render the logo', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const logo = screen.getByAltText('Franco Amoroso Web Portfolio logo');
      expect(logo).toBeInTheDocument();
    });

    it('should render navigation links from ROUTES (except last one)', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const routesToShow = ROUTES.slice(0, -1);
      routesToShow.forEach((route) => {
        expect(screen.getByText(route.label)).toBeInTheDocument();
      });
    });

    it('should render Downloads menu link', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      expect(screen.getByText('Downloads')).toBeInTheDocument();
    });

    it('should render About me link', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const aboutMeLinks = screen.getAllByText('About me');
      expect(aboutMeLinks.length).toBeGreaterThan(0);
    });

    it('should render social links', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      SOCIAL_ICONS.forEach((social) => {
        if (social.href) {
          const links = screen.getAllByRole('link', { name: '' });
          const socialLink = links.find(
            (link) => link.getAttribute('href') === social.href
          );
          expect(socialLink).toBeInTheDocument();
        }
      });
    });

    it("should render Let's Connect link", () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    });

    it('should render mobile menu button', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const mobileMenuButton = screen.getByTitle('mobileMenuButton');
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe('User session - Not logged in', () => {
    it('should render login link when not logged in', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should not render admin link when not logged in', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    });

    it('should not render logout button when not logged in', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('User session - Logged in as admin', () => {
    it('should render admin link when logged in as admin', () => {
      render(<Navbar session={mockSessionWithUser} />);

      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('should render logout button when logged in', () => {
      render(<Navbar session={mockSessionWithUser} />);

      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should not render login link when logged in', () => {
      render(<Navbar session={mockSessionWithUser} />);

      expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('should display admin access message for admin users', () => {
      render(<Navbar session={mockSessionWithUser} />);

      const messageElement = screen.getByText((_, element) => {
        return element?.getAttribute('data-desktop') === 'Welcome back! You have admin access.';
      });
      expect(messageElement).toBeInTheDocument();
    });
  });

  describe('User session - Logged in as non-admin', () => {
    const nonAdminSession = {
      user: {
        email: 'demo@example.com',
        isAdmin: false,
        id: '2',
      },
      expires: '2099-12-31',
    };

    it('should display demo account message for non-admin users', () => {
      render(<Navbar session={nonAdminSession} />);

      const messageElement = screen.getByText((_, element) => {
        return element?.getAttribute('data-desktop') === 'Welcome! This is a demo account with restricted access.';
      });
      expect(messageElement).toBeInTheDocument();
    });
  });

  describe('Scroll behavior', () => {
    it('should have transparent background initially', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const navElements = screen.getAllByRole('navigation');
      const mainNav = navElements[0];
      expect(mainNav).toHaveClass('bg-transparent');
      expect(mainNav).toHaveClass('py-8');
    });

    it('should change background when scrolled past 50px', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

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
      render(<Navbar session={mockSessionWithoutUser} />);

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
      render(<Navbar session={mockSessionWithoutUser} />);

      const mobileMenuButton = screen.getByTitle('mobileMenuButton');
      await user.click(mobileMenuButton);

      // The Sheet component should now be open - check for Sheet content
      // MobileMenu renders a Sheet with navigation links
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should close mobile menu when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<Navbar session={mockSessionWithoutUser} />);

      const mobileMenuButton = screen.getByTitle('mobileMenuButton');
      await user.click(mobileMenuButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Navigation links', () => {
    it('should have correct href for logo link', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const logoLink = screen.getByAltText('Franco Amoroso Web Portfolio logo').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it("should have correct href for Let's Connect link", () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const connectLink = screen.getByText("Let's Connect").closest('a');
      expect(connectLink).toHaveAttribute('href', 'contact');
    });

    it('should have correct href for About me link', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const aboutMeLinks = screen.getAllByText('About me');
      const standaloneAboutMe = aboutMeLinks.find(
        (link) => link.closest('a')?.getAttribute('href') === '/about-me'
      );
      expect(standaloneAboutMe).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have navigation landmark', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const navElements = screen.getAllByRole('navigation');
      expect(navElements.length).toBeGreaterThanOrEqual(1);
    });

    it('should have accessible mobile menu button', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

      const mobileMenuButton = screen.getByTitle('mobileMenuButton');
      expect(mobileMenuButton).toHaveAttribute('type', 'button');
    });

    it('should have accessible social links with target blank', () => {
      render(<Navbar session={mockSessionWithoutUser} />);

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

      const { unmount } = render(<Navbar session={mockSessionWithoutUser} />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
