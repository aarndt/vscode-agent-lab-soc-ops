import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBingoGame } from './useBingoGame';

describe('useBingoGame - Mode Selection', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('initial state with mode selection', () => {
    it('should start in "start" state without a selected mode', () => {
      const { result } = renderHook(() => useBingoGame());
      expect(result.current.gameState).toBe('start');
      expect(result.current.gameMode).toBeUndefined();
    });

    it('should transition to "mode-select" state when starting from start screen', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.showModeSelect();
      });

      expect(result.current.gameState).toBe('mode-select');
    });
  });

  describe('mode selection', () => {
    it('should allow selecting bingo mode', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.showModeSelect();
      });

      act(() => {
        result.current.selectMode('bingo');
      });

      expect(result.current.gameMode).toBe('bingo');
      expect(result.current.gameState).toBe('playing');
      expect(result.current.board).toHaveLength(25);
    });

    it('should allow selecting scavenger mode', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.showModeSelect();
      });

      act(() => {
        result.current.selectMode('scavenger');
      });

      expect(result.current.gameMode).toBe('scavenger');
      expect(result.current.gameState).toBe('playing');
      expect(result.current.scavengerList).toHaveLength(24);
    });

    it('should generate new board when selecting bingo mode', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('bingo');
      });

      expect(result.current.board).toHaveLength(25);
      expect(result.current.board[12].isFreeSpace).toBe(true);
    });

    it('should generate new scavenger list when selecting scavenger mode', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('scavenger');
      });

      expect(result.current.scavengerList).toHaveLength(24);
      expect(result.current.scavengerList.every(item => !item.isCompleted)).toBe(true);
    });
  });

  describe('scavenger hunt gameplay', () => {
    it('should toggle scavenger items', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('scavenger');
      });

      const firstItemId = result.current.scavengerList[0].id;
      
      act(() => {
        result.current.toggleScavengerItem(firstItemId);
      });

      expect(result.current.scavengerList[0].isCompleted).toBe(true);
    });

    it('should track scavenger progress', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('scavenger');
      });

      expect(result.current.scavengerProgress.completed).toBe(0);
      expect(result.current.scavengerProgress.total).toBe(24);

      act(() => {
        result.current.toggleScavengerItem(0);
      });

      expect(result.current.scavengerProgress.completed).toBe(1);
    });

    it('should transition to "scavenger-complete" state when all items checked', async () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('scavenger');
      });

      // Toggle all items
      act(() => {
        result.current.scavengerList.forEach((item) => {
          result.current.toggleScavengerItem(item.id);
        });
      });

      // Wait for microtask to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.gameState).toBe('scavenger-complete');
      expect(result.current.showScavengerCompleteModal).toBe(true);
    });

    it('should batch state updates when completing scavenger hunt', async () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('scavenger');
      });

      const allButOneIds = result.current.scavengerList.slice(0, 23).map(item => item.id);
      const lastId = result.current.scavengerList[23].id;

      // Toggle all but last
      act(() => {
        allButOneIds.forEach(id => result.current.toggleScavengerItem(id));
      });

      expect(result.current.gameState).toBe('playing');

      // Toggle last item - should trigger completion
      act(() => {
        result.current.toggleScavengerItem(lastId);
      });

      // Wait for microtask to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.gameState).toBe('scavenger-complete');
      expect(result.current.showScavengerCompleteModal).toBe(true);
    });
  });

  describe('reset functionality with modes', () => {
    it('should reset to start state from bingo mode', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('bingo');
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.gameState).toBe('start');
      expect(result.current.board).toHaveLength(0);
      expect(result.current.gameMode).toBeUndefined();
    });

    it('should reset to start state from scavenger mode', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('scavenger');
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.gameState).toBe('start');
      expect(result.current.scavengerList).toHaveLength(0);
      expect(result.current.gameMode).toBeUndefined();
    });
  });

  describe('localStorage persistence v2', () => {
    it('should save and restore bingo mode state', () => {
      const { result: result1 } = renderHook(() => useBingoGame());
      
      act(() => {
        result1.current.selectMode('bingo');
      });

      act(() => {
        result1.current.handleSquareClick(0);
      });

      // Unmount and remount
      const { result: result2 } = renderHook(() => useBingoGame());

      expect(result2.current.gameMode).toBe('bingo');
      expect(result2.current.gameState).toBe('playing');
      expect(result2.current.board[0].isMarked).toBe(true);
    });

    it('should save and restore scavenger mode state', () => {
      const { result: result1 } = renderHook(() => useBingoGame());
      
      act(() => {
        result1.current.selectMode('scavenger');
      });

      act(() => {
        result1.current.toggleScavengerItem(0);
      });

      // Unmount and remount
      const { result: result2 } = renderHook(() => useBingoGame());

      expect(result2.current.gameMode).toBe('scavenger');
      expect(result2.current.gameState).toBe('playing');
      expect(result2.current.scavengerList[0].isCompleted).toBe(true);
    });

    it('should use version 2 for localStorage', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('bingo');
      });

      const saved = localStorage.getItem('bingo-game-state');
      expect(saved).toBeTruthy();
      
      const parsed = JSON.parse(saved!);
      expect(parsed.version).toBe(2);
    });

    it('should clear old version 1 data', () => {
      // Set up old v1 data
      const oldData = {
        version: 1,
        gameState: 'playing',
        board: [],
        winningLine: null,
      };
      localStorage.setItem('bingo-game-state', JSON.stringify(oldData));

      const { result } = renderHook(() => useBingoGame());

      // Should start fresh with no loaded state
      expect(result.current.gameState).toBe('start');
      expect(result.current.gameMode).toBeUndefined();
    });

    it('should store separate bingo and scavenger state', () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('bingo');
      });

      const saved = localStorage.getItem('bingo-game-state');
      const parsed = JSON.parse(saved!);

      expect(parsed).toHaveProperty('bingo');
      expect(parsed).toHaveProperty('scavenger');
      expect(parsed.gameMode).toBe('bingo');
    });
  });

  describe('modal dismiss functionality', () => {
    it('should dismiss scavenger complete modal', async () => {
      const { result } = renderHook(() => useBingoGame());
      
      act(() => {
        result.current.selectMode('scavenger');
      });

      // Complete all items
      act(() => {
        result.current.scavengerList.forEach(item => {
          result.current.toggleScavengerItem(item.id);
        });
      });

      // Wait for microtask to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.showScavengerCompleteModal).toBe(true);

      act(() => {
        result.current.dismissScavengerModal();
      });

      expect(result.current.showScavengerCompleteModal).toBe(false);
    });
  });
});
