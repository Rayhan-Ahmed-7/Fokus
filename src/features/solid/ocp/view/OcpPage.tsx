import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Lock,
  Unlock,
  Plus,
  Wrench,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";

// ----------------------------
// Locked Robot (BAD - needs modification for new features)
// ----------------------------
const LockedRobot = ({
  hasWings,
  hasJetpack,
}: {
  hasWings: boolean;
  hasJetpack: boolean;
}) => (
  <svg viewBox="0 0 120 140" className="w-full h-full">
    {/* Body - locked/solid */}
    <rect
      x="35"
      y="50"
      width="50"
      height="60"
      fill="#dc2626"
      stroke="#991b1b"
      strokeWidth="3"
      rx="5"
    />
    <text x="60" y="80" fontSize="24" textAnchor="middle" fill="#fef3c7">
      🔒
    </text>

    {/* Head */}
    <rect
      x="45"
      y="30"
      width="30"
      height="25"
      fill="#dc2626"
      stroke="#991b1b"
      strokeWidth="2"
      rx="3"
    />
    <circle cx="55" cy="40" r="3" fill="#fef3c7" />
    <circle cx="65" cy="40" r="3" fill="#fef3c7" />

    {/* Antenna */}
    <line x1="60" y1="30" x2="60" y2="20" stroke="#991b1b" strokeWidth="2" />
    <circle cx="60" cy="18" r="3" fill="#fbbf24" />

    {/* Legs */}
    <rect x="45" y="110" width="10" height="20" fill="#991b1b" rx="2" />
    <rect x="65" y="110" width="10" height="20" fill="#991b1b" rx="2" />

    {/* Cracks/modifications showing it was forced open */}
    {hasWings && (
      <>
        <line
          x1="35"
          y1="70"
          x2="25"
          y2="70"
          stroke="#991b1b"
          strokeWidth="2"
          strokeDasharray="2,2"
        />
        <line
          x1="85"
          y1="70"
          x2="95"
          y2="70"
          stroke="#991b1b"
          strokeWidth="2"
          strokeDasharray="2,2"
        />
        <text x="15" y="75" fontSize="16">
          ⚠️
        </text>
        <text x="95" y="75" fontSize="16">
          ⚠️
        </text>
      </>
    )}

    {hasJetpack && (
      <>
        <line
          x1="60"
          y1="110"
          x2="60"
          y2="120"
          stroke="#991b1b"
          strokeWidth="2"
          strokeDasharray="2,2"
        />
        <text x="60" y="135" fontSize="16" textAnchor="middle">
          ⚠️
        </text>
      </>
    )}

    {/* Expression */}
    <text x="60" y="95" fontSize="20" textAnchor="middle" fill="#fef3c7">
      {hasWings || hasJetpack ? "😣" : "😐"}
    </text>
  </svg>
);

// ----------------------------
// Modular Robot (GOOD - accepts extensions without modification)
// ----------------------------
const ModularRobot = ({ extensions }: { extensions: string[] }) => (
  <svg viewBox="0 0 120 140" className="w-full h-full">
    {/* Body */}
    <rect
      x="35"
      y="50"
      width="50"
      height="60"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="3"
      rx="5"
    />

    {/* Render extensions */}
    {extensions.includes("wings") && <WingsModule />}
    {extensions.includes("jetpack") && <JetpackModule />}
    {extensions.includes("shield") && <ShieldModule />}

    {/* Head */}
    <rect
      x="45"
      y="30"
      width="30"
      height="25"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="2"
      rx="3"
    />
    <circle cx="55" cy="40" r="3" fill="#fef3c7" />
    <circle cx="65" cy="40" r="3" fill="#fef3c7" />

    {/* Antenna */}
    <line x1="60" y1="30" x2="60" y2="20" stroke="#16a34a" strokeWidth="2" />
    <circle cx="60" cy="18" r="3" fill="#fbbf24" />

    {/* Legs */}
    <rect x="45" y="110" width="10" height="20" fill="#16a34a" rx="2" />
    <rect x="65" y="110" width="10" height="20" fill="#16a34a" rx="2" />

    {/* Expression */}
    <text x="60" y="95" fontSize="20" textAnchor="middle" fill="#fef3c7">
      😊
    </text>
  </svg>
);

// ----------------------------
// Extension Modules (Plugins)
// ----------------------------
const WingsModule = () => (
  <svg viewBox="0 0 80 60" className="w-full h-full">
    <path
      d="M 10 30 Q 5 20, 15 15 L 25 25 L 15 35 Q 5 40, 10 30"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
    />
    <path
      d="M 70 30 Q 75 20, 65 15 L 55 25 L 65 35 Q 75 40, 70 30"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
    />
    <text x="40" y="35" fontSize="20" textAnchor="middle">
      🪽
    </text>
  </svg>
);

const JetpackModule = () => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    <rect
      x="15"
      y="10"
      width="30"
      height="35"
      fill="#a855f7"
      stroke="#9333ea"
      strokeWidth="2"
      rx="5"
    />
    <circle cx="22" cy="45" r="3" fill="#fbbf24" />
    <circle cx="38" cy="45" r="3" fill="#fbbf24" />
    <text x="30" y="30" fontSize="20" textAnchor="middle">
      🚀
    </text>
  </svg>
);

const ShieldModule = () => (
  <svg viewBox="0 0 60 70" className="w-full h-full">
    <path
      d="M 30 10 L 50 20 L 50 45 Q 50 60, 30 65 Q 10 60, 10 45 L 10 20 Z"
      fill="#f59e0b"
      stroke="#d97706"
      strokeWidth="2"
    />
    <text x="30" y="45" fontSize="20" textAnchor="middle">
      🛡️
    </text>
  </svg>
);

// ----------------------------
// Main Component
// ----------------------------
export default function OcpPage() {
  const [mode, setMode] = useState<"locked" | "modular">("locked");
  const [extensions, setExtensions] = useState<string[]>([]);
  const [showDamage, setShowDamage] = useState(false);

  const lockedRobotRef = useRef<HTMLDivElement>(null);
  const modularRobotRef = useRef<HTMLDivElement>(null);
  const extensionsRef = useRef<HTMLDivElement>(null);
  const damageRef = useRef<HTMLDivElement>(null);

  const availableExtensions = [
    { id: "wings", name: "Wings Module", icon: "🪽", component: WingsModule },
    {
      id: "jetpack",
      name: "Jetpack Module",
      icon: "🚀",
      component: JetpackModule,
    },
    {
      id: "shield",
      name: "Shield Module",
      icon: "🛡️",
      component: ShieldModule,
    },
  ];

  // ----------------------------
  // Add Extension (Locked Robot - BAD)
  // ----------------------------
  const addExtensionLocked = (extId: string) => {
    if (extensions.includes(extId)) return;

    // Shake and show damage
    gsap.to(lockedRobotRef.current, {
      x: -5,
      duration: 0.05,
      yoyo: true,
      repeat: 15,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(lockedRobotRef.current, { x: 0, duration: 0.1 });
      },
    });

    setShowDamage(true);
    setTimeout(() => setShowDamage(false), 2000);

    setTimeout(() => {
      setExtensions((prev) => [...prev, extId]);

      gsap.fromTo(
        extensionsRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }, 500);
  };

  // ----------------------------
  // Add Extension (Modular Robot - GOOD)
  // ----------------------------
  const addExtensionModular = (extId: string) => {
    if (extensions.includes(extId)) return;

    // Happy bounce
    gsap.to(modularRobotRef.current, {
      y: -20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(modularRobotRef.current, {
          y: 0,
          duration: 0.4,
          ease: "bounce.out",
        });
      },
    });

    setExtensions((prev) => [...prev, extId]);

    gsap.fromTo(
      extensionsRef.current,
      { scale: 0.5, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );
  };

  const resetRobot = () => {
    setExtensions([]);
    setShowDamage(false);
    gsap.set([lockedRobotRef.current, modularRobotRef.current], { x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-2">
            <Unlock className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            <h1 className="text-xl sm:text-3xl font-bold">
              🔌 Open/Closed Principle
            </h1>
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            <strong>Open</strong> for extension, <strong>Closed</strong> for
            modification
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 sm:gap-4">
          <Button
            onClick={() => {
              setMode("locked");
              resetRobot();
            }}
            variant={mode === "locked" ? "default" : "outline"}
            className={`gap-2 ${mode === "locked" ? "bg-red-600 hover:bg-red-700" : ""}`}
          >
            <Lock className="w-4 h-4" /> Locked Robot
          </Button>
          <Button
            onClick={() => {
              setMode("modular");
              resetRobot();
            }}
            variant={mode === "modular" ? "default" : "outline"}
            className={`gap-2 ${mode === "modular" ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            <Unlock className="w-4 h-4" /> Modular Robot
          </Button>
        </div>

        {/* Main Workshop */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Robot Display */}
          <Card
            className={`shadow-lg border-2 transition-all ${
              mode === "locked"
                ? "border-red-300 dark:border-red-800"
                : "border-green-300 dark:border-green-800"
            }`}
          >
            <CardHeader
              className={`${
                mode === "locked"
                  ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              }`}
            >
              <CardTitle className="text-base sm:text-lg text-center">
                {mode === "locked"
                  ? "❌ Closed for Extension"
                  : "✅ Open for Extension"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                {mode === "locked" ? (
                  <div
                    ref={lockedRobotRef}
                    className="w-32 h-40 sm:w-40 sm:h-48 relative"
                  >
                    <LockedRobot
                      hasWings={extensions.includes("wings")}
                      hasJetpack={extensions.includes("jetpack")}
                    />
                    {showDamage && (
                      <div
                        ref={damageRef}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="text-4xl animate-ping">💥</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    ref={modularRobotRef}
                    className="w-32 h-40 sm:w-40 sm:h-48"
                  >
                    <ModularRobot extensions={extensions} />
                  </div>
                )}

                <div className="text-center space-y-2">
                  <p
                    className={`text-sm font-semibold ${
                      mode === "locked"
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {mode === "locked"
                      ? "Must modify code to add features"
                      : "Plug-and-play extensions!"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {mode === "locked"
                      ? "Breaking changes risk bugs 🐛"
                      : "No code changes needed! ✨"}
                  </p>
                </div>

                <Button
                  onClick={resetRobot}
                  variant="outline"
                  className="w-full gap-2 mt-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset Robot
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Extensions Available */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-center">
                🔌 Available Extensions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableExtensions.map((ext) => {
                  const isInstalled = extensions.includes(ext.id);
                  const ExtComponent = ext.component;

                  return (
                    <div key={ext.id} className="space-y-2">
                      <Button
                        onClick={() =>
                          mode === "locked"
                            ? addExtensionLocked(ext.id)
                            : addExtensionModular(ext.id)
                        }
                        disabled={isInstalled}
                        className={`w-full gap-2 ${
                          isInstalled
                            ? "opacity-50 cursor-not-allowed"
                            : mode === "locked"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {isInstalled ? (
                          <>
                            <Zap className="w-4 h-4" /> {ext.icon} Installed
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> Add {ext.name}
                          </>
                        )}
                      </Button>

                      {isInstalled && (
                        <div
                          ref={extensionsRef}
                          className={`p-3 rounded-lg border-2 flex items-center gap-3 ${
                            mode === "locked"
                              ? "border-red-300 bg-red-50 dark:bg-red-950/30"
                              : "border-green-300 bg-green-50 dark:bg-green-950/30"
                          }`}
                        >
                          <div className="w-16 h-16 flex-shrink-0">
                            <ExtComponent />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-sm font-semibold ${
                                mode === "locked"
                                  ? "text-red-700 dark:text-red-300"
                                  : "text-green-700 dark:text-green-300"
                              }`}
                            >
                              {ext.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {mode === "locked"
                                ? "⚠️ Modified robot code"
                                : "✅ Plugged in safely"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {extensions.length === 3 && (
                <div
                  className={`mt-6 p-4 rounded-lg border-2 ${
                    mode === "locked"
                      ? "border-red-300 bg-red-50 dark:bg-red-950/30"
                      : "border-green-300 bg-green-50 dark:bg-green-950/30"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold text-center ${
                      mode === "locked"
                        ? "text-red-700 dark:text-red-300"
                        : "text-green-700 dark:text-green-300"
                    }`}
                  >
                    {mode === "locked"
                      ? "😣 Robot code is now fragile and buggy!"
                      : "🎉 All extensions added without touching robot code!"}
                  </p>
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
              Why Open/Closed Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Plus className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Add Features Safely
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Extend behavior without modifying existing code
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Wrench className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    No Breaking Changes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Original code stays stable and tested
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Unlock className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Flexible Design
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Use interfaces and abstractions for extensibility
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
