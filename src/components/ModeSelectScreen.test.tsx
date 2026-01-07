import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModeSelectScreen } from './ModeSelectScreen';

describe('ModeSelectScreen', () => {
  it('should render mode selection title', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    expect(screen.getByText(/SELECT GAME MODE/i)).toBeInTheDocument();
  });

  it('should render bingo mode button', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    expect(screen.getByRole('button', { name: /PLAY BINGO/i })).toBeInTheDocument();
  });

  it('should render scavenger hunt button', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    expect(screen.getByRole('button', { name: /PLAY SCAVENGER/i })).toBeInTheDocument();
  });

  it('should call onSelectMode with "bingo" when bingo button clicked', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    const bingoButton = screen.getByRole('button', { name: /PLAY BINGO/i });
    fireEvent.click(bingoButton);
    
    expect(onSelect).toHaveBeenCalledWith('bingo');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should call onSelectMode with "scavenger" when scavenger button clicked', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    const scavengerButton = screen.getByRole('button', { name: /PLAY SCAVENGER/i });
    fireEvent.click(scavengerButton);
    
    expect(onSelect).toHaveBeenCalledWith('scavenger');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should display bingo mode description', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    expect(screen.getByText(/5 IN A ROW/i)).toBeInTheDocument();
  });

  it('should display scavenger hunt mode description', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    expect(screen.getByText(/CHECK OFF ALL 24/i)).toBeInTheDocument();
  });

  it('should have arcade-style button classes', () => {
    const onSelect = vi.fn();
    render(<ModeSelectScreen onSelectMode={onSelect} />);
    
    const bingoButton = screen.getByRole('button', { name: /PLAY BINGO/i });
    expect(bingoButton).toHaveClass('arcade-btn');
  });
});
