import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-screen-dark pixel-stars">
      {/* Arcade Marquee Header */}
      <header className="flex items-center justify-between p-3 bg-cabinet-base border-b-4 border-arcade-purple shadow-[0_0_20px_rgba(160,32,240,0.5)]">
        <button
          onClick={onReset}
          className="text-arcade-cyan text-[0.5rem] px-2 py-1 border-2 border-arcade-cyan hover:bg-arcade-cyan hover:text-cabinet-dark transition-colors uppercase tracking-wide"
        >
          ◄ EXIT
        </button>
        <h1 className="font-bold text-arcade-pink text-xs tracking-widest neon-glow">SOC OPS</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-arcade-cyan text-[0.45rem] py-2 px-4 tracking-wide">
        TAP SQUARE WHEN YOU FIND A MATCH
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-arcade-yellow text-cabinet-dark text-center py-2 font-bold text-[0.6rem] tracking-wider shadow-[0_0_30px_var(--color-arcade-yellow)]">
          ★ BINGO! YOU GOT A LINE! ★
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
