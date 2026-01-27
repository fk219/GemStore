import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Luxury Motion Constants
export const LUXURY_EASING = {
    elegant: 'cubic-bezier(0.16, 1, 0.3, 1)',
    smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
    gentle: 'cubic-bezier(0.33, 1, 0.68, 1)',
} as const;

export const LUXURY_DURATION = {
    fast: 1.5,
    medium: 2.5,
    slow: 3.5,
    glacial: 5,
} as const;

export function setMotionDefaults() {
    gsap.defaults({
        ease: LUXURY_EASING.elegant,
        duration: LUXURY_DURATION.medium,
    });
}

export function setupSmoothScrollWithGSAP() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({
        duration: 1.4, // Increased from 1.1 for more weighted feel
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.5,
    });
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (value !== undefined) {
                lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
    });
    lenis.on("scroll", () => {
        ScrollTrigger.update();
    });
    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();
    return lenis;
}
