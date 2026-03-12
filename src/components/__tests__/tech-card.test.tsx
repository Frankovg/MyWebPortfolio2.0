import { render, screen } from '@testing-library/react';

import TechCard from '../tech-card';

jest.mock('@/components/ui/hover-card', () => ({
  HoverCard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  HoverCardTrigger: ({ children, ...props }: { children: React.ReactNode; asChild?: boolean; className?: string }) => (
    <div data-testid="hover-trigger" {...props}>{children}</div>
  ),
  HoverCardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="tech-icon" {...props}>
    <rect />
  </svg>
);

describe('TechCard', () => {
  const defaultTech = {
    name: 'React',
    value: 'react',
    icon: MockIcon,
    description: 'A JavaScript library for building user interfaces',
    link: 'https://react.dev',
  };

  it('should render tech icon', () => {
    render(<TechCard tech={defaultTech} />);

    expect(screen.getByTestId('tech-icon')).toBeInTheDocument();
  });

  it('should apply custom className to icon', () => {
    render(<TechCard tech={defaultTech} className="custom-icon-class" />);

    expect(screen.getByTestId('tech-icon')).toHaveClass('custom-icon-class');
  });

  it('should render hover card content with tech value', () => {
    render(<TechCard tech={defaultTech} />);

    expect(screen.getByText('@react')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript library for building user interfaces')).toBeInTheDocument();
  });

  it('should render link to tech documentation', () => {
    render(<TechCard tech={defaultTech} />);

    const link = screen.getByRole('link', { name: '@react' });
    expect(link).toHaveAttribute('href', 'https://react.dev');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should render description in hover card', () => {
    const tech = {
      ...defaultTech,
      description: 'Custom description for testing',
    };
    render(<TechCard tech={tech} />);

    expect(screen.getByText('Custom description for testing')).toBeInTheDocument();
  });
});
