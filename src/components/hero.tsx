"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(); // ❌ No need to register `useGSAP`, it's a React hook.

export default function Boxes() {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleTimeline = () => {
    if (tl.current) {
      tl.current.reversed(!tl.current.reversed());
    }
  };

  useGSAP(
    () => {
      if (!container.current) return;

      const boxes = gsap.utils.toArray(".box") as HTMLElement[];

      if (boxes.length < 3) return; // Ensure we have at least 3 elements

      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, "<")
        .to(boxes[2], { y: -166 })
        .reverse();
    },
    { scope: container }
  );

  return (
    <main>
    <section className="max-h-screen flex flex-col items-center justify-center" ref={container}>
                <h2>Use the button to toggle a Timeline</h2>
        <div>
          <button onClick={toggleTimeline} className="p-2 bg-blue-500 text-white rounded">
            Toggle Timeline
          </button>
        </div>
        <div className="box gradient-blue w-20 h-20 bg-blue-500 text-white flex items-center justify-center mt-4">
          Box 1
        </div>
        <div className="box gradient-blue w-20 h-20 bg-blue-500 text-white flex items-center justify-center mt-4">
          Box 2
        </div>
        <div className="box gradient-blue w-20 h-20 bg-blue-500 text-white flex items-center justify-center mt-4">
          Box 3
        </div>
      </section>
    </main>
  );
}
