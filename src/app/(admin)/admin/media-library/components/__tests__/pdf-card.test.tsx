import { render } from '@testing-library/react';

import PdfCard from '../pdf-card';

describe('PdfCard', () => {
  it('should render the file icon', () => {
    const { container } = render(<PdfCard />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have muted background styling', () => {
    const { container } = render(<PdfCard />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('bg-muted');
  });
});
