import { render } from '@testing-library/react';

import { LoadingSkeleton } from '../loading-skeleton';

describe('LoadingSkeleton', () => {
  it('should render breadcrumb skeleton', () => {
    const { container } = render(<LoadingSkeleton />);

    const breadcrumbSkeleton = container.querySelector('.flex.items-center.gap-1');
    expect(breadcrumbSkeleton).toBeInTheDocument();
  });

  it('should render 3 folder button skeletons', () => {
    const { container } = render(<LoadingSkeleton />);

    const folderSkeletons = container.querySelector('.flex.flex-wrap.gap-2');
    expect(folderSkeletons?.children).toHaveLength(3);
  });

  it('should render 10 image grid skeletons', () => {
    const { container } = render(<LoadingSkeleton />);

    const grid = container.querySelector('.grid');
    expect(grid?.children).toHaveLength(10);
  });
});
