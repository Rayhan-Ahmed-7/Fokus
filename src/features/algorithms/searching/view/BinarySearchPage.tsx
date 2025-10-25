import type { StickData } from "../types/searchingTypes";
import { SearchState } from "../util/constant";
import SearchVisualizer, {
  type SearchHelpers,
} from "./components/SearchVisualizer";

const BinarySearchPage = () => {
  function* binarySearchGenerator(
    arr: StickData[],
    target: number,
    {
      setActiveIndex,
      setEliminatedIndices,
      setFoundIndex,
      setComparisons,
      setSearchState,
    }: SearchHelpers
  ) {
    setComparisons(0);
    let count = 0;
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      setActiveIndex(mid);
      count++;
      setComparisons(count);
      yield;

      if (arr[mid].value === target) {
        setFoundIndex(mid);
        setSearchState(SearchState.Found);
        setActiveIndex(-1);
        return;
      }

      if (arr[mid].value < target) {
        const eliminated = Array.from(
          { length: mid - left + 1 },
          (_, i) => left + i
        );
        setEliminatedIndices((prev) => [...prev, ...eliminated]);
        left = mid + 1;
      } else {
        const eliminated = Array.from(
          { length: right - mid + 1 },
          (_, i) => mid + i
        );
        setEliminatedIndices((prev) => [...prev, ...eliminated]);
        right = mid - 1;
      }

      setActiveIndex(-1);
      yield;
    }

    setSearchState(SearchState.NotFound);
    setActiveIndex(-1);
  }

  return (
    <SearchVisualizer
      title="Binary Search Visualizer"
      description="Watch Binary Search divide and conquer efficiently"
      algorithmName="Binary Search"
      requiresSorted={true}
      showPointers={true}
      generatorFn={binarySearchGenerator}
      algorithmInfo={{
        steps: [
          "1. Start with the middle element of a sorted array",
          "2. If target equals middle element, search is complete",
          "3. If target is less than middle, search the left half",
          "4. If target is greater than middle, search the right half",
          "5. Repeat until target is found or search space is empty",
        ],
        complexity:
          "Time Complexity: O(log n) | Space Complexity: O(1) | Requires sorted array",
      }}
    />
  );
};

export default BinarySearchPage;
