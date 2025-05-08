import { useEffect, RefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  onClickOutside: () => void,
): void => {
  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      const targetNode = event.target as Node;

      if (elementRef.current && !elementRef.current.contains(targetNode)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [elementRef, onClickOutside]);
};

export default useClickOutside;
