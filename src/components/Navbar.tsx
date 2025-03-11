"use client"; // Required for animations in Next.js App Router
import { useEffect, useRef } from "react";
//import gsap from "gsap";
import { Button } from "@/components/ui/button";
import navbarAnimation from "@/animations/navbarAnimation";

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      navbarAnimation(navbarRef.current);
    }
  }, []);

  return (
    <div ref={navbarRef} className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-900">MyDocSite</h1>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-gray-700 hover:text-black transition">Docs</a>
          <a href="#" className="text-gray-700 hover:text-black transition">Pricing</a>
          <a href="#" className="text-gray-700 hover:text-black transition">Blog</a>
        </nav>
        <Button variant="default">Get Started</Button>
      </div>
    </div>
  );
}
