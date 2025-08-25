import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import gsap from "gsap";

export default function NormalCounter({ title }: { title: string }) {
  const [value, setValue] = useState(0);
  const valueRef = useRef<HTMLParagraphElement>(null);

  const handleIncrement = () => {
    setValue((prev) => {
      const newVal = prev + 1;

      if (valueRef.current) {
        gsap.fromTo(
          valueRef.current,
          { scale: 1.5, color: "var(--primary)" }, // red highlight
          { scale: 1, duration: 0.5, ease: "bounce.out" }
        );
      }

      return newVal;
    });
  };

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>{title} (Non-Singleton)</CardTitle>
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
