"use client";

import { useEffect } from "react";
import { setupSmoothScrollWithGSAP, setMotionDefaults } from "@/lib/motion";

export default function SmoothScroll() {
    useEffect(() => {
        setMotionDefaults();
        const lenis = setupSmoothScrollWithGSAP();
        return () => lenis && lenis.destroy();
    }, []);

    return null;
}
