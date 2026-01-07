import { questions } from '../data/questions';
import type { ScavengerItem } from '../types';

// Re-export types for convenience
export type { ScavengerItem } from '../types';

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a new scavenger hunt list
 */
export function generateScavengerList(): ScavengerItem[] {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map((text, index) => ({
    id: index,
    text,
    isCompleted: false,
  }));
}

/**
 * Toggle a scavenger item's completed state
 */
export function toggleScavengerItem(list: ScavengerItem[], itemId: number): ScavengerItem[] {
  return list.map((item) =>
    item.id === itemId
      ? { ...item, isCompleted: !item.isCompleted }
      : item
  );
}

/**
 * Check if all scavenger items are completed
 */
export function checkScavengerComplete(list: ScavengerItem[]): boolean {
  return list.every((item) => item.isCompleted);
}

/**
 * Get progress of scavenger hunt
 */
export function getProgress(list: ScavengerItem[]): { completed: number; total: number } {
  const completed = list.filter((item) => item.isCompleted).length;
  const total = list.length;
  
  return { completed, total };
}
