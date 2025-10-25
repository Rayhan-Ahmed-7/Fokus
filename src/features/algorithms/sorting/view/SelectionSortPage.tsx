import type { StickData } from "../types/sortingVisualizerTypes";
import SortingVisualizer, {
  type SortingHelpers,
} from "./components/SortingVisualizer";

const SelectionSortPage = () => {
  function* selectionSortGenerator(
    arr: StickData[],
    { setActiveIndices, setSortedIndices, setSticks }: SortingHelpers
  ) {
    const sorted: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        setActiveIndices([minIndex, j]);
        yield;
        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      arr.forEach((s, idx) => (s.position = idx));
      setSticks([...arr]);
      sorted.push(i);
      setSortedIndices([...sorted]);
      yield;
    }
  }
  return (
    <SortingVisualizer
      title="Selection Sort Visualizer"
      description="Watch the Selection Sort algorithm in action with adjustable speed and array size."
      algorithmName="Bubble Sort"
      generatorFn={selectionSortGenerator}
    />
  );
};

export default SelectionSortPage;
