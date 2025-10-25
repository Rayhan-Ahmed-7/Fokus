import type { StickData } from "../types/sortingVisualizerTypes";
import type { SortingHelpers } from "./components/SortingVisualizer";
import SortingVisualizer from "./components/SortingVisualizer";

const InsertionSortPage = () => {
  function* insertionSortGenerator(
    arr: StickData[],
    { setActiveIndices, setSortedIndices, setSticks }: SortingHelpers
  ) {
    for (let i = 1; i < arr.length; i++) {
      let insertIndex = i;
      const currentValue = { ...arr[i] }; // Make a copy

      // Create a hole at position i
      arr[i] = { ...currentValue, id: -1 }; // Mark as hole with id: -1
      arr.forEach((s, idx) => (s.position = idx));
      setSticks([...arr]);
      setActiveIndices([i]);
      yield;

      for (let j = i - 1; j >= 0; j--) {
        if (arr[j].value > currentValue.value) {
          setActiveIndices([j, j + 1]);
          yield;

          insertIndex = j;

          // Shift element to the right
          arr[j + 1] = { ...arr[j] };

          // Move the hole to position j
          arr[j] = { ...currentValue, id: -1 };

          arr.forEach((s, idx) => (s.position = idx));
          setSticks([...arr]);
          yield;
        } else {
          break;
        }
      }

      // Fill the hole with the actual element
      arr[insertIndex] = { ...currentValue };
      arr.forEach((s, idx) => (s.position = idx));
      setSticks([...arr]);
      setActiveIndices([]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
      yield;
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  }

  return (
    <SortingVisualizer
      title="Insertion Sort"
      description="Watch the Insertion Sort algorithm in action with adjustable speed and array size."
      algorithmName="Insertion Sort"
      generatorFn={insertionSortGenerator}
    />
  );
};

export default InsertionSortPage;
