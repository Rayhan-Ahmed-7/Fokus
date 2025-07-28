import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useTodoViewModel } from "./useTodoViewModel";

export const useTodoAnimations = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const { todos } = useTodoViewModel();
  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [todos]);
  return {
    listRef,
  };
};
