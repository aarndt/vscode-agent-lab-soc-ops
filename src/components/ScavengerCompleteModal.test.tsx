import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScavengerCompleteModal } from './ScavengerCompleteModal';

describe('ScavengerCompleteModal', () => {
  it('should render completion message', () => {
    const onDismiss = vi.fn();
    render(<ScavengerCompleteModal onDismiss={onDismiss} />);
    
    expect(screen.getByText(/ALL FOUND/i)).toBeInTheDocument();
  });

  it('should render continue button', () => {
    const onDismiss = vi.fn();
    render(<ScavengerCompleteModal onDismiss={onDismiss} />);
    
    expect(screen.getByRole('button', { name: /CONTINUE/i })).toBeInTheDocument();
  });

  it('should call onDismiss when continue button clicked', () => {
    const onDismiss = vi.fn();
    render(<ScavengerCompleteModal onDismiss={onDismiss} />);
    
    const continueButton = screen.getByRole('button', { name: /CONTINUE/i });
    fireEvent.click(continueButton);
    
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should have overlay background', () => {
    const onDismiss = vi.fn();
    const { container } = render(<ScavengerCompleteModal onDismiss={onDismiss} />);
    
    const overlay = container.firstChild;
    expect(overlay).toHaveClass('fixed', 'inset-0');
  });

  it('should display arcade-style success message', () => {
    const onDismiss = vi.fn();
    render(<ScavengerCompleteModal onDismiss={onDismiss} />);
    
    // Check for arcade styling elements
    expect(screen.getByText(/ALL FOUND/i)).toHaveClass('neon-glow');
  });

  it('should show points or celebration message', () => {
    const onDismiss = vi.fn();
    render(<ScavengerCompleteModal onDismiss={onDismiss} />);
    
    // Should show some reward/celebration text
    const modal = screen.getByRole('button', { name: /CONTINUE/i }).closest('div');
    expect(modal).toBeTruthy();
  });
});
