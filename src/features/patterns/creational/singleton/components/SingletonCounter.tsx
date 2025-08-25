import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import gsap from "gsap";
import { counterManager } from "../viewModel/CounterManager";

export default function SingletonCounter({ title }: { title: string }) {
  const [value, setValue] = useState(counterManager.getValue());
  const valueRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const unsubscribe = counterManager.subscribe((newValue) => {
      setValue(newValue);

      if (valueRef.current) {
        gsap.fromTo(
          valueRef.current,
          { scale: 1.5, color: "var(--primary)" },
          { scale: 1, duration: 0.5, ease: "bounce.out" }
        );
      }
    });

    return unsubscribe;
  }, []);

  const handleIncrement = () => {
    const newVal = counterManager.increment();
    setValue(newVal);

    if (valueRef.current) {
      gsap.fromTo(
        valueRef.current,
        { scale: 1.5, color: "var(--primary)" }, // green highlight
        { scale: 1, duration: 0.5, ease: "bounce.out" }
      );
    }
  };

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>{title} (Singleton)</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <p ref={valueRef} className="text-2xl font-bold">
          {value}
        </p>
        <Button onClick={handleIncrement}>Increment</Button>
      </CardContent>
    </Card>
  );
}
