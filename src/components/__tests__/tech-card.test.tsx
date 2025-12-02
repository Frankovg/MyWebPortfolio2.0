import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TechCard from '../tech-card';

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href, target }: { children: React.ReactNode; href: string; target?: string }) {
    return <a href={href} target={target}>{children}</a>;
  },
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

  it('should show hover card content on hover', async () => {
    const user = userEvent.setup();
    render(<TechCard tech={defaultTech} />);

    const trigger = screen.getByTestId('tech-icon').closest('div');
    await user.hover(trigger!);

    // Wait for hover card to appear (openDelay: 200ms)
    expect(await screen.findByText('@react')).toBeInTheDocument();
    expect(await screen.findByText('A JavaScript library for building user interfaces')).toBeInTheDocument();
  });

  it('should render link to tech documentation', async () => {
    const user = userEvent.setup();
    render(<TechCard tech={defaultTech} />);

    const trigger = screen.getByTestId('tech-icon').closest('div');
    await user.hover(trigger!);

    const link = await screen.findByRole('link', { name: '@react' });
    expect(link).toHaveAttribute('href', 'https://react.dev');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should render description in hover card', async () => {
    const user = userEvent.setup();
    const tech = {
      ...defaultTech,
      description: 'Custom description for testing',
    };
    render(<TechCard tech={tech} />);

    const trigger = screen.getByTestId('tech-icon').closest('div');
    await user.hover(trigger!);

    expect(await screen.findByText('Custom description for testing')).toBeInTheDocument();
  });
});
