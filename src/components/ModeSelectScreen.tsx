import type { GameMode } from '../types';

interface ModeSelectScreenProps {
  onSelectMode: (mode: GameMode) => void;
}

export function ModeSelectScreen({ onSelectMode }: ModeSelectScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-6 bg-screen-dark pixel-stars relative overflow-hidden">
      {/* Arcade Cabinet Frame */}
      <div className="relative w-full max-w-2xl bg-cabinet-base p-8 border-8 border-arcade-purple shadow-[0_0_40px_rgba(160,32,240,0.5)] z-10">
        {/* Corner Screws */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-arcade-yellow neon-glow mb-2 tracking-wider">
            SELECT GAME MODE
          </h1>
          <p className="text-xs text-arcade-cyan tracking-widest">CHOOSE YOUR CHALLENGE</p>
        </div>

        {/* Mode Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bingo Mode */}
          <div className="bg-screen-dark border-4 border-cabinet-dark p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-arcade-pink text-sm mb-3 tracking-wider text-center neon-glow">BINGO MODE</h2>
            <div className="text-arcade-cyan text-[0.5rem] space-y-2 mb-4 leading-relaxed">
              <p>▸ 5×5 GRID BOARD</p>
              <p>▸ GET 5 IN A ROW</p>
              <p>▸ ROW, COLUMN, OR DIAGONAL</p>
              <p className="text-arcade-green">▸ CLASSIC BINGO!</p>
            </div>
            <button
              onClick={() => onSelectMode('bingo')}
              className="w-full bg-arcade-pink text-white py-3 px-4 text-xs font-bold tracking-wider border-4 border-arcade-orange arcade-btn shadow-[0_0_20px_rgba(255,16,240,0.6)] hover:shadow-[0_0_30px_rgba(255,16,240,0.8)] uppercase"
            >
              PLAY BINGO
            </button>
          </div>

          {/* Scavenger Hunt Mode */}
          <div className="bg-screen-dark border-4 border-cabinet-dark p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-arcade-cyan text-sm mb-3 tracking-wider text-center neon-glow">SCAVENGER HUNT</h2>
            <div className="text-arcade-cyan text-[0.5rem] space-y-2 mb-4 leading-relaxed">
              <p>▸ SIMPLE LIST FORMAT</p>
              <p>▸ CHECK OFF ALL 24</p>
              <p>▸ TRACK YOUR PROGRESS</p>
              <p className="text-arcade-green">▸ COMPLETE THEM ALL!</p>
            </div>
            <button
              onClick={() => onSelectMode('scavenger')}
              className="w-full bg-arcade-cyan text-cabinet-dark py-3 px-4 text-xs font-bold tracking-wider border-4 border-arcade-green arcade-btn shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] uppercase"
            >
              PLAY SCAVENGER
            </button>
          </div>
        </div>

        {/* Coin Slot Decoration */}
        <div className="flex justify-center gap-2">
          <div className="w-20 h-2 bg-cabinet-dark border-2 border-coin-gold rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}
