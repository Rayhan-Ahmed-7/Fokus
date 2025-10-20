import { Button } from "@/components/ui/button";
import { useState } from "react";

const generateArray = (size: number, minValue: number, maxValue: number) =>
  Array.from(
    { length: size },
    () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
  );

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const BubbleSortPage = () => {
  const size = 20;
  const minValue = 100;
  const maxValue = 400;
  const duration = 100; // ms between steps

  const [sticks, setSticks] = useState(generateArray(size, minValue, maxValue));
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...sticks];
    const sorted: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      let swapped = false;

      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]); // highlight compared elements
        await sleep(duration);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // swap
          swapped = true;
          setSticks([...arr]);
          await sleep(duration);
        }
      }

      // Mark the last sorted element
      sorted.push(arr.length - 1 - i);
      setSortedIndices([...sorted]);

      // Early exit if no swaps occurred
      if (!swapped) {
        while (arr.length > i) {
          sorted.push(arr.length - 1 - i);
          i++;
        }
        console.log(sorted, "before break");
        setSortedIndices([...sorted]);
        break;
      }
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const regenerateArray = () => {
    if (isSorting) return;
    setSticks(generateArray(size, minValue, maxValue));
    setSortedIndices([]);
    setActiveIndices([]);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6 bg-slate-950">
      <div className="flex items-end gap-1">
        {sticks.map((stick, index) => {
          let color = "bg-yellow-500"; // default
          if (sortedIndices.includes(index)) color = "bg-green-600";
          else if (activeIndices.includes(index)) color = "bg-rose-500";

          return (
            <div
              key={index}
              className={`${color} w-6 rounded-t transition-all duration-200 ease-in-out relative`}
              style={{ height: `${stick}px` }}
            >
              <p className="absolute top-[-16px] text-[12px] text-foreground">
                {stick}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button onClick={bubbleSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Start Bubble Sort"}
        </Button>

        <Button
          variant="outline"
          onClick={regenerateArray}
          disabled={isSorting}
        >
          Reset Array
        </Button>
      </div>
    </div>
  );
};

export default BubbleSortPage;
