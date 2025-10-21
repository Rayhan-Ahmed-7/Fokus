import { Button } from "@/components/ui/button";
import { useState } from "react";

const generateArray = (size: number, minValue: number, maxValue: number) =>
  Array.from(
    { length: size },
    () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
  );

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const InsertionSortPage = () => {
  const size = 20;
  const minValue = 100;
  const maxValue = 400;
  const duration = 100; // ms between steps

  const [sticks, setSticks] = useState(generateArray(size, minValue, maxValue));
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...sticks];

    for (let i = 1; i < arr.length; i++) {
      let insertIndex = i;
      const currentValue = arr[i];
      for (let j = i - 1; j >= 0; j--) {
        await sleep(duration);
        setActiveIndices([i, j]); // highlight compared elements
        if (arr[j] > currentValue) {
          arr[j + 1] = arr[j];
          setSticks([...arr]);
          insertIndex = j;
          await sleep(duration);
        } else {
          break;
        }
      }
      arr[insertIndex] = currentValue;
      setSticks([...arr]);
      // Mark the last sorted element
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
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
        <Button onClick={insertionSort} disabled={isSorting}>
          {isSorting ? "Sorting..." : "Start Insertion Sort"}
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

export default InsertionSortPage;
