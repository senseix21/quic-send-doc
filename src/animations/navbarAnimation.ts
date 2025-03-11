import gsap from "gsap";

export default function navbarAnimation(navbar: HTMLElement) {
  gsap.from(navbar, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // Animate navbar links (stagger effect)
  gsap.from(navbar.querySelectorAll("nav a"), {
    opacity: 0,
    y: 10,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.2,
  });
}
