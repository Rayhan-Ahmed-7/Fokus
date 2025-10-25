import { useState, useEffect, useRef } from "react";
import {
  type ISortState,
  type StickData,
} from "../types/sortingVisualizerTypes";
import { SortState } from "../util/constant";

// ==================== CONFIG ====================
const CONFIG = {
  minValue: 10,
  maxValue: 200,
  initialSize: 20,
  initialDuration: 100,
  arraySize: { min: 5, max: 50, step: 5 },
  speed: { min: 10, max: 500, step: 10 },
} as const;

// ==================== UTILITIES ====================
const generateArray = (size: number, min: number, max: number): StickData[] =>
  Array.from({ length: size }, (_, index) => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    id: Date.now() + index,
    position: index,
  }));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== HOOK ====================
const useSortingVisualizer = (
  sortGeneratorFn: (arr: StickData[]) => Generator<void, void, unknown>
) => {
  // --- State ---
  const [arraySize, setArraySize] = useState<number>(CONFIG.initialSize);
  const [duration, setDuration] = useState<number>(CONFIG.initialDuration);
  const [sticks, setSticks] = useState<StickData[]>(() =>
    generateArray(CONFIG.initialSize, CONFIG.minValue, CONFIG.maxValue)
  );
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [sortGenerator, setSortGenerator] = useState<Generator<
    void,
    void,
    unknown
  > | null>(null);
  const [sortState, setSortState] = useState<ISortState>(SortState.Idle);

  // --- Refs ---
  const sortGeneratorRef = useRef<Generator<void, void, unknown> | null>(null);
  const sortStateRef = useRef<ISortState>(SortState.Idle);

  // --- Keep Refs Synced ---
  useEffect(() => {
    sortGeneratorRef.current = sortGenerator;
  }, [sortGenerator]);

  useEffect(() => {
    sortStateRef.current = sortState;
  }, [sortState]);

  // --- Continue sorting when resumed ---
  useEffect(() => {
    if (sortState === SortState.Sorting && sortGeneratorRef.current) {
      executeStep(sortGeneratorRef.current);
    }
  }, [sortState]);

  // ==================== EXECUTION HANDLER ====================
  const executeStep = async (generator: Generator<void, void, unknown>) => {
    if (sortStateRef.current === SortState.Paused) return;

    const result = generator.next();

    if (!result.done) {
      await sleep(duration);
      if (sortStateRef.current === SortState.Sorting) executeStep(generator);
    } else {
      setSortState(SortState.Completed);
      setSortGenerator(null);
    }
  };

  // ==================== SORT CONTROL ====================
  const startSort = () => {
    if (sortState === SortState.Paused && sortGenerator) {
      setSortState(SortState.Sorting);
    } else {
      const arr = [...sticks];
      const generator = sortGeneratorFn(arr);
      setSortGenerator(generator);
      setSortState(SortState.Sorting);
      executeStep(generator);
    }
  };

  const togglePause = () => {
    if (sortState === SortState.Sorting) setSortState(SortState.Paused);
    else if (sortState === SortState.Paused) setSortState(SortState.Sorting);
  };

  // ==================== ARRAY CONTROLS ====================
  const resetState = () => {
    setSortedIndices([]);
    setActiveIndices([]);
    setSortGenerator(null);
    setSortState(SortState.Idle);
  };

  const regenerateArray = () => {
    if (sortState === SortState.Sorting) return;
    setSticks(generateArray(arraySize, CONFIG.minValue, CONFIG.maxValue));
    resetState();
  };

  const adjustArraySize = (delta: number) => {
    if (sortState === SortState.Sorting) return;
    const newSize = Math.max(
      CONFIG.arraySize.min,
      Math.min(CONFIG.arraySize.max, arraySize + delta)
    );
    setArraySize(newSize);
    setSticks(generateArray(newSize, CONFIG.minValue, CONFIG.maxValue));
    resetState();
  };

  // ==================== HELPERS ====================
  const getStatus = () => {
    switch (sortState) {
      case SortState.Sorting:
        return "Sorting in progress...";
      case SortState.Paused:
        return "Sorting paused...";
      case SortState.Completed:
        return "Sorting complete!";
      default:
        return "Ready to sort";
    }
  };

  return {
    sticks,
    arraySize,
    duration,
    activeIndices,
    sortedIndices,
    sortState,
    sortGenerator,
    CONFIG,
    setDuration,
    startSort,
    togglePause,
    regenerateArray,
    adjustArraySize,
    getStatus,
    setActiveIndices,
    setSortedIndices,
    setSticks,
  };
};

export default useSortingVisualizer;
