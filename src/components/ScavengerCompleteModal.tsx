interface ScavengerCompleteModalProps {
  onDismiss: () => void;
}

export function ScavengerCompleteModal({ onDismiss }: ScavengerCompleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="relative bg-cabinet-base border-8 border-arcade-yellow p-6 max-w-xs w-full text-center shadow-[0_0_60px_rgba(255,240,0,0.8)] animate-[bounce_0.5s_ease-out]">
        {/* Flashing Border Lights */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-arcade-pink rounded-full pulse-glow"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-arcade-cyan rounded-full pulse-glow" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-arcade-cyan rounded-full pulse-glow" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-arcade-pink rounded-full pulse-glow" style={{ animationDelay: '0.9s' }}></div>
        
        {/* Trophy/Star */}
        <div className="text-6xl mb-4 neon-glow text-arcade-yellow">★</div>
        
        {/* Winner Text */}
        <h2 className="text-2xl font-bold text-arcade-yellow neon-glow mb-2 tracking-wider">ALL FOUND!</h2>
        <p className="text-arcade-cyan text-xs mb-1 tracking-wide">SCAVENGER HUNT COMPLETE!</p>
        <p className="text-arcade-green text-[0.5rem] mb-6">+15000 POINTS</p>
        
        {/* Continue Button */}
        <button
          onClick={onDismiss}
          className="w-full bg-arcade-cyan text-cabinet-dark font-bold py-3 px-6 text-sm tracking-wider border-4 border-arcade-green arcade-btn shadow-[0_0_30px_rgba(0,240,255,0.6)] uppercase"
        >
          CONTINUE?
        </button>
        
        {/* Score Display */}
        <div className="mt-3 text-coin-gold text-[0.45rem] tracking-widest">PRESS TO CONTINUE</div>
      </div>
    </div>
  );
}
