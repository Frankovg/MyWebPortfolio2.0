import { render, screen, fireEvent } from '@testing-library/react';

import ImageWithFallback from '../image-with-fallback';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: Record<string, unknown>) {
    const { src, alt, onLoad, onError, ...rest } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src as string}
        alt={alt as string}
        onLoad={onLoad as () => void}
        onError={onError as () => void}
        data-testid="image"
        {...rest}
      />
    );
  },
}));

describe('ImageWithFallback', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    fallbackSrc: '/fallback.jpg',
    alt: 'Test image',
    width: 100,
    height: 100,
  };

  it('should render image with provided src', () => {
    render(<ImageWithFallback {...defaultProps} />);

    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('should have loading state initially', () => {
    render(<ImageWithFallback {...defaultProps} />);

    const image = screen.getByTestId('image');
    expect(image).toHaveClass('bg-softGrey', 'animate-pulse');
  });

  it('should remove loading state on load', () => {
    render(<ImageWithFallback {...defaultProps} />);

    const image = screen.getByTestId('image');
    fireEvent.load(image);

    expect(image).not.toHaveClass('bg-softGrey');
    expect(image).not.toHaveClass('animate-pulse');
  });

  it('should switch to fallback on error', () => {
    render(<ImageWithFallback {...defaultProps} />);

    const image = screen.getByTestId('image');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', '/fallback.jpg');
  });

  it('should remove loading state on error', () => {
    render(<ImageWithFallback {...defaultProps} />);

    const image = screen.getByTestId('image');
    fireEvent.error(image);

    expect(image).not.toHaveClass('bg-softGrey');
    expect(image).not.toHaveClass('animate-pulse');
  });

  it('should apply custom className', () => {
    render(<ImageWithFallback {...defaultProps} className="custom-class" />);

    const image = screen.getByTestId('image');
    expect(image).toHaveClass('custom-class');
  });

  it('should update src when prop changes', () => {
    const { rerender } = render(<ImageWithFallback {...defaultProps} />);

    const image = screen.getByTestId('image');
    fireEvent.load(image);

    rerender(<ImageWithFallback {...defaultProps} src="/new-image.jpg" />);

    expect(image).toHaveAttribute('src', '/new-image.jpg');
    // Should reset to loading state
    expect(image).toHaveClass('bg-softGrey', 'animate-pulse');
  });
});
