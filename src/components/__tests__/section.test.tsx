import { render, screen } from '@testing-library/react';

import Section from '../section';

describe('Section', () => {
  it('should render children', () => {
    render(
      <Section id="test">
        <p>Test content</p>
      </Section>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render section element with id', () => {
    render(
      <Section id="projects">
        <p>Projects content</p>
      </Section>
    );

    const section = screen.getByText('Projects content').closest('section');
    expect(section).toHaveAttribute('id', 'projects');
  });

  it('should apply default classes', () => {
    render(
      <Section id="test">
        <p>Content</p>
      </Section>
    );

    const section = screen.getByText('Content').closest('section');
    expect(section).toHaveClass('flex', 'flex-col', 'items-center', 'w-full', 'px-4');
  });

  it('should apply custom className', () => {
    render(
      <Section id="test" className="custom-class py-10">
        <p>Content</p>
      </Section>
    );

    const section = screen.getByText('Content').closest('section');
    expect(section).toHaveClass('custom-class', 'py-10');
  });

  it('should merge default and custom classes', () => {
    render(
      <Section id="test" className="bg-primary">
        <p>Content</p>
      </Section>
    );

    const section = screen.getByText('Content').closest('section');
    expect(section).toHaveClass('flex', 'flex-col', 'bg-primary');
  });

  it('should render multiple children', () => {
    render(
      <Section id="test">
        <h2>Title</h2>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </Section>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
  });
});
