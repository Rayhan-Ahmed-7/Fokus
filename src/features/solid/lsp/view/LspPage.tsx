import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { gsap } from "gsap";

// ----------------------------
// Bird Classes
// ----------------------------
const FlyingBird = ({ type, position }: { type: string; position: number }) => (
  <svg viewBox="0 0 100 80" className="w-full h-full">
    {/* Body */}
    <ellipse
      cx="50"
      cy="40"
      rx="20"
      ry="15"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
    />

    {/* Head */}
    <circle
      cx="65"
      cy="35"
      r="10"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
    />
    <circle cx="68" cy="33" r="2" fill="#1e3a8a" />

    {/* Beak */}
    <path d="M 73 35 L 80 35 L 73 37 Z" fill="#fbbf24" />

    {/* Wings - animated position */}
    <path
      d={`M 50 40 Q 30 ${position === 1 ? 25 : 35}, 25 30`}
      fill="none"
      stroke="#2563eb"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d={`M 50 40 Q 70 ${position === 1 ? 25 : 35}, 75 30`}
      fill="none"
      stroke="#2563eb"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Tail */}
    <path
      d="M 30 42 L 20 45 L 25 40 Z"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="1"
    />

    <text
      x="50"
      y="70"
      fontSize="12"
      textAnchor="middle"
      fill="#1e3a8a"
      fontWeight="bold"
    >
      {type}
    </text>
  </svg>
);

const Penguin = ({ shaking }: { shaking: boolean }) => (
  <svg viewBox="0 0 100 80" className="w-full h-full">
    {/* Body */}
    <ellipse
      cx="50"
      cy="45"
      rx="20"
      ry="25"
      fill="#1e293b"
      stroke="#0f172a"
      strokeWidth="2"
    />
    <ellipse cx="50" cy="48" rx="13" ry="18" fill="#f8fafc" />

    {/* Head */}
    <circle
      cx="50"
      cy="25"
      r="12"
      fill="#1e293b"
      stroke="#0f172a"
      strokeWidth="2"
    />
    <circle cx="47" cy="23" r="2" fill="#f8fafc" />
    <circle cx="53" cy="23" r="2" fill="#f8fafc" />

    {/* Beak */}
    <path d="M 50 27 L 50 32 L 48 29 Z" fill="#fbbf24" />

    {/* Flippers - stuck to sides */}
    <ellipse
      cx="32"
      cy="50"
      rx="6"
      ry="15"
      fill="#1e293b"
      stroke="#0f172a"
      strokeWidth="1"
      transform="rotate(-20 32 50)"
    />
    <ellipse
      cx="68"
      cy="50"
      rx="6"
      ry="15"
      fill="#1e293b"
      stroke="#0f172a"
      strokeWidth="1"
      transform="rotate(20 68 50)"
    />

    {/* Feet */}
    <ellipse cx="45" cy="70" rx="6" ry="4" fill="#fbbf24" />
    <ellipse cx="55" cy="70" rx="6" ry="4" fill="#fbbf24" />

    {shaking && (
      <text x="50" y="15" fontSize="16" textAnchor="middle">
        😰
      </text>
    )}

    <text
      x="50"
      y="85"
      fontSize="10"
      textAnchor="middle"
      fill="#1e293b"
      fontWeight="bold"
    >
      Penguin
    </text>
  </svg>
);

// ----------------------------
// Better Design - Duck Types
// ----------------------------
const Duck = ({ swimming }: { swimming: boolean }) => (
  <svg viewBox="0 0 100 80" className="w-full h-full">
    {/* Body */}
    <ellipse
      cx="50"
      cy="45"
      rx="22"
      ry="18"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="2"
    />

    {/* Head */}
    <circle
      cx="65"
      cy="35"
      r="11"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="2"
    />
    <circle cx="68" cy="33" r="2" fill="#78350f" />

    {/* Beak */}
    <ellipse
      cx="75"
      cy="37"
      rx="8"
      ry="5"
      fill="#fb923c"
      stroke="#f59e0b"
      strokeWidth="1"
    />

    {/* Wing */}
    <path
      d="M 45 45 Q 35 40, 32 50"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Tail */}
    <path
      d="M 30 48 L 22 50 L 28 45 Z"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="1"
    />

    {swimming && (
      <>
        {/* Water waves */}
        <path
          d="M 20 60 Q 30 57, 40 60 T 60 60 T 80 60"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <path
          d="M 25 65 Q 35 63, 45 65 T 65 65 T 85 65"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </>
    )}

    <text
      x="50"
      y="85"
      fontSize="10"
      textAnchor="middle"
      fill="#78350f"
      fontWeight="bold"
    >
      Duck
    </text>
  </svg>
);

const Fish = ({ swimming }: { swimming: boolean }) => (
  <svg viewBox="0 0 100 80" className="w-full h-full">
    {/* Body */}
    <ellipse
      cx="45"
      cy="40"
      rx="25"
      ry="12"
      fill="#06b6d4"
      stroke="#0891b2"
      strokeWidth="2"
    />

    {/* Eye */}
    <circle
      cx="60"
      cy="37"
      r="3"
      fill="#f8fafc"
      stroke="#0891b2"
      strokeWidth="1"
    />
    <circle cx="61" cy="37" r="1.5" fill="#0f172a" />

    {/* Tail */}
    <path
      d="M 20 40 L 5 30 L 10 40 L 5 50 Z"
      fill="#06b6d4"
      stroke="#0891b2"
      strokeWidth="2"
    />

    {/* Fins */}
    <path
      d="M 45 28 L 40 20 L 48 30 Z"
      fill="#06b6d4"
      stroke="#0891b2"
      strokeWidth="1"
    />
    <path
      d="M 35 45 L 30 55 L 38 48 Z"
      fill="#06b6d4"
      stroke="#0891b2"
      strokeWidth="1"
    />

    {swimming && (
      <>
        {/* Bubbles */}
        <circle
          cx="70"
          cy="35"
          r="2"
          fill="#f0f9ff"
          stroke="#0891b2"
          strokeWidth="1"
          opacity="0.7"
        />
        <circle
          cx="75"
          cy="30"
          r="2.5"
          fill="#f0f9ff"
          stroke="#0891b2"
          strokeWidth="1"
          opacity="0.7"
        />
        <circle
          cx="72"
          cy="42"
          r="1.5"
          fill="#f0f9ff"
          stroke="#0891b2"
          strokeWidth="1"
          opacity="0.7"
        />
      </>
    )}

    <text
      x="50"
      y="75"
      fontSize="10"
      textAnchor="middle"
      fill="#0c4a6e"
      fontWeight="bold"
    >
      Fish
    </text>
  </svg>
);

export default function LspPage() {
  const [scenario, setScenario] = useState<"bad" | "good">("bad");
  const [isFlying, setIsFlying] = useState(false);
  const [isSwimming, setIsSwimming] = useState(false);
  const [showError, setShowError] = useState(false);
  const [wingPosition, setWingPosition] = useState(0);
  const [penguinShaking, setPenguinShaking] = useState(false);

  const sparrowRef = useRef<HTMLDivElement>(null);
  const eagleRef = useRef<HTMLDivElement>(null);
  const penguinRef = useRef<HTMLDivElement>(null);
  const duckRef = useRef<HTMLDivElement>(null);
  const fishRef = useRef<HTMLDivElement>(null);

  // ----------------------------
  // Bad Design - Fly All Birds
  // ----------------------------
  const flyAllBirds = () => {
    setIsFlying(true);
    setShowError(false);
    setPenguinShaking(false);

    // Animate flying birds
    const timeline = gsap.timeline();

    timeline.to([sparrowRef.current, eagleRef.current], {
      y: -60,
      duration: 1,
      ease: "power2.out",
    });

    // Wing flapping animation
    let flaps = 0;
    const flapInterval = setInterval(() => {
      setWingPosition((prev) => (prev === 0 ? 1 : 0));
      flaps++;
      if (flaps >= 8) {
        clearInterval(flapInterval);
        setWingPosition(0);
      }
    }, 150);

    timeline.to([sparrowRef.current, eagleRef.current], {
      y: 0,
      duration: 1,
      ease: "bounce.out",
      delay: 0.5,
    });

    // Penguin tries and fails
    setTimeout(() => {
      setPenguinShaking(true);
      gsap.to(penguinRef.current, {
        x: -3,
        duration: 0.05,
        yoyo: true,
        repeat: 11,
        ease: "power1.inOut",
      });

      setTimeout(() => {
        setShowError(true);
        setPenguinShaking(false);
        gsap.to(penguinRef.current, { x: 0 });
      }, 700);
    }, 1000);

    setTimeout(() => {
      setIsFlying(false);
    }, 3000);
  };

  // ----------------------------
  // Good Design - Swim All Swimmers
  // ----------------------------
  const swimAllSwimmers = () => {
    setIsSwimming(true);

    const timeline = gsap.timeline();

    timeline.to([duckRef.current, fishRef.current], {
      x: 100,
      duration: 2,
      ease: "power1.inOut",
    });

    timeline.to([duckRef.current, fishRef.current], {
      x: 0,
      duration: 2,
      ease: "power1.inOut",
    });

    setTimeout(() => {
      setIsSwimming(false);
    }, 4000);
  };

  const reset = () => {
    setIsFlying(false);
    setIsSwimming(false);
    setShowError(false);
    setWingPosition(0);
    setPenguinShaking(false);
    gsap.killTweensOf([
      sparrowRef.current,
      eagleRef.current,
      penguinRef.current,
      duckRef.current,
      fishRef.current,
    ]);
    gsap.set(
      [
        sparrowRef.current,
        eagleRef.current,
        penguinRef.current,
        duckRef.current,
        fishRef.current,
      ],
      { x: 0, y: 0 }
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-2">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            <h1 className="text-xl sm:text-3xl font-bold">
              🔄 Liskov Substitution Principle
            </h1>
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Subtypes must be substitutable for their base types
          </p>
        </div>

        {/* Scenario Toggle */}
        <div className="flex justify-center gap-2 sm:gap-4">
          <Button
            onClick={() => {
              setScenario("bad");
              reset();
            }}
            variant={scenario === "bad" ? "default" : "outline"}
            className={`gap-2 ${scenario === "bad" ? "bg-red-600 hover:bg-red-700" : ""}`}
          >
            <XCircle className="w-4 h-4" /> Violates LSP
          </Button>
          <Button
            onClick={() => {
              setScenario("good");
              reset();
            }}
            variant={scenario === "good" ? "default" : "outline"}
            className={`gap-2 ${scenario === "good" ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            <CheckCircle className="w-4 h-4" /> Follows LSP
          </Button>
        </div>

        {/* Main Demo */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Visualization */}
          <Card
            className={`shadow-lg border-2 transition-all ${
              scenario === "bad"
                ? "border-red-300 dark:border-red-800"
                : "border-green-300 dark:border-green-800"
            }`}
          >
            <CardHeader
              className={`${
                scenario === "bad"
                  ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              }`}
            >
              <CardTitle className="text-base sm:text-lg text-center">
                {scenario === "bad"
                  ? "❌ All Birds Must Fly?"
                  : "✅ Proper Abstraction"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {scenario === "bad" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 min-h-[140px]">
                    <div ref={sparrowRef} className="w-full h-24">
                      <FlyingBird type="Sparrow" position={wingPosition} />
                    </div>
                    <div ref={eagleRef} className="w-full h-24">
                      <FlyingBird type="Eagle" position={wingPosition} />
                    </div>
                    <div
                      ref={penguinRef}
                      className="w-full h-24 flex items-end"
                    >
                      <Penguin shaking={penguinShaking} />
                    </div>
                  </div>

                  {showError && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border-2 border-red-300 rounded-lg animate-pulse">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertTriangle className="w-5 h-5" />
                        <p className="font-semibold text-sm">
                          Runtime Error: Penguin can't fly!
                        </p>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                        Violates LSP: Penguin cannot substitute for Bird
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={flyAllBirds}
                    disabled={isFlying}
                    className="w-full gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <Play className="w-4 h-4" /> Make All Birds Fly
                  </Button>

                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200">
                    <p className="text-sm font-mono text-red-700 dark:text-red-300">
                      class Bird {"{ fly() {...} }"}
                      <br />
                      class Penguin extends Bird {"{}"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      ❌ Penguin inherits fly() but can't fly!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 min-h-[140px]">
                    <div ref={duckRef} className="w-full h-24">
                      <Duck swimming={isSwimming} />
                    </div>
                    <div ref={fishRef} className="w-full h-24">
                      <Fish swimming={isSwimming} />
                    </div>
                  </div>

                  {isSwimming && (
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 border-2 border-green-300 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <CheckCircle className="w-5 h-5" />
                        <p className="font-semibold text-sm">
                          Both swimmers working perfectly!
                        </p>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                        ✅ Duck and Fish both implement Swimmer interface
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={swimAllSwimmers}
                    disabled={isSwimming}
                    className="w-full gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4" /> Make All Swimmers Swim
                  </Button>

                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200">
                    <p className="text-sm font-mono text-green-700 dark:text-green-300">
                      interface Swimmer {"{ swim() }"}
                      <br />
                      class Duck implements Swimmer
                      <br />
                      class Fish implements Swimmer
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      ✅ Both can substitute for Swimmer!
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={reset}
                variant="outline"
                className="w-full gap-2 mt-4"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            </CardContent>
          </Card>

          {/* Right: Explanation */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-center">
                📚 Understanding LSP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-2 border-red-200">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-red-700 dark:text-red-300">
                        Bad Design (Violates LSP)
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• Penguin inherits from Bird</li>
                        <li>
                          • Penguin can't fulfill Bird's contract (flying)
                        </li>
                        <li>• Causes runtime errors and exceptions</li>
                        <li>• Client code must check type before use</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-2 border-green-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-green-700 dark:text-green-300">
                        Good Design (Follows LSP)
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• Use behavior-based interfaces</li>
                        <li>• Duck & Fish implement Swimmer</li>
                        <li>• All Swimmers can actually swim</li>
                        <li>• No runtime surprises or type checks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  💡 The LSP Rule
                </p>
                <p className="text-xs text-muted-foreground">
                  If S is a subtype of T, then objects of type T can be replaced
                  with objects of type S without breaking the program.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  🎯 Key Takeaway
                </p>
                <p className="text-xs text-muted-foreground">
                  Don't inherit based on "is-a" relationships alone. Inherit
                  based on behavioral substitutability. A penguin "is-a" bird,
                  but can't substitute for a flying bird!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Summary */}
        <Card className="shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Why LSP Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Reliable Polymorphism
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Subtypes work anywhere parent types work
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    No Surprises
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Prevents unexpected runtime errors
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Better Abstractions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Design based on behavior, not hierarchy
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
