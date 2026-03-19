import { render } from '@testing-library/react';

import { MediaLibrarySkeleton } from '@/components/skeletons/media-library-skeleton';


describe('MediaLibrarySkeleton', () => {
  it('should render breadcrumb skeleton', () => {
    const { container } = render(<MediaLibrarySkeleton />);

    const breadcrumbSkeleton = container.querySelector('.flex.items-center.gap-1');
    expect(breadcrumbSkeleton).toBeInTheDocument();
  });

  it('should render 3 folder button skeletons', () => {
    const { container } = render(<MediaLibrarySkeleton />);

    const folderSkeletons = container.querySelector('.flex.flex-wrap.gap-2');
    expect(folderSkeletons?.children).toHaveLength(3);
  });

  it('should render 10 image grid skeletons', () => {
    const { container } = render(<MediaLibrarySkeleton />);

    const grid = container.querySelector('.grid');
    expect(grid?.children).toHaveLength(10);
  });
});
