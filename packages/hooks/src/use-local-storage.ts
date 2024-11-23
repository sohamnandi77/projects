import { useCallback, useSyncExternalStore } from "react";
import superjson from "superjson";

// Type representing the stored value
type StorageValue<T> = {
  value: T;
} | null;

// Custom event type for local storage updates
interface LocalStorageEventDetail {
  key: string;
}

/**
 * A custom React hook to manage synchronized state with localStorage.
 * @param key - The key used to identify the value in localStorage.
 * @param initialValue - The initial value if no value is found in localStorage.
 * @returns A tuple with the current value and a setter function.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Core storage operations
  const storage = {
    /**
     * Retrieves the current value from localStorage.
     * Falls back to the initial value if parsing or retrieval fails.
     */
    get: useCallback((): T => {
      try {
        const item = localStorage.getItem(key);
        if (!item) return initialValue;

        // Add type safety for parsing
        const parsed = superjson.parse<StorageValue<T>>(item);
        return parsed?.value ?? initialValue;
      } catch (error) {
        console.error(`Error reading localStorage for key "${key}":`, error);

        return initialValue;
      }
    }, [key, initialValue]),

    /**
     * Sets a new value in localStorage and dispatches a custom event to notify subscribers.
     */
    set: useCallback(
      (value: T): void => {
        try {
          // Serialize the value safely
          const serialized = superjson.stringify({ value } as StorageValue<T>);
          if (typeof serialized === "string") {
            localStorage.setItem(key, serialized);

            // Dispatch a custom event to notify other tabs/components
            window.dispatchEvent(
              new CustomEvent<LocalStorageEventDetail>("local-storage", {
                detail: { key },
              }),
            );
          }
        } catch (error) {
          console.error(`Error setting localStorage for key "${key}":`, error);
        }
      },
      [key],
    ),
  };

  /**
   * Subscribes to changes in localStorage.
   * Handles updates from both `storage` and custom events.
   */
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key) onStoreChange();
      };

      const handleCustomEvent = (e: CustomEvent<LocalStorageEventDetail>) => {
        if (e.detail.key === key) onStoreChange();
      };

      // Listen for native `storage` events and custom `local-storage` events
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(
        "local-storage",
        handleCustomEvent as EventListener,
      );

      return () => {
        // Clean up event listeners
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(
          "local-storage",
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
