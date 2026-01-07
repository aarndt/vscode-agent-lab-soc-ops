import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScavengerScreen } from './ScavengerScreen';
import type { ScavengerItem } from '../types';

describe('ScavengerScreen', () => {
  const mockList: ScavengerItem[] = [
    { id: 0, text: 'Question 1', isCompleted: false },
    { id: 1, text: 'Question 2', isCompleted: true },
    { id: 2, text: 'Question 3', isCompleted: false },
  ];

  it('should render scavenger hunt title', () => {
    const onToggle = vi.fn();
    const onReset = vi.fn();
    render(
      <ScavengerScreen
        list={mockList}
        progress={{ completed: 1, total: 3 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    expect(screen.getByText(/SCAVENGER HUNT/i)).toBeInTheDocument();
  });

  it('should display progress counter', () => {
    const onToggle = vi.fn();
    const onReset = vi.fn();
    render(
      <ScavengerScreen
        list={mockList}
        progress={{ completed: 1, total: 3 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    expect(screen.getByText(/1\/3 FOUND/i)).toBeInTheDocument();
  });

  it('should render all scavenger items', () => {
    const onToggle = vi.fn();
    const onReset = vi.fn();
    render(
      <ScavengerScreen
        list={mockList}
        progress={{ completed: 1, total: 3 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Question 3')).toBeInTheDocument();
  });

  it('should call onToggleItem when item is clicked', () => {
    const onToggle = vi.fn();
    const onReset = vi.fn();
    render(
      <ScavengerScreen
        list={mockList}
        progress={{ completed: 1, total: 3 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    const item = screen.getByText('Question 1').closest('button');
    fireEvent.click(item!);
    
    expect(onToggle).toHaveBeenCalledWith(0);
  });

  it('should render exit button', () => {
    const onToggle = vi.fn();
    const onReset = vi.fn();
    render(
      <ScavengerScreen
        list={mockList}
        progress={{ completed: 1, total: 3 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    const exitButton = screen.getByRole('button', { name: /EXIT/i });
    expect(exitButton).toBeInTheDocument();
  });

  it('should call onReset when exit button clicked', () => {
    const onToggle = vi.fn();
    const onReset = vi.fn();
    render(
      <ScavengerScreen
        list={mockList}
        progress={{ completed: 1, total: 3 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    const exitButton = screen.getByRole('button', { name: /EXIT/i });
    fireEvent.click(exitButton);
    
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('should display progress as 24/24 when complete', () => {
    const fullList: ScavengerItem[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      text: `Question ${i}`,
      isCompleted: true,
    }));

    const onToggle = vi.fn();
    const onReset = vi.fn();
    render(
      <ScavengerScreen
        list={fullList}
        progress={{ completed: 24, total: 24 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    expect(screen.getByText(/24\/24 FOUND/i)).toBeInTheDocument();
  });

  it('should have scrollable list container', () => {
    const longList: ScavengerItem[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      text: `Question ${i}`,
      isCompleted: false,
    }));

    const onToggle = vi.fn();
    const onReset = vi.fn();
    const { container } = render(
      <ScavengerScreen
        list={longList}
        progress={{ completed: 0, total: 24 }}
        onToggleItem={onToggle}
        onReset={onReset}
      />
    );
    
    // Check for overflow-y-auto class on list container
    const listContainer = container.querySelector('.overflow-y-auto');
    expect(listContainer).toBeInTheDocument();
  });
});
