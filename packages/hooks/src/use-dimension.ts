import { useSyncExternalStore } from "react";

type Dimensions = { width: number; height: number } | null;

const createDimensionsStore = () => {
  const subscribers = new Set<() => void>();
  let currentDimensions: Dimensions = null;

  const getDimensions = (): Dimensions => {
    if (typeof window === "undefined") return null;
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const notifySubscribers = () => {
    const newDimensions = getDimensions();

    if (
      !currentDimensions ||
      (newDimensions &&
        (newDimensions.width !== currentDimensions.width ||
          newDimensions.height !== currentDimensions.height))
    ) {
      currentDimensions = newDimensions;
      subscribers.forEach((callback) => callback());
    }
  };

  const subscribe = (callback: () => void) => {
    subscribers.add(callback);
    if (subscribers.size === 1) {
      window.addEventListener("resize", notifySubscribers);
    }
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        window.removeEventListener("resize", notifySubscribers);
      }
    };
  };

  const getSnapshot = (): Dimensions => currentDimensions ?? getDimensions();
  const getServerSnapshot = (): null => null;

  return { subscribe, getSnapshot, getServerSnapshot };
};

const dimensionsStore = createDimensionsStore();

export function useDimensions() {
  const dimensions = useSyncExternalStore(
    dimensionsStore.subscribe,
    dimensionsStore.getSnapshot,
    dimensionsStore.getServerSnapshot,
  );

  return {
    width: dimensions?.width,
    height: dimensions?.height,
  };
}
