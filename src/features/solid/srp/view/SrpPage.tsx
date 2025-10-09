import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Wrench,
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";

// ----------------------------
// Swiss Army Knife Robot (BAD - does everything)
// ----------------------------
const SwissArmyRobot = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Robot body */}
    <rect
      x="35"
      y="40"
      width="50"
      height="60"
      fill="#dc2626"
      stroke="#991b1b"
      strokeWidth="2"
      rx="5"
    />

    {/* Head */}
    <rect
      x="45"
      y="20"
      width="30"
      height="25"
      fill="#dc2626"
      stroke="#991b1b"
      strokeWidth="2"
      rx="3"
    />
    <circle cx="55" cy="30" r="3" fill="#fef3c7" />
    <circle cx="65" cy="30" r="3" fill="#fef3c7" />

    {/* Antenna */}
    <line x1="60" y1="20" x2="60" y2="10" stroke="#991b1b" strokeWidth="2" />
    <circle cx="60" cy="8" r="3" fill="#fbbf24" />

    {/* Too many tools - chaos! */}
    <g className="animate-pulse">
      <rect x="25" y="50" width="8" height="15" fill="#64748b" rx="1" />
      <circle cx="29" cy="57" r="2" fill="#94a3b8" />

      <rect x="87" y="50" width="8" height="15" fill="#64748b" rx="1" />
      <line x1="89" y1="50" x2="93" y2="65" stroke="#94a3b8" strokeWidth="2" />

      <rect x="25" y="75" width="8" height="12" fill="#64748b" rx="1" />
      <rect x="26" y="77" width="6" height="2" fill="#94a3b8" />

      <rect x="87" y="75" width="8" height="12" fill="#64748b" rx="1" />
      <circle cx="91" cy="81" r="3" fill="#94a3b8" />
    </g>

    {/* Legs */}
    <rect x="45" y="100" width="10" height="15" fill="#991b1b" rx="2" />
    <rect x="65" y="100" width="10" height="15" fill="#991b1b" rx="2" />

    {/* Overwhelmed expression */}
    <text x="60" y="70" fontSize="20" textAnchor="middle" fill="#fef3c7">
      😵
    </text>
  </svg>
);

// ----------------------------
// Specialist Robots (GOOD - each does one thing)
// ----------------------------
const HammerRobot = () => (
  <svg viewBox="0 0 80 100" className="w-full h-full">
    <rect
      x="25"
      y="30"
      width="30"
      height="40"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="2"
      rx="5"
    />
    <rect
      x="30"
      y="15"
      width="20"
      height="18"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="2"
      rx="3"
    />
    <circle cx="37" cy="23" r="2" fill="#fef3c7" />
    <circle cx="43" cy="23" r="2" fill="#fef3c7" />
    <line x1="40" y1="15" x2="40" y2="8" stroke="#16a34a" strokeWidth="2" />
    <circle cx="40" cy="6" r="2" fill="#fbbf24" />

    {/* Hammer arm */}
    <rect x="55" y="40" width="15" height="6" fill="#64748b" rx="1" />
    <rect x="68" y="35" width="8" height="16" fill="#94a3b8" rx="2" />

    <rect x="30" y="70" width="8" height="25" fill="#16a34a" rx="2" />
    <rect x="42" y="70" width="8" height="25" fill="#16a34a" rx="2" />
    <text x="40" y="57" fontSize="16" textAnchor="middle" fill="#fef3c7">
      😊
    </text>
  </svg>
);

const ScrewdriverRobot = () => (
  <svg viewBox="0 0 80 100" className="w-full h-full">
    <rect
      x="25"
      y="30"
      width="30"
      height="40"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
      rx="5"
    />
    <rect
      x="30"
      y="15"
      width="20"
      height="18"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
      rx="3"
    />
    <circle cx="37" cy="23" r="2" fill="#fef3c7" />
    <circle cx="43" cy="23" r="2" fill="#fef3c7" />
    <line x1="40" y1="15" x2="40" y2="8" stroke="#2563eb" strokeWidth="2" />
    <circle cx="40" cy="6" r="2" fill="#fbbf24" />

    {/* Screwdriver arm */}
    <rect x="55" y="42" width="12" height="4" fill="#64748b" rx="1" />
    <rect x="65" y="40" width="8" height="8" fill="#94a3b8" rx="1" />
    <line x1="67" y1="42" x2="71" y2="46" stroke="#475569" strokeWidth="1" />
    <line x1="71" y1="42" x2="67" y2="46" stroke="#475569" strokeWidth="1" />

    <rect x="30" y="70" width="8" height="25" fill="#2563eb" rx="2" />
    <rect x="42" y="70" width="8" height="25" fill="#2563eb" rx="2" />
    <text x="40" y="57" fontSize="16" textAnchor="middle" fill="#fef3c7">
      😊
    </text>
  </svg>
);

const WrenchRobot = () => (
  <svg viewBox="0 0 80 100" className="w-full h-full">
    <rect
      x="25"
      y="30"
      width="30"
      height="40"
      fill="#a855f7"
      stroke="#9333ea"
      strokeWidth="2"
      rx="5"
    />
    <rect
      x="30"
      y="15"
      width="20"
      height="18"
      fill="#a855f7"
      stroke="#9333ea"
      strokeWidth="2"
      rx="3"
    />
    <circle cx="37" cy="23" r="2" fill="#fef3c7" />
    <circle cx="43" cy="23" r="2" fill="#fef3c7" />
    <line x1="40" y1="15" x2="40" y2="8" stroke="#9333ea" strokeWidth="2" />
    <circle cx="40" cy="6" r="2" fill="#fbbf24" />

    {/* Wrench arm */}
    <path
      d="M 55 44 L 68 44 L 70 40 L 70 48 L 68 44"
      fill="#64748b"
      stroke="#475569"
      strokeWidth="1"
    />
    <circle
      cx="66"
      cy="44"
      r="3"
      fill="none"
      stroke="#94a3b8"
      strokeWidth="2"
    />

    <rect x="30" y="70" width="8" height="25" fill="#9333ea" rx="2" />
    <rect x="42" y="70" width="8" height="25" fill="#9333ea" rx="2" />
    <text x="40" y="57" fontSize="16" textAnchor="middle" fill="#fef3c7">
      😊
    </text>
  </svg>
);

// ----------------------------
// Task Card Component
// ----------------------------
const TaskCard = ({ task, color }: { task: string; color: string }) => (
  <div className={`p-3 rounded-lg border-2 ${color} flex items-center gap-2`}>
    <Wrench className="w-4 h-4 flex-shrink-0" />
    <span className="text-xs sm:text-sm font-medium">{task}</span>
  </div>
);

// ----------------------------
// Main Component
// ----------------------------
export default function SrpPage() {
  const [mode, setMode] = useState<"swiss" | "specialists">("swiss");
  const [tasks, setTasks] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const swissRef = useRef<HTMLDivElement>(null);
  const specialist1Ref = useRef<HTMLDivElement>(null);
  const specialist2Ref = useRef<HTMLDivElement>(null);
  const specialist3Ref = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);

  const allTasks = [
    "Hammer nail into wall",
    "Tighten loose screws",
    "Fix broken pipe",
  ];

  // ----------------------------
  // Swiss Army Robot (struggles with everything)
  // ----------------------------
  const assignToSwissArmy = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setTasks([]);

    // Shake and struggle animation
    gsap.to(swissRef.current, {
      rotation: -5,
      duration: 0.1,
      yoyo: true,
      repeat: 15,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(swissRef.current, { rotation: 0, duration: 0.2 });
      },
    });

    // Show tasks appearing with delays
    allTasks.forEach((task, index) => {
      setTimeout(
        () => {
          setTasks((prev) => [...prev, task]);
          if (index === allTasks.length - 1) {
            setTimeout(() => setIsProcessing(false), 500);
          }
        },
        (index + 1) * 1000
      );
    });

    // Animate tasks panel
    setTimeout(() => {
      gsap.fromTo(
        tasksRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, 500);
  };

  // ----------------------------
  // Specialist Robots (each handles their specialty)
  // ----------------------------
  const assignToSpecialists = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setTasks([]);

    const refs = [specialist1Ref, specialist2Ref, specialist3Ref];

    // Each specialist bounces when assigned their task
    allTasks.forEach((task, index) => {
      setTimeout(() => {
        gsap.to(refs[index].current, {
          y: -20,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(refs[index].current, {
              y: 0,
              duration: 0.3,
              ease: "bounce.out",
            });
          },
        });

        setTasks((prev) => [...prev, task]);

        if (index === allTasks.length - 1) {
          setTimeout(() => setIsProcessing(false), 500);
        }
      }, index * 600);
    });

    // Animate tasks panel
    setTimeout(() => {
      gsap.fromTo(
        tasksRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, 300);
  };

  const resetWorkshop = () => {
    setTasks([]);
    setIsProcessing(false);
    gsap.set(
      [
        swissRef.current,
        specialist1Ref.current,
        specialist2Ref.current,
        specialist3Ref.current,
      ],
      {
        rotation: 0,
        y: 0,
      }
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-2">
            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            <h1 className="text-xl sm:text-3xl font-bold">
              🤖 Single Responsibility Principle
            </h1>
            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Should one robot do <strong>everything</strong>, or should each
            robot be a <strong>specialist</strong>?
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 sm:gap-4">
          <Button
            onClick={() => setMode("swiss")}
            variant={mode === "swiss" ? "default" : "outline"}
            className={`gap-2 ${mode === "swiss" ? "bg-red-600 hover:bg-red-700" : ""}`}
          >
            <AlertTriangle className="w-4 h-4" /> Swiss Army Robot
          </Button>
          <Button
            onClick={() => setMode("specialists")}
            variant={mode === "specialists" ? "default" : "outline"}
            className={`gap-2 ${mode === "specialists" ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            <CheckCircle className="w-4 h-4" /> Specialist Robots
          </Button>
        </div>

        {/* Workshop Area */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Robot Display */}
          <Card
            className={`shadow-lg border-2 transition-all ${
              mode === "swiss"
                ? "border-red-300 dark:border-red-800"
                : "border-green-300 dark:border-green-800"
            }`}
          >
            <CardHeader
              className={`${
                mode === "swiss"
                  ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              }`}
            >
              <CardTitle className="text-base sm:text-lg text-center">
                {mode === "swiss"
                  ? "❌ One Robot, All Jobs"
                  : "✅ One Robot, One Job"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {mode === "swiss" ? (
                <div className="flex flex-col items-center gap-4">
                  <div ref={swissRef} className="w-32 h-32 sm:w-40 sm:h-40">
                    <SwissArmyRobot />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                      "I can do EVERYTHING!"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Trying to handle all tasks... but struggling! 😵
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      ref={specialist1Ref}
                      className="w-20 h-24 sm:w-24 sm:h-28"
                    >
                      <HammerRobot />
                    </div>
                    <p className="text-xs font-semibold text-green-600">
                      Hammer Bot
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      ref={specialist2Ref}
                      className="w-20 h-24 sm:w-24 sm:h-28"
                    >
                      <ScrewdriverRobot />
                    </div>
                    <p className="text-xs font-semibold text-blue-600">
                      Screw Bot
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      ref={specialist3Ref}
                      className="w-20 h-24 sm:w-24 sm:h-28"
                    >
                      <WrenchRobot />
                    </div>
                    <p className="text-xs font-semibold text-purple-600">
                      Wrench Bot
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2">
                <Button
                  onClick={
                    mode === "swiss" ? assignToSwissArmy : assignToSpecialists
                  }
                  disabled={isProcessing}
                  className="w-full gap-2"
                >
                  <Zap className="w-4 h-4" />
                  {isProcessing ? "Working..." : "Assign Tasks"}
                </Button>
                <Button
                  onClick={resetWorkshop}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset Workshop
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Tasks & Results */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-center">
                📋 Workshop Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Wrench className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">
                    Click "Assign Tasks" to see the robots in action!
                  </p>
                </div>
              ) : (
                <div ref={tasksRef} className="space-y-3">
                  {tasks.map((task, index) => (
                    <TaskCard
                      key={index}
                      task={task}
                      color={
                        mode === "swiss"
                          ? "border-red-300 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300"
                          : index === 0
                            ? "border-green-300 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300"
                            : index === 1
                              ? "border-blue-300 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
                              : "border-purple-300 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300"
                      }
                    />
                  ))}

                  {tasks.length === 3 && (
                    <div
                      className={`mt-6 p-4 rounded-lg border-2 ${
                        mode === "swiss"
                          ? "border-red-300 bg-red-50 dark:bg-red-950/30"
                          : "border-green-300 bg-green-50 dark:bg-green-950/30"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold text-center ${
                          mode === "swiss"
                            ? "text-red-700 dark:text-red-300"
                            : "text-green-700 dark:text-green-300"
                        }`}
                      >
                        {mode === "swiss"
                          ? "😵 Swiss Army Robot is overwhelmed and confused!"
                          : "✅ Each specialist completed their task perfectly!"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Key Takeaways */}
        <Card className="shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Why Specialists Win
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Focus & Mastery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Each robot masters ONE skill perfectly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Wrench className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Easy Updates
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fix Hammer Bot without touching others
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Clear Purpose
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Each robot has ONE reason to exist
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
