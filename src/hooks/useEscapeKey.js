import { useEffect } from "react";

export const useEscapeKey = (onPressEscape) => {
  useEffect(() => {
    const handleDismissToasts = (evt) => {
      if (evt.key === "Escape") {
        onPressEscape();
      }
    };
    window.addEventListener("keydown", handleDismissToasts);
    return () => window.removeEventListener("keydown", handleDismissToasts);
  }, [onPressEscape]);
};
