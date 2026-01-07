import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  // Get sample questions for marquee (FREE_SPACE is a separate export, not in questions array)
  const sampleQuestions = questions.slice(0, 8);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-6 bg-screen-dark pixel-stars relative overflow-hidden">
      {/* Wide Arcade Cabinet Frame */}
      <div className="relative max-w-3xl w-full bg-cabinet-base border-8 border-arcade-purple p-6 shadow-[0_0_50px_rgba(160,32,240,0.6)]">
        {/* Corner Pulsing Lights */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-arcade-pink rounded-full pulse-glow shadow-[0_0_20px_rgba(255,16,240,0.8)]"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-arcade-cyan rounded-full pulse-glow shadow-[0_0_20px_rgba(0,240,255,0.8)]" style={{ animationDelay: '375ms' }}></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-arcade-yellow rounded-full pulse-glow shadow-[0_0_20px_rgba(255,240,0,0.8)]" style={{ animationDelay: '750ms' }}></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-arcade-green rounded-full pulse-glow shadow-[0_0_20px_rgba(0,255,65,0.8)]" style={{ animationDelay: '1125ms' }}></div>
        
        {/* Double Bezel: Inner cyan/pink accent frame */}
        <div className="relative border-4 border-arcade-cyan p-4 shadow-[inset_0_0_20px_rgba(0,240,255,0.3)]">
          {/* CRT Screen with Scanlines */}
          <div className="relative bg-screen-dark p-6 scanlines">
            {/* Corner Screws */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-900 shadow-inner"></div>
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-900 shadow-inner"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-900 shadow-inner"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-900 shadow-inner"></div>
            
            <div className="text-center relative z-10">
              {/* Arcade Title */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-arcade-pink neon-glow mb-3 tracking-wider">
                  SOC OPS
                </h1>
                <p className="text-xs md:text-sm text-arcade-cyan tracking-widest mb-2">SOCIAL BINGO</p>
                <p className="text-[0.5rem] text-arcade-yellow tracking-widest italic">THE ULTIMATE SOCIAL MIXER GAME</p>
                
                {/* Blinking Press Start Indicator */}
                <div className="mt-4 text-xs md:text-sm text-arcade-green blink tracking-widest">
                  ► PRESS START ◄
                </div>
              </div>
              
              {/* Scrolling Question Marquee */}
              <div className="mb-6 bg-cabinet-dark border-2 border-arcade-yellow overflow-hidden py-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <div className="whitespace-nowrap marquee-scroll text-arcade-cyan text-[0.5rem] tracking-wider">
                  {sampleQuestions.map((q, i) => (
                    <span key={i}>
                      ★ {q.toUpperCase()} ★
                      {i < sampleQuestions.length - 1 ? '  ·  ' : ''}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Instructions Panel - Horizontal Layout */}
              <div className="bg-cabinet-base border-4 border-arcade-purple p-4 mb-6 shadow-[0_0_30px_rgba(160,32,240,0.4)]">
                <h2 className="text-[0.6rem] text-arcade-yellow mb-3 tracking-wider">CONTROL PANEL - HOW TO PLAY</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
                  <div className="text-arcade-cyan text-[0.5rem] leading-relaxed">
                    <span className="text-arcade-pink">1▸</span> FIND PEOPLE WHO MATCH
                  </div>
                  <div className="text-arcade-cyan text-[0.5rem] leading-relaxed">
                    <span className="text-arcade-pink">2▸</span> TAP SQUARE = MARK IT
                  </div>
                  <div className="text-arcade-cyan text-[0.5rem] leading-relaxed">
                    <span className="text-arcade-pink">3▸</span> GET 5 IN A ROW = WIN!
                  </div>
                </div>
              </div>

              {/* Insert Coin Button */}
              <button
                onClick={onStart}
                className="w-full bg-arcade-pink text-white py-4 px-8 text-sm md:text-base font-bold tracking-wider border-4 border-arcade-orange arcade-btn shadow-[0_0_30px_rgba(255,16,240,0.6)] hover:shadow-[0_0_40px_rgba(255,16,240,0.8)] uppercase mb-4"
              >
                <span className="pulse-glow">▶ INSERT COIN ◀</span>
              </button>
              
              {/* Coin Slot Decoration */}
              <div className="flex justify-center items-center gap-3 mb-3">
                <div className="w-24 h-3 bg-cabinet-dark border-4 border-coin-gold rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></div>
              </div>
              
              {/* Credit Display & Cabinet Labels */}
              <div className="flex justify-between items-center text-[0.45rem] tracking-wider">
                <div className="text-arcade-purple">◄ STEREO SOUND ►</div>
                <div className="text-coin-gold blink">CREDITS: ∞</div>
                <div className="text-arcade-purple">25¢ TO PLAY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
