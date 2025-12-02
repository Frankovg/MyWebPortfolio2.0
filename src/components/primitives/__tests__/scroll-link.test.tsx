import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockNextLink, mockRouter } from '@/__mocks__/test-utils';

import ScrollLink from '../scroll-link';

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
}));

jest.mock('next/link', () => mockNextLink);

describe('ScrollLink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter.pathname = '/home';
  });

  describe('Rendering', () => {
    it('should render children', () => {
      render(<ScrollLink id="projects">Projects</ScrollLink>);

      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('should render as a button inside a link', () => {
      render(<ScrollLink id="projects">Projects</ScrollLink>);

      expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
    });

    it('should have correct href for non-home id', () => {
      render(<ScrollLink id="projects">Projects</ScrollLink>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/home#projects');
    });

    it('should have correct href for home id', () => {
      render(<ScrollLink id="home">Home</ScrollLink>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/home');
    });

    it('should apply custom className', () => {
      render(<ScrollLink id="projects" className="custom-class">Projects</ScrollLink>);

      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('Click behavior on home page', () => {
    beforeEach(() => {
      mockRouter.pathname = '/home';
    });

    it('should scroll to element when on home page', async () => {
      const user = userEvent.setup();
      const mockElement = { scrollIntoView: jest.fn() };
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement);

      render(<ScrollLink id="projects">Projects</ScrollLink>);

      await user.click(screen.getByRole('button'));

      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      expect(mockRouter.push).not.toHaveBeenCalled();
    });

    it('should scroll to top when id is home', async () => {
      const user = userEvent.setup();
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;

      render(<ScrollLink id="home">Home</ScrollLink>);

      await user.click(screen.getByRole('button'));

      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should call onClick callback when provided', async () => {
      const user = userEvent.setup();
      const onClickMock = jest.fn();
      jest.spyOn(document, 'getElementById').mockReturnValue(null);

      render(<ScrollLink id="projects" onClick={onClickMock}>Projects</ScrollLink>);

      await user.click(screen.getByRole('button'));

      expect(onClickMock).toHaveBeenCalled();
    });
  });

  describe('Click behavior on other pages', () => {
    beforeEach(() => {
      mockRouter.pathname = '/about';
    });

    it('should navigate using router when not on home page', async () => {
      const user = userEvent.setup();

      render(<ScrollLink id="projects">Projects</ScrollLink>);

      await user.click(screen.getByRole('button'));

      expect(mockRouter.push).toHaveBeenCalledWith('/home#projects');
    });

    it('should navigate to /home when id is home', async () => {
      const user = userEvent.setup();

      render(<ScrollLink id="home">Home</ScrollLink>);

      await user.click(screen.getByRole('button'));

      expect(mockRouter.push).toHaveBeenCalledWith('/home');
    });
  });

  describe('Root path handling', () => {
    it('should treat / as home page', async () => {
      mockRouter.pathname = '/';
      const user = userEvent.setup();
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;

      render(<ScrollLink id="home">Home</ScrollLink>);

      await user.click(screen.getByRole('button'));

      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});
