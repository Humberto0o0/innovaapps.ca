// Context: motion preferences and reduced-motion handling.
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

const MotionSettingsContext = createContext(null);

export function MotionSettingsProvider({ children }) {
  const prefersReduced = useReducedMotion();
  const [userReduce, setUserReduce] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("reduceMotion") === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("reduceMotion", String(userReduce));
    document.documentElement.dataset.reduceMotion = userReduce || prefersReduced ? "true" : "false";
  }, [userReduce, prefersReduced]);

  const reducedMotion = prefersReduced || userReduce;

  const value = useMemo(
    () => ({
      reducedMotion,
      userReduce,
      setUserReduce,
    }),
    [reducedMotion, userReduce]
  );

  return (
    <MotionSettingsContext.Provider value={value}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </MotionSettingsContext.Provider>
  );
}

export function useMotionSettings() {
  const context = useContext(MotionSettingsContext);
  if (!context) {
    throw new Error("useMotionSettings must be used within MotionSettingsProvider");
  }
  return context;
}
