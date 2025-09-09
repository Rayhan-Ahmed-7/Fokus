import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Crown, Scroll, CheckCircle, RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import KingSvg from "./components/KingSvg";
import GhostKingSVG from "./components/GhostKingSVG";
import ThroneSvg from "./components/ThroneSvg";

// ----------------------------
// Singleton King Class
// ----------------------------
class King {
  private static instance: King | null = null;
  public id: number;

  private constructor() {
    this.id = Math.floor(Math.random() * 1000) + 1;
  }

  static getInstance(): King {
    if (!King.instance) King.instance = new King();
    return King.instance;
  }

  // Factory method for "normal" kings
  static createNormalKing(): King {
    return new King();
  }

  processDecree(decree: string): string {
    return `King #${this.id} decrees: "${decree}" ✓`;
  }

  static resetInstance() {
    King.instance = null;
  }
}

// ----------------------------
// Main Component
// ----------------------------
export default function SingletonKingPage() {
  const [king, setKing] = useState<King | null>(null);
  const [decrees, setDecrees] = useState<string[]>([]);
  const [singletonMode, setSingletonMode] = useState(true);

  const kingRef = useRef<HTMLDivElement>(null);
  const throneRef = useRef<HTMLDivElement>(null);
  const ghostKingRef = useRef<HTMLDivElement>(null);
  const decreeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ----------------------------
  // Hire King
  // ----------------------------
  const hireKing = () => {
    const newKing = singletonMode
      ? King.getInstance()
      : King.createNormalKing();

    if (!king || !singletonMode) {
      setKing(newKing);

      // Animate throne spotlight/glow
      gsap.fromTo(
        throneRef.current,
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Animate king sitting
      setTimeout(() => {
        gsap.fromTo(
          kingRef.current,
          { opacity: 0, y: -120, scale: 0.3, rotation: 15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "bounce.out",
          }
        );
      }, 300);
    } else {
      // Ghost king bounce + rotation + "Rejected!" banner
      gsap.set(ghostKingRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
      });
      gsap.to(ghostKingRef.current, {
        y: -30,
        rotation: 10,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(ghostKingRef.current, {
            y: 20,
            rotation: -10,
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(ghostKingRef.current, {
                opacity: 0,
                scale: 0.5,
                rotation: 0,
                duration: 0.5,
                ease: "power2.in",
              });
            },
          });
        },
      });
    }
  };

  // ----------------------------
  // Sign Royal Decree
  // ----------------------------
  const signDecree = () => {
    if (!king) return;

    const orders = [
      "All citizens must wear crowns on Fridays",
      "Royal pizza shall be served every Tuesday",
      "The kingdom's cats are now nobility",
      "Dancing is mandatory during royal meetings",
      "Every citizen gets a free royal cape",
    ];

    const decreeText = orders[Math.floor(Math.random() * orders.length)];
    const decree = king.processDecree(decreeText);

    setDecrees((prev) => [...prev, decree]);
  };

  // ----------------------------
  // Reset Kingdom
  // ----------------------------
  const resetKingdom = () => {
    setKing(null);
    setDecrees([]);
    King.resetInstance();
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-4xl text-center">
        {/* Header */}
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
          <h1 className="text-xl sm:text-3xl font-bold">
            🏰 Singleton Pattern
          </h1>
          <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
        </div>

        <p className="text-muted-foreground text-sm sm:text-lg">
          Only <strong>one King</strong> can rule the kingdom at a time. Try to
          crown multiple kings!
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2">
          <Button
            onClick={hireKing}
            className="gap-2 text-xs sm:text-sm hover:scale-105 transition-transform"
          >
            <Crown className="w-3 h-3 sm:w-4 sm:h-4" /> Crown a King
          </Button>

          {king && (
            <Button
              onClick={signDecree}
              variant="secondary"
              className="gap-2 text-xs sm:text-sm hover:scale-105 transition-transform"
            >
              <Scroll className="w-3 h-3 sm:w-4 sm:h-4" /> Sign Royal Decree
            </Button>
          )}

          <Button
            onClick={resetKingdom}
            variant="outline"
            className="gap-2 text-xs sm:text-sm hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" /> Reset Kingdom
          </Button>

          {/* Toggle Singleton Mode */}
          <Button
            onClick={() => setSingletonMode(!singletonMode)}
            variant="ghost"
            className={`gap-2 text-xs sm:text-sm hover:scale-105 transition-transform ${singletonMode ? "bg-yellow-100 dark:bg-yellow-900/20" : ""}`}
          >
            {singletonMode ? "Singleton Mode ON" : "Singleton Mode OFF"}
          </Button>
        </div>

        {/* Throne + King Display */}
        <div className="relative min-h-[180px] sm:min-h-[250px] flex items-center justify-center mt-4">
          {/* Throne */}
          <div ref={throneRef} className="absolute opacity-0">
            <ThroneSvg className="w-24 h-24 sm:w-36 sm:h-36" />
          </div>

          {/* King */}
          {king && (
            <div ref={kingRef} className="absolute opacity-0">
              <KingSvg className="w-20 h-20 sm:w-28 sm:h-28" />
            </div>
          )}

          {/* Ghost King */}
          <div ref={ghostKingRef} className="absolute opacity-0">
            <div className="relative">
              <GhostKingSVG className="w-16 h-16 sm:w-24 sm:h-24" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-500 text-2xl sm:text-4xl font-bold drop-shadow-lg">
                  ❌
                </span>
                <span className="absolute top-0 mt-1 sm:mt-2 text-red-600 font-bold text-sm sm:text-base drop-shadow-lg">
                  Rejected!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* King Info Card */}
        {king && (
          <Card className="shadow-lg border-2 border-yellow-200 dark:border-yellow-800 mt-4">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardTitle className="flex items-center gap-2 justify-center text-lg sm:text-2xl">
                <Crown className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" /> King
                #{king.id}{" "}
                <Crown className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <p className="text-sm sm:text-lg font-medium text-blue-700 dark:text-blue-400 mb-3 sm:mb-4 text-center">
                "The One and Only Ruler of the Kingdom"
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium text-center">
                  🛡️ Singleton Instance Active - No other king can be crowned!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Royal Decrees */}
        {decrees.length > 0 && (
          <Card className="shadow-md mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center text-base sm:text-lg">
                <Scroll className="w-4 h-4 sm:w-5 sm:h-5" /> Royal Decrees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {decrees.map((decree, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      decreeRefs.current[index] = el;
                    }}
                    className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/30 rounded-lg"
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                      {decree}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
