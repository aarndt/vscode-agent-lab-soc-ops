interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-screen-dark pixel-stars relative overflow-hidden">
      {/* Arcade Cabinet Frame */}
      <div className="relative max-w-lg w-full bg-cabinet-base p-6 border-8 border-arcade-purple shadow-[0_0_40px_rgba(160,32,240,0.5)]">
        {/* Corner Screws */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-800"></div>

        {/* Inner Bezel */}
        <div className="relative bg-screen-dark p-6 border-4 border-cabinet-dark">
          <div className="text-center relative z-10">
            {/* Arcade Title */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-arcade-pink neon-glow mb-2 tracking-wider">
                SOC OPS
              </h1>
              <p className="text-xs md:text-sm text-arcade-cyan tracking-widest">SOCIAL BINGO</p>
            </div>
            
            {/* Instructions Panel - Arcade Style */}
            <div className="bg-cabinet-base border-4 border-arcade-purple p-4 mb-8 shadow-[0_0_20px_rgba(160,32,240,0.3)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
              <h2 className="text-[0.6rem] text-arcade-yellow mb-3 tracking-wider">HOW TO PLAY</h2>
              <ul className="text-left text-arcade-cyan text-[0.6rem] space-y-2 leading-relaxed">
                <li>▸ FIND PEOPLE WHO MATCH</li>
                <li>▸ TAP SQUARE = MARK IT</li>
                <li>▸ GET 5 IN A ROW = WIN!</li>
              </ul>
            </div>

            {/* Insert Coin Button */}
            <button
              onClick={onStart}
              className="w-full bg-arcade-pink text-white py-4 px-8 text-sm font-bold tracking-wider border-4 border-arcade-orange arcade-btn shadow-[0_0_30px_rgba(255,16,240,0.6)] hover:shadow-[0_0_40px_rgba(255,16,240,0.8)] uppercase"
            >
              <span className="pulse-glow">▶ INSERT COIN ◀</span>
            </button>
            
            {/* Coin Slot Decoration */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="text-coin-gold text-[0.45rem] tracking-wider">25¢</div>
              <div className="w-20 h-2 bg-cabinet-dark border-2 border-coin-gold rounded-sm shadow-[0_0_10px_rgba(255,215,0,0.4)] pulse-glow"></div>
            </div>
            
            {/* Credit Display */}
            <div className="mt-4 text-coin-gold text-[0.5rem] tracking-wider blink">
              CREDITS: ∞
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
