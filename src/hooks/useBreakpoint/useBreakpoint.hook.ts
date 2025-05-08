import { useState, useEffect } from "react";

type Breakpoints = {
  mobile: number;
  desktop: number;
};

const DEFAULT_BREAKPOINTS: Breakpoints = {
  mobile: 768,
  desktop: 1024,
};

type BreakpointResult = {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
};

export const useBreakpoint = (
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS,
): BreakpointResult => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width <= breakpoints.mobile;
  const isDesktop = windowSize.width >= breakpoints.desktop;
  const isTablet = !isMobile && !isDesktop; // Opcional

  return { isMobile, isDesktop, isTablet };
};

export default useBreakpoint;
