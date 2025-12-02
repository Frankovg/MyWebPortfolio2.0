import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MultiSelect } from '../multi-select';

// Mock ResizeObserver and scrollIntoView for cmdk
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

Element.prototype.scrollIntoView = jest.fn();

const mockOptions = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Tailwind', value: 'tailwind' },
];

describe('MultiSelect', () => {
  const defaultProps = {
    options: mockOptions,
    onValueChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with placeholder', () => {
      render(<MultiSelect {...defaultProps} placeholder="Select technologies" />);

      expect(screen.getByText('Select technologies')).toBeInTheDocument();
    });

    it('should render default placeholder when not provided', () => {
      render(<MultiSelect {...defaultProps} />);

      expect(screen.getByText('Select options')).toBeInTheDocument();
    });

    it('should render with default values', () => {
      render(<MultiSelect {...defaultProps} defaultValue={['react', 'typescript']} />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('should render button element', () => {
      render(<MultiSelect {...defaultProps} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Selected values display', () => {
    it('should display selected badges', () => {
      render(<MultiSelect {...defaultProps} defaultValue={['react']} />);

      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('should show +N more badge when selections exceed maxCount', () => {
      render(
        <MultiSelect
          {...defaultProps}
          defaultValue={['react', 'typescript', 'nextjs', 'tailwind']}
          maxCount={2}
        />
      );

      expect(screen.getByText('+ 2 more')).toBeInTheDocument();
    });

    it('should not show +N more badge when selections are within maxCount', () => {
      render(
        <MultiSelect
          {...defaultProps}
          defaultValue={['react', 'typescript']}
          maxCount={3}
        />
      );

      expect(screen.queryByText(/\+ \d+ more/)).not.toBeInTheDocument();
    });

    it('should show clear icon when values are selected', () => {
      render(
        <MultiSelect {...defaultProps} defaultValue={['react', 'typescript']} />
      );

      const clearIcon = document.querySelector('.lucide-x');
      expect(clearIcon).toBeInTheDocument();
    });
  });

  describe('Clear functionality', () => {
    it('should clear all selections when clear icon is clicked', async () => {
      const user = userEvent.setup();
      const onValueChange = jest.fn();
      render(
        <MultiSelect
          {...defaultProps}
          defaultValue={['react', 'typescript']}
          onValueChange={onValueChange}
        />
      );

      const clearIcon = document.querySelector('.lucide-x');
      await user.click(clearIcon!);

      expect(onValueChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to button', () => {
      render(<MultiSelect {...defaultProps} className="custom-class" />);

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });
});
