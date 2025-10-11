import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  Wrench,
  Sparkles,
  AlertTriangle,
  Package,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";

// ----------------------------
// Device Components
// ----------------------------
const Printer = ({ active, broken }: { active: boolean; broken: boolean }) => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Printer body */}
    <rect
      x="25"
      y="40"
      width="70"
      height="35"
      fill="#6b7280"
      stroke="#374151"
      strokeWidth="2"
      rx="3"
    />
    <rect x="30" y="45" width="60" height="8" fill="#9ca3af" rx="1" />

    {/* Paper tray */}
    <rect
      x="35"
      y="30"
      width="50"
      height="12"
      fill="#f3f4f6"
      stroke="#d1d5db"
      strokeWidth="2"
    />

    {/* Paper output */}
    {active && (
      <rect
        x="40"
        y="75"
        width="40"
        height="20"
        fill="#ffffff"
        stroke="#d1d5db"
        strokeWidth="1"
      >
        <animate
          attributeName="y"
          values="75;78;75"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </rect>
    )}

    {/* Control panel */}
    <circle cx="85" cy="52" r="4" fill="#22c55e" />
    <rect x="35" y="50" width="12" height="3" fill="#1f2937" rx="1" />
    <rect x="35" y="56" width="12" height="3" fill="#1f2937" rx="1" />

    {broken && (
      <>
        <line
          x1="30"
          y1="35"
          x2="90"
          y2="70"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <line
          x1="90"
          y1="35"
          x2="30"
          y2="70"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <text x="60" y="20" fontSize="20" textAnchor="middle">
          ⚠️
        </text>
      </>
    )}

    <text
      x="60"
      y="95"
      fontSize="10"
      textAnchor="middle"
      fill="#374151"
      fontWeight="bold"
    >
      Printer
    </text>
  </svg>
);

const Scanner = ({ active, broken }: { active: boolean; broken: boolean }) => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Scanner base */}
    <rect
      x="25"
      y="55"
      width="70"
      height="20"
      fill="#6b7280"
      stroke="#374151"
      strokeWidth="2"
      rx="3"
    />

    {/* Scanner lid */}
    <rect
      x="25"
      y="35"
      width="70"
      height="22"
      fill="#9ca3af"
      stroke="#374151"
      strokeWidth="2"
      rx="3"
    />

    {/* Scan light */}
    {active && (
      <rect x="30" y="50" width="60" height="4" fill="#3b82f6" opacity="0.7">
        <animate
          attributeName="opacity"
          values="0.3;0.9;0.3"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
    )}

    {/* Glass surface */}
    <rect
      x="30"
      y="40"
      width="60"
      height="12"
      fill="#e0f2fe"
      stroke="#bae6fd"
      strokeWidth="1"
    />

    {broken && (
      <>
        <line
          x1="30"
          y1="35"
          x2="90"
          y2="70"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <line
          x1="90"
          y1="35"
          x2="30"
          y2="70"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <text x="60" y="25" fontSize="20" textAnchor="middle">
          ⚠️
        </text>
      </>
    )}

    <text
      x="60"
      y="92"
      fontSize="10"
      textAnchor="middle"
      fill="#374151"
      fontWeight="bold"
    >
      Scanner
    </text>
  </svg>
);

const Fax = ({ active, broken }: { active: boolean; broken: boolean }) => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Fax machine body */}
    <rect
      x="30"
      y="45"
      width="60"
      height="30"
      fill="#6b7280"
      stroke="#374151"
      strokeWidth="2"
      rx="3"
    />

    {/* Keypad */}
    <rect x="38" y="52" width="44" height="16" fill="#374151" rx="2" />
    <circle cx="45" cy="58" r="1.5" fill="#9ca3af" />
    <circle cx="52" cy="58" r="1.5" fill="#9ca3af" />
    <circle cx="59" cy="58" r="1.5" fill="#9ca3af" />
    <circle cx="66" cy="58" r="1.5" fill="#9ca3af" />
    <circle cx="73" cy="58" r="1.5" fill="#9ca3af" />
    <circle cx="45" cy="63" r="1.5" fill="#9ca3af" />
    <circle cx="52" cy="63" r="1.5" fill="#9ca3af" />
    <circle cx="59" cy="63" r="1.5" fill="#9ca3af" />
    <circle cx="66" cy="63" r="1.5" fill="#9ca3af" />
    <circle cx="73" cy="63" r="1.5" fill="#9ca3af" />

    {/* Phone handset */}
    <path
      d="M 25 30 Q 20 35, 25 40"
      fill="none"
      stroke="#374151"
      strokeWidth="3"
    />
    <rect x="18" y="28" width="10" height="5" fill="#4b5563" rx="2" />
    <rect x="18" y="37" width="10" height="5" fill="#4b5563" rx="2" />

    {active && (
      <>
        <text x="60" y="25" fontSize="16" textAnchor="middle">
          📡
        </text>
        <circle cx="50" cy="25" r="3" fill="#22c55e" opacity="0.5">
          <animate
            attributeName="r"
            values="3;8;3"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </>
    )}

    {broken && (
      <>
        <line
          x1="35"
          y1="40"
          x2="85"
          y2="70"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <line
          x1="85"
          y1="40"
          x2="35"
          y2="70"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <text x="60" y="90" fontSize="20" textAnchor="middle">
          ⚠️
        </text>
      </>
    )}

    <text
      x="60"
      y="92"
      fontSize="10"
      textAnchor="middle"
      fill="#374151"
      fontWeight="bold"
    >
      Fax Machine
    </text>
  </svg>
);

// ----------------------------
// Main Component
// ----------------------------
export default function IspPage() {
  const [design, setDesign] = useState<"fat" | "segregated">("fat");
  const [printerActive, setPrinterActive] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [faxActive, setFaxActive] = useState(false);
  const [showPrinterError, setShowPrinterError] = useState(false);
  const [showScannerError, setShowScannerError] = useState(false);

  const printerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const faxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (design === "segregated") {
      setShowPrinterError(false);
      setShowScannerError(false);
    }
  }, [design]);

  const handlePrint = () => {
    setPrinterActive(true);
    gsap.fromTo(
      printerRef.current,
      { scale: 1 },
      { scale: 1.05, duration: 0.2, yoyo: true, repeat: 3 }
    );

    setTimeout(() => setPrinterActive(false), 2000);
  };

  const handleScan = () => {
    if (design === "fat") {
      // Fat interface: scanner must implement scan but can't!
      setShowScannerError(true);
      gsap.to(scannerRef.current, {
        x: -5,
        duration: 0.05,
        yoyo: true,
        repeat: 7,
        onComplete: () => {
          gsap.to(scannerRef.current, { x: 0 });
        },
      });
      setTimeout(() => setShowScannerError(false), 2000);
    } else {
      setScannerActive(true);
      gsap.fromTo(
        scannerRef.current,
        { scale: 1 },
        { scale: 1.05, duration: 0.2, yoyo: true, repeat: 3 }
      );
      setTimeout(() => setScannerActive(false), 2000);
    }
  };

  const handleFax = () => {
    if (design === "fat") {
      // Fat interface: printer must implement fax but can't!
      setShowPrinterError(true);
      gsap.to(printerRef.current, {
        x: -5,
        duration: 0.05,
        yoyo: true,
        repeat: 7,
        onComplete: () => {
          gsap.to(printerRef.current, { x: 0 });
        },
      });
      setTimeout(() => setShowPrinterError(false), 2000);
    } else {
      setFaxActive(true);
      gsap.fromTo(
        faxRef.current,
        { scale: 1 },
        { scale: 1.05, duration: 0.2, yoyo: true, repeat: 3 }
      );
      setTimeout(() => setFaxActive(false), 2000);
    }
  };

  const reset = () => {
    setPrinterActive(false);
    setScannerActive(false);
    setFaxActive(false);
    setShowPrinterError(false);
    setShowScannerError(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-2">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            <h1 className="text-xl sm:text-3xl font-bold">
              ✂️ Interface Segregation Principle
            </h1>
            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Clients shouldn't depend on interfaces they don't use
          </p>
        </div>

        {/* Design Toggle */}
        <div className="flex justify-center gap-2 sm:gap-4">
          <Button
            onClick={() => {
              setDesign("fat");
              reset();
            }}
            variant={design === "fat" ? "default" : "outline"}
            className={`gap-2 ${design === "fat" ? "bg-red-600 hover:bg-red-700" : ""}`}
          >
            <XCircle className="w-4 h-4" /> Fat Interface
          </Button>
          <Button
            onClick={() => {
              setDesign("segregated");
              reset();
            }}
            variant={design === "segregated" ? "default" : "outline"}
            className={`gap-2 ${design === "segregated" ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            <CheckCircle className="w-4 h-4" /> Segregated Interfaces
          </Button>
        </div>

        {/* Main Demo */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Devices */}
          <Card
            className={`shadow-lg border-2 transition-all ${
              design === "fat"
                ? "border-red-300 dark:border-red-800"
                : "border-green-300 dark:border-green-800"
            }`}
          >
            <CardHeader
              className={`${
                design === "fat"
                  ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              }`}
            >
              <CardTitle className="text-base sm:text-lg text-center">
                {design === "fat"
                  ? "❌ One Interface for Everything"
                  : "✅ Specific Interfaces"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {design === "fat" ? (
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border-2 border-red-200">
                    <p className="text-xs font-mono text-red-700 dark:text-red-300 mb-2">
                      interface Machine {"{"}
                      <br />
                      &nbsp;&nbsp;print(); scan(); fax();
                      <br />
                      {"}"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      All devices must implement ALL methods! 😱
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div ref={printerRef} className="space-y-2">
                      <div className="w-full h-24">
                        <Printer
                          active={printerActive}
                          broken={showPrinterError}
                        />
                      </div>
                      <div className="text-xs text-center space-y-1">
                        <p className="font-semibold">✅ print()</p>
                        <p className="text-red-600">❌ scan()</p>
                        <p className="text-red-600">❌ fax()</p>
                      </div>
                    </div>

                    <div ref={scannerRef} className="space-y-2">
                      <div className="w-full h-24">
                        <Scanner
                          active={scannerActive}
                          broken={showScannerError}
                        />
                      </div>
                      <div className="text-xs text-center space-y-1">
                        <p className="text-red-600">❌ print()</p>
                        <p className="font-semibold">✅ scan()</p>
                        <p className="text-red-600">❌ fax()</p>
                      </div>
                    </div>
                  </div>

                  {(showPrinterError || showScannerError) && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border-2 border-red-300 rounded-lg animate-pulse">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertTriangle className="w-4 h-4" />
                        <p className="font-semibold text-xs">
                          {showPrinterError && "Printer can't fax!"}
                          {showScannerError && "Scanner can't print!"}
                        </p>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        Forced to implement unused methods
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border-2 border-green-200">
                    <p className="text-xs font-mono text-green-700 dark:text-green-300">
                      interface Printable {"{ print() }"}
                      <br />
                      interface Scannable {"{ scan() }"}
                      <br />
                      interface Faxable {"{ fax() }"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Each device implements only what it needs! ✨
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div ref={printerRef} className="space-y-1">
                      <div className="w-full h-20">
                        <Printer active={printerActive} broken={false} />
                      </div>
                      <div className="text-xs text-center">
                        <p className="font-semibold text-green-600">
                          Printable
                        </p>
                      </div>
                    </div>

                    <div ref={scannerRef} className="space-y-1">
                      <div className="w-full h-20">
                        <Scanner active={scannerActive} broken={false} />
                      </div>
                      <div className="text-xs text-center">
                        <p className="font-semibold text-green-600">
                          Scannable
                        </p>
                      </div>
                    </div>

                    <div ref={faxRef} className="space-y-1">
                      <div className="w-full h-20">
                        <Fax active={faxActive} broken={false} />
                      </div>
                      <div className="text-xs text-center">
                        <p className="font-semibold text-green-600">Faxable</p>
                      </div>
                    </div>
                  </div>

                  {(printerActive || scannerActive || faxActive) && (
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 border-2 border-green-300 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <CheckCircle className="w-4 h-4" />
                        <p className="font-semibold text-xs">
                          Working perfectly! No unused methods 🎉
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right: Controls & Explanation */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-center">
                🎮 Try the Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  onClick={handlePrint}
                  disabled={printerActive}
                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Zap className="w-4 h-4" /> Print Document
                </Button>

                <Button
                  onClick={handleScan}
                  disabled={scannerActive}
                  className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  <Zap className="w-4 h-4" /> Scan Document
                </Button>

                <Button
                  onClick={handleFax}
                  disabled={faxActive}
                  className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  <Zap className="w-4 h-4" /> Send Fax
                </Button>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-2 border-red-200">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-red-700 dark:text-red-300">
                        Fat Interface Problem
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• Forces unused method implementation</li>
                        <li>• Creates tight coupling</li>
                        <li>• Violates single responsibility</li>
                        <li>• Makes code fragile and hard to maintain</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-2 border-green-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-green-700 dark:text-green-300">
                        Segregated Solution
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• Small, focused interfaces</li>
                        <li>• Implement only what's needed</li>
                        <li>• Loose coupling between components</li>
                        <li>• Easy to extend and maintain</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    💡 The ISP Rule
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Many client-specific interfaces are better than one
                    general-purpose interface. Split large interfaces into
                    smaller, more specific ones.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Summary */}
        <Card className="shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Why ISP Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Package className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Reduced Coupling
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Classes depend only on methods they use
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Wrench className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Easier Maintenance
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Changes don't ripple through entire system
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Better Design
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Clear, focused contracts for each role
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
