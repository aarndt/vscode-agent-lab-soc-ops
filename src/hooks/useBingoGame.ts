import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, GameMode, ScavengerItem } from '../types';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';
import {
  generateScavengerList,
  toggleScavengerItem as toggleScavengerItemLogic,
  checkScavengerComplete,
  getProgress,
} from '../utils/scavengerLogic';

export interface BingoGameState {
  gameState: GameState;
  gameMode: GameMode | undefined;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
  scavengerList: ScavengerItem[];
  scavengerProgress: { completed: number; total: number };
  showScavengerCompleteModal: boolean;
}

export interface BingoGameActions {
  startGame: () => void;
  handleSquareClick: (squareId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
  showModeSelect: () => void;
  selectMode: (mode: GameMode) => void;
  toggleScavengerItem: (itemId: number) => void;
  dismissScavengerModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 2;

interface StoredGameData {
  version: number;
  gameState: GameState;
  gameMode?: GameMode;
  bingo: {
    board: BingoSquareData[];
    winningLine: BingoLine | null;
  };
  scavenger: {
    list: ScavengerItem[];
  };
}

const VALID_GAME_STATES = ['start', 'mode-select', 'playing', 'bingo', 'scavenger-complete'] as const;
const VALID_LINE_TYPES = ['row', 'column', 'diagonal'] as const;

function isValidBingoSquare(sq: unknown): boolean {
  if (!sq || typeof sq !== 'object') return false;
  const square = sq as Record<string, unknown>;
  return (
    typeof square.id === 'number' &&
    typeof square.text === 'string' &&
    typeof square.isMarked === 'boolean' &&
    typeof square.isFreeSpace === 'boolean'
  );
}

function isValidScavengerItem(item: unknown): boolean {
  if (!item || typeof item !== 'object') return false;
  const scavengerItem = item as Record<string, unknown>;
  return (
    typeof scavengerItem.id === 'number' &&
    typeof scavengerItem.text === 'string' &&
    typeof scavengerItem.isCompleted === 'boolean'
  );
}

function isValidBingoLine(line: unknown): boolean {
  if (!line || typeof line !== 'object') return false;
  const bingoLine = line as Record<string, unknown>;
  return (
    typeof bingoLine.type === 'string' &&
    VALID_LINE_TYPES.includes(bingoLine.type as typeof VALID_LINE_TYPES[number]) &&
    typeof bingoLine.index === 'number' &&
    Array.isArray(bingoLine.squares)
  );
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') return false;
  
  const obj = data as Record<string, unknown>;
  
  // Version check
  if (obj.version !== STORAGE_VERSION) return false;
  
  // Game state validation
  if (typeof obj.gameState !== 'string' || !VALID_GAME_STATES.includes(obj.gameState as typeof VALID_GAME_STATES[number])) {
    return false;
  }
  
  // Game mode validation
  if (obj.gameMode !== undefined && typeof obj.gameMode !== 'string') return false;
  
  // Bingo data validation
  if (!obj.bingo || typeof obj.bingo !== 'object') return false;
  const bingo = obj.bingo as Record<string, unknown>;
  
  if (!Array.isArray(bingo.board) || (bingo.board.length !== 0 && bingo.board.length !== 25)) {
    return false;
  }
  
  if (!bingo.board.every(isValidBingoSquare)) return false;
  
  if (bingo.winningLine !== null && bingo.winningLine !== undefined && !isValidBingoLine(bingo.winningLine)) {
    return false;
  }
  
  // Scavenger data validation
  if (!obj.scavenger || typeof obj.scavenger !== 'object') return false;
  const scavenger = obj.scavenger as Record<string, unknown>;
  
  if (!Array.isArray(scavenger.list) || !scavenger.list.every(isValidScavengerItem)) {
    return false;
  }
  
  return true;
}

function loadGameState(): Pick<BingoGameState, 'gameState' | 'gameMode' | 'board' | 'winningLine' | 'scavengerList'> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        gameMode: parsed.gameMode,
        board: parsed.bingo.board,
        winningLine: parsed.bingo.winningLine,
        scavengerList: parsed.scavenger.list,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(
  gameState: GameState,
  gameMode: GameMode | undefined,
  board: BingoSquareData[],
  winningLine: BingoLine | null,
  scavengerList: ScavengerItem[]
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      gameMode,
      bingo: {
        board,
        winningLine,
      },
      scavenger: {
        list: scavengerList,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [gameMode, setGameMode] = useState<GameMode | undefined>(
    () => loadedState?.gameMode
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);
  const [scavengerList, setScavengerList] = useState<ScavengerItem[]>(
    () => loadedState?.scavengerList || []
  );
  const [showScavengerCompleteModal, setShowScavengerCompleteModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  const scavengerProgress = useMemo(
    () => getProgress(scavengerList),
    [scavengerList]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, gameMode, board, winningLine, scavengerList);
  }, [gameState, gameMode, board, winningLine, scavengerList]);

  const showModeSelect = useCallback(() => {
    setGameState('mode-select');
  }, []);

  const selectMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    if (mode === 'bingo') {
      setBoard(generateBoard());
      setWinningLine(null);
    } else {
      setScavengerList(generateScavengerList());
    }
    setGameState('playing');
  }, []);

  const startGame = useCallback(() => {
    setBoard(generateBoard());
    setWinningLine(null);
    setGameMode('bingo');
    setGameState('playing');
  }, []);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);
      const bingo = checkBingo(newBoard);
      
      if (bingo && !winningLine) {
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [winningLine]);

  const toggleScavengerItem = useCallback((itemId: number) => {
    setScavengerList((currentList) => {
      const newList = toggleScavengerItemLogic(currentList, itemId);
      
      if (checkScavengerComplete(newList)) {
        queueMicrotask(() => {
          setGameState('scavenger-complete');
          setShowScavengerCompleteModal(true);
        });
      }
      
      return newList;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setGameMode(undefined);
    setBoard([]);
    setWinningLine(null);
    setShowBingoModal(false);
    setScavengerList([]);
    setShowScavengerCompleteModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  const dismissScavengerModal = useCallback(() => {
    setShowScavengerCompleteModal(false);
  }, []);

  return {
    gameState,
    gameMode,
    board,
    winningLine,
    winningSquareIds,
    showBingoModal,
    scavengerList,
    scavengerProgress,
    showScavengerCompleteModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
    showModeSelect,
    selectMode,
    toggleScavengerItem,
    dismissScavengerModal,
  };
}
