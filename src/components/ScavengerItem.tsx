interface ScavengerItemProps {
  id: number;
  text: string;
  isCompleted: boolean;
  onClick: (id: number) => void;
}

export function ScavengerItem({ id, text, isCompleted, onClick }: ScavengerItemProps) {
  const baseClasses =
    'relative w-full text-left p-3 border-4 transition-all duration-200 text-[0.55rem] md:text-[0.6rem] leading-relaxed font-bold uppercase tracking-wide';

  const stateClasses = isCompleted
    ? 'bg-arcade-green border-arcade-cyan text-cabinet-dark shadow-[0_0_15px_var(--color-arcade-green)]'
    : 'bg-cabinet-dark border-arcade-purple text-arcade-cyan hover:border-arcade-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.3)]';

  return (
    <button
      onClick={() => onClick(id)}
      className={`${baseClasses} ${stateClasses}`}
    >
      <span className="wrap-break-word">{text}</span>
      {isCompleted && (
        <span className="absolute top-2 right-2 text-cabinet-dark text-sm font-black">★</span>
      )}
    </button>
  );
}
