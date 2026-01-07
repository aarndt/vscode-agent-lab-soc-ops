import type { ScavengerItem as ScavengerItemType } from '../types';
import { ScavengerItem } from './ScavengerItem';

interface ScavengerScreenProps {
  list: ScavengerItemType[];
  progress: { completed: number; total: number };
  onToggleItem: (itemId: number) => void;
  onReset: () => void;
}

export function ScavengerScreen({
  list,
  progress,
  onToggleItem,
  onReset,
}: ScavengerScreenProps) {
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
        <h1 className="font-bold text-arcade-pink text-xs tracking-widest neon-glow">SCAVENGER HUNT</h1>
        <div className="w-16"></div>
      </header>

      {/* Progress Counter */}
      <div className="bg-cabinet-base border-b-4 border-arcade-purple text-center py-2">
        <p className="text-arcade-yellow text-[0.6rem] font-bold tracking-wider neon-glow">
          {progress.completed}/{progress.total} FOUND
        </p>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="relative max-w-3xl mx-auto bg-cabinet-base border-8 border-arcade-purple p-4 shadow-[0_0_40px_rgba(160,32,240,0.5)]">
          {/* Corner Screws */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-800"></div>
          
          <div className="space-y-2">
            {list.map((item) => (
              <ScavengerItem
                key={item.id}
                id={item.id}
                text={item.text}
                isCompleted={item.isCompleted}
                onClick={onToggleItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
