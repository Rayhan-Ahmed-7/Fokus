import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  ArrowDown,
  ArrowUp,
  Sparkles,
  AlertTriangle,
  Laptop,
  Server,
  Database,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";

// ----------------------------
// Components for Bad Design (Tight Coupling)
// ----------------------------
const NotificationService = ({
  sending,
  error,
}: {
  sending: boolean;
  error: boolean;
}) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect
      x="20"
      y="20"
      width="60"
      height="45"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
      rx="5"
    />
    <text x="50" y="45" fontSize="24" textAnchor="middle" fill="white">
      📧
    </text>
    <text
      x="50"
      y="82"
      fontSize="12"
      textAnchor="middle"
      fill="#1e40af"
      fontWeight="bold"
    >
      Notification Service
    </text>

    {sending && (
      <circle cx="50" cy="10" r="4" fill="#22c55e">
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    )}

    {error && (
      <text x="50" y="12" fontSize="16" textAnchor="middle">
        💥
      </text>
    )}
  </svg>
);

const EmailService = ({ broken }: { broken: boolean }) => (
  <svg viewBox="0 0 100 80" className="w-full h-full">
    <rect
      x="25"
      y="15"
      width="50"
      height="35"
      fill="#ef4444"
      stroke="#dc2626"
      strokeWidth="2"
      rx="3"
    />
    <path
      d="M 25 15 L 50 35 L 75 15"
      fill="none"
      stroke="#dc2626"
      strokeWidth="2"
    />
    <text
      x="50"
      y="65"
      fontSize="12"
      textAnchor="middle"
      fill="#991b1b"
      fontWeight="bold"
    >
      EmailService
    </text>

    {broken && (
      <>
        <line
          x1="30"
          y1="20"
          x2="70"
          y2="45"
          stroke="#7f1d1d"
          strokeWidth="3"
        />
        <line
          x1="70"
          y1="20"
          x2="30"
          y2="45"
          stroke="#7f1d1d"
          strokeWidth="3"
        />
      </>
    )}
  </svg>
);

// ----------------------------
// Components for Good Design (Loose Coupling)
// ----------------------------
const NotificationManager = ({ sending }: { sending: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect
      x="20"
      y="20"
      width="60"
      height="45"
      fill="#8b5cf6"
      stroke="#7c3aed"
      strokeWidth="2"
      rx="5"
    />
    <text x="50" y="45" fontSize="24" textAnchor="middle" fill="white">
      🔔
    </text>
    <text
      x="50"
      y="82"
      fontSize="12"
      textAnchor="middle"
      fill="#5b21b6"
      fontWeight="bold"
    >
      Notification Manager
    </text>

    {sending && (
      <>
        <circle cx="50" cy="10" r="3" fill="#22c55e" opacity="0.8">
          <animate
            attributeName="r"
            values="3;6;3"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.2;0.8"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </>
    )}
  </svg>
);

const MessageSenderInterface = () => (
  <svg viewBox="0 0 140 60" className="w-full h-full">
    <rect
      x="10"
      y="10"
      width="120"
      height="40"
      fill="#f0f9ff"
      stroke="#3b82f6"
      strokeWidth="2"
      rx="5"
      strokeDasharray="5,5"
    />
    <text
      x="70"
      y="30"
      fontSize="10"
      textAnchor="middle"
      fill="#1e40af"
      fontWeight="bold"
    >
      &lt;&lt;interface&gt;&gt;
    </text>
    <text x="70" y="42" fontSize="12" textAnchor="middle" fill="#1e40af">
      MessageSender
    </text>
  </svg>
);

const EmailImpl = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 80" className="w-full h-full">
    <rect
      x="25"
      y="15"
      width="50"
      height="35"
      fill="#3b82f6"
      stroke="#2563eb"
      strokeWidth="2"
      rx="3"
    />
    <path
      d="M 25 15 L 50 35 L 75 15"
      fill="none"
      stroke="#1e40af"
      strokeWidth="2"
    />
    <text
      x="50"
      y="65"
      fontSize="12"
      textAnchor="middle"
      fill="#1e40af"
      fontWeight="bold"
    >
      EmailSender
    </text>

    {active && (
      <text x="50" y="10" fontSize="12" textAnchor="middle">
        ✉️
      </text>
    )}
  </svg>
);

const SMSImpl = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 60" className="w-full h-full">
    <rect
      x="30"
      y="10"
      width="40"
      height="35"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="2"
      rx="5"
    />
    <circle cx="40" cy="23" r="2" fill="white" />
    <circle cx="50" cy="23" r="2" fill="white" />
    <circle cx="60" cy="23" r="2" fill="white" />
    <rect x="35" y="30" width="30" height="2" fill="white" rx="1" />
    <rect x="35" y="35" width="20" height="2" fill="white" rx="1" />
    <text
      x="50"
      y="55"
      fontSize="8"
      textAnchor="middle"
      fill="#15803d"
      fontWeight="bold"
    >
      SMSSender
    </text>

    {active && (
      <text x="50" y="8" fontSize="12" textAnchor="middle">
        📱
      </text>
    )}
  </svg>
);

const PushImpl = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 60" className="w-full h-full">
    <rect
      x="30"
      y="10"
      width="40"
      height="35"
      fill="#f59e0b"
      stroke="#d97706"
      strokeWidth="2"
      rx="5"
    />
    <text x="50" y="32" fontSize="16" textAnchor="middle">
      🔔
    </text>
    <text
      x="50"
      y="55"
      fontSize="8"
      textAnchor="middle"
      fill="#92400e"
      fontWeight="bold"
    >
      PushSender
    </text>

    {active && (
      <text x="50" y="8" fontSize="12" textAnchor="middle">
        📲
      </text>
    )}
  </svg>
);

export default function DipPage() {
  const [design, setDesign] = useState<"tight" | "loose">("tight");
  const [sending, setSending] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedSender, setSelectedSender] = useState<
    "email" | "sms" | "push"
  >("email");

  const serviceRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const smsRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<HTMLDivElement>(null);
  const implRef = useRef<HTMLDivElement>(null);

  const sendNotificationTight = () => {
    setSending(true);
    setShowError(false);

    // Animate downward dependency
    gsap.fromTo(
      serviceRef.current,
      { y: 0 },
      { y: 10, duration: 0.5, yoyo: true, repeat: 1 }
    );

    gsap.fromTo(
      emailRef.current,
      { scale: 1 },
      { scale: 1.1, duration: 0.3, yoyo: true, repeat: 3 }
    );

    setTimeout(() => {
      setSending(false);
    }, 2000);
  };

  const breakEmailService = () => {
    setShowError(true);

    gsap.to(emailRef.current, {
      rotation: -5,
      duration: 0.1,
      yoyo: true,
      repeat: 9,
      onComplete: () => {
        gsap.to(emailRef.current, { rotation: 0 });
      },
    });

    gsap.to(serviceRef.current, {
      x: -5,
      duration: 0.05,
      yoyo: true,
      repeat: 11,
      onComplete: () => {
        gsap.to(serviceRef.current, { x: 0 });
      },
    });
  };

  const sendNotificationLoose = () => {
    setSending(true);

    // Animate upward dependency (inverted!)
    gsap.fromTo(
      implRef.current,
      { y: 0 },
      { y: -10, duration: 0.5, yoyo: true, repeat: 1 }
    );

    gsap.fromTo(
      managerRef.current,
      { scale: 1 },
      { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3 }
    );

    setTimeout(() => {
      setSending(false);
    }, 2000);
  };

  const reset = () => {
    setSending(false);
    setShowError(false);
    gsap.killTweensOf([
      serviceRef.current,
      emailRef.current,
      smsRef.current,
      managerRef.current,
      implRef.current,
    ]);
    gsap.set(
      [
        serviceRef.current,
        emailRef.current,
        smsRef.current,
        managerRef.current,
        implRef.current,
      ],
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
      }
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-2">
            <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            <h1 className="text-xl sm:text-3xl font-bold">
              🔄 Dependency Inversion Principle
            </h1>
            <ArrowUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Depend on abstractions, not concretions
          </p>
        </div>

        {/* Design Toggle */}
        <div className="flex justify-center gap-2 sm:gap-4">
          <Button
            onClick={() => {
              setDesign("tight");
              reset();
            }}
            variant={design === "tight" ? "default" : "outline"}
            className={`gap-2 ${design === "tight" ? "bg-red-600 hover:bg-red-700" : ""}`}
          >
            <ArrowDown className="w-4 h-4" /> Tight Coupling
          </Button>
          <Button
            onClick={() => {
              setDesign("loose");
              reset();
            }}
            variant={design === "loose" ? "default" : "outline"}
            className={`gap-2 ${design === "loose" ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            <ArrowUp className="w-4 h-4" /> Loose Coupling
          </Button>
        </div>

        {/* Main Demo */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Visualization */}
          <Card
            className={`shadow-lg border-2 transition-all ${
              design === "tight"
                ? "border-red-300 dark:border-red-800"
                : "border-green-300 dark:border-green-800"
            }`}
          >
            <CardHeader
              className={`${
                design === "tight"
                  ? "bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              }`}
            >
              <CardTitle className="text-base sm:text-lg text-center">
                {design === "tight"
                  ? "❌ Depends on Concrete Classes"
                  : "✅ Depends on Abstraction"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {design === "tight" ? (
                <div className="space-y-4">
                  {/* High-level module */}
                  <div ref={serviceRef} className="w-full h-20 mx-auto">
                    <NotificationService sending={sending} error={showError} />
                  </div>

                  {/* Arrow pointing down (bad!) */}
                  <div className="flex justify-center">
                    <ArrowDown className="w-8 h-8 text-red-500" />
                  </div>

                  {/* Low-level module */}
                  <div ref={emailRef} className="w-full h-16 mx-auto">
                    <EmailService broken={showError} />
                  </div>

                  <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border-2 border-red-200">
                    <p className="text-xs font-mono text-red-700 dark:text-red-300 mb-2">
                      class NotificationService {"{"}
                      <br />
                      &nbsp;&nbsp;emailService = new EmailService();
                      <br />
                      &nbsp;&nbsp;send() {"{ this.emailService.send() }"}
                      <br />
                      {"}"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ❌ High-level depends on low-level concrete class
                    </p>
                  </div>

                  {showError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 border-2 border-red-300 rounded-lg animate-pulse">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertTriangle className="w-4 h-4" />
                        <p className="font-semibold text-xs">
                          EmailService broke! NotificationService crashes too!
                        </p>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        Tightly coupled - changes ripple through system
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button
                      onClick={sendNotificationTight}
                      disabled={sending || showError}
                      className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Zap className="w-4 h-4" /> Send Notification
                    </Button>

                    <Button
                      onClick={breakEmailService}
                      disabled={showError}
                      variant="destructive"
                      className="w-full gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" /> Break Email Service
                    </Button>
                  </div>

                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-300">
                    <p className="text-xs text-yellow-800 dark:text-yellow-300">
                      <strong>Problems:</strong>
                      <br />• Can't switch to SMS without modifying code
                      <br />• Hard to test in isolation
                      <br />• Changes cascade through layers
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* High-level module */}
                  <div ref={managerRef} className="w-full h-20 mx-auto">
                    <NotificationManager sending={sending} />
                  </div>

                  {/* Arrow pointing up to interface (good!) */}
                  <div className="flex justify-center">
                    <ArrowUp className="w-8 h-8 text-green-500" />
                  </div>

                  {/* Interface (abstraction) */}
                  <div className="w-full h-16 mx-auto">
                    <MessageSenderInterface />
                  </div>

                  {/* Arrow pointing up from implementation */}
                  <div className="flex justify-center">
                    <ArrowUp className="w-8 h-8 text-green-500" />
                  </div>

                  {/* Low-level implementations */}
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={() => setSelectedSender("email")}
                      variant={
                        selectedSender === "email" ? "default" : "outline"
                      }
                      size="sm"
                      className="text-xs"
                    >
                      📧 Email
                    </Button>
                    <Button
                      onClick={() => setSelectedSender("sms")}
                      variant={selectedSender === "sms" ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      📱 SMS
                    </Button>
                    <Button
                      onClick={() => setSelectedSender("push")}
                      variant={
                        selectedSender === "push" ? "default" : "outline"
                      }
                      size="sm"
                      className="text-xs"
                    >
                      🔔 Push
                    </Button>
                  </div>

                  <div ref={implRef} className="w-full h-16 mx-auto">
                    {selectedSender === "email" && (
                      <EmailImpl active={sending} />
                    )}
                    {selectedSender === "sms" && <SMSImpl active={sending} />}
                    {selectedSender === "push" && <PushImpl active={sending} />}
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border-2 border-green-200">
                    <p className="text-xs font-mono text-green-700 dark:text-green-300 mb-2">
                      class NotificationManager {"{"}
                      <br />
                      &nbsp;&nbsp;sender: MessageSender;
                      <br />
                      &nbsp;&nbsp;send() {"{ this.sender.send() }"}
                      <br />
                      {"}"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ✅ Both depend on abstraction, not each other
                    </p>
                  </div>

                  {sending && (
                    <div className="p-3 bg-green-50 dark:bg-green-950/30 border-2 border-green-300 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <CheckCircle className="w-4 h-4" />
                        <p className="font-semibold text-xs">
                          Sending via {selectedSender.toUpperCase()}! Easily
                          switchable! 🎉
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={sendNotificationLoose}
                    disabled={sending}
                    className="w-full gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Zap className="w-4 h-4" /> Send Notification
                  </Button>

                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-300">
                    <p className="text-xs text-green-800 dark:text-green-300">
                      <strong>Benefits:</strong>
                      <br />• Switch implementations easily
                      <br />• Test with mock implementations
                      <br />• Add new senders without changing manager
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right: Explanation */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-center">
                📚 Understanding DIP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-2 border-red-200">
                  <div className="flex items-start gap-2">
                    <ArrowDown className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-red-700 dark:text-red-300">
                        Traditional Dependency (Bad)
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• High-level modules depend on low-level</li>
                        <li>• Direct instantiation of concrete classes</li>
                        <li>• Changes in low-level break high-level</li>
                        <li>• Hard to test and swap implementations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-2 border-green-200">
                  <div className="flex items-start gap-2">
                    <ArrowUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-green-700 dark:text-green-300">
                        Inverted Dependency (Good)
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• Both depend on abstractions</li>
                        <li>• Dependency injection used</li>
                        <li>• Low-level implements high-level interface</li>
                        <li>• Easy to test and extend</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  💡 The Two Rules of DIP
                </p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>
                    High-level modules should not depend on low-level modules.
                    Both should depend on abstractions.
                  </li>
                  <li>
                    Abstractions should not depend on details. Details should
                    depend on abstractions.
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  🎯 Key Insight
                </p>
                <p className="text-xs text-muted-foreground">
                  "Dependency Inversion" means the dependency arrows point
                  UPWARD to abstractions, not downward to implementations. This
                  inverts the traditional dependency flow!
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200">
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  🔧 How to Apply
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Define interfaces for dependencies</li>
                  <li>• Use dependency injection</li>
                  <li>• Program to interfaces, not implementations</li>
                  <li>• Let implementations adapt to interfaces</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Summary */}
        <Card className="shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Why DIP Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Server className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Decoupled Architecture
                  </p>
                  <p className="text-xs text-muted-foreground">
                    High and low-level modules are independent
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Database className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Easy Testing
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Inject mock implementations for tests
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Laptop className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Flexible Design
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Swap implementations without breaking code
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
