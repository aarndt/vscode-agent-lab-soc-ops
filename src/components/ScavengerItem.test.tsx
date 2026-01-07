import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScavengerItem } from './ScavengerItem';

describe('ScavengerItem', () => {
  it('should render item text', () => {
    const onClick = vi.fn();
    render(
      <ScavengerItem
        id={0}
        text="Test Question"
        isCompleted={false}
        onClick={onClick}
      />
    );
    
    expect(screen.getByText('Test Question')).toBeInTheDocument();
  });

  it('should call onClick with id when clicked', () => {
    const onClick = vi.fn();
    render(
      <ScavengerItem
        id={5}
        text="Test Question"
        isCompleted={false}
        onClick={onClick}
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onClick).toHaveBeenCalledWith(5);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not show star when uncompleted', () => {
    const onClick = vi.fn();
    render(
      <ScavengerItem
        id={0}
        text="Test Question"
        isCompleted={false}
        onClick={onClick}
      />
    );
    
    expect(screen.queryByText('★')).not.toBeInTheDocument();
  });

  it('should show star when completed', () => {
    const onClick = vi.fn();
    render(
      <ScavengerItem
        id={0}
        text="Test Question"
        isCompleted={true}
        onClick={onClick}
      />
    );
    
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('should have different styles when completed', () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <ScavengerItem
        id={0}
        text="Test Question"
        isCompleted={false}
        onClick={onClick}
      />
    );
    
    const buttonUncompleted = screen.getByRole('button');
    const uncompletedClasses = buttonUncompleted.className;
    
    rerender(
      <ScavengerItem
        id={0}
        text="Test Question"
        isCompleted={true}
        onClick={onClick}
      />
    );
    
    const buttonCompleted = screen.getByRole('button');
    const completedClasses = buttonCompleted.className;
    
    expect(completedClasses).not.toBe(uncompletedClasses);
    expect(completedClasses).toContain('arcade-green');
  });

  it('should be keyboard accessible', () => {
    const onClick = vi.fn();
    render(
      <ScavengerItem
        id={0}
        text="Test Question"
        isCompleted={false}
        onClick={onClick}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });
});
