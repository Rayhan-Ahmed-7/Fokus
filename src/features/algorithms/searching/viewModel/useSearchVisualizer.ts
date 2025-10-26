import { useState, useEffect, useRef } from "react";
import type { ISearchState, StickData } from "../types/searchingTypes";
import { SearchState } from "../util/constant";

const CONFIG = {
  minValue: 10,
  maxValue: 100,
  initialSize: 20,
  initialDuration: 500,
  arraySize: { min: 5, max: 50, step: 5 },
  speed: { min: 100, max: 2000, step: 100 },
} as const;

const generateArray = (
  size: number,
  min: number,
  max: number,
  sorted: boolean = false
): StickData[] => {
  const arr = Array.from({ length: size }, (_, index) => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    id: Date.now() + index,
    position: index,
  }));

  if (sorted) {
    arr.sort((a, b) => a.value - b.value);
    arr.forEach((item, i) => {
      item.position = i;
      item.id = i;
    });
  }

  return arr;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useSearchVisualizer = (
  searchGeneratorFn: (
    arr: StickData[],
    target: number
  ) => Generator<void, void, unknown>,
  requiresSorted: boolean = false
) => {
  const [arraySize, setArraySize] = useState<number>(CONFIG.initialSize);
  const [duration, setDuration] = useState<number>(CONFIG.initialDuration);
  const [sticks, setSticks] = useState<StickData[]>(() =>
    generateArray(
      CONFIG.initialSize,
      CONFIG.minValue,
      CONFIG.maxValue,
      requiresSorted
    )
  );
  const [targetValue, setTargetValue] = useState<number>(50);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [checkedIndices, setCheckedIndices] = useState<number[]>([]);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [foundIndex, setFoundIndex] = useState<number>(-1);
  const [comparisons, setComparisons] = useState(0);
  const [searchGenerator, setSearchGenerator] = useState<Generator<
    void,
    void,
    unknown
  > | null>(null);
  const [searchState, setSearchState] = useState<ISearchState>(
    SearchState.Idle
  );

  const searchGeneratorRef = useRef<Generator<void, void, unknown> | null>(
    null
  );
  const searchStateRef = useRef<ISearchState>(SearchState.Idle);

  useEffect(() => {
    searchGeneratorRef.current = searchGenerator;
  }, [searchGenerator]);

  useEffect(() => {
    searchStateRef.current = searchState;
  }, [searchState]);

  useEffect(() => {
    if (searchState === SearchState.Searching && searchGeneratorRef.current) {
      executeStep(searchGeneratorRef.current);
    }
  }, [searchState]);

  const executeStep = async (generator: Generator<void, void, unknown>) => {
    if (searchStateRef.current === SearchState.Paused) return;

    const result = generator.next();

    if (!result.done) {
      await sleep(duration);
      if (searchStateRef.current === SearchState.Searching)
        executeStep(generator);
    } else {
      setSearchGenerator(null);
    }
  };

  const startSearch = () => {
    if (searchState === SearchState.Paused && searchGenerator) {
      setSearchState(SearchState.Searching);
    } else {
      resetVisualization();
      const generator = searchGeneratorFn([...sticks], targetValue);
      setSearchGenerator(generator);
      setSearchState(SearchState.Searching);
      executeStep(generator);
    }
  };

  const togglePause = () => {
    if (searchState === SearchState.Searching)
      setSearchState(SearchState.Paused);
    else if (searchState === SearchState.Paused)
      setSearchState(SearchState.Searching);
  };

  const resetVisualization = () => {
    setActiveIndex(-1);
    setCheckedIndices([]);
    setEliminatedIndices([]);
    setFoundIndex(-1);
    setComparisons(0);
    setSearchState(SearchState.Idle);
    setSearchGenerator(null);
  };

  const regenerateArray = () => {
    if (searchState === SearchState.Searching) return;
    const newArray = generateArray(
      arraySize,
      CONFIG.minValue,
      CONFIG.maxValue,
      requiresSorted
    );
    setSticks(newArray);
    resetVisualization();
  };

  const adjustArraySize = (delta: number) => {
    if (searchState === SearchState.Searching) return;
    const newSize = Math.max(
      CONFIG.arraySize.min,
      Math.min(CONFIG.arraySize.max, arraySize + delta)
    );
    setArraySize(newSize);
    const newArray = generateArray(
      newSize,
      CONFIG.minValue,
      CONFIG.maxValue,
      requiresSorted
    );
    setSticks(newArray);
    resetVisualization();
  };

  const setRandomTarget = () => {
    if (searchState === SearchState.Searching) return;
    const randomIndex = Math.floor(Math.random() * sticks.length);
    setTargetValue(sticks[randomIndex].value);
  };

  const getStatus = () => {
    if (searchState === SearchState.Searching)
      return `Searching... (${comparisons} comparisons)`;
    if (searchState === SearchState.Paused) return "Paused";
    if (searchState === SearchState.Found)
      return `Found at index ${foundIndex}! (${comparisons} comparisons)`;
    if (searchState === SearchState.NotFound)
      return `Not Found (${comparisons} comparisons)`;
    return "Ready to Search";
  };

  return {
    sticks,
    arraySize,
    duration,
    targetValue,
    activeIndex,
    checkedIndices,
    eliminatedIndices,
    foundIndex,
    comparisons,
    searchState,
    searchGenerator,
    CONFIG,
    setDuration,
    setTargetValue,
    startSearch,
    togglePause,
    regenerateArray,
    adjustArraySize,
    setRandomTarget,
    getStatus,
    setActiveIndex,
    setCheckedIndices,
    setEliminatedIndices,
    setFoundIndex,
    setComparisons,
    setSearchState,
  };
};

export default useSearchVisualizer;
