import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Play, RotateCcw, Pause } from "lucide-react";
import { SortState, type StickData } from "../../types/sortingVisualizerTypes";
import useSortingVisualizer from "../../viewModel/useSortingVisualizer";

type SortingVisualizerProps = {
  title: string;
  description?: string;
  algorithmName?: string;
  generatorFn: (
    arr: StickData[],
    helpers: SortingHelpers
  ) => Generator<void, void, unknown>;
};

export type SortingHelpers = {
  setActiveIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setSticks: React.Dispatch<React.SetStateAction<StickData[]>>;
};

const STICK_DIMENSIONS = {
  width: (size: number) => (size <= 20 ? 24 : size <= 35 ? 18 : 16),
  gap: (size: number) => (size <= 20 ? 4 : size <= 35 ? 3 : 2),
} as const;

export default function SortingVisualizer({
  title,
  description,
  algorithmName,
  generatorFn,
}: SortingVisualizerProps) {
  const {
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
  } = useSortingVisualizer((arr) =>
    generatorFn(arr, { setActiveIndices, setSortedIndices, setSticks })
  );

  const stickWidth = STICK_DIMENSIONS.width(arraySize);
  const gap = STICK_DIMENSIONS.gap(arraySize);

  const getStickColor = (index: number) => {
    if (sticks[index].id === -1) {
      return "bg-transparent border-2 border-dashed border-blue-400"; // Show the gap
    }
    if (sortedIndices.includes(index)) return "bg-green-600 dark:bg-green-500";
    if (activeIndices.includes(index)) return "bg-rose-500 dark:bg-rose-400";
    return "bg-yellow-500 dark:bg-yellow-400";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          )}
        </div>

        {/* Controls */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" /> Controls
            </CardTitle>
            <CardDescription>
              Customize the visualization parameters
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Array Size */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Array Size: {arraySize}
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustArraySize(-5)}
                  disabled={sortState === SortState.Sorting || arraySize <= 5}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 px-2">
                  <div className="h-2 bg-secondary rounded-full relative">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${((arraySize - 5) / 45) * 100}%` }}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustArraySize(5)}
                  disabled={sortState === SortState.Sorting || arraySize >= 50}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Range: 5 - 50</p>
            </div>

            {/* Speed */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Animation Speed: {duration}ms
              </Label>
              <Slider
                value={[duration]}
                onValueChange={(v) => setDuration(v[0])}
                min={CONFIG.speed.min}
                max={CONFIG.speed.max}
                step={CONFIG.speed.step}
                disabled={sortState === SortState.Sorting}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fast (10ms)</span>
                <span>Slow (500ms)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={
                  sortState === SortState.Sorting ? togglePause : startSort
                }
                disabled={sortState === SortState.Completed && !sortGenerator}
                size="lg"
                className="flex-1 min-w-[140px]"
              >
                {sortState === SortState.Sorting ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </>
                ) : sortState === SortState.Paused ? (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Resume
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Start Sort
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={regenerateArray}
                disabled={sortState === SortState.Sorting}
                size="lg"
                className="flex-1 min-w-[140px]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                New Array
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visualization */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle>{algorithmName ?? "Visualization"}</CardTitle>
            <CardDescription>{getStatus()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] flex items-end justify-center overflow-x-auto">
              <div
                className="relative h-full flex items-end"
                style={{ width: `${sticks.length * (stickWidth + gap)}px` }}
              >
                {sticks.map((stick, index) => (
                  <div
                    key={stick.id}
                    className={`${getStickColor(index)} rounded-t-lg transition-all duration-300 ease-in-out absolute bottom-0 shadow-lg`}
                    style={{
                      height: `${(stick.value / CONFIG.maxValue) * 80}%`,
                      width: `${stickWidth}px`,
                      transform: `translateX(${index * (stickWidth + gap)}px)`,
                    }}
                  >
                    <p
                      className={`absolute -top-6 left-1/2 -translate-x-1/2 font-semibold text-foreground ${
                        stickWidth < 20 ? "text-[9px]" : "text-xs"
                      }`}
                    >
                      {stick.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="shadow-lg border-2">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Legend
                color="bg-yellow-500 dark:bg-yellow-400"
                label="Unsorted"
              />
              <Legend color="bg-rose-500 dark:bg-rose-400" label="Comparing" />
              <Legend color="bg-green-600 dark:bg-green-500" label="Sorted" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 ${color} rounded`} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
