import { render, screen } from '@testing-library/react';

import { mockNextImage, mockNextLink } from '@/__mocks__/test-utils';

import DownloadLinks from '../download-links';

jest.mock('next/image', () => mockNextImage);
jest.mock('next/link', () => mockNextLink);

const mockDownloads = [
  {
    id: '1',
    name: 'Resume',
    description: 'My professional resume',
    fileHref: 'https://example.com/resume.pdf',
    imageUrl: '/images/resume.png',
    isActive: true,
    language: 'en',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Portfolio',
    description: 'Design portfolio',
    fileHref: 'https://example.com/portfolio.pdf',
    imageUrl: '/images/portfolio.png',
    isActive: true,
    language: 'en',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Inactive File',
    description: 'This should not appear',
    fileHref: 'https://example.com/inactive.pdf',
    imageUrl: '/images/inactive.png',
    isActive: false,
    language: 'en',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Spanish Resume',
    description: 'Spanish version',
    fileHref: 'https://example.com/resume-es.pdf',
    imageUrl: '/images/resume-es.png',
    isActive: true,
    language: 'es',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

jest.mock('@/stores/use-downloads-store', () => ({
  useDownloadsStore: (selector?: (state: unknown) => unknown) => {
    const state = {
      downloads: mockDownloads,
      addNewFile: jest.fn(),
      handleDeleteFile: jest.fn(),
      handleEditFile: jest.fn(),
    };
    return selector ? selector(state) : state;
  },
}));

describe('DownloadLinks', () => {
  it('should render active English downloads', () => {
    render(<DownloadLinks />);

    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should not render inactive downloads', () => {
    render(<DownloadLinks />);

    expect(screen.queryByText('Inactive File')).not.toBeInTheDocument();
  });

  it('should not render non-English downloads', () => {
    render(<DownloadLinks />);

    expect(screen.queryByText('Spanish Resume')).not.toBeInTheDocument();
  });

  it('should render download descriptions', () => {
    render(<DownloadLinks />);

    expect(screen.getByText('My professional resume')).toBeInTheDocument();
    expect(screen.getByText('Design portfolio')).toBeInTheDocument();
  });

  it('should render links with correct href', () => {
    render(<DownloadLinks />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://example.com/resume.pdf');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/portfolio.pdf');
  });

  it('should open links in new tab', () => {
    render(<DownloadLinks />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('should render images with alt text', () => {
    render(<DownloadLinks />);

    expect(screen.getByAltText('Resume')).toBeInTheDocument();
    expect(screen.getByAltText('Portfolio')).toBeInTheDocument();
  });
});
