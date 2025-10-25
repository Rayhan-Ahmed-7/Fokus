import type { StickData } from "../types/sortingVisualizerTypes";
import SortingVisualizer, {
  type SortingHelpers,
} from "./components/SortingVisualizer";

const BubbleSortPage = () => {
  function* bubbleSortGenerator(
    arr: StickData[],
    { setActiveIndices, setSortedIndices, setSticks }: SortingHelpers
  ) {
    const sorted: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      let swapped = false;
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        yield;
        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          arr.forEach((s, idx) => (s.position = idx));
          setSticks([...arr]);
          swapped = true;
          yield;
        }
      }
      sorted.push(arr.length - 1 - i);
      setSortedIndices([...sorted]);
      if (!swapped) break;
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  }

  return (
    <SortingVisualizer
      title="Bubble Sort Visualizer"
      description="Watch the Bubble Sort algorithm in action with adjustable speed and array size."
      algorithmName="Bubble Sort"
      generatorFn={bubbleSortGenerator}
    />
  );
};

export default BubbleSortPage;
