import { useCallback, useSyncExternalStore } from "react";
import superjson from "superjson";

// Type representing the stored value
type StorageValue<T> = {
  value: T;
} | null;

// Custom event type for session storage updates
interface SessionStorageEventDetail {
  key: string;
}

/**
 * A custom React hook to manage synchronized state with sessionStorage.
 * @param key - The key used to identify the value in sessionStorage.
 * @param initialValue - The initial value if no value is found in sessionStorage.
 * @returns A tuple with the current value and a setter function.
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
  // Core storage operations
  const storage = {
    /**
     * Retrieves the current value from sessionStorage.
     * Falls back to the initial value if parsing or retrieval fails.
     */
    get: useCallback((): T => {
      try {
        const item = sessionStorage.getItem(key);
        if (!item) return initialValue;

        // Safely parse the value using superjson
        const parsed = superjson.parse<StorageValue<T>>(item);
        return parsed?.value ?? initialValue;
      } catch (error) {
        console.error(`Error reading sessionStorage for key "${key}":`, error);
        return initialValue;
      }
    }, [key, initialValue]),

    /**
     * Sets a new value in sessionStorage and dispatches a custom event to notify subscribers.
     */
    set: useCallback(
      (value: T): void => {
        try {
          // Serialize the value safely
          const serialized = superjson.stringify({ value } as StorageValue<T>);
          if (typeof serialized === "string") {
            sessionStorage.setItem(key, serialized);

            // Dispatch a custom event to notify other tabs/components
            window.dispatchEvent(
              new CustomEvent<SessionStorageEventDetail>("session-storage", {
                detail: { key },
              }),
            );
          }
        } catch (error) {
          console.error(
            `Error setting sessionStorage for key "${key}":`,
            error,
          );
        }
      },
      [key],
    ),
  };

  /**
   * Subscribes to changes in sessionStorage.
   * Handles updates from both `storage` and custom events.
   */
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key) onStoreChange();
      };

      const handleCustomEvent = (e: CustomEvent<SessionStorageEventDetail>) => {
        if (e.detail.key === key) onStoreChange();
      };

      // Listen for native `storage` events and custom `session-storage` events
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(
        "session-storage",
        handleCustomEvent as EventListener,
      );

      return () => {
        // Clean up event listeners
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(
          "session-storage",
          handleCustomEvent as EventListener,
        );
      };
    },
    [key],
  );

  // Use the external store synchronization hook
  const value = useSyncExternalStore(
    subscribe,
    storage.get, // Get the current value
    () => initialValue, // Fallback for server-side rendering
  );

  // Return the current value and the setter function
  return [value, storage.set] as const;
}
