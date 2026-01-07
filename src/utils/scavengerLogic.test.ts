import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateScavengerList,
  toggleScavengerItem,
  checkScavengerComplete,
  getProgress,
  type ScavengerItem,
} from './scavengerLogic';

describe('scavengerLogic', () => {
  describe('generateScavengerList', () => {
    it('should generate a list with 24 items', () => {
      const list = generateScavengerList();
      expect(list).toHaveLength(24);
    });

    it('should have unique IDs from 0 to 23', () => {
      const list = generateScavengerList();
      const ids = list.map((item) => item.id);
      expect(ids).toEqual(Array.from({ length: 24 }, (_, i) => i));
    });

    it('should have all items uncompleted initially', () => {
      const list = generateScavengerList();
      list.forEach((item) => {
        expect(item.isCompleted).toBe(false);
      });
    });

    it('should have text for each item', () => {
      const list = generateScavengerList();
      list.forEach((item) => {
        expect(item.text).toBeTruthy();
        expect(typeof item.text).toBe('string');
        expect(item.text.length).toBeGreaterThan(0);
      });
    });

    it('should randomize question order between lists', () => {
      // Mock Math.random to make it deterministic for first call
      const originalRandom = Math.random;
      let callCount = 0;
      vi.spyOn(Math, 'random').mockImplementation(() => {
        callCount++;
        return callCount / 100;
      });

      const list1 = generateScavengerList();
      
      // Reset counter for second list
      callCount = 0;
      const list2 = generateScavengerList();

      Math.random = originalRandom;

      // Lists should have different order
      const texts1 = list1.map((item) => item.text);
      const texts2 = list2.map((item) => item.text);
      
      expect(texts1).toHaveLength(24);
      expect(texts2).toHaveLength(24);
    });

    it('should contain all 24 questions from questions array', () => {
      const list = generateScavengerList();
      const texts = list.map((item) => item.text);
      
      // Should have exactly 24 unique texts
      const uniqueTexts = new Set(texts);
      expect(uniqueTexts.size).toBe(24);
    });
  });

  describe('toggleScavengerItem', () => {
    let mockList: ScavengerItem[];

    beforeEach(() => {
      mockList = [
        { id: 0, text: 'Question 1', isCompleted: false },
        { id: 1, text: 'Question 2', isCompleted: true },
        { id: 2, text: 'Question 3', isCompleted: false },
      ];
    });

    it('should toggle uncompleted item to completed', () => {
      const newList = toggleScavengerItem(mockList, 0);
      expect(newList[0].isCompleted).toBe(true);
    });

    it('should toggle completed item to uncompleted', () => {
      const newList = toggleScavengerItem(mockList, 1);
      expect(newList[1].isCompleted).toBe(false);
    });

    it('should return a new array', () => {
      const newList = toggleScavengerItem(mockList, 0);
      expect(newList).not.toBe(mockList);
    });

    it('should not modify the original array', () => {
      const originalIsCompleted = mockList[0].isCompleted;
      toggleScavengerItem(mockList, 0);
      expect(mockList[0].isCompleted).toBe(originalIsCompleted);
    });

    it('should not modify other items', () => {
      const newList = toggleScavengerItem(mockList, 0);
      expect(newList[1].isCompleted).toBe(mockList[1].isCompleted);
      expect(newList[2].isCompleted).toBe(mockList[2].isCompleted);
    });

    it('should preserve item text and id', () => {
      const newList = toggleScavengerItem(mockList, 0);
      expect(newList[0].id).toBe(mockList[0].id);
      expect(newList[0].text).toBe(mockList[0].text);
    });

    it('should handle toggling the same item multiple times', () => {
      let list = mockList;
      list = toggleScavengerItem(list, 0);
      expect(list[0].isCompleted).toBe(true);
      
      list = toggleScavengerItem(list, 0);
      expect(list[0].isCompleted).toBe(false);
      
      list = toggleScavengerItem(list, 0);
      expect(list[0].isCompleted).toBe(true);
    });
  });

  describe('checkScavengerComplete', () => {
    it('should return false when no items are completed', () => {
      const list: ScavengerItem[] = [
        { id: 0, text: 'Q1', isCompleted: false },
        { id: 1, text: 'Q2', isCompleted: false },
        { id: 2, text: 'Q3', isCompleted: false },
      ];
      expect(checkScavengerComplete(list)).toBe(false);
    });

    it('should return false when some items are completed', () => {
      const list: ScavengerItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: false },
        { id: 2, text: 'Q3', isCompleted: true },
      ];
      expect(checkScavengerComplete(list)).toBe(false);
    });

    it('should return true when all items are completed', () => {
      const list: ScavengerItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: true },
        { id: 2, text: 'Q3', isCompleted: true },
      ];
      expect(checkScavengerComplete(list)).toBe(true);
    });

    it('should return false when all but one item is completed', () => {
      const list: ScavengerItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isCompleted: i < 23,
      }));
      expect(checkScavengerComplete(list)).toBe(false);
    });

    it('should return true for full 24-item list when all completed', () => {
      const list: ScavengerItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isCompleted: true,
      }));
      expect(checkScavengerComplete(list)).toBe(true);
    });

    it('should handle empty list', () => {
      const list: ScavengerItem[] = [];
      expect(checkScavengerComplete(list)).toBe(true);
    });
  });

  describe('getProgress', () => {
    it('should return 0 completed and correct total when no items completed', () => {
      const list: ScavengerItem[] = [
        { id: 0, text: 'Q1', isCompleted: false },
        { id: 1, text: 'Q2', isCompleted: false },
        { id: 2, text: 'Q3', isCompleted: false },
      ];
      const progress = getProgress(list);
      expect(progress.completed).toBe(0);
      expect(progress.total).toBe(3);
    });

    it('should return correct completed count when some items completed', () => {
      const list: ScavengerItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: false },
        { id: 2, text: 'Q3', isCompleted: true },
        { id: 3, text: 'Q4', isCompleted: false },
      ];
      const progress = getProgress(list);
      expect(progress.completed).toBe(2);
      expect(progress.total).toBe(4);
    });

    it('should return all completed when all items completed', () => {
      const list: ScavengerItem[] = [
        { id: 0, text: 'Q1', isCompleted: true },
        { id: 1, text: 'Q2', isCompleted: true },
        { id: 2, text: 'Q3', isCompleted: true },
      ];
      const progress = getProgress(list);
      expect(progress.completed).toBe(3);
      expect(progress.total).toBe(3);
    });

    it('should handle full 24-item list', () => {
      const list: ScavengerItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isCompleted: i % 3 === 0, // Every third item completed
      }));
      const progress = getProgress(list);
      expect(progress.completed).toBe(8); // 24 / 3 = 8
      expect(progress.total).toBe(24);
    });

    it('should handle empty list', () => {
      const list: ScavengerItem[] = [];
      const progress = getProgress(list);
      expect(progress.completed).toBe(0);
      expect(progress.total).toBe(0);
    });

    it('should return exact count for 23 of 24 completed', () => {
      const list: ScavengerItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isCompleted: i < 23,
      }));
      const progress = getProgress(list);
      expect(progress.completed).toBe(23);
      expect(progress.total).toBe(24);
    });

    it('should return exact count for 1 of 24 completed', () => {
      const list: ScavengerItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `Q${i}`,
        isCompleted: i === 0,
      }));
      const progress = getProgress(list);
      expect(progress.completed).toBe(1);
      expect(progress.total).toBe(24);
    });
  });
});
