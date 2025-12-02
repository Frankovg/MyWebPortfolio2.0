import { render, screen } from '@testing-library/react';

import { mockNextLink } from '@/__mocks__/test-utils';

import { ErrorPage } from '../404';

jest.mock('next/link', () => mockNextLink);

describe('ErrorPage', () => {
  it('should render 404 error message', async () => {
    render(await ErrorPage());

    expect(screen.getByText('404 - Page not found')).toBeInTheDocument();
  });

  it('should render explanation text', async () => {
    render(await ErrorPage());

    expect(screen.getByText('The link might be corrupted.')).toBeInTheDocument();
    expect(screen.getByText('or the page may have been removed')).toBeInTheDocument();
  });

  it('should render link to home page', async () => {
    render(await ErrorPage());

    const homeLink = screen.getByRole('link', { name: /go back home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render frown icon', async () => {
    render(await ErrorPage());

    // FrownIcon is an SVG, check for its presence via the container
    const container = screen.getByText('404 - Page not found').parentElement;
    expect(container?.querySelector('svg')).toBeInTheDocument();
  });
});
