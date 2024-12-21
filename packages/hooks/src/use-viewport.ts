import { useSyncExternalStore } from "react";

type Device = "mobile" | "tablet" | "desktop" | null;

// Device Logic
const createDeviceStore = () => {
  const subscribers = new Set<() => void>();
  let currentDevice: Device | null = null;

  const getDevice = (): Device => {
    if (typeof window === "undefined") return null;
    if (window.matchMedia("(min-width: 1024px)").matches) return "desktop";
    if (window.matchMedia("(min-width: 640px)").matches) return "tablet";
    return "mobile";
  };

  const notifySubscribers = () => {
    const newDevice = getDevice();
    if (newDevice !== currentDevice) {
      currentDevice = newDevice;
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

  const getSnapshot = (): Device => currentDevice ?? getDevice();
  const getServerSnapshot = (): null => null;

  return { subscribe, getSnapshot, getServerSnapshot };
};

const deviceStore = createDeviceStore();

export function useViewport() {
  const device = useSyncExternalStore(
    deviceStore.subscribe,
    deviceStore.getSnapshot,
    deviceStore.getServerSnapshot,
  );

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
