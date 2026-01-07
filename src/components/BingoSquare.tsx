import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center border-4 select-none min-h-[60px] text-[0.5rem] leading-tight font-bold uppercase transition-all duration-100';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-arcade-yellow border-coin-gold text-cabinet-dark shadow-[0_0_20px_var(--color-arcade-yellow)]'
      : 'bg-arcade-green border-arcade-cyan text-cabinet-dark shadow-[0_0_15px_var(--color-arcade-green)]'
    : 'bg-cabinet-base border-arcade-purple text-arcade-cyan hover:bg-[#3d2b79] active:bg-[#1d0b59]';

  const freeSpaceClasses = square.isFreeSpace 
    ? 'text-[0.55rem] bg-arcade-pink border-arcade-orange text-white shadow-[0_0_15px_var(--color-arcade-pink)]' 
    : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto px-0.5">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-1 right-1 text-cabinet-dark text-base font-black">★</span>
      )}
    </button>
  );
}
