import { useSyncExternalStore } from "react";

type Device = "mobile" | "tablet" | "desktop" | null;
type Dimensions = { width: number; height: number } | null;

const createMediaStore = () => {
  const subscribers = new Set<() => void>();
  let currentDevice: Device | null = null; // Cache last device to avoid redundant updates

  const getDevice = (): Device => {
    if (typeof window === "undefined") return null;
    if (window.matchMedia("(min-width: 1024px)").matches) return "desktop";
    if (window.matchMedia("(min-width: 640px)").matches) return "tablet";
    return "mobile";
  };

  const getDimensions = (): Dimensions => {
    if (typeof window === "undefined") return null;
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  // Notify all subscribers
  const notifySubscribers = () => {
    const newDevice = getDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice; // Update cache
      subscribers.forEach((callback) => callback());
    }
  };

  // Subscribe to store updates
  const subscribe = (callback: () => void) => {
    subscribers.add(callback);

    // Ensure resize logic only triggers meaningful updates
    const handleResize = () => notifySubscribers();

    window.addEventListener("resize", handleResize);

    return () => {
      subscribers.delete(callback);
      window.removeEventListener("resize", handleResize);
    };
  };

  // Snapshots for device and dimensions
  const getDeviceSnapshot = (): Device => currentDevice ?? getDevice();
  const getDimensionsSnapshot = (): Dimensions => getDimensions();

  // Server rendering fallback
  const getServerSnapshot = (): null => null;

  return {
    subscribe,
    getDeviceSnapshot,
    getDimensionsSnapshot,
    getServerSnapshot,
  };
};

// Create a single store instance
const mediaStore = createMediaStore();

export function useMediaQuery() {
  const device = useSyncExternalStore(
    mediaStore.subscribe,
    mediaStore.getDeviceSnapshot,
    mediaStore.getServerSnapshot,
  );

  const dimensions = useSyncExternalStore(
    mediaStore.subscribe,
    mediaStore.getDimensionsSnapshot,
    mediaStore.getServerSnapshot,
  );

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
