import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const ComingSoon = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <Avatar className="w-50 h-50 p-4 sm:w-40 sm:h-40 sm:p-0 lg:w-82 lg:h-82 lg:p-2">
        <AvatarImage src="/happy-coder.png" />
        <AvatarFallback>😊</AvatarFallback>
      </Avatar>

      <h1
        ref={textRef}
        className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6"
      >
        Coming Soon!
      </h1>

      <Button
        onClick={() => console.log("Redirect to another page")}
        // className="px-4 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3 rounded-lg shadow-md text-primary-foreground"
      >
        Notify Me
      </Button>
    </div>
  );
};

export default ComingSoon;
