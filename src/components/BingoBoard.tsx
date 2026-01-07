import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Arcade Cabinet Frame */}
      <div className="relative bg-cabinet-base p-6 border-8 border-arcade-purple shadow-[0_0_40px_rgba(160,32,240,0.5)]">
        {/* Screen Bezel */}
        <div className="relative bg-screen-dark p-3 border-4 border-cabinet-dark scanlines">
          {/* Corner Screws */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>
          
          {/* Bingo Grid */}
          <div className="grid grid-cols-5 gap-2 w-full aspect-square">
            {board.map((square) => (
              <BingoSquare
                key={square.id}
                square={square}
                isWinning={winningSquareIds.has(square.id)}
                onClick={() => onSquareClick(square.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Coin Slot Decoration */}
        <div className="mt-4 flex justify-center gap-2">
          <div className="w-16 h-2 bg-cabinet-dark border-2 border-coin-gold rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
