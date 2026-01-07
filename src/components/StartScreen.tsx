import { questions, FREE_SPACE } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

interface MiniSquareProps {
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
}

function MiniSquare({ text, isMarked, isFreeSpace }: MiniSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-1.5 text-center border-4 select-none min-h-[60px] md:min-h-[80px] text-[0.45rem] md:text-[0.5rem] leading-tight font-bold uppercase transition-all duration-200';

  const stateClasses = isMarked
    ? 'bg-arcade-green border-arcade-cyan text-cabinet-dark shadow-[0_0_15px_var(--color-arcade-green)]'
    : 'bg-cabinet-dark border-arcade-purple text-arcade-cyan hover:border-arcade-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.3)]';

  const freeSpaceClasses = isFreeSpace
    ? 'bg-arcade-yellow border-arcade-orange text-cabinet-dark shadow-[0_0_15px_var(--color-arcade-yellow)]'
    : '';

  return (
    <div className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}>
      <span className="wrap-break-word hyphens-auto px-0.5 line-clamp-2">{text}</span>
      {isMarked && !isFreeSpace && (
        <span className="absolute top-0.5 right-0.5 text-cabinet-dark text-xs font-black">★</span>
      )}
    </div>
  );
}

export function StartScreen({ onStart }: StartScreenProps) {
  // Generate 3x3 mini grid (8 questions + FREE_SPACE in center)
  const miniQuestions = [
    questions[0],  // "bikes to work"
    questions[1],  // "has lived in another country"
    questions[2],  // "has a pet"
    questions[3],  // "prefers tea over coffee"
    FREE_SPACE,    // center
    questions[4],  // "plays an instrument"
    questions[5],  // "speaks more than 2 languages"
    questions[6],  // "has run a marathon"
    questions[7],  // "was born in a different state"
  ];

  // Mark some squares to demonstrate gameplay (indices 1, 4 (free space), 7)
  const markedIndices = new Set([1, 4, 7]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-6 bg-screen-dark pixel-stars relative overflow-hidden">
      {/* Arcade Cabinet Frame */}
      <div className="relative w-full max-w-xl md:max-w-2xl bg-cabinet-base p-6 md:p-8 border-8 border-arcade-purple shadow-[0_0_40px_rgba(160,32,240,0.5)] z-10">
        {/* Corner Screws */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>

        {/* Arcade Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-arcade-pink neon-glow mb-2 tracking-wider">
            SOC OPS
          </h1>
          <p className="text-xs md:text-sm text-arcade-cyan tracking-widest">SOCIAL BINGO</p>
        </div>

        {/* Two-Column Layout: Instructions + Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Instructions Panel */}
          <div className="bg-screen-dark border-4 border-cabinet-dark p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-[0.6rem] text-arcade-yellow mb-3 tracking-wider">HOW TO PLAY</h2>
            <ul className="text-left text-arcade-cyan text-[0.5rem] md:text-[0.55rem] space-y-2 leading-relaxed">
              <li>▸ FIND PEOPLE WHO MATCH</li>
              <li>▸ TAP SQUARE = MARK IT</li>
              <li>▸ GET 5 IN A ROW = WIN!</li>
              <li className="text-arcade-green mt-3">▸ HOVER SQUARES BELOW →</li>
            </ul>
          </div>

          {/* Mini Grid Preview */}
          <div className="bg-screen-dark border-4 border-cabinet-dark p-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-[0.55rem] text-arcade-cyan mb-2 tracking-wider text-center">GAME BOARD PREVIEW</h2>
            <div className="grid grid-cols-3 gap-1">
              {miniQuestions.map((question, index) => (
                <MiniSquare
                  key={index}
                  text={question}
                  isMarked={markedIndices.has(index)}
                  isFreeSpace={question === FREE_SPACE}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Coin Slot Decoration */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-20 h-2 bg-cabinet-dark border-2 border-coin-gold rounded-sm"></div>
        </div>

        {/* Insert Coin Button */}
        <button
          onClick={onStart}
          className="w-full bg-arcade-pink text-white py-4 px-8 text-xs md:text-sm font-bold tracking-wider border-4 border-arcade-orange arcade-btn shadow-[0_0_30px_rgba(255,16,240,0.6)] hover:shadow-[0_0_40px_rgba(255,16,240,0.8)] uppercase"
        >
          <span className="pulse-glow">▶ INSERT COIN ◀</span>
        </button>

        {/* Credit Display */}
        <div className="mt-4 text-center text-coin-gold text-[0.5rem] tracking-wider blink">
          CREDITS: ∞
        </div>
      </div>
    </div>
  );
}
