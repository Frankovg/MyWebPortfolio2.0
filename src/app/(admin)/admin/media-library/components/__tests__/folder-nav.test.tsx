import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


import FolderNav from '@/components/admin/media-picker/folder-nav';

import type { MediaFolder } from '../../types/types';

describe('FolderNav', () => {
  const defaultProps = {
    currentFolder: '',
    folders: [] as MediaFolder[],
    onNavigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render Root button', () => {
      render(<FolderNav {...defaultProps} />);

      expect(screen.getByRole('button', { name: /root/i })).toBeInTheDocument();
    });

    it('should not render breadcrumb segments when at root', () => {
      render(<FolderNav {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1); // Only Root
    });

    it('should render breadcrumb segments for nested folder', () => {
      render(<FolderNav {...defaultProps} currentFolder="projects/2024/ui" />);

      expect(screen.getByRole('button', { name: 'projects' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '2024' })).toBeInTheDocument();
      expect(screen.getByText('ui')).toBeInTheDocument();
    });

    it('should render last segment as non-clickable text', () => {
      render(<FolderNav {...defaultProps} currentFolder="projects/2024" />);

      // Last segment should be a span, not a button
      expect(screen.queryByRole('button', { name: '2024' })).not.toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
    });

    it('should render folder buttons when folders exist', () => {
      const folders: MediaFolder[] = [
        { name: 'photos', path: 'photos' },
        { name: 'docs', path: 'docs' },
      ];
      render(<FolderNav {...defaultProps} folders={folders} />);

      expect(screen.getByRole('button', { name: /photos/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /docs/i })).toBeInTheDocument();
    });

    it('should not render folder section when no folders', () => {
      const { container } = render(<FolderNav {...defaultProps} />);

      const folderSection = container.querySelector('.flex.flex-wrap');
      expect(folderSection).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should navigate to root when Root button is clicked', async () => {
      const user = userEvent.setup();
      render(<FolderNav {...defaultProps} currentFolder="projects" />);

      await user.click(screen.getByRole('button', { name: /root/i }));

      expect(defaultProps.onNavigate).toHaveBeenCalledWith('');
    });

    it('should navigate to intermediate breadcrumb path', async () => {
      const user = userEvent.setup();
      render(<FolderNav {...defaultProps} currentFolder="projects/2024/ui" />);

      await user.click(screen.getByRole('button', { name: 'projects' }));

      expect(defaultProps.onNavigate).toHaveBeenCalledWith('projects');
    });

    it('should navigate to folder when folder button is clicked', async () => {
      const user = userEvent.setup();
      const folders: MediaFolder[] = [
        { name: 'photos', path: 'projects/photos' },
      ];
      render(<FolderNav {...defaultProps} folders={folders} />);

      await user.click(screen.getByRole('button', { name: /photos/i }));

      expect(defaultProps.onNavigate).toHaveBeenCalledWith('projects/photos');
    });
  });
});
