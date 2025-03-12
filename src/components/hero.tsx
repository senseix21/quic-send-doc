"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { CSSPlugin } from "gsap/CSSPlugin";

gsap.registerPlugin(TextPlugin, CSSPlugin);

export default function AnimatedShapes() {
  const svgRect = useRef<SVGRectElement | null>(null);
  const divRect = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLHeadingElement | null>(null);
  const [progress, setProgress] = useState(0);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!svgRect.current || !divRect.current || !messageRef.current) return;
    const elements = [svgRect.current, divRect.current];
    
    tl.current = gsap.timeline({
      onUpdate: () => setProgress(tl.current?.progress() || 0),
      defaults: { duration: 1 },
    });

    tl.current
      .set(messageRef.current, { text: '{rotation:360, transformOrigin:"50% 50%"}' })
      .to(elements, { rotation: 360, transformOrigin: "50% 50%" }, "+=1")
      .set(messageRef.current, { text: '{scale:0, transformOrigin:"0px 0px"}' }, "+=1")
      .to(elements, { scale: 0, transformOrigin: "0px 0px" })
      .set(messageRef.current, { text: '{scale:1, transformOrigin:"100% 0%"}' }, "+=1")
      .to(elements, { scale: 1, transformOrigin: "100% 0%" });

    tl.current.pause();
  }, []);

  const handlePlay = () => {
    if (tl.current) {
      if (tl.current.progress() === 1) {
        tl.current.restart();
      } else {
        tl.current.play();
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tl.current) {
      const value = parseFloat(e.target.value);
      tl.current.progress(value).pause();
      setProgress(value);
    }
  };

  return (
    <main className="flex flex-col items-center gap-4 p-6">
      <div className="flex flex-wrap gap-6">
        <div className="cell">
          <h2>SVG &lt;rect&gt;</h2>
          <svg className="container border border-gray-300" width="260" height="200">
            <rect ref={svgRect} x="20" y="60" width="220" height="80" fill="#91e600" />
          </svg>
        </div>

        <div className="cell">
          <h2>&lt;div&gt;</h2>
          <div className="container border border-gray-300 w-[260px] h-[200px] relative flex items-center justify-center">
            <div ref={divRect} className="w-[220px] h-[80px] bg-green-500" />
          </div>
        </div>
      </div>

      <h3 ref={messageRef} className="text-lg font-semibold text-gray-700"></h3>

      <div className="flex flex-col items-center gap-3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          onChange={handleSliderChange}
          className="w-[300px] cursor-pointer"
        />

        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Play Animation
        </button>
      </div>
    </main>
  );
}
