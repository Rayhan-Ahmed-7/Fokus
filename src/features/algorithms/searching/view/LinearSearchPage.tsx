import { SearchState } from "../util/constant";
import type { SearchHelpers } from "./components/SearchVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";

type StickData = {
  id: number;
  value: number;
  position: number;
};

const LinearSearchPage = () => {
  function* linearSearchGenerator(
    arr: StickData[],
    target: number,
    {
      setActiveIndex,
      setCheckedIndices,
      setFoundIndex,
      setComparisons,
      setSearchState,
    }: SearchHelpers
  ) {
    setComparisons(0);
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      setActiveIndex(i);
      count++;
      setComparisons(count);
      yield;

      if (arr[i].value === target) {
        setFoundIndex(i);
        setSearchState(SearchState.Found);
        setActiveIndex(-1);
        return;
      }

      setCheckedIndices((prev) => [...prev, i]);
      setActiveIndex(-1);
      yield;
    }

    setSearchState(SearchState.NotFound);
    setActiveIndex(-1);
  }

  return (
    <SearchVisualizer
      title="Linear Search Visualizer"
      description="Watch Linear Search check each element sequentially"
      algorithmName="Linear Search"
      requiresSorted={false}
      showPointers={false}
      generatorFn={linearSearchGenerator}
      algorithmInfo={{
        steps: [
          "1. Start from the first element of the array",
          "2. Compare each element with the target value",
          "3. If a match is found, return the index",
          "4. If no match is found after checking all elements, return not found",
        ],
        complexity:
          "Time Complexity: O(n) | Space Complexity: O(1) | Works on unsorted arrays",
      }}
    />
  );
};

export default LinearSearchPage;
