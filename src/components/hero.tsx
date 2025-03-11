"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(heroRef.current.querySelector("h1"), {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      })
        .from(heroRef.current.querySelector("p"), {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
        }, "-=0.5")
        .from(heroRef.current.querySelector("button"), {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "back.out(1.7)",
        }, "-=0.5");
    }
  }, []);

  return (
    <section ref={heroRef} className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">Build. Deploy. Scale.</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-lg">
        The fastest way to document and share your software package with the world.
      </p>
      <Button className="mt-6 px-6 py-3 text-lg">Get Started</Button>
    </section>
  );
}
