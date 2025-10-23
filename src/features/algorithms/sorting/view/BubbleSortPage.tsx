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
import { useState, useEffect, useRef } from "react";

// ==================== TYPES ====================
interface StickData {
  value: number;
  id: number;
  position: number;
}

// ==================== CONSTANTS ====================
const CONFIG = {
  minValue: 10,
  maxValue: 200,
  initialSize: 20,
  initialDuration: 100,
  arraySize: {
    min: 5,
    max: 50,
    step: 5,
  },
  speed: {
    min: 10,
    max: 500,
    step: 10,
  },
} as const;

const STICK_DIMENSIONS = {
  width: (size: number) => (size <= 20 ? 24 : size <= 35 ? 18 : 16),
  gap: (size: number) => (size <= 20 ? 4 : size <= 35 ? 3 : 2),
} as const;

// ==================== UTILITIES ====================
const generateArray = (size: number, min: number, max: number): StickData[] =>
  Array.from({ length: size }, (_, index) => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    id: Date.now() + index,
    position: index,
  }));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== COMPONENT ====================
const BubbleSortPage = () => {
  // ========== State ==========
  const [arraySize, setArraySize] = useState<number>(CONFIG.initialSize);
  const [duration, setDuration] = useState<number>(CONFIG.initialDuration);
  const [sticks, setSticks] = useState<StickData[]>(() =>
    generateArray(CONFIG.initialSize, CONFIG.minValue, CONFIG.maxValue)
  );
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [sortGenerator, setSortGenerator] = useState<Generator<
    void,
    void,
    unknown
  > | null>(null);

  // ========== Refs ==========
  const isPausedRef = useRef(false);
  const sortGeneratorRef = useRef<Generator<void, void, unknown> | null>(null);

  // ========== Effects ==========
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    sortGeneratorRef.current = sortGenerator;
  }, [sortGenerator]);

  useEffect(() => {
    if (!isPaused && isSorting && sortGeneratorRef.current) {
      executeStep(sortGeneratorRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  // ========== Bubble Sort Generator ==========
  function* bubbleSortGenerator(arr: StickData[]) {
    const sorted: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      let swapped = false;

      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        yield;

        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          arr.forEach((stick, idx) => (stick.position = idx));
          swapped = true;
          setSticks([...arr]);
          yield;
        }
      }

      sorted.push(arr.length - 1 - i);
      setSortedIndices([...sorted]);

      if (!swapped) {
        const remainingSorted = Array.from(
          { length: arr.length - i },
          (_, idx) => idx
        );
        setSortedIndices([...sorted, ...remainingSorted]);
        break;
      }
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  }

  // ========== Sorting Control ==========
  const executeStep = async (generator: Generator<void, void, unknown>) => {
    if (isPausedRef.current) return;

    const result = generator.next();

    if (!result.done) {
      await sleep(duration);
      if (!isPausedRef.current) executeStep(generator);
    } else {
      setIsSorting(false);
      setIsPaused(false);
      setSortGenerator(null);
    }
  };

  const startSort = () => {
    if (isSorting && isPaused && sortGenerator) {
      setIsPaused(false);
    } else {
      const arr = [...sticks];
      const generator = bubbleSortGenerator(arr);
      setSortGenerator(generator);
      setIsSorting(true);
      setIsPaused(false);
      isPausedRef.current = false;
      executeStep(generator);
    }
  };

  const togglePause = () => setIsPaused(!isPaused);

  // ========== Array Controls ==========
  const resetState = () => {
    setSortedIndices([]);
    setActiveIndices([]);
    setSortGenerator(null);
    setIsPaused(false);
  };

  const regenerateArray = () => {
    if (isSorting) return;
    setSticks(generateArray(arraySize, CONFIG.minValue, CONFIG.maxValue));
    resetState();
  };

  const adjustArraySize = (delta: number) => {
    if (isSorting) return;
    const newSize = Math.max(
      CONFIG.arraySize.min,
      Math.min(CONFIG.arraySize.max, arraySize + delta)
    );
    setArraySize(newSize);
    setSticks(generateArray(newSize, CONFIG.minValue, CONFIG.maxValue));
    resetState();
  };

  // ========== Computed Values ==========
  const stickWidth = STICK_DIMENSIONS.width(arraySize);
  const gap = STICK_DIMENSIONS.gap(arraySize);
  const isComplete = sortedIndices.length === sticks.length;

  const getStickColor = (index: number) => {
    if (sortedIndices.includes(index)) return "bg-green-600 dark:bg-green-500";
    if (activeIndices.includes(index)) return "bg-rose-500 dark:bg-rose-400";
    return "bg-yellow-500 dark:bg-yellow-400";
  };

  const getStatus = () => {
    if (isSorting)
      return isPaused ? "Sorting paused..." : "Sorting in progress...";
    return isComplete ? "Sorting complete!" : "Ready to sort";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Bubble Sort Visualizer
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Watch the algorithm in action with customizable speed and array size
          </p>
        </div>

        {/* Controls Card */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Controls
            </CardTitle>
            <CardDescription>
              Customize the visualization parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Array Size Control */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Array Size: {arraySize}
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustArraySize(-5)}
                  disabled={isSorting || arraySize <= 5}
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
                  disabled={isSorting || arraySize >= 50}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Range: 5 - 50</p>
            </div>

            {/* Speed Control */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Animation Speed: {duration}ms
              </Label>
              <Slider
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                min={10}
                max={500}
                step={10}
                disabled={isSorting}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fast (10ms)</span>
                <span>Slow (500ms)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={isSorting && !isPaused ? togglePause : startSort}
                disabled={isComplete && !isSorting}
                size="lg"
                className="flex-1 min-w-[140px]"
              >
                {isSorting ? (
                  isPaused ? (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Resume
                    </>
                  ) : (
                    <>
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </>
                  )
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Start Sort
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={regenerateArray}
                disabled={isSorting}
                size="lg"
                className="flex-1 min-w-[140px]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                New Array
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visualization Card */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
            <CardDescription>{getStatus()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] md:h-[500px] flex items-end justify-center overflow-x-auto">
              <div
                className="relative h-full flex items-end"
                style={{
                  width: `${sticks.length * (stickWidth + gap)}px`,
                  // minWidth: "100%",
                }}
              >
                {sticks.map((stick, index) => (
                  <div
                    key={stick.id}
                    className={`${getStickColor(index)} rounded-t-lg transition-all duration-300 ease-in-out absolute bottom-0 shadow-lg`}
                    style={{
                      height: `${(stick.value / CONFIG.maxValue) * 80}%`,
                      width: `${stickWidth}px`,
                      transform: `translateX(${stick.position * (stickWidth + gap)}px)`,
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
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 dark:bg-yellow-400 rounded" />
                <span className="text-sm text-muted-foreground">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-rose-500 dark:bg-rose-400 rounded" />
                <span className="text-sm text-muted-foreground">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded" />
                <span className="text-sm text-muted-foreground">Sorted</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BubbleSortPage;
