import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Pause, Search, Target } from "lucide-react";
import useSearchVisualizer from "../../viewModel/useSearchVisualizer";
import type { ISearchState, StickData } from "../../types/searchingTypes";
import { SearchState } from "../../util/constant";

type SearchVisualizerProps = {
  title: string;
  description?: string;
  algorithmName?: string;
  requiresSorted?: boolean;
  generatorFn: (
    arr: StickData[],
    target: number,
    helpers: SearchHelpers
  ) => Generator<void, void, unknown>;
  showPointers?: boolean;
  algorithmInfo?: {
    steps: string[];
    complexity: string;
  };
};

export type SearchHelpers = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setCheckedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setEliminatedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setFoundIndex: React.Dispatch<React.SetStateAction<number>>;
  setComparisons: React.Dispatch<React.SetStateAction<number>>;
  setSearchState: React.Dispatch<React.SetStateAction<ISearchState>>;
};

const STICK_DIMENSIONS = {
  width: (size: number) => (size <= 20 ? 24 : size <= 35 ? 18 : 16),
  gap: (size: number) => (size <= 20 ? 4 : size <= 35 ? 3 : 2),
} as const;

export default function SearchVisualizer({
  title,
  description,
  algorithmName,
  requiresSorted = false,
  generatorFn,
  algorithmInfo,
}: SearchVisualizerProps) {
  const {
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
  } = useSearchVisualizer(
    (arr, target) =>
      generatorFn(arr, target, {
        setActiveIndex,
        setCheckedIndices,
        setEliminatedIndices,
        setFoundIndex,
        setComparisons,
        setSearchState,
      }),
    requiresSorted
  );

  const stickWidth = STICK_DIMENSIONS.width(arraySize);
  const gap = STICK_DIMENSIONS.gap(arraySize);

  const getStickColor = (index: number) => {
    if (index === foundIndex) {
      return "bg-green-500 dark:bg-green-400 shadow-2xl ring-4 ring-green-300 z-10 scale-y-110";
    }
    if (index === activeIndex) {
      return "bg-blue-500 dark:bg-blue-400 shadow-xl z-20 animate-wiggle-bounce-y";
    }
    if (eliminatedIndices.includes(index)) {
      return "bg-gray-300 dark:bg-gray-700 opacity-30";
    }
    if (checkedIndices.includes(index)) {
      return "bg-gray-400 dark:bg-gray-600 opacity-50";
    }
    return "bg-yellow-500 dark:bg-yellow-400 animate-gentle-pulse";
  };
  return (
    <div className="min-h-screen bg-linear-to-br p-4 md:p-8">
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
              <Search className="w-5 h-5" /> Search Controls
            </CardTitle>
            <CardDescription>Configure search parameters</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Target Value */}
            <div className="space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Target className="w-4 h-4" />
                Target Value: {targetValue}
              </Label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  // value={targetValue}
                  onChange={(e) => {
                    setTargetValue(
                      Number(e.target.value !== "" ? e.target.value : 1)
                    );
                  }}
                  disabled={searchState === SearchState.Searching}
                  className="flex-1"
                  min={CONFIG.minValue}
                  max={CONFIG.maxValue}
                />
                <Button
                  variant="outline"
                  onClick={setRandomTarget}
                  disabled={searchState === SearchState.Searching}
                >
                  Random
                </Button>
              </div>
            </div>

            {/* Array Size */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Array Size: {arraySize}
              </Label>
              <Slider
                value={[arraySize]}
                onValueChange={(v) => adjustArraySize(v[0] - arraySize)}
                min={CONFIG.arraySize.min}
                max={CONFIG.arraySize.max}
                step={CONFIG.arraySize.step}
                disabled={searchState === SearchState.Searching}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{CONFIG.arraySize.min} elements</span>
                <span>{CONFIG.arraySize.max} elements</span>
              </div>
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
                disabled={searchState === SearchState.Searching}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fast ({CONFIG.speed.min}ms)</span>
                <span>Slow ({CONFIG.speed.max}ms)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={
                  searchState === SearchState.Searching
                    ? togglePause
                    : startSearch
                }
                disabled={
                  searchState === SearchState.Found ||
                  searchState === SearchState.NotFound
                }
                size="lg"
                className="flex-1 min-w-[140px]"
              >
                {searchState === SearchState.Searching ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </>
                ) : searchState === SearchState.Paused ? (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Resume
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Start Search
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={regenerateArray}
                disabled={searchState === SearchState.Searching}
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {algorithmName ?? "Search Visualization"}
                  {requiresSorted && (
                    <Badge variant="default">Sorted Array</Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-1">
                  {getStatus()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Array Visualization */}
            <div className="relative w-full h-[400px] flex items-end justify-center overflow-x-auto rounded-lg">
              <div
                className="relative flex items-end"
                style={{
                  width: `${sticks.length * (stickWidth + gap)}px`,
                  height: "90%",
                }}
              >
                {sticks.map((stick, index) => {
                  const heightPercentage = (stick.value / CONFIG.maxValue) * 90;
                  return (
                    <div
                      key={stick.id}
                      className={`${getStickColor(index)} origin-bottom rounded-t-lg transition-all duration-300 ease-in-out absolute bottom-0 shadow-lg`}
                      style={{
                        height: `${heightPercentage}%`,
                        width: `${stickWidth}px`,
                        left: `${stick.position * (stickWidth + gap)}px`,
                      }}
                    >
                      <p
                        className={`absolute -top-7 left-1/2 -translate-x-1/2 font-bold text-foreground ${
                          stickWidth < 20 ? "text-[10px]" : "text-sm"
                        }`}
                      >
                        {stick.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {comparisons}
              </div>
              <div className="text-sm text-muted-foreground">
                Comparisons Made
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {sticks.length}
              </div>
              <div className="text-sm text-muted-foreground">Array Size</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {comparisons > 0
                  ? `${((comparisons / sticks.length) * 100).toFixed(0)}%`
                  : "0%"}
              </div>
              <div className="text-sm text-muted-foreground">
                Elements Checked
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Legend */}
        <Card className="shadow-lg border-2">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {!requiresSorted ? (
                <>
                  <Legend
                    color="bg-yellow-500 dark:bg-yellow-400"
                    label="Not Checked"
                  />
                  <Legend
                    color="bg-blue-500 dark:bg-blue-400"
                    label="Currently Checking"
                  />
                  <Legend
                    color="bg-gray-400 dark:bg-gray-600"
                    label="Already Checked"
                  />
                  <Legend
                    color="bg-green-500 dark:bg-green-400"
                    label="Target Found"
                  />
                </>
              ) : (
                <>
                  <Legend
                    color="bg-yellow-500 dark:bg-yellow-400"
                    label="Active Range"
                  />
                  <Legend
                    color="bg-blue-500 dark:bg-blue-400"
                    label="Checking Mid"
                  />
                  <Legend
                    color="bg-gray-300 dark:bg-gray-700"
                    label="Eliminated"
                  />
                  <Legend
                    color="bg-green-500 dark:bg-green-400"
                    label="Target Found"
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Info */}
        {algorithmInfo && (
          <Card className="shadow-lg border-2">
            <CardHeader>
              <CardTitle>
                How {algorithmName ?? "This Algorithm"} Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {algorithmInfo.steps.map((step, index) => (
                <p key={index}>{step}</p>
              ))}
              <p className="text-xs pt-2 italic">{algorithmInfo.complexity}</p>
            </CardContent>
          </Card>
        )}
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
