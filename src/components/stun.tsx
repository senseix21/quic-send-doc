"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const MotionPathBezier = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        duration: 5,
        motionPath: {
          path: [
            { x: 100, y: 50 },
            { x: 200, y: 150 },
            { x: 300, y: 50 },
            { x: 400, y: 150 },
          ],
          curviness: 1.5,
          autoRotate: true,
        },
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div ref={boxRef} className="w-10 h-10 bg-red-500 rounded-full absolute" />
    </div>
  );
};

export default MotionPathBezier;
