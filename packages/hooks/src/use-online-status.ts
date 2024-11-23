import { useCallback, useSyncExternalStore } from "react";

/**
 * Hook to track the online/offline status of the browser.
 * @param onStatusChange - Optional callback invoked whenever the online status changes.
 * @returns A boolean indicating whether the browser is online (`true`) or offline (`false`).
 */
export function useOnlineStatus(
  onStatusChange?: (isOnline: boolean) => void,
): boolean {
  // Function to get the current online status
  const getOnlineStatus = useCallback(() => navigator.onLine, []);

  /**
   * Subscribes to the `online` and `offline` events and invokes the callback if provided.
   */
  const subscribe = useCallback(
    (callback: () => void) => {
      const handleOnline = () => {
        callback();
        if (onStatusChange) {
          try {
            onStatusChange(true);
          } catch (error) {
            console.error("Error in onStatusChange callback:", error);
          }
        }
      };

      const handleOffline = () => {
        callback();
        if (onStatusChange) {
          try {
            onStatusChange(false);
          } catch (error) {
            console.error("Error in onStatusChange callback:", error);
          }
        }
      };

      // Add event listeners for online/offline events
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        // Clean up event listeners
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    },
    [onStatusChange],
  );

  // Use the `useSyncExternalStore` hook to synchronize the online status
  const isOnline = useSyncExternalStore(subscribe, getOnlineStatus, () => true); // Default to `true` during server-side rendering

  return isOnline;
}
