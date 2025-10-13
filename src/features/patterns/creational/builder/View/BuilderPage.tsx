import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import type { Pizza } from "../viewModel/pizzaBuilderViewModel";
import PizzaBuilder from "../viewModel/pizzaBuilderViewModel";

const toppingsColors: Record<string, string> = {
  Pepperoni: "#b71c1c",
  Mushroom: "#8d6e63",
  Olive: "#2e7d32",
  Onion: "#d81b60",
  Bacon: "#e57373",
};

const svgDefs = (
  <defs>
    <radialGradient id="crustGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#f5deb3" }} />
      <stop offset="80%" style={{ stopColor: "#e6c7a1" }} />
      <stop offset="100%" style={{ stopColor: "#d2b48c" }} />
    </radialGradient>
    <radialGradient id="tomatoSauce" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#ff6347" }} />
      <stop offset="100%" style={{ stopColor: "#d32f2f" }} />
    </radialGradient>
    <radialGradient id="pestoSauce" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#4caf50" }} />
      <stop offset="100%" style={{ stopColor: "#2e7d32" }} />
    </radialGradient>
    <radialGradient id="mozzarella" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#ffffff" }} />
      <stop offset="100%" style={{ stopColor: "#f0f0f0" }} />
    </radialGradient>
    <radialGradient id="cheddar" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#ffca28" }} />
      <stop offset="100%" style={{ stopColor: "#ffa000" }} />
    </radialGradient>
    <radialGradient id="oliveGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#2e7d32" }} />
      <stop offset="100%" style={{ stopColor: "#1a3c1a" }} />
    </radialGradient>
    <radialGradient id="onionGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#f06292" }} />
      <stop offset="100%" style={{ stopColor: "#ad1457" }} />
    </radialGradient>
    <radialGradient id="onionGradientInner" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style={{ stopColor: "#f8bbd0" }} />
      <stop offset="100%" style={{ stopColor: "#c2185b" }} />
    </radialGradient>
    <linearGradient id="baconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style={{ stopColor: "#e57373" }} />
      <stop offset="20%" style={{ stopColor: "#e57373" }} />
      <stop offset="30%" style={{ stopColor: "#ffffff" }} />
      <stop offset="40%" style={{ stopColor: "#e57373" }} />
      <stop offset="60%" style={{ stopColor: "#e57373" }} />
      <stop offset="70%" style={{ stopColor: "#ffffff" }} />
      <stop offset="80%" style={{ stopColor: "#e57373" }} />
    </linearGradient>
    <filter id="crustShadow">
      <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
    </filter>
    <filter id="cheeseShadow">
      <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.3" />
    </filter>
    <filter id="toppingShadow">
      <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.2" />
    </filter>
  </defs>
);

// Topping rendering logic
const renderTopping = (
  topping: { name: string; count: number },
  index: number
) => {
  return Array.from({ length: topping.count }).map((_, j) => {
    // Adjust radius and angle for better distribution
    const angle = (j * 2 * Math.PI) / topping.count + index * 0.3;
    const radius = 30 + index * 13;
    const cx = 100 + Math.cos(angle) * radius;
    const cy = 100 + Math.sin(angle) * radius;

    switch (topping.name) {
      case "Pepperoni":
        return (
          <g key={`${topping.name}-${index}-${j}`}>
            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill={toppingsColors[topping.name]}
              filter="url(#toppingShadow)"
            />
            <circle cx={cx} cy={cy} r="6" fill="#d32f2f" opacity="0.5" />
          </g>
        );
      case "Mushroom":
        return (
          <g key={`${topping.name}-${index}-${j}`}>
            <circle
              cx={cx}
              cy={cy}
              r="8"
              fill={toppingsColors[topping.name]}
              filter="url(#toppingShadow)"
            />
            <path
              d={`M${cx - 4},${cy} a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0`}
              fill="#6d4c41"
              opacity="0.6"
            />
          </g>
        );
      case "Olive":
        return (
          <g key={`${topping.name}-${index}-${j}`}>
            <circle
              cx={cx}
              cy={cy}
              r="8"
              fill="url(#oliveGradient)"
              filter="url(#toppingShadow)"
            />
            <circle cx={cx} cy={cy} r="3" fill="#1a3c1a" opacity="0.8" />
          </g>
        );
      case "Onion":
        return (
          <g key={`${topping.name}-${index}-${j}`}>
            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill="url(#onionGradient)"
              opacity="0.6"
              filter="url(#toppingShadow)"
            />
            <circle
              cx={cx}
              cy={cy}
              r="7"
              fill="url(#onionGradientInner)"
              opacity="0.7"
            />
          </g>
        );
      case "Bacon":
        return (
          <g
            key={`${topping.name}-${index}-${j}`}
            transform={`translate(${cx}, ${cy}) rotate(${(angle * 180) / Math.PI})`}
          >
            {/* Flat, wavy bacon strip */}
            <path
              d="M-14,0 Q-10,4 -6,0 Q-2,-4 2,0 Q6,4 10,0 Q14,-4 18,0 L18,6 Q14,2 10,6 Q6,10 2,6 Q-2,2 -6,6 Q-10,10 -14,6 Z"
              fill="url(#baconGradient)"
              filter="url(#toppingShadow)"
            />
            {/* Fat streaks */}
            <path
              d="M-12,2 Q-8,6 -4,2 Q0,-2 4,2 Q8,6 12,2"
              fill="none"
              stroke="#fff8e1"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <path
              d="M-10,4 Q-6,8 -2,4 Q2,0 6,4 Q10,8 14,4"
              fill="none"
              stroke="#ffe0b2"
              strokeWidth="1"
              opacity="0.6"
            />
          </g>
        );
      default:
        return (
          <circle
            key={`${topping.name}-${index}-${j}`}
            cx={cx}
            cy={cy}
            r="8"
            fill={toppingsColors[topping.name] || "#616161"}
            filter="url(#toppingShadow)"
          />
        );
    }
  });
};

export default function PizzaPage() {
  const [pizza, setPizza] = React.useState<Pizza>(new PizzaBuilder().build());
  const builderRef = useRef(new PizzaBuilder());
  const pizzaRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (pizzaRef.current) {
      gsap.fromTo(
        pizzaRef.current,
        { scale: 0.9, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [pizza]);

  const addSauce = (sauce: string) => {
    const newPizza = builderRef.current.addSauce(sauce).build();
    setPizza(newPizza);
  };

  const addCheese = (cheese: string) => {
    const newPizza = builderRef.current.addCheese(cheese).build();
    setPizza(newPizza);
  };

  const addTopping = (topping: string) => {
    const newPizza = builderRef.current.addTopping(topping).build();
    setPizza(newPizza);
  };

  const resetPizza = () => {
    const newPizza = builderRef.current.reset().build();
    setPizza(newPizza);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col items-center p-8">
      <h1 className="lg:text-4xl text-3xl font-bold text-foreground dark:text-foreground mb-8 drop-shadow-sm">
        🍕 Build Your Pizza
      </h1>
      <div className="w-full flex lg:flex-row flex-col items-center gap-5">
        <pre className="flex-1/5 mt-8 p-4 bg-muted dark:bg-gray-800 rounded-lg w-full max-w-lg text-sm text-muted-foreground dark:text-gray-200 shadow-inner">
          {JSON.stringify(pizza, null, 2)}
        </pre>

        {/* Pizza Preview */}
        <div className="flex-2/5 relative flex items-center justify-center bg-card dark:bg-gray-800 rounded-md shadow-lg p-4">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {svgDefs}
            <circle
              ref={pizzaRef}
              cx="100"
              cy="100"
              r="90"
              fill="url(#crustGradient)"
              stroke="#8b5a2b"
              strokeWidth="8"
              filter="url(#crustShadow)"
            />
            {pizza.sauce && (
              <circle
                cx="100"
                cy="100"
                r="75"
                fill={
                  pizza.sauce === "Tomato"
                    ? "url(#tomatoSauce)"
                    : "url(#pestoSauce)"
                }
                opacity="0.85"
              />
            )}
            {pizza.cheese && (
              <circle
                cx="100"
                cy="100"
                r="60"
                fill={
                  pizza.cheese === "Mozzarella"
                    ? "url(#mozzarella)"
                    : "url(#cheddar)"
                }
                opacity="0.9"
                filter="url(#cheeseShadow)"
              />
            )}
            {pizza.toppings.map(renderTopping)}
          </svg>
        </div>
        {/* Controls */}
        <div className="flex-2/5 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-lg mt-8">
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
              Sauce
            </h3>
            <div className="flex space-x-3">
              <Button
                onClick={() => addSauce("Tomato")}
                variant="default"
                className="flex-1 bg-primary dark:bg-amber-600 text-primary-foreground dark:text-white hover:bg-primary/90 dark:hover:bg-amber-700 shadow-sm"
              >
                🍅 Tomato
              </Button>
              <Button
                onClick={() => addSauce("Pesto")}
                variant="default"
                className="flex-1 bg-green-600 dark:bg-green-600 text-white dark:text-white hover:bg-green-700 dark:hover:bg-green-700 shadow-sm"
              >
                🌿 Pesto
              </Button>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
              Cheese
            </h3>
            <div className="flex space-x-3">
              <Button
                onClick={() => addCheese("Mozzarella")}
                variant="secondary"
                className="flex-1 bg-secondary dark:bg-amber-400 text-secondary-foreground dark:text-gray-800 hover:bg-secondary/90 dark:hover:bg-amber-500 shadow-sm"
              >
                🧀 Mozzarella
              </Button>
              <Button
                onClick={() => addCheese("Cheddar")}
                variant="default"
                className="flex-1 bg-orange-400 dark:bg-orange-400 text-gray-800 dark:text-gray-800 hover:bg-orange-500 dark:hover:bg-orange-500 shadow-sm"
              >
                🧀 Cheddar
              </Button>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
              Toppings
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => addTopping("Pepperoni")}
                variant="destructive"
                className="bg-destructive dark:bg-red-500 text-destructive-foreground dark:text-white hover:bg-destructive/90 dark:hover:bg-red-600 shadow-sm"
              >
                🍖 Pepperoni
              </Button>
              <Button
                onClick={() => addTopping("Mushroom")}
                variant="default"
                className="bg-amber-800 dark:bg-amber-800 text-white dark:text-white hover:bg-amber-900 dark:hover:bg-amber-900 shadow-sm"
              >
                🍄 Mushroom
              </Button>
              <Button
                onClick={() => addTopping("Olive")}
                variant="default"
                className="bg-green-700 dark:bg-green-700 text-white dark:text-white hover:bg-green-800 dark:hover:bg-green-800 shadow-sm"
              >
                🫒 Olive
              </Button>
              <Button
                onClick={() => addTopping("Onion")}
                variant="default"
                className="bg-purple-500 dark:bg-purple-500 text-white dark:text-white hover:bg-purple-600 dark:hover:bg-purple-600 shadow-sm"
              >
                🧅 Onion
              </Button>
              <Button
                onClick={() => addTopping("Bacon")}
                variant="default"
                className="bg-red-400 dark:bg-red-400 text-white dark:text-white hover:bg-red-500 dark:hover:bg-red-500 shadow-sm"
              >
                🥓 Bacon
              </Button>
            </div>
          </div>
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
              Restart
            </h3>
            <div>
              <Button
                onClick={resetPizza}
                variant="outline"
                className="bg-muted dark:bg-gray-600 text-muted-foreground dark:text-white hover:bg-muted/90 dark:hover:bg-gray-700 shadow-sm"
              >
                🔄 Reset Pizza
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
